# GEMINI.md | Aurora Joias — Expo React Native (2026)

Manifesto técnico para agentes AI operando neste repositório.

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Runtime | Expo SDK 51, React Native 0.74, React 18 |
| Navegação | React Navigation 6 — Stack + Drawer |
| Formulários | Formik 2 + Yup 1 |
| Backend | Supabase REST API + Auth API via `fetch` nativo |
| Estado | React Context (AuthContext, CartContext, LanguageContext) |
| Estilo | StyleSheet API (React Native) |
| i18n | Dicionários em `lib/i18n.js` — PT / EN / ES |

## Mandatos de desenvolvimento

- **Padrão de arquivo:** toda screen e componente tem seu próprio diretório com `index.js` + `styles.js`
- **Sem SDK nativo de terceiros:** integração Supabase é feita com `fetch` puro (ver `lib/supabase.js`)
- **Compatível com Expo Snack Web:** sem `gap:` em StyleSheet, sem `%` dinâmico em width, sempre `onError` em `<Image>`
- **Wrapper obrigatório:** `GestureHandlerRootView` como root element em `App.js`
- **Contextos:** sempre usar `useContext`/`createContext` — nunca Redux ou Zustand
- **Formulários:** sempre Formik + Yup — nunca handler manual

## Estrutura de arquivos

```
App.js                        ← GestureHandlerRootView > providers > NavigationContainer
navigation/AppNavigator.js    ← Stack(Login/Register/Main) onde Main = DrawerNavigator
navigation/DrawerContent.js   ← Drawer customizado com logo, menu, badge, logout
screens/*/index.js + styles.js
components/*/index.js + styles.js
contexts/AuthContext.js        ← authSignIn / authSignUp / authSignOut
contexts/CartContext.js        ← addToCart / removeFromCart / updateQuantity
contexts/LanguageContext.js    ← t(key) helper + changeLanguage(code)
lib/supabase.js               ← SUPABASE_URL + SUPABASE_API_KEY (editar aqui)
lib/i18n.js                   ← translations.pt / .en / .es
lib/colors.js                 ← Colors.primary (#B8860B) etc.
assets/                       ← imagens PNG (relogio, anel, cordao, logo, pics)
supabase_schema.sql           ← SQL para criar tabelas + seed no Supabase
.env                          ← referência local (não funciona no Snack)
```

## Nunca fazer

- Usar `@supabase/supabase-js` (incompatível com o padrão do projeto)
- Usar `AsyncStorage` (sessão fica em React state)
- Usar `gap:` em `StyleSheet.create` (usar `margin`)
- Usar width dinâmico com template literal `%` (usar `Dimensions.get`)
- Deixar `catch` vazio — sempre logar com `console.warn`
- Adicionar dependências sem checar `package.json`

## Endpoints Supabase utilizados

| Operação | Método | Endpoint |
|----------|--------|----------|
| Login | POST | `/auth/v1/token?grant_type=password` |
| Cadastro | POST | `/auth/v1/signup` |
| Logout | POST | `/auth/v1/logout` |
| SELECT | GET | `/rest/v1/{table}?col=eq.val&select=*` |
| INSERT | POST | `/rest/v1/{table}` |
| UPDATE | PATCH | `/rest/v1/{table}?col=eq.val` |
| DELETE | DELETE | `/rest/v1/{table}?col=eq.val` |
