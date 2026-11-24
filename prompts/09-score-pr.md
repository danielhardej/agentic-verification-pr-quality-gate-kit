# 09 Score the PR

Draft a PR Quality Gate score with evidence for each criterion.

## When to use it

Before you merge, after review. The agent's score is a helper. The human owns the decision.

## Prompt

```text
Score the diff between [BASE] and [HEAD] using the rubric in [RUBRIC_PATH]. For each of the six criteria, give a score of 0, 1 or 2 and one line of evidence. Give the total out of 12. List any red flags. State the decision: merge at 10 or more with no zeros, otherwise send back. Finish with the single most important review comment. Do not edit files.
```

## What good output looks like

- A table of six criteria, each with a score and one line of evidence (a file, a line or a command).
- A total out of 12 that adds up.
- Red flags listed, or "none".
- One decision and one top comment.

## Check before you continue

- Check the evidence for each score yourself, starting with any 0 or 1.
- The total adds up and the decision follows the rule: 10 or more out of 12 with no zeros.
- You've read the test diff before the code diff. The agent's score doesn't replace that.
- A person makes the call. Post the scorecard from the [rubric](../docs/pr-quality-gate-rubric.md#scorecard) as a PR comment.

## Follow-ups

- "Show the evidence for the Honest score: list every changed assertion, expected value, skip and deleted test."
- "What would move Evidenced from 1 to 2?"
- If the decision is to send it back, use [10 Send it back](10-send-it-back.md).
