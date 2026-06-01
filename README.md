# Aurora Joias

App mobile de joalheria de luxo construído com **Expo SDK 54 + React Native 0.76**, integrado ao Supabase e com suporte a PT / EN / ES.
Projeto acadêmico — 2º Bimestre | Desenvolvimento Mobile.

---

## Tech Stack

| Camada        | Tecnologia                                                      |
| ------------- | --------------------------------------------------------------- |
| Runtime       | Expo SDK 54 + React Native 0.76.7                               |
| Navegação     | React Navigation 7 — Stack + Drawer customizado                 |
| Formulários   | React Hook Form 7 (`useForm` + `Controller`)                    |
| Backend       | Supabase REST + Auth API via `fetch` (sem SDK)                  |
| Estado global | React Context — `AuthContext`, `CartContext`, `LanguageContext` |
| i18n          | PT / EN / ES via `LanguageContext` + `lib/i18n.js` (110+ chaves)|
| Ícones        | `@expo/vector-icons` v15 — Ionicons                             |
| Filtros       | `@react-native-picker/picker` (nativo) + Modal (web/Snack)      |

---

## 12 Telas

| #   | Tela          | Tipo        | Funcionalidade principal                                           |
| --- | ------------- | ----------- | ------------------------------------------------------------------ |
| 1   | Login         | Obrigatória | Autenticação Supabase, erro amigável, botão de idioma              |
| 2   | Register      | Obrigatória | Cadastro com 5 campos validados (React Hook Form), botão de idioma |
| 3   | Dashboard     | Obrigatória | Total de usuários (RPC) + produtos por categoria com barras        |
| 4   | Language      | Obrigatória | Seletor PT / EN / ES via LanguageContext                           |
| 5   | Home          | Custom      | Hero, stats, categorias com navegação filtrada                     |
| 6   | Products      | Custom      | RNPicker nativo + Modal web + FlatList (filtro por categoria)      |
| 7   | ProductDetail | Custom      | Detalhe, toggle favorito (POST/DELETE Supabase), AddToCart         |
| 8   | Cart          | Custom      | Lista com CartItem, total e checkout via CartContext               |
| 9   | Favorites     | Custom      | Wishlist carregada do Supabase com useEffect                       |
| 10  | Testimonials  | Custom      | Depoimentos do Supabase via TestimonialCard                        |
| 11  | Contact       | Custom      | Endereço, telefones e horários de funcionamento                    |
| 12  | Profile       | Custom      | Edição de dados pessoais (PATCH no Supabase)                       |

---

## Fluxo de Navegação

```mermaid
flowchart TD
    Login([Login]) -->|login ok| Main
    Login -->|cadastrar| Register([Register])
    Register -->|voltar| Login

    Main --> Home
    Main --> Products
    Main --> Cart
    Main --> Favorites
    Main --> Dashboard
    Main --> Testimonials
    Main --> Contact
    Main --> Profile
    Main --> Language

    Home -->|clica categoria| Products
    Products -->|seleciona produto| ProductDetail
    Favorites -->|seleciona produto| ProductDetail
    ProductDetail -->|adicionar ao carrinho| Cart

    subgraph Main [Drawer Navigator]
        Home
        Products
        Cart
        Favorites
        Dashboard
        Testimonials
        Contact
        Profile
        Language
        ProductDetail
    end
```

---

## Esquema do Banco de Dados

```mermaid
erDiagram
    auth_users {
        uuid id PK
        text email
    }
    profiles {
        uuid id PK
        text name
        text phone
        timestamptz created_at
    }
    products {
        uuid id PK
        text name
        numeric price
        numeric original_price
        text image_url
        text category
        text badge
        text description
        timestamptz created_at
    }
    favorites {
        uuid id PK
        uuid user_id FK
        uuid product_id FK
        timestamptz created_at
    }
    testimonials {
        uuid id PK
        text user_name
        text review
        int rating
        timestamptz created_at
    }

    auth_users ||--|| profiles    : "1:1 via trigger"
    auth_users ||--o{ favorites   : "tem"
    products   ||--o{ favorites   : "salvo em"
```

---

## Arquitetura do App

