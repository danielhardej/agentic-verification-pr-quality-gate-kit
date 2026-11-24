# Agentic Verification & PR Quality Gate Rubric

Close the loop on agent-written code: tests from the spec, evidence at every step, and a scored PR before you merge.

This is the take-away kit for Module 3, "Agentic TDD & Verification Loops". Copy the files you need into your own repo. They're mostly Markdown templates, plus one small runnable property-test project.

Writing code is cheap. Proof isn't. A passing suite is evidence, not proof.

## What's inside

| # | Item | Where or format | What it gives you |
| --- | --- | --- | --- |
| 01 | [Verification checklist](docs/verification-loop.md) | `docs/verification-loop.md` | Red, green, refactor, review, merge: the evidence for each. |
| 02 | [Testing safeguards](.github/instructions/tests.instructions.md) | `.github/instructions/` | Drop-in rules for agent sessions and test files. |
| 03 | [Prompt pack](prompts/README.md) | `prompts/` | TDD phases, bug localisation, property tests and `/review`. |
| 04 | [Property-test starters](property-tests/README.md) | fast-check + Vitest | Invariant, metamorphic and round-trip patterns. |
| 05 | [PR Quality Gate rubric](docs/pr-quality-gate-rubric.md) | 6 criteria, 0 to 2 | Red flags, review instructions and ruleset settings. |
| 06 | [Worked example](examples/feed-in-credit-slice-1/README.md) | feed-in credit, slice 1 | From a red test to a scored PR on meter-platform. |

Also included:

- [Why green isn't correct](docs/green-is-not-correct.md)
- [Failing-test triage](docs/failing-test-triage.md)
- [The risk review checklist](docs/risk-review-checklist.md)
- [Review layers and ruleset settings](docs/review-layers-and-settings.md)
- [The PR template](.github/pull_request_template.md)
- [A guided exercise](exercises/risk-review-an-agent-pr.md)
- [The 30-day champion plan](docs/champion-30-days.md)

The testing rules also live in [.github/copilot-instructions.md](.github/copilot-instructions.md) (for the brief) and [AGENTS.testing-snippet.md](AGENTS.testing-snippet.md) (for `AGENTS.md`). The review rules are in [.github/instructions/code-review.instructions.md](.github/instructions/code-review.instructions.md).

## The loop

Baseline → Red → Green → Refactor → Review → Merge.

| Stage | What happens | Evidence, not the agent's summary |
| --- | --- | --- |
| Baseline | Find the test commands and run the related tests. No edits. | The existing failures, recorded. |
| Red | Add one focused test for one behaviour. | The test fails because the behaviour is missing. |
| Green | Make the smallest change to pass. | The new test and the related suite pass; the test means the same thing. |
| Refactor | Improve the structure only if needed. | Still green, assertions unchanged. |
| Review | `/review` locally, then Copilot code review on the draft PR. | Findings answered; a person has done the risk review. |
| Merge | A human decides. | A score of 10 or more out of 12 with no zeros. |

There's a human checkpoint between every step. Copilot reviews. A human approves. See the full [verification loop checklist](docs/verification-loop.md).

Four ideas run through the kit:

- **Green isn't the same as correct.** Watch for mirror tests, weakened tests and shallow tests.
- **Expected values come from the spec, not from the code.**
- **When a test fails, ask why first:** setup, expectation or implementation. Changing an expectation is a human decision.
- **Score the PR before you merge it.** Merge at 10 or more out of 12 with no zeros.

## Quick start (about 20 minutes)

1. **Add the testing rules.** Merge the Testing rules and Review rules from [.github/copilot-instructions.md](.github/copilot-instructions.md) into your own brief, or [AGENTS.testing-snippet.md](AGENTS.testing-snippet.md) into your `AGENTS.md`. Never overwrite an existing file.
2. **Add the path rules.** Copy [tests.instructions.md](.github/instructions/tests.instructions.md) and [code-review.instructions.md](.github/instructions/code-review.instructions.md). Adjust their `applyTo` globs to your test layout.
3. **Add the PR template.** Copy [.github/pull_request_template.md](.github/pull_request_template.md), merging it with any existing one.
4. **Turn on automatic review.** Turn on automatic Copilot code review for draft PRs in one repo. See [review layers and settings](docs/review-layers-and-settings.md).
5. **Run one real story** through [prompts 01 to 04](prompts/README.md).
6. **Score the PR** with the [rubric](docs/pr-quality-gate-rubric.md) before you merge.

## If you only do one thing this week

The next time an agent makes a test pass, read the test diff before the code diff.

## How it builds on Modules 1 and 2

- **Module 1, Repo Context & LSP Architecture Starter Kit.** The safeguards live in Module 1's instruction files: the brief, the path rules and `AGENTS.md`. Bug localisation uses incoming calls from the language server configured in `.github/lsp.json`.
- **Module 2, Spec-Driven /plan Delivery Template & Rubric.** Expected values come from Module 2's acceptance criteria (Given/When/Then). The Scoped criterion checks the diff against Module 2's plan fence. The PR Quality Gate has the same shape as Module 2's plan rubric: last week you scored the plan; this week you score the pull request.

## Next in the series

- **Module 4: Advanced Copilot CLI & Autopilot.** The hard controls behind these soft rules: tool permissions, allow and deny rules, and autopilot seatbelts.
- **Module 5: Safe Parallel Orchestration (`/fleet`).**
- **Module 6: Custom Agents, Skills & MCP Tools.**

## About the examples

All examples are illustrative. meter-platform is a fictional sample repo. There are no real NMIs, customer data or secrets in this kit. Where an example needs an NMI, it uses the placeholder `NMI_REDACTED`.

## Contributing

Open an issue or a pull request with a before-and-after example.

## Licence

Released under the [MIT licence](LICENSE).
