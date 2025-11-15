import type { TransactionCategory } from "./transaction";

export const ReportPeriod = {
  MONTH: "month",
  YEAR: "year",
  ALL: "all",
} as const;
export type ReportPeriodType = (typeof ReportPeriod)[keyof typeof ReportPeriod];

export type GroupedExpensesReportEntry = Record<
  TransactionCategory,
  {
    amount: number;
    count: number;
  }
>;
