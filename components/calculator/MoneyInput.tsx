'use client';

import React, { useState, useEffect } from 'react';

interface MoneyInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  placeholder?: string;
  className?: string;
}

function formatCurrency(amount: number): string {
  if (amount === 0) return '';
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export default function MoneyInput({
  label,
  value,
  onChange,
  min = 0,
  max,
  placeholder = '0',
  className = ''
}: MoneyInputProps) {
  const [displayValue, setDisplayValue] = useState(formatCurrency(value));

  useEffect(() => {
    setDisplayValue(formatCurrency(value));
  }, [value]);

  function parseCurrency(value: string): number | null {
    const cleaned = value.replace(/[^0-9]/g, '');
    return cleaned ? parseInt(cleaned, 10) : null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numericValue = parseCurrency(inputValue);

    if (numericValue === null) {
      setDisplayValue('');
      onChange(0);
      return;
    }

    // Clamp to max only while typing - min is enforced on blur
    let clampedValue = numericValue;
    if (max !== undefined && numericValue > max) {
      clampedValue = max;
    }

    onChange(clampedValue);
    setDisplayValue(formatCurrency(clampedValue));
  };

  const handleBlur = () => {
    setDisplayValue(formatCurrency(value));
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-dpe-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dpe-gray-500 font-medium">
          $
        </span>
        <input
          type="text"
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="w-full h-10 pl-8 pr-4 rounded-lg border border-dpe-gray-300 focus:ring-2 focus:ring-dpe-blue focus:border-transparent text-dpe-gray-900 placeholder-dpe-gray-400"
          aria-label={label}
        />
      </div>
    </div>
  );
}
