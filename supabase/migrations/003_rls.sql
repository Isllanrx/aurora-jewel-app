-- ============================================================
-- Migration 003 — Row Level Security (RLS) e Policies
-- ============================================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE products     ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites    ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles     ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------
-- products — leitura pública (sem autenticação)
-- ------------------------------------------------------------
DROP POLICY IF EXISTS "products_select" ON products;
CREATE POLICY "products_select"
  ON products FOR SELECT
  USING (true);

-- ------------------------------------------------------------
-- favorites — somente o dono pode ver, inserir e deletar
-- ------------------------------------------------------------
DROP POLICY IF EXISTS "favorites_select" ON favorites;
CREATE POLICY "favorites_select"
  ON favorites FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "favorites_insert" ON favorites;
CREATE POLICY "favorites_insert"
  ON favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "favorites_delete" ON favorites;
CREATE POLICY "favorites_delete"
  ON favorites FOR DELETE
  USING (auth.uid() = user_id);

-- ------------------------------------------------------------
-- testimonials — leitura pública, escrita autenticada
-- ------------------------------------------------------------
DROP POLICY IF EXISTS "testimonials_select" ON testimonials;
CREATE POLICY "testimonials_select"
  ON testimonials FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "testimonials_insert" ON testimonials;
CREATE POLICY "testimonials_insert"
  ON testimonials FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- ------------------------------------------------------------
-- profiles — somente o próprio usuário acessa/edita
-- ------------------------------------------------------------
DROP POLICY IF EXISTS "profiles_select" ON profiles;
CREATE POLICY "profiles_select"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_update" ON profiles;
CREATE POLICY "profiles_update"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);
