-- ThriveGuard Supabase Schema
-- Run this in your Supabase SQL Editor

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- USERS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_id TEXT UNIQUE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  savings_score INTEGER DEFAULT 0 CHECK (savings_score BETWEEN 0 AND 100),
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'elite')),
  monthly_income DECIMAL(12, 2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own data" ON public.users
  FOR SELECT USING (auth.uid()::text = clerk_id);
CREATE POLICY "Users can update own data" ON public.users
  FOR UPDATE USING (auth.uid()::text = clerk_id);

-- ============================================================
-- EXPENSES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.expenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  merchant TEXT NOT NULL,
  category TEXT NOT NULL,
  -- Encrypted amount stored as text (AES-256 via pgcrypto)
  amount_encrypted TEXT NOT NULL,
  amount_hint DECIMAL(12, 2), -- approximate for analytics, not sensitive
  transaction_date DATE NOT NULL,
  type TEXT DEFAULT 'debit' CHECK (type IN ('debit', 'credit')),
  ai_tip TEXT,
  source TEXT DEFAULT 'manual' CHECK (source IN ('manual', 'csv', 'plaid')),
  plaid_transaction_id TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own expenses" ON public.expenses
  FOR ALL USING (
    user_id IN (SELECT id FROM public.users WHERE clerk_id = auth.uid()::text)
  );

CREATE INDEX idx_expenses_user_date ON public.expenses(user_id, transaction_date DESC);
CREATE INDEX idx_expenses_category ON public.expenses(user_id, category);

-- ============================================================
-- BILLS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.bills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  due_date DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'negotiating', 'success')),
  negotiation_status TEXT DEFAULT 'idle' CHECK (negotiation_status IN ('idle', 'sent', 'success', 'failed')),
  negotiation_letter TEXT, -- stored encrypted
  potential_saving DECIMAL(12, 2) DEFAULT 0,
  actual_saving DECIMAL(12, 2) DEFAULT 0,
  negotiable BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.bills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own bills" ON public.bills
  FOR ALL USING (
    user_id IN (SELECT id FROM public.users WHERE clerk_id = auth.uid()::text)
  );

-- ============================================================
-- DEALS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.deals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  discount_text TEXT,
  estimated_saving DECIMAL(12, 2) DEFAULT 0,
  partner_url TEXT,
  expires_at DATE,
  logo_emoji TEXT,
  badge TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User-deal applications
CREATE TABLE IF NOT EXISTS public.user_deals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  deal_id UUID REFERENCES public.deals(id) ON DELETE CASCADE NOT NULL,
  applied_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'applied' CHECK (status IN ('applied', 'active', 'expired')),
  UNIQUE(user_id, deal_id)
);

ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Deals are publicly readable" ON public.deals FOR SELECT USING (is_active = TRUE);

ALTER TABLE public.user_deals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own deal applications" ON public.user_deals
  FOR ALL USING (
    user_id IN (SELECT id FROM public.users WHERE clerk_id = auth.uid()::text)
  );

-- ============================================================
-- SAVINGS SNAPSHOTS (for charts)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.savings_snapshots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  month DATE NOT NULL, -- first day of month
  savings_amount DECIMAL(12, 2) DEFAULT 0,
  income DECIMAL(12, 2) DEFAULT 0,
  expenses DECIMAL(12, 2) DEFAULT 0,
  net_worth DECIMAL(12, 2) DEFAULT 0,
  inflation_adjusted_net_worth DECIMAL(12, 2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, month)
);

ALTER TABLE public.savings_snapshots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own snapshots" ON public.savings_snapshots
  FOR ALL USING (
    user_id IN (SELECT id FROM public.users WHERE clerk_id = auth.uid()::text)
  );

-- ============================================================
-- HELPER FUNCTION: Encrypt sensitive data with AES-256
-- ============================================================
-- Usage: SELECT encrypt_value('secret', 'your-32-char-key');
CREATE OR REPLACE FUNCTION encrypt_value(plaintext TEXT, key TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN encode(
    pgp_sym_encrypt(plaintext, key),
    'base64'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION decrypt_value(ciphertext TEXT, key TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN pgp_sym_decrypt(
    decode(ciphertext, 'base64'),
    key
  );
EXCEPTION WHEN OTHERS THEN
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- SEED DEALS (public data, no encryption needed)
-- ============================================================
INSERT INTO public.deals (title, category, discount_text, estimated_saving, logo_emoji, badge, expires_at) VALUES
  ('Aldi Weekly Savings', 'Groceries', 'Up to 40% off vs Whole Foods', 120, '🛒', 'Hot', '2026-04-30'),
  ('Mint Mobile - $30/mo Plan', 'Phone', 'Save $65/mo vs Verizon', 65, '📱', 'Best Value', '2026-06-30'),
  ('Lemonade Renters Insurance', 'Insurance', 'Starting at $5/mo', 45, '🏡', 'New', '2026-05-31'),
  ('GreenPower Energy Plan', 'Utilities', '19% cheaper than avg', 34, '🌱', 'Eco', '2026-04-30'),
  ('Costco Membership', 'Groceries', '$65/yr saves avg $600', 535, '🏪', 'Top Pick', '2026-12-31'),
  ('Amazon Prime Annual', 'Shopping', 'Pay yearly - save $40', 40, '📦', 'Limited', '2026-03-31')
ON CONFLICT DO NOTHING;
