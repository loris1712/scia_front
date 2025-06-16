// utils/getQuantitySum.js
export function getQuantitySum(quantityStr) {
  if (!quantityStr) return 0;

  return quantityStr
    .split(",")
    .map(q => parseFloat(q))
    .filter(q => !isNaN(q))
    .reduce((acc, q) => acc + q, 0);
}