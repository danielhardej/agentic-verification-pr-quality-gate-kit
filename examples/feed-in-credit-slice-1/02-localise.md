# 02 Localise: the investigation report

Illustrative. This is the kind of report demo prompt 1 should produce on the `module-3-demo` branch of meter-platform, a fictional repo. Line numbers and values are made up for the example.

## Prompt

```text
The AC-1 quote test is failing. Investigate it before changing anything. Run the failing test, then trace the code path from services/billing/routes/quote.ts into calculateTariff. Report the root cause with evidence, and say whether it's a setup problem, a wrong expectation or an implementation bug. Do not edit files.
```

## Report

**Failing test:** `AC-1: 120 kWh at 5c/kWh shows a $6.00 credit as its own line`. Expected 6.00, received 80.00.

**Call path** (using incoming calls from the TypeScript language server):

1. `services/billing/routes/quote.ts:34`: the POST handler validates the body with zod, then calls `calculateTariff(plan, usage)`.
2. `packages/domain/src/calculateTariff.ts:58`: reads `plan.feedInRate` and multiplies it by `usage.exportKwh`.
3. `packages/domain/src/calculateTariff.ts:63`: caps the credit at the usage charge (AC-5).

Other callers of `calculateTariff`: `web/src/tariffPreview.ts:21` and `services/billing/src/billingRun.ts:77` (protected: produces real bills).

**Values at the point it goes wrong:**

| Value | Observed | Source |
| --- | --- | --- |
| `plan.feedInRate` | 5 | Tariff plan configuration, in cents per kWh. |
| `usage.exportKwh` | 120 | Request body. |
| Credit before the cap | 600 | 120 × 5, treated as dollars: $600.00. |
| Usage charge | 80.00 | The AC-1 fixture. |
| Credit after the cap | 80.00 | The cap clips $600.00 to the $80.00 usage charge. |

**Root cause:** the plan configuration stores the feed-in rate in cents per kWh, but `calculateTariff` treats it as dollars per kWh. 120 × 5 = $600.00. The AC-5 cap then clips that to the $80.00 usage charge, which is why the test reports 80.00 and not 600.00.

**Classification:** implementation. It isn't setup, because the test runs and fails on a value. It isn't the expectation, because AC-1 says 120 kWh at 5c/kWh is $6.00, and the test says the same.

**Note on the cap:** the AC-5 test passes because the cap works. It doesn't show that the credit under the cap is right.

**Note on callers:** `billingRun.ts` calls `calculateTariff`, so a fix in the domain function changes what that caller computes. Nothing in `billingRun.ts` needs to change, but confirm that against the plan's fence before you merge.

**Files edited:** none.

## Human checkpoint 1

Before you let the agent fix anything, check:

- The root cause has evidence: files, lines and values.
- The classification is implementation, and you agree.
- No files were edited. Check the diff.
- You've noted the protected caller.

Next: [03 Fix](03-fix.md).
