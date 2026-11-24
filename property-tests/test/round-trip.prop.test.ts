import { test, fc } from '@fast-check/vitest';
import { expect } from 'vitest';
import { fromCents, toCents } from '../src/money';

// Generate from integer cents so every value has at most two decimal places.
const cents = fc.integer({ min: -1_000_000_000, max: 1_000_000_000 });

// Round-trip rule: converting dollars to cents and back returns the same amount for any
// value with at most two decimal places. Source: money is held to the cent (spec rounding rule).
test.prop([cents])('fromCents(toCents(x)) returns x for two-decimal dollar amounts', (c) => {
  const dollars = c / 100;
  expect(fromCents(toCents(dollars))).toBe(dollars);
});

// Round-trip rule in the other direction: whole cents survive a trip through dollars.
test.prop([cents])('toCents(fromCents(c)) returns c for whole cents', (c) => {
  expect(toCents(fromCents(c))).toBe(c);
});
