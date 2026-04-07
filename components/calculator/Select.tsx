'use client';

import React from 'react';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps {
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
}

export default function Select({
  label,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  className = ''
}: SelectProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    // Try to parse as number if it looks like a number
    const numericValue = Number(selectedValue);
    onChange(isNaN(numericValue) ? selectedValue : numericValue);
  };

  return (
    <div className={className}>
      <label className="block !text-xs font-medium text-dpe-gray-700 !mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={handleChange}
        className="w-full !h-8 px-3 rounded-lg border border-dpe-gray-300 focus:ring-2 focus:ring-dpe-blue focus:border-transparent !text-sm text-dpe-gray-900 bg-white"
        aria-label={label}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
