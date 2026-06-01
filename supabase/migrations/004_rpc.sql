-- ============================================================
-- Migration 004 — RPC Functions
-- ============================================================

CREATE OR REPLACE FUNCTION public.get_user_count()
RETURNS BIGINT
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COUNT(*) FROM public.profiles;
$$;

-- Permite que usuários anônimos e autenticados chamem a função
GRANT EXECUTE ON FUNCTION public.get_user_count() TO anon, authenticated;
