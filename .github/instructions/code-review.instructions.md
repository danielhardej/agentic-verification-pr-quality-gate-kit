---
applyTo: "**"
---
<!--
Review rules for Copilot code review and for agents reviewing a diff. Adjust the zones to your repo.
TODO: Confirm your Copilot code review setup reads path-specific instructions; otherwise move these rules into the Review rules section of the brief.
-->

# Code review rules

When you review a pull request, read the test changes before the code changes. Check the six risk zones below. These are the same zones as the [risk review checklist](../../docs/risk-review-checklist.md).

For every comment, give a severity (High, Medium or Low) and, where you can, a suggested change. Say which zone the comment belongs to.

## 1. Tests

- Flag any changed assertion, changed expected value, new skip, `only` or `todo`, and any deleted test.
- Flag an assertion that has been loosened, for example `toBe(400)` changed to a range or `toBeGreaterThanOrEqual(400)`.
- Flag expected values calculated with the code under test instead of written from the spec.
- Flag a test that only checks that execution completes, and a feature with only happy-path tests.
- Flag missing tests at the boundaries: at, just inside and just outside each limit.

## 2. Scope

- Flag any changed file outside the plan's fence.
- Flag any change to a protected area, such as code that produces real bills.
- Flag unrelated refactoring mixed into the change.

## 3. Data and secrets

- Flag secrets, credentials, NMIs or personal information in code, fixtures or logs.
- Flag any log line that includes request data that could identify a customer.

## 4. Dependencies

- Flag any new package, and ask why the repo's existing convention can't do the job.
- Flag a second library for something the repo already does, such as validation.

## 5. Contracts

- Flag changes to API shapes, error formats or schemas that other teams may depend on.
- Ask for a contract note when a shape or format changes.

## 6. Evidence

- Flag a pull request description that has no mapping from acceptance criteria to tests.
- Flag a description that says "tests pass" without the command and its output.
