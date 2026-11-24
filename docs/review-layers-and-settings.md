# Review layers and ruleset settings

This page explains the layers of review that sit in front of a merge, and the repository settings that back the PR Quality Gate rubric. Use it when you set up review for a repo, or when you need to explain who is allowed to say yes.

Think of review as layers, where only the last one is allowed to say yes.

| Layer | When | Who or what decides |
| --- | --- | --- |
| 1. `/review` in Copilot CLI | Before you commit | Copilot suggests; you judge. |
| 2. Copilot code review | On the draft PR | Copilot suggests; you judge. |
| 3. The cloud agent's own checks | If the cloud agent wrote the code | Checks inform; a human decides. |
| 4. A human approves | Before merge | A human approver. |

Keep approvals with people, at least until you've measured how Copilot's reviews perform.

## Layer 1: `/review` in Copilot CLI

`/review` analyses your local changes before you commit. You can narrow it with a path or a prompt. Use it to catch the obvious before anyone else spends time on the change. See [prompt 08](../prompts/08-review-diff.md).

## Layer 2: Copilot code review on the draft PR

- Request it under **Reviewers** on a pull request, or turn on automatic review.
- By default it leaves a **Comment** review, not an **Approve**. That means it doesn't count toward required approvals.
- Comments are labelled High, Medium or Low severity, and often include a suggested change.
- It follows your repository's custom instructions. Put your review rules in [code-review.instructions.md](../.github/instructions/code-review.instructions.md) or the Review rules section of your brief.
- Review effort levels:
  - **Lite:** a standard review.
  - **Balanced:** deeper analysis of complex logic, security-sensitive code and cross-service changes. This is the default.
  - **Max:** the highest-effort review, using multiple high-reasoning models.
  - **Adaptive:** Copilot chooses the level based on the complexity and risk of the pull request. In public preview.

Treat its comments as input to your [risk review](risk-review-checklist.md), not a replacement for it.

## Layer 3: the cloud agent's own checks

If Copilot's cloud agent wrote the code:

- By default it checks the code it generates with CodeQL, checks new dependencies against the GitHub Advisory Database, uses secret scanning, and gets a second opinion with Copilot code review. It doesn't need a GitHub Advanced Security licence for this.
- Its draft pull requests must be reviewed and merged by a human. It can't mark them ready for review, and it can't approve or merge.
- By default, workflows don't run on its changes until a user with write access clicks **Approve and run workflows**.
- The user who asked it to create a pull request can't approve that pull request.
- When it opens a pull request under its own app identity, one more approval is required, as long as the repository already requires at least one.
- It is subject to branch protections and required checks.

These checks reduce risk. They don't replace your rubric score.

## Layer 4: a human approves

A person reads the test diff before the code diff, scores the PR with the [rubric](pr-quality-gate-rubric.md) and approves. Merge at 10 or more out of 12 with no zeros.

## Ruleset settings that back the rubric

Use this as a checklist for one repository.

- [ ] A branch ruleset on the default branch.
- [ ] Required approvals.
- [ ] Required status checks for your verify command.
- [ ] **Automatically request Copilot code review** turned on, with these options as you need them:
  - [ ] **Review new pushes.** If you don't select this, Copilot reviews the pull request once.
  - [ ] **Review draft pull requests.**

To set up automatic review for a repository: in the repository's **Settings**, under **Rulesets**, create a new branch ruleset and, under **Branch rules**, select **Automatically request Copilot code review**.

Individuals can also enable automatic review for their own pull requests in their Copilot settings, under **Code review**. A pull request can qualify for automatic review from user settings, repository rulesets or organisation rulesets. Copilot still posts a single review.

**TODO:** confirm the exact labels in your organisation's settings.

Instructions guide; rulesets enforce.

## Links

- [Configure Copilot code review](https://docs.github.com/copilot/how-tos/copilot-on-github/set-up-copilot/configure-code-review)
- [Risks and mitigations for Copilot](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/risks-and-mitigations)
- [VS Code: test-driven development guide](https://code.visualstudio.com/docs/agents/guides/test-driven-development-guide)
- [VS Code: test code with AI](https://code.visualstudio.com/docs/agents/guides/test-code-with-ai)
