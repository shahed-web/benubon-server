export function getExpiryTime(minutes: number = 15): Date {
  return new Date(Date.now() + minutes * 60 * 1000);
}