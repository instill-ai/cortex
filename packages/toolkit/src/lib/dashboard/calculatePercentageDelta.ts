export function calculatePercentageDelta(
  previousCount: number,
  currentCount: number
): number {
  if (previousCount === 0 && currentCount === 0) {
    return 0; // Both counts are zero, return 0 as percentage change
  }
  if (previousCount === 0) {
    return currentCount * 100; // Previous count is zero, change is currentCount * 100
  }
  if (currentCount === 0) {
    return previousCount * -100; // Current count is zero, change is previousCount * -100
  }
  const delta = currentCount - previousCount;
  const percentageDelta = (delta / previousCount) * 100;
  return Math.round(percentageDelta);
}
