# Green is not correct

A green build tells you the tests passed. It doesn't tell you the tests were any good. Use this page to spot three patterns that give you a green suite without proving the behaviour: mirror tests, weakened tests and shallow tests.

All three examples use the feed-in credit from the fictional meter-platform repo: AC-1 says 120 kWh at 5c/kWh shows a $6.00 credit. The code is illustrative.

## Pattern 1: mirror tests

A mirror test works out its expected value with the function it is testing. If the function is wrong, the expected value is wrong in the same way, and the test passes.

Before (the mirror):

```ts
test('shows the feed-in credit', () => {
  const q = quote(plan, { exportKwh: 120 });
  expect(q.credit).toBe(calculateTariff(plan, { exportKwh: 120 }).credit);
});
```

After (written from the spec):

```ts
test('AC-1: 120 kWh at 5c/kWh shows a $6.00 credit', () => {
  // AC-1: 120 kWh at 5c/kWh = $6.00
  const q = quote(plan, { exportKwh: 120 });
  expect(q.credit).toBe(6.00);
});
```

The mirror passes even when `calculateTariff` is wrong. If the code treats the 5 as dollars, both sides of the mirror say $600.00 and the test is green.

**Quick review check:** if an expected value is calculated, ask where the number came from.

## Pattern 2: weakened tests

A weakened test used to fail for a wrong answer and no longer does. This usually happens when an agent is told to "make the tests pass" and the quickest path is to edit the test.

Before:

```ts
expect(res.status).toBe(400);
expect(res.body).toMatchObject({ type: expect.any(String), status: 400 });
```

After:

```ts
expect(res.status).toBeGreaterThanOrEqual(400);
```

Two things changed. `toBe(400)` became a range, so a 500 now passes. The assertion on the problem-details body was deleted, so the error format is no longer checked. The test still runs, and the build is still green.

**Quick review check:** read the test diff before the code diff. Look for every changed assertion, expected value, skip and deleted test.

## Pattern 3: shallow tests

A shallow test runs the code but doesn't check what it did.

```ts
test('calculates a quote', () => {
  expect(() => calculateTariff(plan, { exportKwh: 120 })).not.toThrow();
});
```

This passes whatever the credit is. Happy-path-only suites are shallow too: they never try a negative export, a zero export or a credit above the usage charge.

Fix it by asserting an observable result with a value from the spec, then add the unhappy path and the boundaries: at, just inside and just outside each limit. For the credit, that means exportKwh = 0, and a credit equal to and just above the usage charge.

**Quick review check:** ask what would have to be wrong for this test to fail.

## What to do about it

- Write expected values from the spec, with a comment that cites the criterion.
- Ask the agent for the failing test first, and read the failure before you let it implement anything. See the [verification loop](verification-loop.md).
- When a test fails, ask for the cause before the change. See [failing-test triage](failing-test-triage.md).
- Score the PR on Traced, Honest and Edges. See the [PR Quality Gate rubric](pr-quality-gate-rubric.md).
- For properties that cover many inputs at once, see the [property-test starters](../property-tests/README.md).

All three give you a green build. A passing suite is evidence, not proof.
