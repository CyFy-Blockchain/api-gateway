/**
 * Converts a given number of days to milliseconds.
 *
 * This function calculates the number of milliseconds for any number of days.
 * It is useful for time-related calculations and conversions.
 *
 * @param days The number of days to convert to milliseconds.
 * @returns The number of milliseconds in the specified number of days.
 */
export const daysToMilliseconds = (days: number): number => {
  return days * 24 * 60 * 60 * 1000;
};
