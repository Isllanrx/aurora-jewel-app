-- ============================================================
-- Aurora Joias — Supabase Schema
-- Execute este arquivo no SQL Editor do Supabase
-- ============================================================

-- Tabela de produtos
CREATE TABLE IF NOT EXISTS products (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  price         NUMERIC(10,2) NOT NULL,
  original_price NUMERIC(10,2),
  image_url     TEXT,
  category      TEXT CHECK (category IN ('anel', 'cordao', 'relogio')),
  badge         TEXT,
  description   TEXT,
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- Tabela de favoritos
CREATE TABLE IF NOT EXISTS favorites (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID REFERENCES auth.users ON DELETE CASCADE,
  product_id UUID REFERENCES products ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Tabela de depoimentos
CREATE TABLE IF NOT EXISTS testimonials (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_name  TEXT NOT NULL,
  review     TEXT NOT NULL,
  rating     INT DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela de perfis (complementa auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id         UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  name       TEXT,
  phone      TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Trigger: criar perfil automaticamente ao cadastrar usuário
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, phone)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'name',
    NEW.raw_user_meta_data ->> 'phone'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();

-- Row Level Security
ALTER TABLE products     ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites    ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles     ENABLE ROW LEVEL SECURITY;

-- Policies: products (leitura pública)
CREATE POLICY "products_select" ON products FOR SELECT USING (true);

-- Policies: favorites (somente o dono)
CREATE POLICY "favorites_select" ON favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "favorites_insert" ON favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "favorites_delete" ON favorites FOR DELETE USING (auth.uid() = user_id);

-- Policies: testimonials (leitura pública, inserção autenticada)
CREATE POLICY "testimonials_select" ON testimonials FOR SELECT USING (true);
CREATE POLICY "testimonials_insert" ON testimonials FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Policies: profiles (somente o dono)
CREATE POLICY "profiles_select" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_update" ON profiles FOR UPDATE USING (auth.uid() = id);

-- ============================================================
-- Seed: produtos iniciais
-- ============================================================
INSERT INTO products (name, price, original_price, category, badge, description) VALUES
  ('Relógio Orient SolarTech',  1599.00, 1999.00, 'relogio', '-20%',  'Tecnologia solar avançada com 5 anos de garantia. Sustentabilidade e elegância juntas.'),
  ('Anel Pandora Signature',    4600.00, 5800.00, 'anel',    'Novo',  'Anel em prata esterlina com acabamento em ouro rosé. Design icônico Pandora.'),
  ('Cordão Swarovski Crystal', 13765.00,17200.00, 'cordao',  '-25%',  'Cristais lapidados à mão com corrente banhada a ouro 18k. Peça de coleção.'),
  ('Relógio Seiko Presage',     3499.00,    NULL, 'relogio',  NULL,   'Movimento automático japonês de alta precisão. Mostrador esmaltado artesanal.'),
  ('Anel Pandora Timeless',      568.67,    NULL, 'anel',     NULL,   'Design minimalista em prata, perfeito para o dia a dia. Empilhável.'),
  ('Cordão Vivara Gold',        3000.00,    NULL, 'cordao',   NULL,   'Ouro 18k com certificação de autenticidade IBGM. Acabamento artesanal.')
ON CONFLICT DO NOTHING;

-- Seed: depoimentos
INSERT INTO testimonials (user_name, review, rating) VALUES
  ('João da Silva',    'Comprei um relógio Orient e ficou incrível. Atendimento impecável e entrega rápida!', 5),
  ('Maria da Silva',   'Anel Pandora lindo! Qualidade excepcional. Com certeza vou comprar mais peças aqui.', 5),
  ('Carlos Henrique',  'Presenteei minha esposa com um cordão Swarovski. Ela amou! Embalagem luxuosa e peça perfeita.', 5),
  ('Ana Paula',        'Atendimento incrível e preços justos. Aurora Joias é minha joalheria favorita.', 5),
  ('Roberto Souza',    'Relógio Seiko com acabamento impecável. Superou todas as minhas expectativas. Recomendo muito!', 5)
ON CONFLICT DO NOTHING;
