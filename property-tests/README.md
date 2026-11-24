# Property-test starters

This is a small, runnable TypeScript project that shows three property-test patterns with fast-check and Vitest. Use it as a starting point when you want an agent, or yourself, to test rules that should hold for every input, not just the examples you thought of.

The code is illustrative. The feed-in credit comes from the fictional meter-platform sample repo used across this kit. See [prompts/07-property-test.md](../prompts/07-property-test.md) for the prompt that asks an agent to write properties like these.

## Requirements

- Node `^22.12.0 || ^24.0.0 || >=26.0.0`. Vitest 5 needs Node 22.12 or later, and this project's `package.json` sets the same range in `engines`.
- `vitest` 5.1, `fast-check` 4.10, `@fast-check/vitest` 0.5 and `typescript` 5.9.

The [@fast-check/vitest README](https://github.com/dubzzz/fast-check/tree/main/packages/vitest) has a version table. Its newest row is 0.4 (Vitest `^4.1.0 || ^5.0.0`, fast-check `^3.0.0 || ^4.0.0`). The 0.5.0 package on npm declares the same peer ranges.

## Run it

```bash
npm install
npm test
```

`npm test` runs `vitest run`. There is also `npm run typecheck`, which runs `tsc --noEmit`.

To add the libraries to your own project, run `npm install --save-dev fast-check @fast-check/vitest`.

## What's here

| File | What it holds |
| --- | --- |
| [src/money.ts](src/money.ts) | `toCents`, `fromCents` and `feedInCredit`. Integer cents, rounded to the nearest cent, capped at the usage charge. |
| [test/invariant.prop.test.ts](test/invariant.prop.test.ts) | Invariants, plus one example written from the spec. |
| [test/metamorphic.prop.test.ts](test/metamorphic.prop.test.ts) | Relations between runs. |
| [test/round-trip.prop.test.ts](test/round-trip.prop.test.ts) | Convert and convert back. |

## The three patterns

| Pattern | The question it asks | Use it for |
| --- | --- | --- |
| Invariant | What is always true of the output, whatever the input? | Caps and limits (never above the usage charge), signs (never negative), rounding (always whole cents), zero cases. |
| Metamorphic | If I change the input in a known way, how may the output change? | Monotonic rules (more export never gives less credit), unit conversions, anything where you can't say the exact answer but can say the direction. |
| Round-trip | Do I get back what I started with? | Money to cents and back, dates, parsing and serialising. |

Good places to look in your own code: money, rounding, caps, unit conversions, dates, and parsing and serialising.

One or two good properties per domain function is plenty. Name the rule each property checks and say where the rule comes from, as the comments in these tests do. Keep an example test, written from the spec, next to the properties: AC-1 here, where 120 kWh at 5c/kWh is $6.00, or 600 cents.

The properties don't replace example tests. In this project, a bug that treats the rate as dollars is caught only by the example test, not by a property. See the next section.

## Break it on purpose

Do this once so you have seen a property fail before you rely on one. You only edit `src/money.ts`. Never edit a test to make it pass.

### Experiment 1: treat the rate as dollars

In `feedInCredit`, change the credit line to:

```ts
const credit = Math.round(exportKwh * rateCentsPerKwh * 100);
```

Run `npm test`. The AC-1 example fails and the properties still pass:

```text
 FAIL  test/invariant.prop.test.ts > AC-1: 120 kWh at 5c/kWh gives a 600 cent credit
AssertionError: expected 8000 to be 600 // Object.is equality
```

120 × 5 × 100 = 60,000 cents ($600.00), but the cap clips the credit to the $80.00 usage charge, so the result is 8,000. Every invariant still holds, because the cap hides the bug. This is why the example test with a value from the spec stays in the suite.

Revert the change before you go on.

### Experiment 2: remove the cap

Change the end of `feedInCredit` to:

```ts
const credit = Math.round(exportKwh * rateCentsPerKwh);
return credit;
```

Run `npm test`. The "credit is never above the usage charge" property fails. A real run looked like this (your seed and path will differ):

```text
 FAIL  test/invariant.prop.test.ts > AC-5: credit is never above the usage charge (with seed=1904023845)
Error: Property failed after 5 tests
{ seed: 1904023845, path: "4:1:0:0:1:1:...:2:2:3", endOnFailure: true }
Counterexample: [{"exportKwh":0.01,"rateCentsPerKwh":50,"usageChargeCents":0}]
Shrunk 51 time(s)

Caused by: AssertionError: expected 1 to be less than or equal to 0
```

Revert the change when you've finished.

### How to read a failure

- **Counterexample.** The failing input. A single, small, readable input is what you want.
- **Shrunk N time(s).** fast-check started from a large failing input and kept simplifying it. Here it ended at 0.01 kWh at 50c/kWh with a $0.00 usage charge: the smallest case that breaks the cap.
- **seed.** A number that reproduces the run. The `path` shows which shrunk case it ended on.
- **Each property runs 100 times by default.** A bug that only shows for rare inputs can slip past a run. Raw `fc.double` values are mostly tiny, so a cap may rarely be reached. These tests mix whole, two-decimal and raw values and include small usage charges, so the cap is hit often. If a property never fails on a bug you plant, strengthen the generator, not the assertion.

### Replay a failure from its seed

Pass the seed (and the path, if you want the exact shrunk case) as the second argument of `test.prop`:

```ts
test.prop({ exportKwh, rateCentsPerKwh, usageChargeCents }, { seed: 1904023845 })(
  'AC-5: credit is never above the usage charge',
  (input) => {
    expect(feedInCredit(input)).toBeLessThanOrEqual(input.usageChargeCents);
  },
);
```

Once you've fixed the bug, copy the shrunk counterexample into an example-based regression test (here: 0.01 kWh at 50c/kWh with a $0.00 usage charge gives 0 cents), then remove the seed.

## Notes for adapting it

- `test.prop` accepts generators in record notation (`{ a: fc.integer() }`) or tuple notation (`[fc.integer()]`).
- Money is in integer cents. Generate from integer cents when you want values with at most two decimal places, as the round-trip test does.
- `feedInCredit` assumes inputs are finite and non-negative, because validation happens at the edge (zod in meter-platform). Test that validation where it lives.
- Use `@fast-check/vitest`, not a second test runner. See [.github/instructions/tests.instructions.md](../.github/instructions/tests.instructions.md).
- If a property fails, report the counterexample first. Don't loosen the property.

Reference: [Property-based testing with Vitest](https://fast-check.dev/docs/tutorials/setting-up-your-test-environment/property-based-testing-with-vitest/) in the fast-check docs.
