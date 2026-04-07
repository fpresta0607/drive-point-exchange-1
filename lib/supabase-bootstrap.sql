-- =====================================================
-- Drive Point Exchange — Full Database Bootstrap
-- =====================================================
-- Run this script in the Supabase SQL Editor to create
-- all tables, indexes, views, and RLS policies from scratch.
-- This replaces all previous migration files for a fresh DB.
-- =====================================================


-- =====================================================
-- 1. AUTO LOAN LEADS
-- =====================================================

CREATE TABLE auto_loan_leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

    -- Contact
    first_name TEXT NOT NULL,
    last_name  TEXT NOT NULL,
    email      TEXT NOT NULL,
    mobile_number TEXT,

    -- Vehicle
    vehicle_price    NUMERIC,
    vehicle_type     TEXT,
    vehicle_year     INTEGER,
    vehicle_category TEXT,
    down_payment     NUMERIC DEFAULT 0,
    trade_in_value   NUMERIC DEFAULT 0,

    -- Financial
    loan_amount    NUMERIC NOT NULL,
    sales_tax      NUMERIC,
    sales_tax_rate NUMERIC,
    interest_rate  NUMERIC NOT NULL,
    term_months    INTEGER NOT NULL,
    monthly_payment NUMERIC NOT NULL,
    total_interest  NUMERIC,
    total_cost      NUMERIC,

    -- Location & Credit
    state_code        TEXT,
    state_name        TEXT,
    credit_score_tier  TEXT,
    credit_score_range TEXT,

    -- Refinance
    current_balance                NUMERIC,
    current_apr                    NUMERIC,
    remaining_term_months          INTEGER,
    new_apr                        NUMERIC,
    new_term_months                INTEGER,
    refi_fees                      NUMERIC DEFAULT 0,
    current_monthly_payment        NUMERIC,
    new_monthly_payment            NUMERIC,
    monthly_savings                NUMERIC,
    lifetime_savings               NUMERIC,
    current_total_interest_remaining NUMERIC,
    new_total_interest             NUMERIC,
    difference_in_interest         NUMERIC,

    -- Metadata & Compliance
    is_manual_rate     BOOLEAN DEFAULT FALSE,
    is_agent           BOOLEAN DEFAULT FALSE,
    sms_consent        BOOLEAN DEFAULT FALSE,
    sms_consent_at     TIMESTAMPTZ,
    sms_consent_source VARCHAR(100),
    promo_code         TEXT,
    ip_address         TEXT,
    user_agent         TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    -- Constraints
    CONSTRAINT check_credit_score_tier
        CHECK (credit_score_tier IN ('excellent','veryGood','good','fair','poor') OR credit_score_tier IS NULL),
    CONSTRAINT check_vehicle_category
        CHECK (vehicle_category IN ('sedan','suv','truck','luxury','sports','ev') OR vehicle_category IS NULL),
    CONSTRAINT check_vehicle_year
        CHECK ((vehicle_year >= 1990 AND vehicle_year <= EXTRACT(YEAR FROM NOW()) + 1) OR vehicle_year IS NULL)
);


-- =====================================================
-- 2. HOME LOAN LEADS
-- =====================================================

CREATE TABLE home_loan_leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

    -- Contact
    first_name TEXT NOT NULL,
    last_name  TEXT NOT NULL,
    email      TEXT NOT NULL,
    mobile_number TEXT,

    -- Loan Details
    home_price     NUMERIC NOT NULL,
    down_payment   NUMERIC NOT NULL,
    loan_amount    NUMERIC NOT NULL,
    loan_term      INTEGER NOT NULL,
    interest_rate  NUMERIC NOT NULL,
    property_tax   NUMERIC NOT NULL,
    home_insurance NUMERIC NOT NULL,
    pmi            NUMERIC NOT NULL,
    monthly_payment NUMERIC NOT NULL,
    total_interest  NUMERIC NOT NULL,

    -- Compliance
    is_agent           BOOLEAN DEFAULT FALSE,
    sms_consent        BOOLEAN DEFAULT FALSE,
    sms_consent_at     TIMESTAMPTZ,
    sms_consent_source VARCHAR(100),
    promo_code         TEXT,
    ip_address         TEXT,
    user_agent         TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- =====================================================
-- 3. CONTACT LEADS
-- =====================================================

CREATE TABLE contact_leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name      TEXT NOT NULL,
    email     TEXT NOT NULL,
    phone     TEXT,
    loan_type TEXT,
    message   TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- =====================================================
-- 4. SOCIAL POSTS
-- =====================================================

CREATE TABLE social_posts (
    id        TEXT PRIMARY KEY,
    platform  TEXT NOT NULL CHECK (platform IN ('instagram','facebook','tiktok','youtube')),
    url       TEXT NOT NULL,
    thumbnail TEXT,
    caption   TEXT,
    embed_html TEXT,
    posted_at  TIMESTAMPTZ,
    fetched_at TIMESTAMPTZ DEFAULT NOW()
);


-- =====================================================
-- 5. ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE auto_loan_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_loan_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_leads   ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_posts    ENABLE ROW LEVEL SECURITY;

-- Lead tables: authenticated users can read, service role has full access
CREATE POLICY "Authenticated users can read auto_loan_leads"
    ON auto_loan_leads FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Service role full access auto_loan_leads"
    ON auto_loan_leads FOR ALL
    USING (auth.role() = 'service_role');

CREATE POLICY "Authenticated users can read home_loan_leads"
    ON home_loan_leads FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Service role full access home_loan_leads"
    ON home_loan_leads FOR ALL
    USING (auth.role() = 'service_role');

CREATE POLICY "Authenticated users can read contact_leads"
    ON contact_leads FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Service role full access contact_leads"
    ON contact_leads FOR ALL
    USING (auth.role() = 'service_role');

