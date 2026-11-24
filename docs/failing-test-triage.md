# Failing-test triage

Use this when a test fails during an agent session and you need to decide what happens next. It has five steps and three possible causes. The first question is always why the test failed, not how to make it pass.

## The five steps

| Step | What you do | Done when |
| --- | --- | --- |
| 1. Reproduce | Write down a symptom and an expected result. | You can run one command and see the failure. |
| 2. Localise | Investigate with no edits. Trace the code path. | You can name the root cause with evidence: files, lines and values. |
| 3. Prove | Write a regression test that fails. | The test fails for the reason you found. |
| 4. Fix | Make the smallest change. Leave the test untouched. | The change is small and the test file is unchanged. |
| 5. Verify | Run the targeted test, then the whole suite. | Both pass, and you've read the diff. |

The prompts for these steps are [05 localise the bug](../prompts/05-localise-bug.md) and [06 smallest fix](../prompts/06-smallest-fix.md).

## The three causes

Before you accept another edit, identify which one it is.

| Cause | What it looks like | What happens next |
| --- | --- | --- |
| Setup | The test can't run: a missing dependency, an environment variable or stale test data. | Fix the environment, not the code. |
| Expectation | The test disagrees with the spec, or the spec has changed. | A human decides. The agent stops. |
| Implementation | The code doesn't meet the criterion. | The agent fixes the code. |

Changing an expectation is a human decision. If an agent wants to edit an expected value, that is the moment to stop and check the spec.

## A good symptom

A weak symptom gives the agent nothing to test against. A strong one has an input, an actual result and an expected result.

| Weak | Strong |
| --- | --- |
| "Quotes look wrong." | "A 120 kWh export shows an $80 credit; it should be $6." |

## VS Code test features

VS Code offers `/setupTests`, Generate Tests, `/fixTestFailure` and a Fix Test Failure action in the Test Explorer. Agents in VS Code watch test output and try to fix and rerun failing tests.

That is useful, and it is also where a test gets edited so the build goes green. Ask for the cause before the change. The quickest path to green is editing the test.

Two cautions:

- Instructions guide behaviour, but they don't enforce file-level restrictions. An agent with edit and terminal tools can still change both tests and code. Read the diff.
- An agent's terminal command doesn't necessarily use the same configuration as Test Explorer. If a test passes in one and fails in the other, suspect setup first.

## Localising with the language server

With `.github/lsp.json` in place, Copilot CLI traces the call path from the language server, not a text search. That is why [prompt 05](../prompts/05-localise-bug.md) asks for incoming calls: you get the real callers of a function, not every file that happens to mention its name.

See the [worked example](../examples/feed-in-credit-slice-1/02-localise.md) for what a localisation report looks like.

## Related

- [Verification loop checklist](verification-loop.md)
- [Green is not correct](green-is-not-correct.md)
- [Risk review checklist](risk-review-checklist.md)
- [VS Code: test code with AI](https://code.visualstudio.com/docs/agents/guides/test-code-with-ai)
- [VS Code: test-driven development guide](https://code.visualstudio.com/docs/agents/guides/test-driven-development-guide)
