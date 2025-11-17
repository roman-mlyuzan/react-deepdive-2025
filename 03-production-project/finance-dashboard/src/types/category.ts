export interface CategoryData {
  category: string;
  amount: number;
  count: number;
  percentage: number;
}

export interface CategoryEntry {
  category: string;
  amount: number;
  [key: string]: string | number;
}
