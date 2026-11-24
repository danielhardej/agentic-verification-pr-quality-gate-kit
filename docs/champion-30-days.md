# Champion 30-day plan

This is a four-week plan for a squad champion to roll out the verification loop in one team. Use it after the Module 3 session, with one repo and one real story at a time.

If you only do one thing this week: the next time an agent makes a test pass, read the test diff before the code diff.

## Week 1: add safeguards

Put the testing rules in your instruction files and `AGENTS.md`.

- Merge the Testing rules and Review rules from [.github/copilot-instructions.md](../.github/copilot-instructions.md) into your brief, or [AGENTS.testing-snippet.md](../AGENTS.testing-snippet.md) into your `AGENTS.md`. Don't overwrite an existing file.
- Copy [tests.instructions.md](../.github/instructions/tests.instructions.md) and [code-review.instructions.md](../.github/instructions/code-review.instructions.md). Adjust the `applyTo` globs to your test layout.
- Add the [PR template](../.github/pull_request_template.md), merging it with any existing one.

Done when: a new agent session in your repo follows the testing rules, and you've checked it by reading a diff.

## Week 2: red, green, refactor

Run one real story through the loop, with the checkpoints.

- Use [prompts 01 to 04](../prompts/README.md): baseline, red, green and refactor, each as a separate request.
- Stop and read the evidence at each checkpoint. See the [verification loop checklist](verification-loop.md).
- Note where the agent tried to change a test, and why.

Done when: one story has gone through the whole loop and you can show the evidence for each step.

## Week 3: turn on auto-review

Turn on automatic Copilot code review for draft PRs in one repo, and tune its instructions.

- Follow [review layers and settings](review-layers-and-settings.md).
- Read what it comments on. Change [code-review.instructions.md](../.github/instructions/code-review.instructions.md) when the comments are noisy or miss something you care about.
- Keep approvals with people.

Done when: draft PRs in that repo get an automatic review, and you've adjusted the instructions at least once.

## Week 4: gate and measure

Score every agent PR with the [PR Quality Gate rubric](pr-quality-gate-rubric.md). Track rework and escaped defects.

- Post the scorecard on each agent PR.
- Send back anything below 10 or with a zero, using [the send-it-back comments](../prompts/10-send-it-back.md).
- Run the [guided exercise](../exercises/risk-review-an-agent-pr.md) with your squad so reviewers share the same language.

Done when: every agent PR in the repo has a score, and you have a first baseline.

## Measuring it

Compare agent PRs before and after on:

- rework (follow-up commits)
- review time
- rubric scores
- escaped defects

Don't quote numbers until you have a baseline.
