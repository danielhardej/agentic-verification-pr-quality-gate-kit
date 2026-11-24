# 04 Refactor

Improve the structure of working code without changing what it does.

## When to use it

Only when the suite is green and the structure needs it. Skip it if the code is fine.

## Prompt

```text
Refactor only where the structure needs improving, keeping the behaviour exactly the same. Do not change any assertions or expected values. Keep the diff inside the files we've agreed. Run the related suite and report the results, including any failures, skips and anything you did not run. Stop for review.
```

## What good output looks like

- A small, readable diff that moves or renames code without changing results.
- Test files unchanged.
- The suite still green, with the command and real output.

## Check before you continue

- Assertions are unchanged. If a refactor needs an assertion changed, the test depends on implementation details, or the behaviour is changing. Stop and work out which.
- The diff is in scope and adds no dependency.
- You can explain what each change is for.

## Follow-ups

- "Which part of this diff is not needed for the structure change? Revert it."
- "Show me the test diff. It should be empty."

Next: review the diff with [08 Review the diff](08-review-diff.md), then score it with [09 Score the PR](09-score-pr.md).
