'use client';

import React from 'react';
import BreakdownRow from './BreakdownRow';
import { CTAButton } from '../ui/cta-button';

interface BreakdownRowData {
  label: string;
  amount: number;
  emphasis?: boolean;
  negative?: boolean;
}

interface SummaryCardProps {
  monthly: number;
  rows: BreakdownRowData[];
  className?: string;
  onGetQuote?: () => void;
}

export default function SummaryCard({
  monthly,
  rows,
  className = '',
  onGetQuote
}: SummaryCardProps) {
  const formatMoney = (value: number): string => {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-dpe-gray-100 ${className}`}>
      {/* Dark Header */}
      <div className="bg-dpe-navy text-white rounded-t-2xl !p-3">
        <div className="text-center">
          <p className="!text-xs font-medium !mb-1">Your estimated monthly payment</p>
          <p className="!text-2xl md:!text-3xl font-bold">
            $ {formatMoney(monthly)}
          </p>
        </div>
      </div>

      {/* White Body */}
      <div className="rounded-b-2xl !p-4 border border-dpe-gray-100 border-t-0">
        <div className="!space-y-1">
          {rows.map((row, index) => (
            <BreakdownRow
              key={index}
              label={row.label}
              amount={row.amount}
              emphasis={row.emphasis}
              negative={row.negative}
            />
          ))}
        </div>
        
        {/* Action Button */}
        <div className="mt-6">
          <CTAButton onClick={onGetQuote} variant="primary-dark" className="w-full">
            Get Quote
          </CTAButton>
        </div>
      </div>
    </div>
  );
}
