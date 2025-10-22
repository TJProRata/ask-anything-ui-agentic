# Test Execution

Run the project's test suite and report results. Follow the `Instructions` to execute tests properly and use the `Report` section to document the results.

## Variables
issue_number: $1
adw_id: $2

## Instructions

- Run all tests in the test execution sequence below
- Collect results for each test category
- If any tests fail, document the failures with details
- Create a comprehensive test report
- Follow the `Report` section to properly report the results

## Test Execution Sequence

Execute tests in this exact order:

### 1. Linting
- Command: `bun run lint`
- test_name: "linting"
- Purpose: Validate code style and catch common errors
- Success Criteria: No linting errors

### 2. Type Checking
- Command: `bun run build`
- test_name: "type_check"
- Purpose: Verify TypeScript types and Next.js build
- Success Criteria: Build completes successfully (Next.js handles type checking during build)
- Note: Next.js build includes TypeScript validation

### 3. Unit Tests
- Command: `bun test`
- test_name: "unit_tests"
- Purpose: Run all unit and integration tests
- Success Criteria: All tests pass

### 4. Widget Build
- Command: `bun run build:widget`
- test_name: "widget_build"
- Purpose: Verify widget bundle builds successfully
- Success Criteria: Widget bundle created in dist/ directory

## Test Result Format

For each test, capture:
- test_name: The name from above
- command: The exact command run
- exit_code: The process exit code
- output: The test output (truncated if very long)
- status: "passed" or "failed"
- duration: Time taken to run the test

## Report

Create a comprehensive test report including:

### Test Summary
- Total tests run: X
- Tests passed: X
- Tests failed: X
- Overall status: PASS/FAIL

### Test Details

For each test category, report:

**{test_name}**
- Command: `{command}`
- Status: {passed/failed}
- Duration: {time}
- Exit Code: {code}

If failed, include:
- Error output
- Failure details
- Suggested fixes

### Failures (if any)

If tests failed:
- List all failed tests
- Include error messages
- Provide context and suggestions for fixes

### Next Steps

- If all tests passed: "✅ All tests passed. Ready to proceed."
- If tests failed: "❌ {X} test(s) failed. See details above. Fix failures before proceeding."

## Example Output

```
# Test Report for Issue #{issue_number} (ADW ID: {adw_id})

## Test Summary
- Total tests run: 4
- Tests passed: 4
- Tests failed: 0
- Overall status: PASS

## Test Details

**Linting**
- Command: `bun run lint`
- Status: passed
- Duration: 2.3s
- Exit Code: 0

**Type Checking**
- Command: `bun run build`
- Status: passed
- Duration: 12.5s
- Exit Code: 0

**Unit Tests**
- Command: `bun test`
- Status: passed
- Duration: 5.1s
- Exit Code: 0
- Tests: 45 passed, 45 total

**Widget Build**
- Command: `bun run build:widget`
- Status: passed
- Duration: 3.8s
- Exit Code: 0

## Next Steps
✅ All tests passed. Ready to proceed.
```
