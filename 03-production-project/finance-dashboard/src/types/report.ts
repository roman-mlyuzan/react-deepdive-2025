export const ReportPeriod = {
  MONTH: "month",
  YEAR: "year",
  ALL: "all",
} as const;
export type ReportPeriodType = (typeof ReportPeriod)[keyof typeof ReportPeriod];
