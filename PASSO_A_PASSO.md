# Passo a Passo — Colocar o App no Ar

## ⏱ Tempo estimado: ~15 minutos

---

## PARTE 1 — Supabase (banco de dados)

### Passo 1 — Criar conta e projeto
1. Acesse **[supabase.com](https://supabase.com)** → clique em **Start your project**
2. Entre com GitHub ou e-mail
3. Clique em **New project**
4. Preencha: nome `aurora-joias`, senha forte, região `South America (São Paulo)`
5. Aguarde ~2 minutos enquanto o projeto é criado

### Passo 2 — Criar as tabelas
1. No menu lateral clique em **SQL Editor**
2. Clique em **New query**
3. Abra o arquivo `supabase_schema.sql` deste projeto
4. Copie todo o conteúdo e cole no editor
5. Clique em **Run** (▶)
6. Deve aparecer "Success" — as tabelas foram criadas com os produtos e depoimentos já inseridos

### Passo 3 — Copiar as credenciais
1. No menu lateral clique em **Project Settings** → **API**
2. Copie a **Project URL** (ex: `https://abcdefgh.supabase.co`)
3. Copie a **anon public** key (começa com `eyJhbGci...`)




---

## PARTE 2 — Configurar o App

### Passo 4 — Colar as credenciais
Abra o arquivo **`lib/supabase.js`** e substitua as linhas 7 e 8:

```js
export const SUPABASE_URL = 'https://SEU_PROJETO.supabase.co';  // ← colar aqui
export const SUPABASE_API_KEY = 'eyJhbGci...';                  // ← colar aqui
```

---

## PARTE 3 — Rodar no Expo Snack (recomendado para apresentação)

### Passo 5 — Abrir o Snack
1. Acesse **[snack.expo.dev](https://snack.expo.dev)**
2. Clique em **My Snacks** → **Create a snack**

### Passo 6 — Fazer upload dos arquivos
1. No painel esquerdo do Snack, clique no ícone de pasta 📁
2. Faça upload de **todos os arquivos** do projeto mantendo a estrutura de pastas:
   - `App.js`
   - `package.json`
   - `navigation/` (2 arquivos)
   - `screens/` (12 pastas, cada uma com index.js + styles.js)
   - `components/` (4 pastas)
   - `contexts/` (3 arquivos)
   - `lib/` (3 arquivos — **incluindo o supabase.js já com suas credenciais**)
   - `assets/` (todas as imagens .png)

### Passo 7 — Testar
1. No Snack, selecione a plataforma **Web** (aba no topo)
2. Clique em **Run** → o app abre no browser
3. Para testar no celular: instale o app **Expo Go** e escaneie o QR code

---

## PARTE 4 — Rodar localmente (alternativa)

### Passo 5b — Instalar dependências
```bash
npm install
```

### Passo 6b — Iniciar
```bash
npx expo start
```
Pressione `w` para web, `a` para Android, `i` para iOS.

---

## Fluxo de teste para a apresentação

```
1. Abrir o app → tela de Login
2. Clicar em "Cadastrar" → preencher todos os campos → validar erros
3. Voltar ao Login → entrar com o usuário criado
4. Home → Ver Coleção → filtrar por categoria (RNPicker)
5. Clicar num produto → tela de detalhes → adicionar ao carrinho
6. Clicar no ❤️ → favoritar (POST no Supabase)
7. Abrir o Drawer (☰) → ir para Carrinho
8. Aumentar/diminuir quantidade → finalizar compra
9. Drawer → Dashboard → ver contagem de usuários e gráfico
10. Drawer → Idioma → trocar para English → conferir tradução
11. Drawer → Perfil → editar nome → salvar (PATCH no Supabase)
12. Drawer → Depoimentos / Contato → mostrar as telas
```

---

## Problemas comuns

| Problema | Solução |
|----------|---------|
| "Usuário ou senha incorretos" | Confirmar e-mail no link que o Supabase enviou |
| Produtos não carregam | Verificar se o SQL foi executado (Passo 2) |
| "Invalid API key" | Conferir se copiou a **anon** key (não a service_role) |
| Drawer não abre no web | Clicar no ☰ ou arrastar da esquerda |
| Imagem quebrada | Normal — o app mostra emoji como fallback |

---

**Pronto! O app está funcionando.** 🎉
