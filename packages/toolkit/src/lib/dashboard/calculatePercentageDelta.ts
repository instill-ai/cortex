export function calculatePercentageDelta(
  previousCount: number,
  currentCount: number
): number {
  if (previousCount === 0 && currentCount === 0) {
    return 0; // Both counts are zero, return 0 as percentage change
  }
  if (previousCount === 0) {
    return currentCount; // Previous count is zero, change is currentCount
  }
  const delta = currentCount - previousCount;
  const percentageDelta = (delta / previousCount) * 100;
  return Math.round(percentageDelta);
}
