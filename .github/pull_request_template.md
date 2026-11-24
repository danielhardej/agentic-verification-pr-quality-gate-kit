<!--
Pull request template with a built-in PR Quality Gate score.
Merge this with any existing template; don't replace yours without checking.
Guidance is in comments like this one. Delete the comments if you like; they don't render.
-->

## Story, spec and slice

<!-- Link the story, the spec (for example docs/specs/feed-in-credit.md) and the plan slice this PR delivers. -->

- Story:
- Spec:
- Slice:

## Acceptance criteria → tests

<!-- One row per acceptance criterion in this slice. "Failed before the change?" means you saw this test fail before the implementation existed. -->

| Criterion | Test | Failed before the change? | Passing now? |
| --- | --- | --- | --- |
| AC-1 | | Yes / No | Yes / No |

## Test changes

<!-- List every changed assertion, changed expected value, skipped test and deleted test, with the reason. Write "None" if there are none. Adding new tests doesn't need to be listed here. -->

None

## Fence check

<!-- Files changed outside the plan's fence (In scope, Ask first, Never). Write "None", or list each file and who approved it. -->

None

## New dependencies

<!-- Write "None", or list each new package and why the repo's existing convention couldn't do the job. -->

None

## Data check

<!-- Tick only after you have looked at the diff, the fixtures and any new log lines. -->

- [ ] No secrets, NMIs or personal information in code, fixtures or logs

## Verification

<!-- Paste the actual output, not a summary. "Tests pass" without a command and its output doesn't count. -->

Focused tests:

```text
<command>
<output>
```

Repo verify command:

```text
<command>
<output>
```

## PR Quality Gate score

<!-- Score each criterion 0, 1 or 2 with one line of evidence. Merge at 10 or more out of 12 with no zeros. Any zero means send it back. -->

| Criterion | Score (0-2) | Evidence |
| --- | --- | --- |
| Traced | | |
| Honest | | |
| Edges | | |
| Scoped | | |
| Safe | | |
| Evidenced | | |
| **Total** | **/12** | |

## Reviewer

Read the test diff before the code diff. Merge at 10 or more with no zeros.
