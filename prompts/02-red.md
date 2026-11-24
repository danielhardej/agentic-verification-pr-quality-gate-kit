# 02 Red

Add focused tests for one criterion and watch them fail for the right reason.

## When to use it

After the baseline, when you have one agreed criterion from the spec. Run it for one behaviour at a time.

## Prompt

```text
Add focused tests for [CRITERION] in [SPEC_PATH], using the existing test framework. Use the exact values in the criterion as the expected values, written out explicitly. Never compute an expected value with the code under test. Do not implement the behaviour and do not refactor. If a placeholder is needed for the test to run, explain why and wait for me. Run the targeted tests, then report the command, the actual failure, and why it shows missing behaviour rather than a setup problem. Stop for review.
```

## What good output looks like

- One or a few tests named after the criterion, for example "AC-1: ...".
- Expected values written out with a comment that cites the criterion.
- A failure message that shows the behaviour is missing: for example, expected a $6.00 credit and received nothing.
- No change to implementation code.

## Check before you continue

- The test ran and failed. A passing test might mean the behaviour already exists. Don't break working code to manufacture a red.
- The failure is not an import error, a missing file or a config problem. That is a setup failure, not a red.
- You read the test and agree the expected value matches the spec.
- The diff holds test files only.

## Follow-ups

- "Add a boundary test at [VALUE]: at, just inside and just outside the limit."
- "The failure is a setup error. Fix only the setup so the test runs, and show me the diff before you continue."

Next: [03 Green](03-green.md).
