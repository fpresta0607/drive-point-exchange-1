'use client';

import React from 'react';

interface BreakdownRowProps {
  label: string;
  amount: number;
  emphasis?: boolean;
  negative?: boolean;
  suffix?: string;
  className?: string;
}

export default function BreakdownRow({
  label,
  amount,
  emphasis = false,
  negative = false,
  suffix = '',
  className = ''
}: BreakdownRowProps) {
  const formatMoney = (value: number): string => {
    const absValue = Math.abs(value);
    const formatted = absValue.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return `$${formatted}`;
  };

  const displayAmount = negative ? -Math.abs(amount) : amount;
  const isNegative = displayAmount < 0;
  const sign = isNegative ? '-' : '';

  const labelClasses = emphasis
    ? "font-semibold text-dpe-gray-800"
    : "text-dpe-gray-600";
  
  const amountClasses = emphasis 
    ? "font-semibold" 
    : "";

  return (
    <div className={`!py-1 flex justify-between border-b border-dashed border-dpe-gray-200 last:border-0 ${className}`}>
      <span className={`!text-xs ${labelClasses}`}>
        {label}
      </span>
      <span className={`!text-xs tabular-nums ${amountClasses} ${isNegative ? 'text-dpe-gray-600' : ''}`}>
        {sign}{formatMoney(Math.abs(displayAmount))}
        {suffix && <span className="text-dpe-gray-500 font-normal ml-1">{suffix}</span>}
        {emphasis && !suffix && <span className="text-dpe-gray-500 font-normal">/mo</span>}
      </span>
    </div>
  );
}
