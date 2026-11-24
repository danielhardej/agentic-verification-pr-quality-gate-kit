# Prompt pack

This is a set of ten copy-and-paste prompts for the verification loop: baseline, red, green, refactor, bug localisation, property tests, review and scoring. Use them to run each phase as a separate request, with a human checkpoint before the next.

The pack is plain Markdown. It works in Copilot CLI, in VS Code agent mode and other IDE agents, and on GitHub.com by copy and paste. Replace the placeholders in square brackets, such as `[SPEC_PATH]`, before you send a prompt.

| Prompt | Use it when | Output |
| --- | --- | --- |
| [01 Baseline](01-baseline.md) | You're about to start a change. | The test commands, and a record of existing failures. No edits. |
| [02 Red](02-red.md) | You have an agreed criterion. | A failing test and the reason it fails. |
| [03 Green](03-green.md) | The red test is reviewed and right. | The smallest change that passes, plus test results. |
| [04 Refactor](04-refactor.md) | The suite is green and the structure needs work. | A same-behaviour tidy-up with assertions unchanged. |
| [05 Localise the bug](05-localise-bug.md) | A test fails and you don't know why. | A root cause with evidence, and a classification. No edits. |
| [06 Smallest fix](06-smallest-fix.md) | The root cause is an implementation bug. | A minimal fix, with the test untouched. |
| [07 Property test](07-property-test.md) | A rule should hold for every input. | A property test, and any counterexample. |
| [08 Review the diff](08-review-diff.md) | You're about to commit or open a PR. | Review findings across the six risk zones. |
| [09 Score the PR](09-score-pr.md) | Before you merge. | A draft rubric score. A human owns the decision. |
| [10 Send it back](10-send-it-back.md) | A PR scores below 10 or has a zero. | Ready-made review comments by criterion. |

## How to use the pack

1. Run one prompt at a time. Read the evidence it asks for before you continue.
2. Keep the agent's answer in the session, not just the summary: you want the command and the real output.
3. If the agent wants to change a test, stop. Changing an expectation is a human decision.

Prompts 05 and 06 are the same ones used in the [worked example](../examples/feed-in-credit-slice-1/README.md). The loop they belong to is in the [verification loop checklist](../docs/verification-loop.md).
