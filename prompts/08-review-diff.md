# 08 Review the diff

Review the change against the six risk zones, reading the test changes first.

## When to use it

Before you commit (layer 1 of [review layers](../docs/review-layers-and-settings.md)) and again before you open or merge a PR. This is the agent's review. A person still does the [risk review](../docs/risk-review-checklist.md).

## Option 1: `/review` in Copilot CLI

`/review` analyses your local changes before you commit. You can narrow it with a path or a prompt. For example, you can add a prompt such as:

```text
focus on test changes and error handling
```

Run it, read every finding, and answer or fix each one.

## Option 2: a prompt for any chat surface

Use this when you're not in Copilot CLI, or when you want a review against the six zones.

```text
Review the diff between [BASE] and [HEAD]. Read the test changes first. Then check these six zones and report findings for each, with the file and line:

1. Tests: any changed assertion, changed expected value, skip, only, todo or deleted test; any loosened assertion; expected values calculated with the code under test; missing unhappy-path or boundary tests.
2. Scope: files outside the plan in [SPEC_PATH], and any protected area.
3. Data and secrets: credentials, NMIs or personal information in code, fixtures or logs.
4. Dependencies: any new package, and whether the repo already has a convention for it.
5. Contracts: changes to API shapes, error formats or schemas.
6. Evidence: whether the change shows which criteria it covers and the actual test output.

Give each finding a severity (High, Medium or Low) and a suggested change where you can. Do not edit files.
```

## What good output looks like

- Findings grouped by zone, test changes first.
- Each finding has a file, a line, a severity and, where possible, a suggested change.
- "No findings" for a zone, stated, rather than silence.

## Check before you continue

- You read the test diff yourself. Don't rely on the agent's summary.
- Every High finding is fixed or answered.
- A person does the risk review. Copilot suggests; you judge.

## Follow-ups

- "For each finding, show me the evidence in the diff."
- "Which of these findings would fail the PR Quality Gate rubric?" See [09 Score the PR](09-score-pr.md).
