'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '../../lib/supabase';
import { motion } from 'framer-motion';
import LeadsTable, { FilterConfig } from '../../components/admin/LeadsTable';
import { AutoLoanLead, HomeLoanLead, ContactLead } from '../../lib/supabase';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

type TabType = 'auto' | 'home' | 'contact';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('auto');
  const [autoLeads, setAutoLeads] = useState<AutoLoanLead[]>([]);
  const [homeLeads, setHomeLeads] = useState<HomeLoanLead[]>([]);
  const [contactLeads, setContactLeads] = useState<ContactLead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const supabase = createBrowserClient();

  const loadLeads = useCallback(async () => {
    try {
      setIsLoading(true);
      
      console.log('Starting to load leads...');
      
      const response = await fetch('/api/admin/leads');
      
      if (!response.ok) {
        if (response.status === 401) {
          console.log('Not authenticated, redirecting to login');
          router.push('/auth/admin/login');
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      console.log('Auto leads loaded:', data.autoLeads?.length || 0, 'records');
      console.log('Home leads loaded:', data.homeLeads?.length || 0, 'records');
      console.log('Contact leads loaded:', data.contactLeads?.length || 0, 'records');
      
      setAutoLeads(data.autoLeads || []);
      setHomeLeads(data.homeLeads || []);
      setContactLeads(data.contactLeads || []);

      console.log('All leads loaded successfully');

    } catch (err) {
      console.error('Error loading leads:', err);
      setError(`Failed to load leads: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  // Use supabase for auth state check
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/auth/admin/login');
      }
    };
    checkAuth();
  }, [supabase, router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/signout', { method: 'POST' });
      window.location.href = '/auth/admin/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const autoColumns: Array<{ key: string; label: string; render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode }> = [
    { key: 'first_name', label: 'First Name' },
    { key: 'last_name', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { key: 'mobile_number', label: 'Phone' },
    { 
      key: 'current_balance', 
      label: 'Current Balance',
      render: (value: unknown) => typeof value === 'number' ? formatCurrency(value) : 'N/A'
    },
    { 
      key: 'current_apr', 
      label: 'Current APR',
      render: (value: unknown) => typeof value === 'number' ? `${value.toFixed(2)}%` : 'N/A'
    },
    { 
      key: 'remaining_term_months', 
      label: 'Current Term',
      render: (value: unknown) => typeof value === 'number' ? `${Math.round(value / 12)} yrs` : 'N/A'
    },
    { 
      key: 'current_monthly_payment', 
      label: 'Current Payment',
      render: (value: unknown) => typeof value === 'number' ? formatCurrency(value) : 'N/A'
    },
    { 
      key: 'new_apr', 
      label: 'New APR',
      render: (value: unknown) => typeof value === 'number' ? `${value.toFixed(2)}%` : 'N/A'
    },
    { 
      key: 'new_term_months', 
      label: 'New Term',
      render: (value: unknown) => typeof value === 'number' ? `${Math.round(value / 12)} yrs` : 'N/A'
    },
    { 
      key: 'new_monthly_payment', 
      label: 'New Payment',
      render: (value: unknown) => typeof value === 'number' ? formatCurrency(value) : 'N/A'
    },
    { 
      key: 'monthly_savings', 
      label: 'Monthly Savings',
      render: (value: unknown) => typeof value === 'number' ? (
        <span className={value > 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
          {formatCurrency(value)}
        </span>
      ) : 'N/A'
    },
    { 
      key: 'difference_in_interest', 
      label: 'Interest Savings',
      render: (value: unknown) => typeof value === 'number' ? (
        <span className={value > 0 ? 'text-green-600 font-semibold' : value < 0 ? 'text-red-600 font-semibold' : 'text-gray-600'}>
          {value > 0 ? '+' : ''}{formatCurrency(value)}
        </span>
      ) : 'N/A'
    },
    { 
      key: 'is_agent', 
      label: 'Agent',
      render: (value: unknown) => value === true ? '✓ Agent' : ''
    },
    { 
      key: 'created_at', 
      label: 'Date',
      render: (value: unknown) => typeof value === 'string' ? formatDate(value) : ''
    },
  ];

  const homeColumns: Array<{ key: string; label: string; render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode }> = [
    { key: 'first_name', label: 'First Name' },
    { key: 'last_name', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { key: 'mobile_number', label: 'Phone' },
    { 
      key: 'home_price', 
      label: 'Home Price',
      render: (value: unknown) => typeof value === 'number' ? formatCurrency(value) : ''
    },
    { 
      key: 'down_payment', 
      label: 'Down Payment',
      render: (value: unknown) => typeof value === 'number' ? formatCurrency(value) : ''
    },
    { 
      key: 'loan_amount', 
      label: 'Loan Amount',
      render: (value: unknown) => typeof value === 'number' ? formatCurrency(value) : ''
    },
    { 
      key: 'interest_rate', 
      label: 'Interest Rate',
      render: (value: unknown) => typeof value === 'number' ? `${value}%` : ''
    },
    { key: 'loan_term', label: 'Term (Years)' },
    { 
      key: 'monthly_payment', 
      label: 'Monthly Payment',
      render: (value: unknown) => typeof value === 'number' ? formatCurrency(value) : ''
    },
    { 
      key: 'created_at', 
      label: 'Date',
      render: (value: unknown) => typeof value === 'string' ? formatDate(value) : ''
    },
  ];

  const contactColumns: Array<{ key: string; label: string; render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode }> = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'loan_type', label: 'Service Interest' },
    { 
      key: 'message', 
      label: 'Message',
      render: (value: unknown) => typeof value === 'string' ? (value.length > 50 ? `${value.substring(0, 50)}...` : value) : ''
    },
    { 
      key: 'created_at', 
      label: 'Date',
      render: (value: unknown) => typeof value === 'string' ? formatDate(value) : ''
    },
  ];

  const getCurrentData = () => {
    switch (activeTab) {
      case 'auto': return autoLeads;
      case 'home': return homeLeads;
      case 'contact': return contactLeads;
      default: return [];
    }
  };

  const getCurrentColumns = () => {
    switch (activeTab) {
      case 'auto': return autoColumns;
      case 'home': return homeColumns;
      case 'contact': return contactColumns;
      default: return [];
    }
  };

  const getCurrentFilters = (): FilterConfig[] => {
    switch (activeTab) {
      case 'auto': 
        return [
          {
            key: 'is_agent',
            label: 'Agent Status',
            type: 'boolean'
          }
        ];
      case 'home': 
        return [];
      case 'contact': 
        return [];
      default: return [];
    }
  };

  const getTotalCount = () => {
    return autoLeads.length + homeLeads.length + contactLeads.length;
  };

  const handleExport = () => {
    const currentData = getCurrentData();
    const currentColumns = getCurrentColumns();
    
    if (currentData.length === 0) {
      alert('No data to export');
      return;
    }

    // Create CSV headers
    const headers = currentColumns.map(col => col.label).join(',');
    
    // Create CSV rows
    const rows = currentData.map(row => 
      currentColumns.map(col => {
        let value = (row as Record<string, unknown>)[col.key];
        
        // Handle rendered values (like formatted currency, dates, etc.)
        // For CSV export, we'll use the raw value
        
        // Format values appropriately
        if (value === null || value === undefined) {
          value = '';
        } else if (typeof value === 'number') {
          value = value.toString();
        } else if (typeof value === 'boolean') {
          value = value ? 'Yes' : 'No';
        } else if (typeof value === 'object' && (value as Record<string, unknown>).created_at) {
          // Handle date objects
          value = new Date((value as Record<string, unknown>).created_at as string).toLocaleDateString();
        }
        
        // Escape commas and quotes in CSV
        const escapedValue = String(value).replace(/"/g, '""');
        return `"${escapedValue}"`;
      }).join(',')
    );

    // Combine headers and rows
    const csvContent = [headers, ...rows].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${activeTab}_leads_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading leads...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        className="bg-white shadow-sm border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Drive Point Exchange Lead Management</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{getTotalCount()}</div>
                <div className="text-sm text-gray-600">Total Leads</div>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={staggerChildren}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div variants={fadeInUp} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Auto Refinance Leads</p>
                <p className="text-2xl font-semibold text-gray-900">{autoLeads.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Home Loan Leads</p>
                <p className="text-2xl font-semibold text-gray-900">{homeLeads.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Contact Leads</p>
                <p className="text-2xl font-semibold text-gray-900">{contactLeads.length}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <motion.div variants={fadeInUp} className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              {[
                { id: 'auto', label: 'Auto Refinance Leads', count: autoLeads.length },
                { id: 'home', label: 'Home Loan Leads', count: homeLeads.length },
                { id: 'contact', label: 'Contact Leads', count: contactLeads.length },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-700'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>

          {/* Table */}
          <div className="p-6">
            <LeadsTable
              data={getCurrentData()}
              columns={getCurrentColumns()}
              searchPlaceholder={`Search ${activeTab} leads...`}
              onExport={handleExport}
              filters={getCurrentFilters()}
            />
          </div>
        </motion.div>
      </motion.div>

      {error && (
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
    </div>
  );
}
