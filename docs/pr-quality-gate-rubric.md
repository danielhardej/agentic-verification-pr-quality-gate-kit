# PR Quality Gate rubric

This is a six-criterion rubric for scoring a pull request that an agent wrote or helped write. Use it before you merge, and give the same score to every agent PR so your squad shares one language for "ready".

It has the same shape as Module 2's plan rubric. Last week you scored the plan; this week you score the pull request.

## The six criteria

Score each criterion 0, 1 or 2. The total is out of 12.

### 1. Traced

Every acceptance criterion has a test that would fail without the change.

| Score | Descriptor |
| --- | --- |
| 2 | Every criterion has a test that proves it. |
| 1 | Every criterion has a test, but at least one test would also pass without the change, or only covers part of its criterion. |
| 0 | A criterion has no test. |

### 2. Honest

No weakened, skipped or deleted tests. Expected values come from the spec.

| Score | Descriptor |
| --- | --- |
| 2 | Tests keep their meaning, and expected values come from the spec. |
| 1 | Tests keep their meaning, but a test change isn't listed or explained in the PR, or an expected value doesn't cite its criterion. |
| 0 | Weakened or skipped tests. |

### 3. Edges

Unhappy paths, boundaries and properties are covered.

| Score | Descriptor |
| --- | --- |
| 2 | Unhappy paths, boundaries and properties covered. |
| 1 | The unhappy path is covered, but a boundary or a property is missing. |
| 0 | Happy path only. |

### 4. Scoped

The diff stays inside the plan's fence, with no surprise files or dependencies.

| Score | Descriptor |
| --- | --- |
| 2 | Only planned files, no surprise dependencies. |
| 1 | One small file or dependency outside the plan, named in the PR and approved by a person. |
| 0 | Protected files or non-goals touched. |

### 5. Safe

No secrets, NMIs or personal data, and the security checks pass.

| Score | Descriptor |
| --- | --- |
| 2 | No secrets, NMIs or PII, security checks pass. |
| 1 | No secrets, NMIs or PII in the diff, but a security check hasn't run or has an open finding that nobody has answered. |
| 0 | Secrets, NMIs or PII in code or logs. |

### 6. Evidenced

CI is green, the criteria and the test output are in the PR, and a human has read the diff.

| Score | Descriptor |
| --- | --- |
| 2 | CI green, criteria and test output in the PR. |
| 1 | CI is green, but the criteria mapping or the test output is missing from the PR. |
| 0 | Only the agent's summary. |

## Decision rule

**Merge at 10 or more out of 12 with no zeros.**

Otherwise, send it back with specific comments. Each comment should name the criterion it fixes. Ready-made comments are in [prompts/10-send-it-back.md](../prompts/10-send-it-back.md).

A zero on any criterion blocks the merge, whatever the total. A score of 11 with one zero is still a send-back.

## Red flags

Any one of these means send it back, even before you start scoring:

- A changed expected value with no spec change.
- `toBe` loosened to a range or `toBeGreaterThan`.
- A new `skip`, `only` or `todo`.
- A deleted test.
- Expected values computed with the code under test.
- A file outside the fence, or a protected file such as a billing run.
- A new dependency where a convention already exists.
- Secrets, NMIs or PII in code, fixtures or logs.
- A changed API shape or error format without a contract note.
- No test output in the PR.
- "Tests pass" with no command shown.

## Shared language

Name the criterion in review. "This PR is traced but not honest" beats "the tests look a bit off". The author knows what to fix, and the next reviewer knows what you checked.

## How to use it

1. Read the PR description first. Check that it lists the criteria, the tests and the output.
2. Read the test diff before the code diff. See [the risk review checklist](risk-review-checklist.md).
3. Score each criterion with one line of evidence.
4. Apply the decision rule.
5. Post the scorecard as a PR comment.

An agent can draft a score with [prompts/09-score-pr.md](../prompts/09-score-pr.md). Treat that score as a helper. The human owns the decision.

For the layers of review that come before this score, see [review layers and settings](review-layers-and-settings.md). For the loop that produces the evidence, see the [verification loop checklist](verification-loop.md).

## Scorecard

Copy this table into a PR comment.

```markdown
### PR Quality Gate score

| Criterion | Score (0-2) | Evidence |
| --- | --- | --- |
| Traced | | |
| Honest | | |
| Edges | | |
| Scoped | | |
| Safe | | |
| Evidenced | | |
| **Total** | **/12** | |

Red flags: none / [list]
Decision: merge (10 or more, no zeros) / send back
Top comment:
```
