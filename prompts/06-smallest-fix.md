# 06 Smallest fix

Fix an implementation bug with the smallest change, leaving the test alone.

## When to use it

After [05 Localise the bug](05-localise-bug.md) has classified the cause as an implementation bug and you've agreed with it.

## Prompt

```text
Fix the implementation with the smallest change. Do not change the test or its expected values. Run [TEST_NAME], then [VERIFY_COMMAND], and report the results. Stop for review.
```

## What good output looks like

- A diff of a few lines in one implementation file.
- No change to the test file.
- The output of `[TEST_NAME]` and then `[VERIFY_COMMAND]`, with both commands shown.

## Check before you continue

- The diff stat shows implementation files only, and no test files.
- The change addresses the root cause you agreed, not a symptom.
- The test passes and the whole suite passes.
- Nothing outside the plan's fence changed, and no dependency was added.

## Follow-ups

- "Show the diff stat."
- "Add a regression test for this case first, and show me that it fails without the fix." (Then repeat from [02 Red](02-red.md).)
- "Now add a property test." See [07 Property test](07-property-test.md).
