-- ============================================================
-- Migration 001 — Criação das tabelas
-- ============================================================

-- Produtos do catálogo
CREATE TABLE IF NOT EXISTS products (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name           TEXT NOT NULL,
  price          NUMERIC(10,2) NOT NULL,
  original_price NUMERIC(10,2),
  image_url      TEXT,
  category       TEXT CHECK (category IN ('anel', 'cordao', 'relogio')),
  badge          TEXT,
  description    TEXT,
  created_at     TIMESTAMPTZ DEFAULT now()
);

-- Wishlist dos usuários
CREATE TABLE IF NOT EXISTS favorites (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID REFERENCES auth.users ON DELETE CASCADE,
  product_id UUID REFERENCES products   ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, product_id)
);

-- Depoimentos de clientes
CREATE TABLE IF NOT EXISTS testimonials (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_name  TEXT NOT NULL,
  review     TEXT NOT NULL,
  rating     INT  DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Perfis de usuários (espelha auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id         UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  name       TEXT,
  phone      TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
