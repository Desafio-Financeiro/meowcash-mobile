export const formatPercentage = (value: number, total: number) =>
  `${((value / total) * 100).toFixed(2)}%`;
