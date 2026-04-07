-- =====================================================
-- Drive Point Exchange - Promo Code Migration
-- =====================================================
-- Adds promo_code column to auto_loan_leads and home_loan_leads
-- Run this in your Supabase SQL Editor

-- =====================================================
-- 1. ADD PROMO CODE COLUMN TO LEAD TABLES
-- =====================================================

ALTER TABLE auto_loan_leads
ADD COLUMN IF NOT EXISTS promo_code TEXT;

ALTER TABLE home_loan_leads
ADD COLUMN IF NOT EXISTS promo_code TEXT;

-- =====================================================
-- 2. CREATE INDEX FOR PROMO CODE LOOKUPS
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_auto_loan_leads_promo_code ON auto_loan_leads(promo_code)
WHERE promo_code IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_home_loan_leads_promo_code ON home_loan_leads(promo_code)
WHERE promo_code IS NOT NULL;

-- =====================================================
-- 3. VERIFICATION
-- =====================================================

SELECT table_name, column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
  AND column_name = 'promo_code'
  AND table_name IN ('auto_loan_leads', 'home_loan_leads')
ORDER BY table_name;
