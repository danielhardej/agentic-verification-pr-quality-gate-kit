# Risk review checklist

This is the checklist a person uses to review a pull request that an agent wrote or helped write. Use it after Copilot's review and before you score the PR with the [rubric](pr-quality-gate-rubric.md).

Copilot clears the obvious; people judge the risk.

The same six zones are in [code-review.instructions.md](../.github/instructions/code-review.instructions.md), phrased as instructions to a reviewer.

## The six zones

### 1. Tests

Read the test diff first.

- Did any assertion, expected value or skip change?
- Was any test deleted or loosened, for example `toBe` changed to a range?
- Does each expected value come from the spec, and does a comment cite the criterion?
- Are the unhappy paths and the boundaries covered?

### 2. Scope

- Does every changed file match the plan's fence (In scope, Ask first, Never)?
- Is anything in a protected area, such as code that produces real bills?
- Is there unrelated refactoring mixed into the change?

### 3. Data and secrets

- Are there credentials, NMIs or personal information in code, fixtures or logs?
- Does any new log line include request data that could identify a customer?
- Do fixtures use placeholders such as `NMI_REDACTED`?

### 4. Dependencies

- Is there a new package? If so, why?
- Was there already a convention for this, such as zod for validation at the edge?
- Has the new package been checked for known advisories?

### 5. Contracts

- Did an API shape, error format or schema change?
- Does anything other teams depend on behave differently?
- Is there a contract note if it does?

### 6. Evidence

- Is CI green?
- Does the PR show which criteria it covers?
- Is the actual test output in the description, with the command that produced it?

## A 5-minute review routine

1. **Minute 1: the description.** Does it map criteria to tests and show the output? If not, ask for both before you read on.
2. **Minute 2: the file list.** Compare it to the plan's fence. Note any file you didn't expect.
3. **Minutes 2 to 3: the test diff.** Check every changed assertion, expected value, skip and deleted test.
4. **Minute 4: the code diff.** Look for new dependencies, new log lines and changed shapes.
5. **Minute 5: score and decide.** Fill in the [scorecard](pr-quality-gate-rubric.md#scorecard). Merge at 10 or more out of 12 with no zeros. Otherwise use [the send-it-back comments](../prompts/10-send-it-back.md).

Want to practise? Try the [guided exercise](../exercises/risk-review-an-agent-pr.md).
