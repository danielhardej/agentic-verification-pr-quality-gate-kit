# 07 Property test

Add a test for a rule that should hold for every input, not only the examples you thought of.

## When to use it

For domain functions with rules about money, rounding, caps, unit conversions, dates, and parsing and serialising. See the [property-test starters](../property-tests/README.md) for the patterns.

## Prompt

```text
Add a property test with @fast-check/vitest for [SYMBOL], for these rules from [SPEC_PATH]: [RULES]. The generators must include zero, fractions and very large values. Name the rule each property checks in a comment. Run the tests and report any counterexample with its seed. Do not change implementation code.
```

## What good output looks like

- One or two properties per function, each with a comment naming the rule and where it comes from.
- Generators that include zero, fractions and very large values.
- The command and real output, including "100 runs" or the counterexample and its seed.
- No changes to implementation code.

## Check before you continue

- The rules come from the spec, not from reading the code.
- The properties would fail if the rule were broken. Plant a bug in a scratch copy, or ask the agent to describe one that the property would catch.
- If a property fails, you have the counterexample and the seed. Don't let the agent loosen the property to pass.

## Follow-ups

- "Turn the shrunk counterexample into an example-based regression test, with the expected value written from the spec."
- "Replay the failure from its seed and show me the output."
