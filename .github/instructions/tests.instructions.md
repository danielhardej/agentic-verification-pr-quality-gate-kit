---
applyTo: "**/*.test.ts,**/*.spec.ts,**/*.prop.test.ts"
---
<!--
Test conventions that apply only to test files.
Adjust applyTo to match your test layout (for example "**/__tests__/**" or "**/*.test.tsx").
This file assumes Vitest. Keep your repo's existing runner.
-->

# Test conventions

- Name each test after the criterion it proves, for example `AC-1: shows a $6.00 credit for 120 kWh at 5c/kWh`.
- Test one behaviour per test.
- Assert observable results. Never assert only that something "doesn't throw".
- Write expected values out explicitly, with a comment that cites the criterion, for example `// AC-1: 120 kWh at 5c/kWh = $6.00`. Never calculate an expected value with the code under test.
- Cover the unhappy path and the boundaries: at, just inside and just outside each limit.
- Use the repo's existing helpers and mocking patterns.
- Don't add a new test runner.
- Write property tests with `@fast-check/vitest`, and name the rule each property checks.
- Never log or hard-code real customer identifiers. Use the placeholder `NMI_REDACTED` where a fixture needs an NMI.
- Don't weaken, skip or delete a test to make a build pass. If a test conflicts with the requirements, explain the conflict and stop.
