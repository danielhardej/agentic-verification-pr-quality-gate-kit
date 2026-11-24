# 01 Red: the failing AC-1 test

Illustrative. This is what the red checkpoint looks like on the `module-3-demo` branch of meter-platform, a fictional repo.

## The test

```ts
// services/billing/routes/quote.test.ts
test('AC-1: 120 kWh at 5c/kWh shows a $6.00 credit as its own line', async () => {
  // AC-1: 120 kWh at 5c/kWh = $6.00, with an $80.00 usage charge
  const res = await postQuote({ planId: 'plan-solar-a', exportKwh: 120 });

  expect(res.status).toBe(200);
  expect(res.body.lines).toContainEqual({ type: 'feed-in-credit', amount: 6.0 });
});
```

The expected value is written from the spec. It isn't calculated with `calculateTariff`.

## Command and output

```text
$ npx vitest run services/billing

 FAIL  services/billing/routes/quote.test.ts > AC-1: 120 kWh at 5c/kWh shows a $6.00 credit as its own line
AssertionError: expected [ …(3) ] to deeply contain { type: 'feed-in-credit', amount: 6 }

- Expected
+ Received

- { "type": "feed-in-credit", "amount": 6 }
+ { "type": "feed-in-credit", "amount": 80 }

 ❯ services/billing/routes/quote.test.ts:9:30

 Test Files  1 failed (1)
      Tests  1 failed | 2 passed (3)
```

Expected 6.00, received 80.00.

## Why this is a good red

- The test runs. There's no import error and no config error.
- The failure is about the value: the credit line exists, but the amount is wrong. That is missing or wrong behaviour, not a setup problem.
- The expected value comes from AC-1.

## AC-2 and AC-5 are green

Two other tests in the file already pass:

- AC-2 (no exportKwh matches today's quote).
- AC-5 (a credit larger than the usage charge is capped at the usage charge).

The passing cap test is part of the lesson. Something is producing a credit larger than it should, and the cap is hiding how large it is: the actual amount is $80.00 only because the cap clips it. A passing AC-5 test tells you the cap works, not that the credit under it is right. See [green is not correct](../../docs/green-is-not-correct.md).

## Checkpoint

You've read the test and the failure. You agree the expected value matches AC-1. Now localise it with demo prompt 1.

Next: [02 Localise](02-localise.md).
