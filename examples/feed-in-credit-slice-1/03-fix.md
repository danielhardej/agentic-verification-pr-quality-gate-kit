# 03 Fix: the smallest change

Illustrative. This is what demo prompt 2 should produce on the `module-3-demo` branch of meter-platform, a fictional repo.

## Prompt

```text
Fix the implementation with the smallest change. Do not change the test or its expected values. Run the AC-1 test, then npm run verify, and report the results. Stop for review.
```

## The diff

One line, at the boundary where the rate is read from the plan configuration:

```diff
--- a/packages/domain/src/calculateTariff.ts
+++ b/packages/domain/src/calculateTariff.ts
@@ -56,7 +56,7 @@ export function calculateTariff(plan: TariffPlan, usage: Usage): Quote {
   const exportKwh = usage.exportKwh ?? 0;
-  const feedInRate = plan.feedInRate;
+  const feedInRate = plan.feedInRate / 100; // configuration is in cents per kWh
   const rawCredit = exportKwh * feedInRate;
```

The test file is untouched. The credit is still rounded to the nearest cent, and capped at the usage charge, as before.

## Output

```text
$ npx vitest run services/billing -t "AC-1"

 ✓ services/billing/routes/quote.test.ts > AC-1: 120 kWh at 5c/kWh shows a $6.00 credit as its own line

 Test Files  1 passed (1)
      Tests  1 passed | 2 skipped (3)
```

```text
$ npm run verify

 Test Files  14 passed (14)
      Tests  96 passed (96)
```

The two skipped tests in the first run are only filtered out by the `-t "AC-1"` name filter. Nothing in the repo is marked skip.

## Human checkpoint 2

```text
$ git diff --stat
 packages/domain/src/calculateTariff.ts | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```

The diff stat shows one implementation file and no test files. That is the check:

- The test file is untouched, so the expected value is still the one from AC-1.
- The change is in the plan's fence: `packages/domain`.
- No dependency was added.
- `npm run verify` passes, not only the AC-1 test.

If the diff stat had shown a test file, stop and read it first. See [green is not correct](../../docs/green-is-not-correct.md).

Next: [04 Prove](04-prove.md).
