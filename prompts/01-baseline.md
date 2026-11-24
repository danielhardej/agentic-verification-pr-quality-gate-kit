# 01 Baseline

Find out how this codebase is tested and record what already fails, without changing anything.

## When to use it

At the start of every change, before red. Without a baseline, you can't tell a new failure from an old one.

## Prompt

```text
Before we change anything, establish a baseline. Inspect the test framework, where the tests live and the conventions they follow. Identify the commands for a focused test run and for the related suite. Run the relevant existing tests and report any failures or skips, with the command you used. Do not edit files, install dependencies or change configuration.
```

## What good output looks like

- The framework, the test locations and the conventions, in a few lines.
- The exact command for a focused run and the command for the related suite.
- The real output of the run: passes, failures and skips.
- A list of existing failures and skips, named, so they can be told apart from new ones.

## Check before you continue

- The agent ran the tests and didn't just describe them.
- Existing failures are recorded.
- No files changed. Check the diff.
- The commands match what your team uses in CI. An agent's terminal command doesn't necessarily use the same configuration as Test Explorer.

## Follow-ups

- "Run the full verify command too and report the result."
- "Which of these failures were failing before today? Show the evidence."

Next: [02 Red](02-red.md).
