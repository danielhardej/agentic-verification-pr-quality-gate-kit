# 05 Review and score

Illustrative. This is the review and the score for slice 1 of the feed-in credit on meter-platform, a fictional repo. The aim is to show what evidence supports each score.

## Review findings

`/review` run on the change (illustrative output), then the risk review by a person.

| Severity | Zone | Finding | Answer |
| --- | --- | --- | --- |
| Medium | Scope | `services/billing/src/billingRun.ts` calls `calculateTariff`, so the corrected credit reaches the billing run. | No change to `billingRun.ts`. The plan's fence names `packages/domain` only. A person confirmed the billing team expects the corrected credit. |
| Low | Edges | The property generators for export include zero, whole and fractional values. Consider a boundary example for a credit exactly equal to the usage charge. | Covered by AC-5. No change. |
| Low | Evidence | The PR description doesn't map criteria to tests or show the output yet. | Added; see below. |

The person's risk review (tests, scope, data, dependencies, contracts, evidence) found no changed assertion, no skip, no deleted test, no NMI in logs or fixtures, no new dependency and no change to the quote's API shape or error format.

## Score

Scored with the [PR Quality Gate rubric](../../docs/pr-quality-gate-rubric.md), before the description below was added.

| Criterion | Score | Evidence |
| --- | --- | --- |
| Traced | 2 | AC-1 fails before the fix and passes after. AC-2 and AC-5 have tests that prove them, and the property test covers all three. |
| Honest | 2 | The diff stat shows no test file changed in the fix. Expected values come from the spec: $6.00 for AC-1. |
| Edges | 2 | The unhappy path, the cap boundary and the properties are covered: whole cents, never negative, never above the usage charge. |
| Scoped | 2 | One implementation file, `packages/domain/src/calculateTariff.ts`, inside the fence. No new dependency. |
| Safe | 2 | No secrets, NMIs or PII in the diff, the fixtures or the logs. Security checks pass. |
| Evidenced | 1 | CI is green, but the criteria mapping and the test output weren't in the PR description. |
| **Total** | **11/12** | No zeros. |

**Decision:** ready for a PR once the criteria mapping and the test output are in the description. A person approves; the score is an input.

## The completed PR description

This uses the [PR template](../../.github/pull_request_template.md). The Evidenced score is the one given above, before this description existed.

````markdown
## Story, spec and slice

- Story: As a solar customer, I want my quote to show a feed-in credit for the energy I export, so that I can compare plans fairly.
- Spec: docs/specs/feed-in-credit.md
- Slice: Slice 1 (AC-1, AC-2, AC-5). AC-3 is slice 2.

## Acceptance criteria → tests

| Criterion | Test | Failed before the change? | Passing now? |
| --- | --- | --- | --- |
| AC-1 | services/billing/routes/quote.test.ts: "AC-1: 120 kWh at 5c/kWh shows a $6.00 credit as its own line" | Yes (expected 6.00, received 80.00) | Yes |
| AC-2 | services/billing/routes/quote.test.ts and packages/domain/test/calculateTariff.prop.test.ts: "AC-2: with no export, the quote matches today's quote" | No (the behaviour already existed) | Yes |
| AC-5 | services/billing/routes/quote.test.ts and packages/domain/test/calculateTariff.prop.test.ts: "AC-5: the credit never exceeds the usage charge" | No (the cap already worked) | Yes |

## Test changes

None. No existing assertion, expected value, skip or test was changed. New tests were added only.

## Fence check

None. Only packages/domain/src/calculateTariff.ts changed in the fix.

## New dependencies

None.

## Data check

- [x] No secrets, NMIs or personal information in code, fixtures or logs

## Verification

Focused tests:

```text
$ npx vitest run services/billing -t "AC-1"
 Test Files  1 passed (1)
      Tests  1 passed | 2 skipped (3)
```

Repo verify command:

```text
$ npm run verify
 Test Files  14 passed (14)
      Tests  96 passed (96)
```

## PR Quality Gate score

| Criterion | Score (0-2) | Evidence |
| --- | --- | --- |
| Traced | 2 | AC-1 failed before and passes now; AC-2 and AC-5 have proving tests |
| Honest | 2 | No test changed in the fix; expected values from the spec |
| Edges | 2 | Cap boundary and four properties |
| Scoped | 2 | One implementation file inside the fence |
| Safe | 2 | No secrets, NMIs or PII |
| Evidenced | 1 | Scored before this description; CI green |
| **Total** | **11/12** | No zeros |

## Reviewer

Read the test diff before the code diff. Merge at 10 or more with no zeros.
````
