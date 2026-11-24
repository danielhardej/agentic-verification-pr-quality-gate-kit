# Verification loop checklist

This is the loop for closing a development task with an agent: Baseline, Red, Green, Refactor, Review, Merge. Use it for any change where an agent writes or edits code, so you have evidence at every step and a human checkpoint between steps.

Writing code is cheap. Proof isn't. A passing suite is evidence, not proof.

Use a separate request for each phase, with a review checkpoint before the next. One agent can handle all three of red, green and refactor, but separate requests keep you involved. Don't ask the agent to implement the whole feature at once.

## The loop

| Stage | Ask the agent to | Evidence before you continue | Who decides |
| --- | --- | --- | --- |
| Baseline | Find the test commands and run the related tests. No edits. | Existing failures are recorded, so new ones stand out. | You. |
| Red | Add one focused test for one behaviour. Don't implement it. | It runs, and fails because the behaviour is missing, not because of an import or config error. | You. |
| Green | Make the smallest change to pass. Don't weaken, skip or re-baseline. | The new test and the related suite pass; the test means the same thing. | You. |
| Refactor | Improve the structure only if it's needed. Same behaviour. | Still green, assertions unchanged, diff in scope. | You. |
| Review | `/review` locally, then Copilot code review on the draft PR. | Findings addressed or answered; the risk review done by a person. | Copilot suggests; you judge. |
| Merge | Nothing: this one is human. | Rubric score of 10 or more with no zeros; required checks green. | A human approver. |

Prompts for each stage are in the [prompt pack](../prompts/README.md): [01 baseline](../prompts/01-baseline.md), [02 red](../prompts/02-red.md), [03 green](../prompts/03-green.md), [04 refactor](../prompts/04-refactor.md) and [08 review](../prompts/08-review-diff.md).

## Things that go wrong

**If the red test passes straight away,** the behaviour may already exist. Don't break working code to manufacture a red.

**If a refactor needs an assertion changed,** the test depends on implementation details, or the behaviour is changing. Stop and work out which.

**Found a gap in review?** It becomes the next red test, not a quick patch.

**A test fails and you don't know why?** Don't accept another edit yet. Work out whether the cause is setup, the expectation or the implementation. See [failing-test triage](failing-test-triage.md).

**Tests are green but you don't trust them?** See [green is not correct](green-is-not-correct.md).

## At the merge step

Score the PR with the [PR Quality Gate rubric](pr-quality-gate-rubric.md). Merge at 10 or more out of 12 with no zeros. The review layers are explained in [review layers and settings](review-layers-and-settings.md), and the human risk review is in the [risk review checklist](risk-review-checklist.md).

## Printable checklist

Print this page or copy the list below into your story.

```markdown
## Verification loop

Story: ______________________   Spec: ______________________

Baseline
- [ ] Test commands found; focused and related suite named
- [ ] Related tests run with no edits
- [ ] Existing failures and skips recorded: ______________________

Red (one behaviour)
- [ ] One focused test added; behaviour not implemented
- [ ] Expected value written from the spec, not calculated
- [ ] Test runs and fails because the behaviour is missing (not setup)
- [ ] I read the test and the failure output

Green
- [ ] Smallest change made
- [ ] No assertion weakened, no test skipped or deleted, no expected value changed
- [ ] New test and related suite pass
- [ ] I read the test diff before the code diff

Refactor (only if needed)
- [ ] Still green, assertions unchanged
- [ ] Diff stays inside the plan's fence

Review
- [ ] /review run locally; findings addressed or answered
- [ ] Copilot code review run on the draft PR; findings addressed or answered
- [ ] Risk review done by a person (tests, scope, data, dependencies, contracts, evidence)

Merge
- [ ] PR Quality Gate score: ___ / 12, no zeros
- [ ] Required checks green
- [ ] A human approver has read the diff
```
