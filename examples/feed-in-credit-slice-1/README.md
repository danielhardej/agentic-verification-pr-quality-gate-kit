# Worked example: feed-in credit, slice 1

This is an illustrative walk-through of the verification loop on meter-platform, a fictional energy-retail TypeScript monorepo. Use it to see what the evidence looks like at each checkpoint, from a red test to a scored PR. All output, line numbers and diffs here are illustrative.

The loop it follows is in the [verification loop checklist](../../docs/verification-loop.md). The score uses the [PR Quality Gate rubric](../../docs/pr-quality-gate-rubric.md).

## The story

> As a solar customer, I want my quote to show a feed-in credit for the energy I export, so that I can compare plans fairly.

Slice 1 covers AC-1, AC-2 and AC-5. Slice 2 covers AC-3 (see the [exercise](../../exercises/risk-review-an-agent-pr.md)).

- **AC-1:** Given exportKwh = 120 and a feed-in rate of 5c/kWh, When a quote is calculated, Then it shows a $6.00 credit as its own line.
- **AC-2:** Given no exportKwh, When a quote is calculated, Then it matches today's quote.
- **AC-5:** Given a feed-in credit larger than the usage charge, When a quote is calculated, Then the credit is capped at the usage charge.

The spec is `docs/specs/feed-in-credit.md`. The AC-1 fixture has a usage charge of $80.00. The feed-in rate comes from the tariff plan configuration, in cents per kWh.

## The journey

| Stage | File | Checkpoint |
| --- | --- | --- |
| Red | [01-red.md](01-red.md) | You've read the failing AC-1 test and its failure. |
| Localise | [02-localise.md](02-localise.md) | Human checkpoint 1: you agree the root cause and its classification. |
| Fix | [03-fix.md](03-fix.md) | Human checkpoint 2: the diff stat shows one implementation file and no test files. |
| Prove | [04-prove.md](04-prove.md) | The property test passes, or its counterexample is understood. |
| Review and score | [05-review-and-score.md](05-review-and-score.md) | 11/12, no zeros. A person decides. |

## Replay the demo on meter-platform

You need a checkout of meter-platform (fictional) with the `module-3-demo` branch, which holds slice 1 with a seeded bug.

1. Switch to the demo branch: `git switch module-3-demo`
2. Run the billing tests: `npx vitest run services/billing`. The AC-1 quote test fails.
3. Open Copilot CLI at the repo root and confirm the TypeScript language server is configured in `.github/lsp.json`.
4. Paste the three demo prompts below, in order. Read the evidence after each one before you paste the next.
5. Run `/review` on the change.
6. Score the diff aloud with the [rubric](../../docs/pr-quality-gate-rubric.md).

### Demo prompt 1: localise

```text
The AC-1 quote test is failing. Investigate it before changing anything. Run the failing test, then trace the code path from services/billing/routes/quote.ts into calculateTariff. Report the root cause with evidence, and say whether it's a setup problem, a wrong expectation or an implementation bug. Do not edit files.
```

### Demo prompt 2: fix

```text
Fix the implementation with the smallest change. Do not change the test or its expected values. Run the AC-1 test, then npm run verify, and report the results. Stop for review.
```

### Demo prompt 3: prove

```text
Add a property test with @fast-check/vitest for calculateTariff: for any usage and export, the credit is a whole number of cents, never negative and never more than the usage charge; with no export, the quote matches today's quote. Run it and report any counterexample. Do not change implementation code.
```

### Reset

When you've finished, or if you want to start again:

```bash
git switch module-3-demo && git restore . && git clean -fd
```

## Names used in the example

| What | Where |
| --- | --- |
| `calculateTariff` | `packages/domain/src/calculateTariff.ts` |
| Quote route | `services/billing/routes/quote.ts` |
| Web preview | `web/src/tariffPreview.ts` |
| Billing run (protected: produces real bills) | `services/billing/src/billingRun.ts` |

Constraints: the domain stays pure, with no I/O; validate input with zod at the edge; errors are RFC 7807 problem details; never log NMIs or customer PII.
