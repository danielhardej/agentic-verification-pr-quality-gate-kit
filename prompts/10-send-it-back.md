# 10 Send it back

Ready-made review comments for a PR that scores below 10 or has a zero.

## When to use it

When the [PR Quality Gate rubric](../docs/pr-quality-gate-rubric.md) says send it back. Pick the comments that match the criteria that lost points, replace the placeholders in square brackets, and post them on the PR. Say which criterion each comment fixes, so the author knows what you checked.

## Comments by criterion

### Traced

- Add a test for [CRITERION]: it fails before this change and passes after.
- Map each acceptance criterion to its test in the PR description.

### Honest

- Restore the exact assertion: expected values come from the spec.
- Put this test back. If the spec has changed, link the change and a person will decide.
- Write the expected value out from [CRITERION] rather than calculating it with the code under test.

### Edges

- Add a boundary test at [VALUE]: at, just inside and just outside the limit.
- Add a test for the unhappy path: [DESCRIBE_CASE].

### Scoped

- [FILE] is outside the fence: revert it and raise it separately.
- Use the existing [CONVENTION] instead of adding [DEPENDENCY].

### Safe

- Remove the NMI from this log line.
- Replace this fixture value with `NMI_REDACTED`.

### Evidenced

- Paste the test output and map each criterion to its test in the PR description.
- Show the command you ran, not only "tests pass".

## A combined comment

Use this shape when more than one criterion needs fixing:

```text
Sending this back at [SCORE]/12. Please:
1. [Honest] Restore the exact assertion: expected values come from the spec.
2. [Scoped] [FILE] is outside the fence: revert it and raise it separately.
3. [Evidenced] Paste the test output and map each criterion to its test in the PR description.
Then re-request review.
```

## Check before you post

- Each comment names a file, a line or a criterion.
- You've told the author what "done" looks like, not just what's wrong.
- A person posted it. An agent can draft; you decide.
