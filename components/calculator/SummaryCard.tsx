'use client';

import React from 'react';
import BreakdownRow from './BreakdownRow';

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
    <div className={`bg-white rounded-2xl shadow-lg border border-slate-100 ${className}`}>
      {/* Dark Header */}
      <div className="bg-slate-800 text-white rounded-t-2xl !p-3">
        <div className="text-center">
          <p className="!text-xs font-medium !mb-1">Your estimated monthly payment</p>
          <p className="!text-2xl md:!text-3xl font-bold">
            $ {formatMoney(monthly)}
          </p>
        </div>
      </div>

      {/* White Body */}
      <div className="rounded-b-2xl !p-4 border border-slate-100 border-t-0">
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
          <button 
            onClick={onGetQuote}
            className="w-full h-12 bg-dpe-blue-500 hover:bg-dpe-blue-600 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Get Quote
          </button>
        </div>
      </div>
    </div>
  );
}
