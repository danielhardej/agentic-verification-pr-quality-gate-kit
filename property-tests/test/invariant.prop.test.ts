import { test, fc } from '@fast-check/vitest';
import { expect } from 'vitest';
import { feedInCredit } from '../src/money';

// Generators include zero, fractions and very large values. Raw doubles alone are mostly tiny,
// so they are mixed with whole and two-decimal values to keep credits big enough to hit the cap.
const exportKwh = fc.oneof(
  fc.constant(0),
  fc.integer({ min: 0, max: 1_000_000 }),
  fc.integer({ min: 0, max: 100_000_000 }).map((n) => n / 100),
  fc.double({ min: 0, max: 1_000_000, noNaN: true, noDefaultInfinity: true }),
);
const rateCentsPerKwh = fc.oneof(
  fc.constant(0),
  fc.integer({ min: 0, max: 10_000 }),
  fc.integer({ min: 0, max: 1_000_000 }).map((n) => n / 100),
  fc.double({ min: 0, max: 10_000, noNaN: true, noDefaultInfinity: true }),
);
// Bias towards realistic small charges ($0 to $100) so the cap is hit often, plus very large ones.
const usageChargeCents = fc.oneof(
  fc.integer({ min: 0, max: 10_000 }),
  fc.integer({ min: 0, max: 1_000_000_000 }),
);

// Example written from the spec, not calculated with the code under test.
// AC-1: 120 kWh at 5c/kWh = $6.00 (600 cents) with an $80.00 usage charge (8000 cents).
test('AC-1: 120 kWh at 5c/kWh gives a 600 cent credit', () => {
  expect(
    feedInCredit({ exportKwh: 120, rateCentsPerKwh: 5, usageChargeCents: 8000 }),
  ).toBe(600);
});

// Rule: the credit is never negative. Source: spec, AC-5 (a credit is a reduction, never a charge).
test.prop({ exportKwh, rateCentsPerKwh, usageChargeCents })(
  'credit is never negative',
  (input) => {
    expect(feedInCredit(input)).toBeGreaterThanOrEqual(0);
  },
);

// Rule: the credit is never more than the usage charge. Source: spec, AC-5.
test.prop({ exportKwh, rateCentsPerKwh, usageChargeCents })(
  'AC-5: credit is never above the usage charge',
  (input) => {
    expect(feedInCredit(input)).toBeLessThanOrEqual(input.usageChargeCents);
  },
);

// Rule: the credit is a whole number of cents. Source: the spec's rounding rule
// (round the credit to the nearest cent).
test.prop({ exportKwh, rateCentsPerKwh, usageChargeCents })(
  'credit is a whole number of cents',
  (input) => {
    expect(Number.isInteger(feedInCredit(input))).toBe(true);
  },
);

// Rule: no export means no credit. Source: spec, AC-2 (no exportKwh matches today's quote).
test.prop({ rateCentsPerKwh, usageChargeCents })(
  'AC-2: zero export gives zero credit',
  ({ rateCentsPerKwh, usageChargeCents }) => {
    expect(feedInCredit({ exportKwh: 0, rateCentsPerKwh, usageChargeCents })).toBe(0);
  },
);
