import { test, fc } from '@fast-check/vitest';
import { expect } from 'vitest';
import { feedInCredit } from '../src/money';

// Same mixed generators as invariant.prop.test.ts: whole, two-decimal and raw double values.
const kwh = fc.oneof(
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

// Metamorphic relation: change the input in a known way and check how the output may change.
// Rule: exporting more never gives less credit, up to the cap (the cap itself is monotonic).
// Source: the spec's credit = export × rate, capped at the usage charge (AC-1, AC-5).
test.prop({ a: kwh, b: kwh, rateCentsPerKwh, usageChargeCents })(
  'more export never gives less credit',
  ({ a, b, rateCentsPerKwh, usageChargeCents }) => {
    const [low, high] = a <= b ? [a, b] : [b, a];
    const lowCredit = feedInCredit({ exportKwh: low, rateCentsPerKwh, usageChargeCents });
    const highCredit = feedInCredit({ exportKwh: high, rateCentsPerKwh, usageChargeCents });
    expect(highCredit).toBeGreaterThanOrEqual(lowCredit);
  },
);

// Rule: raising the usage charge never lowers the credit. Source: AC-5 (the usage charge
// is only a ceiling on the credit).
test.prop({
  exportKwh: kwh,
  rateCentsPerKwh,
  charge: usageChargeCents,
  extra: fc.integer({ min: 0, max: 1_000_000 }),
})(
  'raising the usage charge never lowers the credit',
  ({ exportKwh, rateCentsPerKwh, charge, extra }) => {
    const before = feedInCredit({ exportKwh, rateCentsPerKwh, usageChargeCents: charge });
    const after = feedInCredit({
      exportKwh,
      rateCentsPerKwh,
      usageChargeCents: charge + extra,
    });
    expect(after).toBeGreaterThanOrEqual(before);
  },
);
