-- Script para criar as tabelas do Portfólio (Next.js + Supabase)
-- Execute este script no SQL Editor do painel do Supabase.

-------------------------------------------------
-- 1. Tabela de Projetos
-------------------------------------------------
CREATE TABLE public.projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text NOT NULL,
  content text NOT NULL, -- Insira o conteúdo em Markdown aqui
  tags text[] DEFAULT '{}'::text[],
  github_url text,
  demo_url text,
  is_featured boolean DEFAULT false
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Política: Permitir leitura pública (Qualquer um pode ver os projetos)
CREATE POLICY "Permitir leitura anonima em projetos" 
  ON public.projects FOR SELECT 
  USING (true);


-------------------------------------------------
-- 2. Tabela de Certificados
-------------------------------------------------
CREATE TABLE public.certificates (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  title text NOT NULL,
  issuer text NOT NULL,
  date date NOT NULL,
  credential_url text,
  image_url text
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Política: Permitir leitura pública 
CREATE POLICY "Permitir leitura anonima em certificados" 
  ON public.certificates FOR SELECT 
  USING (true);