-- Social posts: public read access (no auth needed for feed)
CREATE POLICY "Public read access"
    ON social_posts FOR SELECT
    USING (true);


-- =====================================================
-- 6. INDEXES
-- =====================================================

-- auto_loan_leads
CREATE INDEX idx_auto_loan_leads_email              ON auto_loan_leads(email);
CREATE INDEX idx_auto_loan_leads_created_at          ON auto_loan_leads(created_at);
CREATE INDEX idx_auto_loan_leads_state_code          ON auto_loan_leads(state_code);
CREATE INDEX idx_auto_loan_leads_credit_score_tier   ON auto_loan_leads(credit_score_tier);
CREATE INDEX idx_auto_loan_leads_vehicle_category    ON auto_loan_leads(vehicle_category);
CREATE INDEX idx_auto_loan_leads_vehicle_year        ON auto_loan_leads(vehicle_year);
CREATE INDEX idx_auto_loan_leads_vehicle_price       ON auto_loan_leads(vehicle_price);
CREATE INDEX idx_auto_loan_leads_current_apr         ON auto_loan_leads(current_apr);
CREATE INDEX idx_auto_loan_leads_new_apr             ON auto_loan_leads(new_apr);
CREATE INDEX idx_auto_loan_leads_monthly_savings     ON auto_loan_leads(monthly_savings);
CREATE INDEX idx_auto_loan_leads_current_balance     ON auto_loan_leads(current_balance);
CREATE INDEX idx_auto_loan_leads_promo_code          ON auto_loan_leads(promo_code) WHERE promo_code IS NOT NULL;

-- home_loan_leads
CREATE INDEX idx_home_loan_leads_email      ON home_loan_leads(email);
CREATE INDEX idx_home_loan_leads_created_at ON home_loan_leads(created_at);
CREATE INDEX idx_home_loan_leads_promo_code ON home_loan_leads(promo_code) WHERE promo_code IS NOT NULL;

-- contact_leads
CREATE INDEX idx_contact_leads_email      ON contact_leads(email);
CREATE INDEX idx_contact_leads_created_at ON contact_leads(created_at);


-- =====================================================
-- 7. VIEWS
-- =====================================================

-- Enhanced auto loan leads view with calculated fields
CREATE OR REPLACE VIEW auto_loan_leads_enhanced AS
SELECT
    id,
    first_name,
    last_name,
    email,
    mobile_number,
    vehicle_price,
    vehicle_type,
    vehicle_year,
    vehicle_category,
    down_payment,
    trade_in_value,
    loan_amount,
    sales_tax,
    sales_tax_rate,
    interest_rate,
    term_months,
    monthly_payment,
    total_interest,
    total_cost,
    state_code,
    state_name,
    credit_score_tier,
    credit_score_range,
    is_manual_rate,
    created_at,
    CASE
        WHEN vehicle_price > 0 THEN ROUND((down_payment / vehicle_price) * 100, 2)
        ELSE 0
    END AS down_payment_percentage,
    CASE
        WHEN vehicle_price > 0 THEN ROUND((loan_amount / vehicle_price) * 100, 2)
        ELSE 0
    END AS loan_to_value_ratio,
    EXTRACT(YEAR FROM AGE(NOW(), created_at)) * 12
        + EXTRACT(MONTH FROM AGE(NOW(), created_at)) AS months_old
FROM auto_loan_leads
ORDER BY created_at DESC;

ALTER VIEW auto_loan_leads_enhanced SET (security_invoker = on);

-- Summary statistics view for dashboard analytics (last 30 days)
CREATE OR REPLACE VIEW auto_loan_leads_summary AS
SELECT
    COUNT(*)              AS total_leads,
    COUNT(DISTINCT email) AS unique_customers,
    AVG(vehicle_price)    AS avg_vehicle_price,
    AVG(monthly_payment)  AS avg_monthly_payment,
    AVG(interest_rate)    AS avg_interest_rate,
    AVG(term_months)      AS avg_term_months,
    COUNT(CASE WHEN credit_score_tier = 'excellent' THEN 1 END) AS excellent_credit_count,
    COUNT(CASE WHEN credit_score_tier = 'veryGood'  THEN 1 END) AS very_good_credit_count,
    COUNT(CASE WHEN credit_score_tier = 'good'      THEN 1 END) AS good_credit_count,
    COUNT(CASE WHEN credit_score_tier = 'fair'      THEN 1 END) AS fair_credit_count,
    COUNT(CASE WHEN credit_score_tier = 'poor'      THEN 1 END) AS poor_credit_count,
    COUNT(CASE WHEN vehicle_type = 'new'  THEN 1 END) AS new_vehicle_count,
    COUNT(CASE WHEN vehicle_type = 'used' THEN 1 END) AS used_vehicle_count,
    state_code,
    COUNT(*) AS leads_by_state
FROM auto_loan_leads
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY state_code
ORDER BY leads_by_state DESC;

ALTER VIEW auto_loan_leads_summary SET (security_invoker = on);


-- =====================================================
-- 8. VERIFICATION — run these after bootstrap
-- =====================================================

-- Confirm all tables exist
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('auto_loan_leads','home_loan_leads','contact_leads','social_posts')
ORDER BY table_name;

-- Confirm RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('auto_loan_leads','home_loan_leads','contact_leads','social_posts');

-- Confirm all RLS policies
SELECT tablename, policyname, cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- Confirm all indexes
SELECT tablename, indexname
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename IN ('auto_loan_leads','home_loan_leads','contact_leads')
ORDER BY tablename, indexname;

-- Confirm views
SELECT viewname
FROM pg_views
WHERE schemaname = 'public'
  AND viewname IN ('auto_loan_leads_enhanced','auto_loan_leads_summary');
