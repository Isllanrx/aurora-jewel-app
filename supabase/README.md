# Supabase — Aurora Joias

Instruções para configurar o banco de dados do projeto.

## Pré-requisitos

1. Conta em [supabase.com](https://supabase.com) (gratuita)
2. Projeto Supabase criado

## Configuração obrigatória no Supabase Dashboard

Antes de executar as migrations:

**Authentication → Providers → Email**
- Desmarque **"Confirm email"** → permite login imediato sem verificação de e-mail (necessário para demo/desenvolvimento)

## Executar as Migrations

Acesse **SQL Editor** no seu projeto Supabase e execute os arquivos na ordem:

| Arquivo | O que faz |
|---------|-----------|
| `001_tables.sql` | Cria as 4 tabelas: `products`, `favorites`, `testimonials`, `profiles` |
| `002_triggers.sql` | Trigger que cria o perfil automaticamente ao cadastrar usuário |
| `003_rls.sql` | Habilita RLS e cria as policies de acesso |
| `004_rpc.sql` | Função `get_user_count()` usada no Dashboard |
| `005_seed.sql` | Insere os 6 produtos e 5 depoimentos iniciais |

> Execute um arquivo por vez e verifique se não há erros antes de prosseguir.

## Configurar as credenciais no App

Após criar o projeto Supabase, copie a **URL** e a **anon key** em:

**Settings → API → Project URL** e **anon public**

Cole em `lib/supabase.js` linhas 7–8:

```js
export const SUPABASE_URL     = 'https://SEU_PROJETO.supabase.co';
export const SUPABASE_API_KEY = 'SUA_CHAVE_ANON';
```

> A anon key é pública por design — ela não concede acesso administrativo.
> A segurança dos dados é garantida pelas policies RLS da migration 003.

## Esquema do Banco

```
auth.users (gerenciado pelo Supabase)
    │
    ├──< favorites (user_id FK)
    │       └──> products (product_id FK)
    │
    └──── profiles (id FK, 1:1)

products (leitura pública)
testimonials (leitura pública)
```

## Tabelas

| Tabela | Acesso | Colunas principais |
|--------|--------|--------------------|
| `products` | Público (leitura) | name, price, original_price, category, badge, description |
| `favorites` | Usuário (RLS) | user_id, product_id |
| `testimonials` | Público (leitura) | user_name, review, rating |
| `profiles` | Usuário (RLS) | name, phone |
