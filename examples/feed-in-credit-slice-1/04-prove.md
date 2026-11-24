# 04 Prove: a property test

Illustrative. This is what demo prompt 3 should produce on the `module-3-demo` branch of meter-platform, a fictional repo. The fix has made AC-1 pass. A property test checks the rules for inputs nobody wrote an example for.

## Prompt

```text
Add a property test with @fast-check/vitest for calculateTariff: for any usage and export, the credit is a whole number of cents, never negative and never more than the usage charge; with no export, the quote matches today's quote. Run it and report any counterexample. Do not change implementation code.
```

## The test

```ts
// packages/domain/test/calculateTariff.prop.test.ts
import { test, fc } from '@fast-check/vitest';
import { expect } from 'vitest';
import { calculateTariff } from '../src/calculateTariff';
import { aPlan, todaysQuote } from './helpers';

const exportKwh = fc.oneof(
  fc.constant(0),
  fc.integer({ min: 0, max: 1_000_000 }),
  fc.double({ min: 0, max: 1_000_000, noNaN: true, noDefaultInfinity: true }),
);
const usageKwh = fc.integer({ min: 0, max: 100_000 });

// Rule: the credit is a whole number of cents. Source: spec, "round the credit to the nearest cent".
test.prop({ usageKwh, exportKwh })('the credit is a whole number of cents', ({ usageKwh, exportKwh }) => {
  const credit = calculateTariff(aPlan(), { usageKwh, exportKwh }).credit;
  expect(Math.abs(credit * 100 - Math.round(credit * 100))).toBeLessThan(1e-6);
});

// Rule: the credit is never negative. Source: spec, AC-5.
test.prop({ usageKwh, exportKwh })('the credit is never negative', ({ usageKwh, exportKwh }) => {
  expect(calculateTariff(aPlan(), { usageKwh, exportKwh }).credit).toBeGreaterThanOrEqual(0);
});

// Rule: the credit is never more than the usage charge. Source: spec, AC-5.
test.prop({ usageKwh, exportKwh })('AC-5: the credit never exceeds the usage charge', ({ usageKwh, exportKwh }) => {
  const quote = calculateTariff(aPlan(), { usageKwh, exportKwh });
  expect(quote.credit).toBeLessThanOrEqual(quote.usageCharge);
});

// Rule: with no export, the quote matches today's quote. Source: spec, AC-2.
// todaysQuote is a fixture of quotes captured before the change, not computed by calculateTariff.
test.prop({ usageKwh })('AC-2: with no export, the quote matches today\'s quote', ({ usageKwh }) => {
  expect(calculateTariff(aPlan(), { usageKwh })).toEqual(todaysQuote(usageKwh));
});
```

## Output

```text
$ npx vitest run packages/domain

 ✓ packages/domain/test/calculateTariff.prop.test.ts > the credit is a whole number of cents (with seed=1380025724)
 ✓ packages/domain/test/calculateTariff.prop.test.ts > the credit is never negative (with seed=-446690831)
 ✓ packages/domain/test/calculateTariff.prop.test.ts > AC-5: the credit never exceeds the usage charge (with seed=922480173)
 ✓ packages/domain/test/calculateTariff.prop.test.ts > AC-2: with no export, the quote matches today's quote (with seed=-1710204492)

 Test Files  1 passed (1)
      Tests  4 passed (4)
```

Each property ran 100 times, the fast-check default. No counterexample was found. No implementation code changed.

## If a property fails

A failing property prints a counterexample, shrunk to a minimal case, and a seed. Don't loosen the property to get past it. Instead:

1. Read the counterexample and say whether it's a setup problem, a wrong expectation (a rule the spec doesn't actually state) or an implementation bug. Use [prompt 05](../../prompts/05-localise-bug.md).
2. Turn the shrunk counterexample into an example-based regression test, with the expected value written from the spec.
3. Fix the implementation with [prompt 06](../../prompts/06-smallest-fix.md), and keep the property as it was.
4. If the spec is silent on the rule, a person decides what the rule is.

You can replay a failure from its seed, as shown in the [property-test starters](../../property-tests/README.md).

Next: [05 Review and score](05-review-and-score.md).
