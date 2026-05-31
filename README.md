# Aurora Joias

App mobile de joalheria construído com React Native + Expo, compatível com Expo Snack Web e integrado ao Supabase. Projeto acadêmico — 2º Bimestre | Desenvolvimento Mobile.

---

## Tech Stack

| Camada | Tecnologia |
|---|---|
| Runtime | Expo SDK 51 + React Native 0.74 |
| Navegação | React Navigation 6 — Stack + Drawer customizado |
| Formulários | React Hook Form 7 |
| Backend | Supabase REST API + Auth API via `fetch` (sem SDK) |
| Estado | React Context — Auth, Cart, Language |
| i18n | PT / EN / ES |

---

## 12 Telas

| # | Tela | Tipo | Funcionalidade principal |
|---|---|---|---|
| 1 | Login | Obrigatória | Autenticação via Supabase Auth |
| 2 | Register | Obrigatória | Cadastro com validação (React Hook Form) |
| 3 | Dashboard | Obrigatória | Total de usuários (RPC) + produtos por categoria |
| 4 | Language | Obrigatória | Seletor PT/EN/ES via React Context |
| 5 | Home | Custom | Banner, categorias, atalhos de navegação |
| 6 | Products | Custom | FlatList + RNPicker (filtro por categoria) |
| 7 | Product Detail | Custom | Toggle favorito com POST/DELETE no Supabase |
| 8 | Cart | Custom | Quantidade, total e checkout (CartContext) |
| 9 | Favorites | Custom | Wishlist carregada do Supabase |
| 10 | Testimonials | Custom | Depoimentos carregados do Supabase |
| 11 | Contact | Custom | Endereço, telefones e horários |
| 12 | Profile | Custom | Edição de dados com PATCH no Supabase |

---

## Rodar no Expo Snack

1. Acesse [snack.expo.dev](https://snack.expo.dev) → **Create a snack**
2. Faça upload de todos os arquivos (exceto `assets/` — imagens são servidas via GitHub URL)
3. Selecione a plataforma **Web** → **Run**

> Siga o `PASSO_A_PASSO.md` para configurar o Supabase antes de rodar.

## Rodar localmente

```bash
npm install --legacy-peer-deps
npx expo start
```

---

## Supabase Setup

1. Crie um projeto em [supabase.com](https://supabase.com)
2. Execute `supabase_schema.sql` no SQL Editor (cria tabelas, RLS, RPC e seed)
3. **Authentication → Providers → Email → desmarcar "Confirm email"** (obrigatório para demo)
4. Cole URL e anon key em `lib/supabase.js` linhas 7–8

---

## Banco de Dados

| Tabela | Descrição |
|---|---|
| `products` | Catálogo — name, price, category, badge, description |
| `favorites` | Wishlist — user_id + product_id (RLS: somente o dono) |
| `testimonials` | Depoimentos — leitura pública |
| `profiles` | Dados do usuário — criado automaticamente via trigger |

RLS ativo em todas as tabelas. `products` e `testimonials` têm leitura pública. Demais operações exigem token autenticado.

---

## Time

- Isllan Toso Pereira
- (integrante 2)
- (integrante 3)

*Aurora Joias — Projeto Acadêmico, 2026*
