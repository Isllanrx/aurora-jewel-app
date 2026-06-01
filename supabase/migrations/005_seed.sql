-- ============================================================
-- Migration 005 — Dados iniciais
-- ============================================================

-- Produtos do catálogo
INSERT INTO products (name, price, original_price, category, badge, description)
VALUES
  (
    'Relógio Orient SolarTech',
    1599.00, 1999.00,
    'relogio', '-20%',
    'Tecnologia solar avançada com 5 anos de garantia. Sustentabilidade e elegância juntas.'
  ),
  (
    'Anel Pandora Signature',
    4600.00, 5800.00,
    'anel', 'Novo',
    'Anel em prata esterlina com acabamento em ouro rosé. Design icônico Pandora.'
  ),
  (
    'Cordão Swarovski Crystal',
    13765.00, 17200.00,
    'cordao', '-25%',
    'Cristais lapidados à mão com corrente banhada a ouro 18k. Peça de coleção.'
  ),
  (
    'Relógio Seiko Presage',
    3499.00, NULL,
    'relogio', NULL,
    'Movimento automático japonês de alta precisão. Mostrador esmaltado artesanal.'
  ),
  (
    'Anel Pandora Timeless',
    568.67, NULL,
    'anel', NULL,
    'Design minimalista em prata, perfeito para o dia a dia. Empilhável.'
  ),
  (
    'Cordão Vivara Gold',
    3000.00, NULL,
    'cordao', NULL,
    'Ouro 18k com certificação de autenticidade IBGM. Acabamento artesanal.'
  )
ON CONFLICT DO NOTHING;

-- Depoimentos de clientes
INSERT INTO testimonials (user_name, review, rating)
VALUES
  ('João da Silva',   'Comprei um relógio Orient e ficou incrível. Atendimento impecável e entrega rápida!', 5),
  ('Maria da Silva',  'Anel Pandora lindo! Qualidade excepcional. Com certeza vou comprar mais peças aqui.', 5),
  ('Carlos Henrique', 'Presenteei minha esposa com um cordão Swarovski. Ela amou! Embalagem luxuosa e peça perfeita.', 5),
  ('Ana Paula',       'Atendimento incrível e preços justos. Aurora Joias é minha joalheria favorita.', 5),
  ('Roberto Souza',   'Relógio Seiko com acabamento impecável. Superou todas as minhas expectativas. Recomendo muito!', 5)
ON CONFLICT DO NOTHING;