```mermaid
graph TD
    AppJS["App.js\n(GestureHandlerRootView)"]

    AppJS --> LP[LanguageProvider]
    LP --> AP[AuthProvider]
    AP --> CP[CartProvider]
    CP --> NC[NavigationContainer]
    NC --> AN[AppNavigator\nStack]

    AN --> LS[LoginScreen]
    AN --> RS[RegisterScreen]
    AN --> MD[MainDrawer\nDrawer Navigator]

    MD --> DC[DrawerContent\nCustomizado]
    MD --> HS[HomeScreen]
    MD --> PS[ProductsScreen\nPicker nativo + Modal web]
    MD --> PDS[ProductDetailScreen]
    MD --> CS[CartScreen]
    MD --> FS[FavoritesScreen]
    MD --> DS[DashboardScreen]
    MD --> TS[TestimonialsScreen]
    MD --> COS[ContactScreen]
    MD --> PRS[ProfileScreen]
    MD --> LGS[LanguageScreen]

    subgraph Contexts
        AC[AuthContext\ncreateContext]
        CC[CartContext\ncreateContext]
        LC[LanguageContext\ncreateContext]
    end

    subgraph Lib
        SB[supabase.js\ndbSelect / dbInsert\ndbDelete / dbRpc]
        I18N[i18n.js\nPT / EN / ES]
        CLR[colors.js\nLuxury Gold]
    end
```

---

## Como Rodar

### Localmente

```bash
npm install --legacy-peer-deps
npx expo start          # QR code para Expo Go
npx expo start --web    # versão web no navegador
npx expo start --android
```

### Expo Snack (recomendado para demo)

1. Acesse [snack.expo.dev](https://snack.expo.dev)
2. Clique em `...` → **Import git repository**
3. Preencha:
   - **Repository URL:** `https://github.com/Isllanrx/aurora-jewel-app`
   - **Folder path:** *(deixar vazio)*
   - **Branch:** `main`
4. Aguarde o import e selecione **Web** como plataforma

---

## Configuração do Supabase

O projeto já vem com credenciais configuradas em `lib/supabase.js` (anon key pública, protegida por RLS).

Para usar seu próprio projeto Supabase:

1. Crie um projeto em [supabase.com](https://supabase.com)
2. Em **Authentication → Providers → Email** → desmarque **"Confirm email"**
3. Execute as migrations locais em ordem no **SQL Editor**:
   - `supabase/migrations/001_tables.sql`
   - `supabase/migrations/002_triggers.sql`
   - `supabase/migrations/003_rls.sql`
   - `supabase/migrations/004_rpc.sql`
   - `supabase/migrations/005_seed.sql`
4. Substitua em `lib/supabase.js`:

```js
export const SUPABASE_URL     = 'https://SEU_PROJETO.supabase.co';
export const SUPABASE_API_KEY = 'SUA_CHAVE_ANON';
```

> As migrations existem localmente mas não são rastreadas no git (arquivos `.sql` causam falha no import do Expo Snack).

---

## Banco de Dados

| Tabela         | Acesso                        | Descrição                                           |
| -------------- | ----------------------------- | --------------------------------------------------- |
| `products`     | Leitura pública               | Catálogo — name, price, category, badge, description |
| `favorites`    | Autenticado (RLS por user_id) | Wishlist — user_id + product_id                     |
| `testimonials` | Leitura pública               | Depoimentos — user_name, rating, review             |
| `profiles`     | Autenticado (RLS por id)      | Dados do usuário — criado via trigger no signup     |

---

## Design

Tema: **Dark + Luxury Gold**

| Token        | Hex       | Uso                                        |
| ------------ | --------- | ------------------------------------------ |
| `primary`    | `#B8860B` | Botões, bordas ativas, barras do dashboard |
| `secondary`  | `#DAA520` | Títulos, ícones, links                     |
| `background` | `#0A0A0A` | Fundo de todas as telas                    |
| `surface`    | `#1C1C1C` | Headers, drawer, surface cards             |
| `card`       | `#242424` | Inputs, picker, product cards              |
| `text`       | `#F5F5DC` | Texto principal                            |
| `textMuted`  | `#A0A0A0` | Labels, placeholders                       |

---

## Componentes Reutilizáveis

| Componente        | Usado em                        | Detalhe                            |
| ----------------- | ------------------------------- | ---------------------------------- |
| `ProductCard`     | ProductsScreen, FavoritesScreen | Usa CartContext + LanguageContext   |
| `CartItem`        | CartScreen                      | Usa CartContext + LanguageContext   |
| `TestimonialCard` | TestimonialsScreen              | Avatar com fallback de iniciais    |
| `CategoryBadge`   | ProductDetailScreen             | Usa LanguageContext para traduzir  |

---

## Time

- ISLLAN TOSO PEREIRA
- MARCELO PASSAMAI MARQUES
- STEFANO SILVESTRI


_Aurora Joias — Projeto Acadêmico 2026_
