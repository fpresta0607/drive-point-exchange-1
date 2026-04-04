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
    <div className="mt-10 flex items-center justify-center p-6 xl:p-0">
      <div className="mx-auto w-full max-w-6xl rounded-[28px] border border-slate-200 bg-[#eef2f7] p-6 shadow-sm">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl bg-transparent p-2">
            <div className="mb-8 text-center">
              <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">
                Calculate Your Payment
              </h2>
              <p className="mt-2 text-lg text-slate-500">
                Get an instant estimate for your auto loan
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="currentMonthlyPayment" className="text-base font-semibold text-slate-700">
                  Current Monthly Payment
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="currentMonthlyPayment"
                    type="number"
                    value={values.currentMonthlyPayment}
                    onChange={(e) => updateValue("currentMonthlyPayment", Number(e.target.value))}
                    className="h-14 rounded-xl border-slate-200 bg-white text-xl"
                  />
                  <div className="hidden flex-1 md:block">
                    <Slider
                      value={[values.currentMonthlyPayment]}
                      min={100}
                      max={2500}
                      step={5}
                      onValueChange={(value) => updateValue("currentMonthlyPayment", value[0])}
                    />
                  </div>
                </div>
                <p className="text-sm text-slate-400">Principal & Interest Only</p>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="loanBalanceRemaining" className="text-base font-semibold text-slate-700">
                  Loan Balance Remaining
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="loanBalanceRemaining"
                    type="number"
                    value={values.loanBalanceRemaining}
                    onChange={(e) => updateValue("loanBalanceRemaining", Number(e.target.value))}
                    className="h-14 rounded-xl border-slate-200 bg-white text-xl"
                  />
                  <div className="hidden flex-1 md:block">
                    <Slider
                      value={[values.loanBalanceRemaining]}
                      min={1000}
                      max={100000}
                      step={500}
                      onValueChange={(value) => updateValue("loanBalanceRemaining", value[0])}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentAPR" className="text-base font-semibold text-slate-700">
                  Current APR
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="currentAPR"
                    type="number"
                    step="0.1"
                    value={values.currentAPR}
                    onChange={(e) => updateValue("currentAPR", Number(e.target.value))}
                    className="h-14 rounded-xl border-slate-200 bg-white text-xl"
                  />
                  <div className="hidden flex-1 md:block">
                    <Slider
                      value={[values.currentAPR]}
                      min={0}
                      max={25}
                      step={0.1}
                      onValueChange={(value) => updateValue("currentAPR", value[0])}
                    />
                  </div>
                </div>
                <p className="text-sm text-slate-400">Annual</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newAPR" className="text-base font-semibold text-slate-700">
                  New APR
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="newAPR"
                    type="number"
                    step="0.1"
                    value={values.newAPR}
                    onChange={(e) => updateValue("newAPR", Number(e.target.value))}
                    className="h-14 rounded-xl border-slate-200 bg-white text-xl"
                  />
                  <div className="hidden flex-1 md:block">
                    <Slider
                      value={[values.newAPR]}
                      min={0}
                      max={25}
                      step={0.1}
                      onValueChange={(value) => updateValue("newAPR", value[0])}
                    />
                  </div>
                </div>
                <p className="text-sm text-slate-400">Annual</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="remainingTermYears" className="text-base font-semibold text-slate-700">
                  Remaining Term
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="remainingTermYears"
                    type="number"
                    value={values.remainingTermYears}
                    onChange={(e) => updateValue("remainingTermYears", Number(e.target.value))}
                    className="h-14 rounded-xl border-slate-200 bg-white text-xl"
                  />
                  <div className="hidden flex-1 md:block">
                    <Slider
                      value={[values.remainingTermYears]}
                      min={1}
                      max={8}
                      step={1}
                      onValueChange={(value) => updateValue("remainingTermYears", value[0])}
                    />
                  </div>
                </div>
                <p className="text-sm text-slate-400">Years</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newTermYears" className="text-base font-semibold text-slate-700">
                  New Term
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="newTermYears"
                    type="number"
                    value={values.newTermYears}
                    onChange={(e) => updateValue("newTermYears", Number(e.target.value))}
                    className="h-14 rounded-xl border-slate-200 bg-white text-xl"
                  />
                  <div className="hidden flex-1 md:block">
                    <Slider
                      value={[values.newTermYears]}
                      min={1}
                      max={8}
                      step={1}
                      onValueChange={(value) => updateValue("newTermYears", value[0])}
                    />
                  </div>
                </div>
                <p className="text-sm text-slate-400">Years</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 border-l border-slate-200 pl-0 lg:pl-6">
            <Card className="rounded-2xl border-slate-200 bg-white shadow-sm">
              <CardContent className="space-y-6 p-8 text-center">
                <div>
                  <p className="text-lg font-semibold text-slate-600">
                    New Monthly Payment
                  </p>
                  <p className="mt-2 text-5xl font-extrabold tracking-tight text-blue-700">
                    ${results.estimatedNewPayment.toFixed(2)}
                  </p>
                </div>

                <div className="border-t border-slate-200 pt-6">
                  <p className="text-lg text-slate-500">Monthly savings</p>
                  <p className="mt-2 text-3xl font-bold text-emerald-600">
                    ${results.monthlySavings.toFixed(2)}
                  </p>
                </div>

                <div className="border-t border-slate-200 pt-6">
                  <p className="text-lg text-slate-500">Interest savings</p>
                  <p className="mt-2 text-3xl font-bold text-emerald-600">
                    +${results.interestSavings.toFixed(2)}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Button className="h-20 rounded-2xl bg-slate-900 text-xl font-bold text-white hover:bg-slate-800">
              Get My Refinance Quote
            </Button>

            <Button
              variant="secondary"
              onClick={resetCalculator}
              className="h-16 rounded-2xl bg-slate-500 text-lg font-semibold text-white hover:bg-slate-600"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset Calculator
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
