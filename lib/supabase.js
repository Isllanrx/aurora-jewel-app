// ============================================================
// lib/supabase.js — Aurora Joias
// Integração Supabase via fetch (compatível com Expo Snack Web)
// ============================================================

// === CONFIGURE AQUI ===
export const SUPABASE_URL = 'https://bebuzflitiyuevumwwpi.supabase.co';
export const SUPABASE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlYnV6ZmxpdGl5dWV2dW13d3BpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxODE2MjksImV4cCI6MjA5NTc1NzYyOX0.Xzm5N5khVnAZ7XfgkhpyvskssmpZMTIyvhmH7E1KGW4';

// ============================================================
// Headers internos
// ============================================================
function headers(token = null) {
  return {
    'apikey': SUPABASE_API_KEY,
    'Authorization': `Bearer ${token ?? SUPABASE_API_KEY}`,
    'Content-Type': 'application/json',
  };
}

// ============================================================
// AUTH — Supabase Auth API
// ============================================================

/** Cadastra um novo usuário */
export async function authSignUp(email, password, metadata = {}) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ email, password, data: metadata }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.msg || data.error_description || 'Erro no cadastro');
  return data;
}

/** Faz login e retorna { access_token, user, ... } */
export async function authSignIn(email, password) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.msg || data.error_description || 'E-mail ou senha incorretos');
  return data;
}

/** Faz logout invalidando o token */
export async function authSignOut(token) {
  await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
    method: 'POST',
    headers: headers(token),
  });
}

// ============================================================
// DATABASE — Supabase REST API
// ============================================================

/**
 * GET — lê registros de uma tabela
 * @param {string} table  — nome da tabela
 * @param {object} filter — ex: { user_id: 'eq.UUID', category: 'eq.relogio' }
 * @param {string} token  — access_token (opcional para tabelas públicas)
 */
export async function dbSelect(table, filter = {}, token = null) {
  const query = Object.entries(filter)
    .map(([k, v]) => `${k}=${v}`)
    .join('&');
  const url = `${SUPABASE_URL}/rest/v1/${table}?${query}&select=*`;

  const res = await fetch(url, { headers: headers(token) });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Erro ao buscar dados');
  return Array.isArray(data) ? data : [];
}

/**
 * POST — insere um registro
 * @param {string} table  — nome da tabela
 * @param {object} body   — dados a inserir
 * @param {string} token  — access_token
 */
export async function dbInsert(table, body, token = null) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: { ...headers(token), 'Prefer': 'return=representation' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Erro ao inserir');
  return data;
}

/**
 * PATCH — atualiza registros que atendem ao filtro
 * @param {string} table  — nome da tabela
 * @param {object} filter — ex: { id: 'UUID' } → vira ?id=eq.UUID
 * @param {object} body   — campos a atualizar
 * @param {string} token  — access_token
 */
export async function dbUpdate(table, filter, body, token = null) {
  const query = Object.entries(filter)
    .map(([k, v]) => `${k}=eq.${v}`)
    .join('&');
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${query}`, {
    method: 'PATCH',
    headers: { ...headers(token), 'Prefer': 'return=representation' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Erro ao atualizar');
  return data;
}

/**
 * RPC — chama uma função PostgreSQL via /rest/v1/rpc/:fn
 * @param {string} fn     — nome da função
 * @param {object} args   — argumentos (opcional)
 * @param {string} token  — access_token (opcional)
 */
export async function dbRpc(fn, args = {}, token = null) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers: headers(token),
    body: JSON.stringify(args),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || `Erro ao chamar RPC ${fn}`);
  return data;
}

/**
 * DELETE — remove registros que atendem ao filtro
 * @param {string} table  — nome da tabela
 * @param {object} filter — ex: { id: 'UUID' }
 * @param {string} token  — access_token
 */
export async function dbDelete(table, filter, token = null) {
  const query = Object.entries(filter)
    .map(([k, v]) => `${k}=eq.${v}`)
    .join('&');
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${query}`, {
    method: 'DELETE',
    headers: headers(token),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Erro ao deletar');
  }
}
