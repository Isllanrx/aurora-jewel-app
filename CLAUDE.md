# CLAUDE.md | Aurora Joias — Expo React Native

## Comandos
- **Iniciar:** `npx expo start`
- **Web:** `npx expo start --web`
- **Android:** `npx expo start --android`
- **Instalar deps:** `npm install`

## Stack
- **Runtime:** Expo SDK 51 + React Native 0.74
- **Navegação:** React Navigation 6 (Stack + Drawer)
- **Formulários:** Formik 2 + Yup 1
- **Backend:** Supabase via fetch direto (sem SDK)
- **Estado global:** React Context (Auth, Cart, Language)
- **Estilo:** StyleSheet API — sem Tailwind, sem Styled Components

## Arquitetura
```
App.js                      ← entry point; providers + NavigationContainer
navigation/
  AppNavigator.js           ← Stack wrapping Drawer
  DrawerContent.js          ← Drawer customizado
screens/<NomeScreen>/
  index.js                  ← lógica + JSX
  styles.js                 ← StyleSheet.create({})
components/<NomeComp>/
  index.js + styles.js
contexts/
  AuthContext.js            ← login/register/logout via Supabase Auth API
  CartContext.js            ← carrinho de compras
  LanguageContext.js        ← i18n PT/EN/ES
lib/
  supabase.js               ← SUPABASE_URL + SUPABASE_API_KEY + helpers fetch
  i18n.js                   ← dicionários de tradução
  colors.js                 ← paleta Luxury Gold
assets/                     ← imagens .png
supabase_schema.sql         ← schema + seed para rodar no SQL Editor
```

## Credenciais Supabase
Editar **`lib/supabase.js`** linhas 7–8:
```js
export const SUPABASE_URL = 'https://SEU_PROJETO.supabase.co';
export const SUPABASE_API_KEY = 'SUA_CHAVE_ANON';
```

## Regras sempre aplicadas
- Todo componente e screen tem `index.js` + `styles.js` em diretório próprio
- Nunca usar `gap:` no StyleSheet (usar `margin`)
- Imagens sempre com `onError` fallback
- `GestureHandlerRootView` é o wrapper mais externo do App
- `import 'react-native-gesture-handler'` sempre na linha 1 do App.js
- Fetch ao Supabase sempre com `try/catch` — nunca catch vazio
- Nunca adicionar dependências sem checar `package.json`
- Nunca usar `@supabase/supabase-js` SDK (usar fetch direto)

## 12 Telas
Login, Register, Home, Products, ProductDetail, Cart, Favorites, Dashboard, Testimonials, Contact, Profile, Language
