import { getCurrentYear } from "@/utils/getCurrentDate";

export const periods = [
  { label: "Hoje", value: "today" },
  { label: "Últimos 7 dias", value: "last_7_days" },
  { label: "Últimos 30 dias", value: "last_30_days" },
  { label: `Esse ano ${getCurrentYear()}`, value: "this_year" },
  { label: "Personalizado", value: "custom" },
];
