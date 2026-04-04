"use client";

import * as React from "react";
import { useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { RotateCcw } from "lucide-react";

type LoanInputs = {
  currentMonthlyPayment: number;
  loanBalanceRemaining: number;
  currentAPR: number;
  newAPR: number;
  remainingTermYears: number;
  newTermYears: number;
};

const defaultValues: LoanInputs = {
  currentMonthlyPayment: 740,
  loanBalanceRemaining: 30000,
  currentAPR: 8.5,
  newAPR: 4.5,
  remainingTermYears: 4,
  newTermYears: 4,
};

function calculateMonthlyPayment(principal: number, annualRate: number, years: number) {
  const monthlyRate = annualRate / 100 / 12;
  const months = years * 12;

  if (months <= 0) return 0;
  if (monthlyRate === 0) return principal / months;

  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1)
  );
}

function calculateTotalPaid(monthlyPayment: number, years: number) {
  return monthlyPayment * years * 12;
}

function calculateInterest(totalPaid: number, principal: number) {
  return totalPaid - principal;
}

export function AutoLoanRefinanceCalculator() {
  const [values, setValues] = useState<LoanInputs>(defaultValues);

  const updateValue = <K extends keyof LoanInputs>(key: K, value: LoanInputs[K]) => {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const results = useMemo(() => {
    const estimatedNewPayment = calculateMonthlyPayment(
      values.loanBalanceRemaining,
      values.newAPR,
      values.newTermYears
    );

    const currentTotalPaid = calculateTotalPaid(
      values.currentMonthlyPayment,
      values.remainingTermYears
    );

    const newTotalPaid = calculateTotalPaid(
      estimatedNewPayment,
      values.newTermYears
    );

    const currentInterest = calculateInterest(
      currentTotalPaid,
      values.loanBalanceRemaining
    );

    const newInterest = calculateInterest(
      newTotalPaid,
      values.loanBalanceRemaining
    );

    const monthlySavings = values.currentMonthlyPayment - estimatedNewPayment;
    const interestSavings = currentInterest - newInterest;

    return {
      estimatedNewPayment,
      monthlySavings,
      interestSavings,
    };
  }, [values]);

  const resetCalculator = () => {
    setValues(defaultValues);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="mx-auto w-full max-w-6xl">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-white/95 backdrop-blur-xl rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] border border-white/60 p-6 md:px-10 z-10 relative">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
              Calculate Your Payment
            </h2>
            <p className="mt-1 text-sm text-slate-500 font-medium">
              Get an instant estimate for your auto loan
            </p>
          </div>
          <Button className="h-12 md:h-14 rounded-xl bg-dpe-green text-white font-bold px-8 shadow-lg hover:-translate-y-0.5 transition-transform text-base md:text-lg whitespace-nowrap border-none">
            Get My Refinance Quote
          </Button>
        </div>

        {/* Sliders and output body */}
        <div className="bg-white/85 backdrop-blur-xl rounded-b-3xl shadow-2xl border border-white/60 border-t-0 p-6 sm:p-10 relative z-0">
          <div className="grid gap-6 lg:gap-10 lg:grid-cols-[1.2fr_0.8fr] items-stretch">
            <div className="flex flex-col bg-transparent h-full min-h-[350px]">
              <div className="flex flex-1 min-h-0 justify-between sm:justify-center gap-2 sm:gap-6 md:gap-10 lg:gap-14 w-full mt-2 mb-2">
                <div className="flex flex-col items-center gap-3 h-full">
                  <Slider
                    value={[values.currentMonthlyPayment]}
                    min={100}
                    max={2500}
                    step={5}
                    onValueChange={(value) => updateValue("currentMonthlyPayment", value[0])}
                    orientation="vertical"
                    className="flex-1 min-h-0"
                    aria-label="Current Monthly Payment"
                    showTooltip
                    tooltipContent={(val) => `$${val}`}
                  />
                  <div className="flex flex-col items-center h-16 justify-start">
                    <div className="flex items-center justify-center">
                      <span className="text-xs sm:text-sm font-extrabold text-slate-800">$</span>
                      <input
                        type="number"
                        value={values.currentMonthlyPayment}
                        onChange={(e) => updateValue("currentMonthlyPayment", Number(e.target.value))}
                        className="w-10 sm:w-12 text-center text-xs sm:text-sm font-extrabold text-slate-800 bg-transparent border-0 border-b border-transparent hover:border-slate-300 focus:border-slate-500 rounded-none focus:ring-0 p-0 m-0 [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                    <Label className="flex flex-col items-center text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                      <span>PAYMENT</span>
                    </Label>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3 h-full">
                  <Slider
                    value={[values.loanBalanceRemaining]}
                    min={1000}
                    max={100000}
                    step={100}
                    onValueChange={(value) => updateValue("loanBalanceRemaining", value[0])}
                    orientation="vertical"
                    className="flex-1 min-h-0"
                    aria-label="Loan Balance Remaining"
                    showTooltip
                    tooltipContent={(val) => `$${val.toLocaleString()}`}
                  />
                  <div className="flex flex-col items-center h-16 justify-start">
                    <div className="flex items-center justify-center">
                      <span className="text-xs sm:text-sm font-extrabold text-slate-800">$</span>
                      <input
                        type="number"
                        value={values.loanBalanceRemaining}
                        onChange={(e) => updateValue("loanBalanceRemaining", Number(e.target.value))}
                        className="w-14 sm:w-16 text-center text-xs sm:text-sm font-extrabold text-slate-800 bg-transparent border-0 border-b border-transparent hover:border-slate-300 focus:border-slate-500 rounded-none focus:ring-0 p-0 m-0 [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                    <Label className="flex flex-col items-center text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                      <span>REMAINING</span>
                    </Label>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3 h-full">
                  <Slider
                    value={[values.currentAPR]}
                    min={0}
                    max={25}
                    step={0.1}
                    onValueChange={(value) => updateValue("currentAPR", value[0])}
                    orientation="vertical"
                    className="flex-1 min-h-0"
                    aria-label="Current APR"
                    showTooltip
                    tooltipContent={(val) => `${val}%`}
                  />
                  <div className="flex flex-col items-center h-16 justify-start">
                    <div className="flex items-center justify-center">
                      <input
                        type="number"
                        value={values.currentAPR}
                        onChange={(e) => updateValue("currentAPR", Number(e.target.value))}
                        className="w-8 sm:w-10 text-center text-xs sm:text-sm font-extrabold text-slate-800 bg-transparent border-0 border-b border-transparent hover:border-slate-300 focus:border-slate-500 rounded-none focus:ring-0 p-0 m-0 [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="text-xs sm:text-sm font-extrabold text-slate-800">%</span>
                    </div>
                    <Label className="flex flex-col items-center text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                      <span>CURRENT</span>
                      <span>APR</span>
                    </Label>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3 h-full">
                  <Slider
                    value={[values.newAPR]}
                    min={0}
                    max={25}
                    step={0.1}
                    onValueChange={(value) => updateValue("newAPR", value[0])}
                    orientation="vertical"
                    className="flex-1 min-h-0"
                    aria-label="New APR"
                    showTooltip
                    tooltipContent={(val) => `${val}%`}
                  />
                  <div className="flex flex-col items-center h-16 justify-start">
                    <div className="flex items-center justify-center">
                      <input
                        type="number"
                        value={values.newAPR}
                        onChange={(e) => updateValue("newAPR", Number(e.target.value))}
                        className="w-8 sm:w-10 text-center text-xs sm:text-sm font-extrabold text-slate-800 bg-transparent border-0 border-b border-transparent hover:border-slate-300 focus:border-slate-500 rounded-none focus:ring-0 p-0 m-0 [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="text-xs sm:text-sm font-extrabold text-slate-800">%</span>
                    </div>
                    <Label className="flex flex-col items-center text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                      <span>NEW</span>
                      <span>APR</span>
                    </Label>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3 h-full">
                  <Slider
                    value={[values.remainingTermYears]}
                    min={1}
                    max={8}
                    step={1}
                    onValueChange={(value) => updateValue("remainingTermYears", value[0])}
                    orientation="vertical"
                    className="flex-1 min-h-0"
                    aria-label="Remaining Term"
                    showTooltip
                    tooltipContent={(val) => `${val} YRS`}
                  />
                  <div className="flex flex-col items-center h-16 justify-start">
                    <div className="flex items-center justify-center">
                      <input
                        type="number"
                        value={values.remainingTermYears}
                        onChange={(e) => updateValue("remainingTermYears", Number(e.target.value))}
                        className="w-8 sm:w-10 text-center text-xs sm:text-sm font-extrabold text-slate-800 bg-transparent border-0 border-b border-transparent hover:border-slate-300 focus:border-slate-500 rounded-none focus:ring-0 p-0 m-0 [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                    <Label className="flex flex-col items-center text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                      <span>CURRENT</span>
                      <span>TERM</span>
                    </Label>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3 h-full">
                  <Slider
                    value={[values.newTermYears]}
                    min={1}
                    max={8}
                    step={1}
                    onValueChange={(value) => updateValue("newTermYears", value[0])}
                    orientation="vertical"
                    className="flex-1 min-h-0"
                    aria-label="New Term"
                    showTooltip
                    tooltipContent={(val) => `${val} YRS`}
                  />
                  <div className="flex flex-col items-center h-16 justify-start">
                    <div className="flex items-center justify-center">
                      <input
                        type="number"
                        value={values.newTermYears}
                        onChange={(e) => updateValue("newTermYears", Number(e.target.value))}
                        className="w-8 sm:w-10 text-center text-xs sm:text-sm font-extrabold text-slate-800 bg-transparent border-0 border-b border-transparent hover:border-slate-300 focus:border-slate-500 rounded-none focus:ring-0 p-0 m-0 [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                    <Label className="flex flex-col items-center text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                      <span>NEW</span>
                      <span>TERM</span>
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-4 lg:pl-6 lg:border-l lg:border-slate-200">
              <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col justify-center">
                <CardContent className="space-y-4 lg:space-y-6 pt-6 pb-6 px-4 lg:p-8 text-center">
                  <div>
                    <p className="text-sm lg:text-lg font-semibold text-slate-600">
                      New Monthly Payment
                    </p>
                    <p className="mt-1 lg:mt-2 text-4xl lg:text-5xl font-extrabold tracking-tight text-blue-700">
                      ${results.estimatedNewPayment.toFixed(2)}
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-4 lg:pt-6">
                    <p className="text-sm lg:text-lg text-slate-500">Monthly savings</p>
                    <p className="mt-1 lg:mt-2 text-2xl lg:text-3xl font-bold text-emerald-600">
                      ${results.monthlySavings.toFixed(2)}
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-4 lg:pt-6">
                    <p className="text-sm lg:text-lg text-slate-500">Interest savings</p>
                    <p className="mt-1 lg:mt-2 text-2xl lg:text-3xl font-bold text-emerald-600">
                      +${results.interestSavings.toFixed(2)}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Button
                variant="secondary"
                onClick={resetCalculator}
                className="h-12 lg:h-14 rounded-2xl bg-slate-100/50 text-base font-semibold text-slate-600 hover:bg-slate-200 w-full transition-transform hover:-translate-y-0.5"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset Calculator
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
