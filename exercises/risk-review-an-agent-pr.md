# Exercise: risk-review an agent's PR

This is a five-minute guided exercise for a squad or a workshop group. Use it to practise the risk review and the PR Quality Gate rubric on a realistic, flawed pull request. Everything in it is illustrative: meter-platform is a fictional repo, and the NMI is a placeholder.

You'll need the [risk review checklist](../docs/risk-review-checklist.md) and the [PR Quality Gate rubric](../docs/pr-quality-gate-rubric.md) open.

## The setup

A Copilot cloud agent opened a draft PR for slice 2 of the feed-in credit, which covers AC-3:

> **AC-3:** Given exportKwh is negative, When I POST /quotes, Then it returns 400 with problem details.

The plan's fence for this slice:

| In scope | Ask first | Never |
| --- | --- | --- |
| `services/billing/routes/quote.ts` and its test file | New dependencies | `services/billing/src/billingRun.ts` (produces real bills) |

Constraints: the domain stays pure, with no I/O; validate input with zod at the edge; errors are RFC 7807 problem details; never log NMIs or customer PII. CI is green.

## The tasks

1. **Fence.** Do the changed files match the plan?
2. **Risks.** Find three risks across tests, scope, data and dependencies.
3. **Score.** Score the PR with the PR Quality Gate rubric.
4. **Decide.** Merge, fix or send back. Write your top comment.

## The PR

**Title:** Reject negative exportKwh on /quotes

**Description:**

> Rejects negative exportKwh on /quotes. Added validation and tests. Should be good to go.

**Files changed:**

| File | Change |
| --- | --- |
| `services/billing/routes/quote.ts` | +18 −2 |
| `services/billing/routes/quote.test.ts` | +11 −4 |
| `services/billing/src/billingRun.ts` | +4 −1 |
| `services/billing/package.json` | +1 |

**Diff:**

```diff
diff --git a/services/billing/routes/quote.ts b/services/billing/routes/quote.ts
--- a/services/billing/routes/quote.ts
+++ b/services/billing/routes/quote.ts
@@ -1,4 +1,6 @@
 import { z } from 'zod';
+import Joi from 'joi';
 import { calculateTariff } from '@meter/domain';
+import { logger } from '../logger';
 import { problem } from '../problem';
 
@@ -21,5 +23,19 @@ export async function postQuote(req: Request, res: Response) {
   const plan = await loadPlan(req.body.planId);
-  const body = QuoteBody.parse(req.body);
-  const quote = calculateTariff(plan, body);
+  const body = req.body;
+  const check = Joi.number().min(0).validate(body.exportKwh);
+  if (body.exportKwh !== undefined && check.error) {
+    logger.warn(`quote rejected for NMI ${body.nmi}: exportKwh ${body.exportKwh}`);
+    return res.status(400).json(
+      problem({
+        type: '/problems/invalid-export',
+        title: 'Invalid exportKwh',
+        status: 400,
+        detail: 'exportKwh must not be negative',
+        instance: req.path,
+        errors: [{ field: 'exportKwh', rule: 'min' }],
+      }),
+    );
+  }
+  const quote = calculateTariff(plan, QuoteBody.parse(body));
   return res.json(toResponse(quote));
 }
diff --git a/services/billing/routes/quote.test.ts b/services/billing/routes/quote.test.ts
--- a/services/billing/routes/quote.test.ts
+++ b/services/billing/routes/quote.test.ts
@@ -30,8 +30,15 @@ describe('POST /quotes', () => {
   test('rejects a request without an NMI', async () => {
     const res = await postQuote({ planId: 'plan-solar-a', exportKwh: 10 });
-    expect(res.status).toBe(400);
-    expect(res.body.type).toBe('/problems/invalid-request');
-    expect(res.body.title).toBe('Invalid request');
-    expect(res.body.status).toBe(400);
+    expect(res.status).toBeGreaterThanOrEqual(400);
   });
+
+  test('rejects a negative exportKwh', async () => {
+    const res = await postQuote({ planId: 'plan-solar-a', nmi: 'NMI_REDACTED', exportKwh: -5 });
+    expect(res.status).toBeGreaterThanOrEqual(400);
+  });
+
+  test('accepts a positive exportKwh', async () => {
+    const res = await postQuote({ planId: 'plan-solar-a', nmi: 'NMI_REDACTED', exportKwh: 5 });
+    expect(res.status).toBe(200);
+  });
 });
diff --git a/services/billing/src/billingRun.ts b/services/billing/src/billingRun.ts
--- a/services/billing/src/billingRun.ts
+++ b/services/billing/src/billingRun.ts
@@ -76,3 +76,6 @@ export async function runBilling(accounts: Account[]) {
     const plan = await loadPlan(usage.planId);
-    const quote = calculateTariff(plan, usage);
+    const clamped = {
+      ...usage, exportKwh: Math.max(0, usage.exportKwh ?? 0),
+    };
+    const quote = calculateTariff(plan, clamped);
     await postInvoice(usage.accountId, quote);
diff --git a/services/billing/package.json b/services/billing/package.json
--- a/services/billing/package.json
+++ b/services/billing/package.json
@@ -12,4 +12,5 @@
     "express": "^4.21.0",
+    "joi": "^17.13.3",
     "zod": "^3.23.8"
   }
 }
```

## Facilitator timing

| Time | What happens |
| --- | --- |
| 0:00 to 0:45 | Brief the task. Post the diff and the rubric in the chat. |
| 0:45 to 4:00 | Work time. Give a 1-minute warning at 3:00. |
| 4:00 to 5:00 | Debrief: the first risk people spotted, the scores, and the top comments. |

In the debrief, ask each person which risk they spotted first, and what made it stand out.

## Answer key

Try it first. Then open this.

<details>
<summary>Answer key: the five planted issues, the score and the top comment</summary>

### The five planted issues

1. **Weakened test.** The existing "rejects a request without an NMI" test changed from `toBe(400)` to `toBeGreaterThanOrEqual(400)`, and its problem-details assertions (`type`, `title`, `status`) were deleted. The new negative-export test also only checks `toBeGreaterThanOrEqual(400)`, so a 500 would pass.
2. **Outside the fence.** `services/billing/src/billingRun.ts` now clamps negative `exportKwh` to 0. Billing runs are a non-goal for this slice, and the file produces real bills.
3. **New dependency.** `joi` was added for validation, although zod is the convention at the edge.
4. **PII in logs.** A warning log includes the request's NMI when a quote is rejected.
5. **Missing evidence and edges.** There's no boundary test for `exportKwh = 0`, and the description has no mapping from criteria to tests and no test output.

### Score

| Criterion | Score | Why |
| --- | --- | --- |
| Traced | 1 | There's a negative-export test, but it only checks `>= 400`, so it would also pass for a 500. It doesn't prove AC-3. |
| Honest | 0 | A weakened `toBe(400)` and deleted problem-details assertions. |
| Edges | 1 | The unhappy path has a test, but there's no boundary test at `exportKwh = 0`. |
| Scoped | 0 | `billingRun.ts` is a protected file and a non-goal, and `joi` is a surprise dependency. |
| Safe | 0 | The NMI is in a log line. |
| Evidenced | 1 | CI is green, but there's no criteria mapping and no test output in the description. |
| **Total** | **3/12** | Three zeros. |

**Decision:** send it back.

### Top comment

Revert billingRun.ts and the new dependency, restore the exact 400 assertion and assert the problem-details body, remove the NMI from the log, then re-request review.

More ready-made comments are in [prompts/10-send-it-back.md](../prompts/10-send-it-back.md).

</details>
