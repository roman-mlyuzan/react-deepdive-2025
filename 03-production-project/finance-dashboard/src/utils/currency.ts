import { useSettingsStore } from "../store/settingsStore";
import type { Currency } from "../types/currency";

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
};

export function formatCurrency(amount: number): string {
  const currency = useSettingsStore.getState().currency;
  const symbol = CURRENCY_SYMBOLS[currency];

  // JPY doesn't use decimal places
  if (currency === "JPY") {
    return `${symbol}${Math.round(amount).toLocaleString()}`;
  }

  return `${symbol}${amount.toFixed(2)}`;
}

export function getCurrencySymbol(): string {
  const currency = useSettingsStore.getState().currency;
  return CURRENCY_SYMBOLS[currency];
}
