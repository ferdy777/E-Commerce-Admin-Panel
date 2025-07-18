export const formatNumber = (input: number, decimal?: number) => {
  if (isNaN(Number(input))) {
    return ". .";
  }
  const number = Number(input);
  return number.toLocaleString(undefined, {
    maximumFractionDigits: decimal || 0,
  });
};

export const formatCurrency = (amount: string | number) => {
  const formattedAmount = formatNumber(Math.ceil(Number(amount)));

  return `₦ ${formattedAmount}`;
};
