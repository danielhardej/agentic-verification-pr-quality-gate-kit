# 05 Localise the bug

Find the root cause of a failing test before anyone edits anything.

## When to use it

When a test fails and you don't yet know why. Use it instead of "fix this test".

## Prompt

```text
Investigate this failing test before changing anything. Run it, read the failure and trace the code path with incoming calls. Report the root cause with evidence: files, lines and values. Say whether it's setup, the expectation or the implementation. Do not edit files yet.
```

## What good output looks like

- The command that was run and the failure it produced.
- A call path from the test to the code, with file names and line numbers.
- The actual and expected values at the point things go wrong.
- A single classification: setup, expectation or implementation, with the evidence for it.

## Check before you continue

- No files were edited. Check the diff.
- The root cause has evidence, not a guess.
- The classification makes sense to you. If it says "expectation", a human decides what happens next, and the agent stops.
- With `.github/lsp.json` in place, the trace uses the language server's incoming calls, not a text search.

## Follow-ups

- "Show the value of [SYMBOL] at the point where the result goes wrong."
- "Which other callers use this function? Do any of them produce real bills?"

Next: [06 Smallest fix](06-smallest-fix.md). See also [failing-test triage](../docs/failing-test-triage.md).
