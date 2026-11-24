// Illustrative money helpers for the fictional meter-platform feed-in credit.
// All amounts are whole cents. Callers validate input at the edge (for example with zod),
// so these functions assume finite, non-negative inputs and stay pure.

/** Converts dollars to whole cents, rounded to the nearest cent. */
export function toCents(dollars: number): number {
  return Math.round(dollars * 100);
}

/** Converts whole cents to dollars. */
export function fromCents(cents: number): number {
  return cents / 100;
}

export interface FeedInCreditInput {
  /** Energy exported to the grid, in kWh. */
  exportKwh: number;
  /** Feed-in rate from the tariff plan configuration, in cents per kWh. */
  rateCentsPerKwh: number;
  /** The usage charge for the same period, in whole cents. */
  usageChargeCents: number;
}

/**
 * Feed-in credit in whole cents: exportKwh × rateCentsPerKwh, rounded to the
 * nearest cent and capped at the usage charge.
 */
export function feedInCredit({
  exportKwh,
  rateCentsPerKwh,
  usageChargeCents,
}: FeedInCreditInput): number {
  const credit = Math.round(exportKwh * rateCentsPerKwh);
  return Math.min(credit, usageChargeCents);
}
