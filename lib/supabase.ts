import { createClient } from '@supabase/supabase-js';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

// Browser client for client-side operations
export const createBrowserClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
};

// Server client for API routes (with service role key for admin operations)
export const createServiceClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );
};

// Server client for server components with cookie handling
export const createServerSupabaseClient = async () => {
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
};

// Database types for type safety
export type AutoLoanLead = {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string | null;
  // Vehicle Information (kept for backward compatibility)
  vehicle_price: number | null;
  vehicle_type: string | null;
  vehicle_year: number | null;
  vehicle_category: string | null;
  down_payment: number | null;
  trade_in_value: number | null;
  // Financial Details (kept for backward compatibility)
  loan_amount: number;
  sales_tax: number | null;
  sales_tax_rate: number | null;
  interest_rate: number;
  term_months: number;
  monthly_payment: number;
  total_interest: number | null;
  total_cost: number | null;
  // Location & Credit
  state_code: string | null;
  state_name: string | null;
  credit_score_tier: string | null;
  credit_score_range: string | null;
  // Metadata
  is_manual_rate: boolean | null;
  // Refinance Fields
  current_balance: number | null;
  current_apr: number | null;
  remaining_term_months: number | null;
  new_apr: number | null;
  new_term_months: number | null;
  refi_fees: number | null;
  current_monthly_payment: number | null;
  new_monthly_payment: number | null;
  monthly_savings: number | null;
  lifetime_savings: number | null;
  current_total_interest_remaining: number | null;
  new_total_interest: number | null;
  difference_in_interest: number | null;
  is_agent: boolean | null;
  // TCPA Compliance
  sms_consent: boolean;
  sms_consent_at: string | null;
  sms_consent_source: string | null;
  promo_code: string | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at?: string;
};

export type HomeLoanLead = {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  home_price: number;
  down_payment: number;
  loan_amount: number;
  loan_term: number;
  interest_rate: number;
  property_tax: number;
  home_insurance: number;
  pmi: number;
  monthly_payment: number;
  total_interest: number;
  // Agent & TCPA Compliance
  is_agent: boolean | null;
  sms_consent: boolean;
  sms_consent_at: string | null;
  sms_consent_source: string | null;
  promo_code: string | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at?: string;
};

export type ContactLead = {
  id?: string;
  name: string;
  email: string;
  phone: string;
  loan_type: string;
  message: string;
  created_at?: string;
};

