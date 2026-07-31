-- =============================================
-- Script de criação das tabelas para o formulário
-- de captura de leads - Condomínio Jardim das Gerais
-- =============================================

-- Criação da tabela principal de leads
-- Esta tabela armazenará todas as informações das pessoas que preencherem o formulário no site
CREATE TABLE IF NOT EXISTS leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY, -- Identificador único para cada lead
    nome_completo TEXT NOT NULL, -- Nome fornecido no formulário
    whatsapp TEXT NOT NULL, -- Número de WhatsApp fornecido
    email TEXT NOT NULL, -- Endereço de e-mail fornecido
    cidade TEXT, -- Cidade (opcional)
    utm_source TEXT, -- Origem da campanha (ex: facebook, google)
    utm_medium TEXT, -- Mídia da campanha (ex: cpc, social)
    utm_campaign TEXT, -- Nome da campanha de marketing
    ip_address TEXT, -- Endereço de IP do lead para segurança/rastreamento
    user_agent TEXT, -- Navegador e dispositivo utilizado
    created_at TIMESTAMPTZ DEFAULT NOW() -- Data e hora em que o formulário foi enviado
);

-- Índices para performance
-- Estes índices tornam as buscas no banco de dados mais rápidas
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_whatsapp ON leads(whatsapp);

-- Habilitar Row Level Security (Segurança em Nível de Linha)
-- Essencial para proteger os dados no Supabase e definir quem pode ver ou alterar as informações
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Política: permitir INSERT de qualquer pessoa (formulário público)
-- Permite que qualquer visitante do site (anônimo) possa enviar seus dados para o banco
CREATE POLICY "Permitir insert público" ON leads
    FOR INSERT TO anon
    WITH CHECK (true);

-- Política: apenas usuários autenticados podem ver os leads
-- Garante que apenas você, ao acessar o painel do Supabase, consiga visualizar os dados enviados
CREATE POLICY "Apenas autenticados podem ler" ON leads
    FOR SELECT TO authenticated
    USING (true);

-- Política: apenas autenticados podem atualizar
-- Apenas usuários autenticados no Supabase podem modificar os dados de um lead
CREATE POLICY "Apenas autenticados podem atualizar" ON leads
    FOR UPDATE TO authenticated
    USING (true);

-- Política: apenas autenticados podem deletar
-- Apenas usuários autenticados no Supabase podem excluir um lead da base
CREATE POLICY "Apenas autenticados podem deletar" ON leads
    FOR DELETE TO authenticated
    USING (true);
