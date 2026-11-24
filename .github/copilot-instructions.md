<!--
Merge the Testing rules and Review rules sections into your existing brief.
Don't replace your brief with this file.
-->

## Testing rules

- Work on one agreed behaviour at a time.
- Red first: add a test and confirm it fails for the right reason, then implement.
- Never weaken assertions, skip tests or change expected values just to make tests pass.
- Take expected values from the spec or acceptance criteria, written out explicitly. Never calculate them with the code under test.
- If a test conflicts with the agreed requirements, explain the conflict and stop.
- When a test fails, say whether the cause is setup, the expectation or the implementation before changing anything.
- Run the focused tests, then the repo's verify command. Report failures, skips and anything you couldn't run.
- Stop for review between red, green and refactor.

## Review rules

- Read the test diff before the code diff.
- Flag any changed assertion, expected value, skip or deleted test.
- Flag files outside the plan's fence and any new dependency.
- Flag secrets, NMIs or PII in code, fixtures or logs.
- Flag changes to API shapes, error formats or schemas.

*Instructions guide behaviour; they don't enforce it. Review the diff.*
