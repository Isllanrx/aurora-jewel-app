# Aurora Joias — App Mobile

App de joalheria de luxo em **React Native + Expo**, compatível com **Expo Snack Web** e integrado ao **Supabase**.

Trabalho acadêmico — 2º Bimestre | Desenvolvimento Mobile.

---

## Tecnologias

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| Expo | SDK 51 | Runtime mobile/web |
| React Native | 0.74 | Framework UI |
| React Navigation | 6 | Stack + Drawer Navigator |
| Formik + Yup | 2 + 1 | Formulários com validação |
| Supabase | REST API | Backend: auth + banco de dados |
| React Context | — | Estado global (auth, carrinho, idioma) |

---

## 12 Telas

| # | Tela | Tipo | Funcionalidade |
|---|------|------|---------------|
| 1 | Login | Obrigatória | Formik + autenticação Supabase |
| 2 | Cadastro | Obrigatória | Formik + Yup + 5 campos validados |
| 3 | Dashboard | Obrigatória | Contagem de usuários + gráfico por categoria |
| 4 | Idioma | Obrigatória | Seletor PT/EN/ES via React Context |
| 5 | Home | Customizada | Banner hero + categorias + stats |
| 6 | Produtos | Customizada | FlatList + RNPicker (filtro por categoria) |
| 7 | Detalhe do Produto | Customizada | POST/DELETE favoritos no Supabase |
| 8 | Carrinho | Customizada | Gerenciamento de itens + checkout |
| 9 | Favoritos | Customizada | Lista de desejos do usuário |
| 10 | Depoimentos | Customizada | Avaliações dos clientes |
| 11 | Contato | Customizada | Endereço, telefone, horário |
| 12 | Perfil | Customizada | Editar dados + PATCH no Supabase |

---

## Paleta de Cores

| Token | Hex | Uso |
|-------|-----|-----|
| `primary` | `#B8860B` | Dark Gold — botões, destaques |
| `secondary` | `#DAA520` | Goldenrod — títulos, preços |
| `background` | `#0A0A0A` | Quase preto — fundo geral |
| `surface` | `#1C1C1C` | Cards, header, drawer |
| `text` | `#F5F5DC` | Cream — texto principal |

---

## Como rodar

### Opção 1 — Expo Snack (sem instalar nada)

1. Acesse **[snack.expo.dev](https://snack.expo.dev)**
2. Faça upload de todos os arquivos do projeto
3. Edite `lib/supabase.js` com suas credenciais
4. Clique em **Run** e teste no navegador ou app Expo Go

### Opção 2 — Local

```bash
npm install
# edite lib/supabase.js com suas credenciais
npx expo start
```

---

## Supabase — Configuração

1. Crie um projeto em [supabase.com](https://supabase.com)
2. Vá em **SQL Editor** e cole o conteúdo de `supabase_schema.sql`
3. Execute — criará as tabelas e o seed de produtos/depoimentos
4. Copie a **URL** e a **anon key** em **Project Settings → API**
5. Cole em `lib/supabase.js`:

```js
export const SUPABASE_URL = 'https://xxxx.supabase.co';
export const SUPABASE_API_KEY = 'eyJhbGci...';
```

---

## Estrutura do Projeto

```
App.js                    ← entry point
navigation/               ← Stack + Drawer
screens/                  ← 12 telas (index.js + styles.js cada)
components/               ← ProductCard, CartItem, TestimonialCard, CategoryBadge
contexts/                 ← AuthContext, CartContext, LanguageContext
lib/                      ← supabase.js, i18n.js, colors.js
assets/                   ← imagens PNG
supabase_schema.sql       ← SQL do banco
```

---

*Aurora Joias — Elegância e Sofisticação*
