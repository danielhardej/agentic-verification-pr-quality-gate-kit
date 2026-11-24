# 03 Green

Make the failing tests pass with the smallest change, without touching what the tests mean.

## When to use it

After you've read the red test and its failure, and agree they're right.

## Prompt

```text
Implement the behaviour covered by the failing tests with the smallest change that makes them pass. Preserve existing behaviour and conventions. Do not add unrelated features or dependencies, and do not refactor. Do not delete or weaken assertions, skip tests or change expected values. If a test conflicts with the requirements, explain the conflict before changing anything. Run the targeted tests and the related suite, then report the results, including any failures, skips and anything you did not run. Stop for review.
```

## What good output looks like

- A small diff in implementation files.
- The targeted tests passing, with the command and real output.
- The related suite passing, or failures named and compared with the baseline.
- An explicit list of anything not run.

## Check before you continue

- Read the test diff before the code diff. There should be none, or only what you approved.
- No assertion was weakened, no test skipped or deleted, no expected value changed.
- The diff stays inside the plan's fence and adds no dependency.
- The new tests and the related suite pass, and the tests mean the same thing as before.

## Follow-ups

- "Show the diff stat. Which files changed, and why is each one needed?"
- "A test still fails. Say whether the cause is setup, the expectation or the implementation before you change anything." See [05 Localise the bug](05-localise-bug.md).

Next: [04 Refactor](04-refactor.md).
