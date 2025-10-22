# Feature: AI Developer Workflows (ADW) Implementation

## Feature Description

Implement an AI Developer Workflow (ADW) system that automates GitHub issue processing from classification → planning → implementation → testing → PR creation. ADW integrates Claude Code CLI with GitHub to autonomously handle bug fixes, feature implementations, and maintenance tasks.

The system will:
- Automatically classify GitHub issues by type (bug, feature, chore)
- Generate detailed implementation plans in specs/*.md format
- Implement solutions based on plans
- Run comprehensive test suites
- Create semantic commits and pull requests
- Support continuous monitoring via cron or webhook triggers

## User Story

As a **development team**
I want to **automate GitHub issue processing with AI-powered planning and implementation**
So that **we can accelerate development velocity, maintain consistency, and reduce manual overhead while ensuring high-quality code through automated testing and validation**

## Problem Statement

Currently, processing GitHub issues requires manual effort for:
1. Issue classification and prioritization
2. Implementation planning and specification
3. Code implementation following project conventions
4. Test creation and validation
5. Git workflow management (branching, commits, PRs)

This creates bottlenecks, inconsistency in approach, and overhead that slows down development cycles.

## Solution Statement

Implement the ADW (AI Developer Workflow) system from the tac-5 reference implementation, adapted for this project's Bun + Next.js + React + TypeScript stack. The system will:

1. **Core ADW Modules** (Python with uv):
   - `adw_modules/agent.py` - Claude Code CLI integration
   - `adw_modules/github.py` - GitHub API operations
   - `adw_modules/git_ops.py` - Git branching, commits, PRs
   - `adw_modules/workflow_ops.py` - Planning and implementation logic
   - `adw_modules/state.py` - Workflow state management
   - `adw_modules/data_types.py` - Pydantic models for type safety
   - `adw_modules/utils.py` - Shared utilities

2. **Main Scripts**:
   - `adw_plan.py` - Planning phase (classify + generate plan)
   - `adw_build.py` - Implementation phase
   - `adw_test.py` - Testing phase
   - `adw_plan_build.py` - Combined plan + build
   - `adw_plan_build_test.py` - Full pipeline

3. **Triggers**:
   - `adw_triggers/trigger_cron.py` - Continuous monitoring (polls every 20s)
   - `adw_triggers/trigger_webhook.py` - GitHub webhook server

4. **Claude Code Commands**:
   - `/classify_adw` - Issue classification
   - `/bug`, `/feature`, `/chore` - Plan generation (adapted for Bun/Next.js)
   - `/implement` - Implementation execution
   - `/test` - Test suite execution (adapted for Bun)
   - `/commit`, `/pull_request` - Git operations

**Tech Stack Compliance**: This solution uses:
- **Python with uv** for ADW automation scripts (following reference implementation pattern)
- **Existing project stack** (Bun, Next.js 15, React 19, TypeScript, Tailwind CSS v4) for implementation
- **No new runtime dependencies** for the main codebase
- **New ADW-specific dependencies**: `pydantic`, `python-dotenv`, `requests` (Python only, isolated in adws/)

**Why Python for ADW**: Following the proven tac-5 pattern where ADW orchestration uses Python + uv for automation, while the actual codebase uses its native stack (Bun/Next.js in our case).

## Relevant Files

### Existing Files to Modify

**`.claude/commands/bug.md`** - Bug planning command
- Update validation commands from `uv run pytest` to `bun test`
- Update file paths from `app/server/**` and `app/client/**` to our Next.js structure
- Adapt for Bun + Next.js stack

**`.claude/commands/feature.md`** - Feature planning command
- Already properly configured for our stack
- Update relevant files section to match ADW pattern
- Add ADW-specific variables ($1, $2, $3)

**`.claude/commands/chore.md`** - Chore planning command
- Update for Next.js App Router structure
- Ensure Bun command compatibility

**`.claude/commands/implement.md`** - Implementation command
- Already simple and stack-agnostic
- Keep as-is

**`.claude/commands/commit.md`** - Commit message generation
- Review and ensure semantic commit format
- Keep existing implementation

**`.claude/commands/pull_request.md`** - PR creation
- Review and ensure GitHub CLI integration
- Keep existing implementation

**`.gitignore`** - Add ADW-generated files
- Add `agents/` directory
- Add `adws/.venv/`
- Add ADW state files

### New Files

**ADW Core Modules** (`adws/adw_modules/`):
- `__init__.py` - Module initialization
- `agent.py` - Claude Code CLI execution wrapper
- `data_types.py` - Pydantic models (ADWState, GitHubIssue, IssueClass, etc.)
- `github.py` - GitHub API operations (fetch issues, create comments, manage PRs)
- `git_ops.py` - Git operations (branching, commits, pushing)
- `state.py` - State management for workflow chaining
- `utils.py` - Logging, file operations, utilities
- `workflow_ops.py` - Core workflow operations (classify, plan, build)

**Main ADW Scripts** (`adws/`):
- `adw_plan.py` - Planning phase orchestrator
- `adw_build.py` - Implementation phase orchestrator
- `adw_test.py` - Testing phase orchestrator
- `adw_plan_build.py` - Combined plan + build workflow
- `adw_plan_build_test.py` - Full pipeline workflow
- `README.md` - ADW system documentation
- `pyproject.toml` - Python dependencies (uv managed)

**Trigger Scripts** (`adws/adw_triggers/`):
- `__init__.py` - Module initialization
- `trigger_cron.py` - Continuous monitoring (polls GitHub every 20s)
- `trigger_webhook.py` - GitHub webhook server (port 8001)

**Test Files** (`adws/adw_tests/`):
- `__init__.py` - Module initialization
- `health_check.py` - System health validation

**Claude Commands** (`.claude/commands/`):
- `classify_adw.md` - ADW workflow extraction and classification
- `test.md` - Test execution for Bun stack
- `find_plan_file.md` - Plan file discovery helper
- `generate_branch_name.md` - Branch naming helper

**Documentation** (`ai_docs/`):
- `adw_implementation_guide.md` - Copy of reference guide
- `testing_strategy_feedback_loops.md` - Testing methodology (optional)
- `feedback_loops_example_walkthrough.md` - Testing examples (optional)

## Implementation Plan

**IMPORTANT**: ADW automation uses Python + uv (isolated in `adws/`), while the codebase uses Bun + Next.js + React + TypeScript.

### Phase 1: Foundation (Setup & Dependencies)

1. **Directory Structure**: Create `adws/`, `adws/adw_modules/`, `adws/adw_triggers/`, `adws/adw_tests/`
2. **Python Environment**: Initialize uv project in `adws/` with `pyproject.toml`
3. **Dependencies**: Add `pydantic`, `python-dotenv`, `requests` to ADW project
4. **Environment**: Configure `.env` with `GITHUB_REPO_URL`, `ANTHROPIC_API_KEY`, `CLAUDE_CODE_PATH`
5. **Git Ignore**: Add ADW-generated files to `.gitignore`

### Phase 2: Core Implementation (ADW Modules)

1. **Data Types** (`adw_modules/data_types.py`):
   - Pydantic models for type safety
   - ADWState, GitHubIssue, IssueClassSlashCommand
   - AgentPromptRequest, AgentPromptResponse

2. **Agent Integration** (`adw_modules/agent.py`):
   - Claude Code CLI wrapper
   - JSONL output parsing
   - Error handling and validation

3. **GitHub Integration** (`adw_modules/github.py`):
   - Issue fetching via `gh` CLI
   - Comment creation
   - Repository URL extraction

4. **Git Operations** (`adw_modules/git_ops.py`):
   - Branch creation and management
   - Commit creation with semantic messages
   - PR creation and updates via `gh` CLI

5. **State Management** (`adw_modules/state.py`):
   - JSON-based state persistence
   - State loading/saving for workflow chaining
   - Pipe-based state passing between scripts

6. **Workflow Operations** (`adw_modules/workflow_ops.py`):
   - Issue classification logic
   - Plan generation coordination
   - Build execution coordination
   - File discovery and path resolution

7. **Utilities** (`adw_modules/utils.py`):
   - Logger setup
   - File operations
   - ID generation

### Phase 3: Integration (Scripts & Commands)

1. **Main Scripts**:
   - `adw_plan.py` - Orchestrates planning workflow
   - `adw_build.py` - Orchestrates implementation workflow
   - `adw_test.py` - Orchestrates testing workflow
   - `adw_plan_build.py` - Chains plan + build
   - `adw_plan_build_test.py` - Full pipeline

2. **Trigger Scripts**:
   - `trigger_cron.py` - Continuous monitoring
   - `trigger_webhook.py` - GitHub webhook receiver

3. **Claude Commands** (Adapt for Bun/Next.js):
   - Update `/bug`, `/feature`, `/chore` with:
     - Correct file paths for Next.js App Router
     - Bun test commands instead of pytest
     - Widget-specific validation
   - Add `/classify_adw` for workflow extraction
   - Update `/test` for Bun test runner

4. **Documentation**:
   - ADW README in `adws/`
   - Implementation guide in `ai_docs/`
   - Update main README with ADW section

## Step by Step Tasks

### Step 1: Initialize ADW Directory Structure
- Create `adws/` directory in project root
- Create `adws/adw_modules/` for core modules
- Create `adws/adw_triggers/` for automation triggers
- Create `adws/adw_tests/` for ADW system tests
- Create `agents/` directory for Claude Code output (add to .gitignore)

### Step 2: Set Up Python Environment
- Navigate to `adws/` directory
- Run `uv init` to initialize Python project
- Create `pyproject.toml` with:
  - Project name: "adws"
  - Python version: >=3.10
  - Dependencies: pydantic>=2.0.0, python-dotenv>=1.0.0, requests>=2.31.0
  - Dev dependencies: pytest>=7.4.0, ruff>=0.1.0
- Add ruff and pytest configuration sections

### Step 3: Copy Reference Implementation Core Modules
- Copy from `/Users/tjmcgovern/tac/tac-5/adws/adw_modules/`:
  - `__init__.py`
  - `agent.py` - Claude Code CLI integration
  - `data_types.py` - Pydantic models
  - `github.py` - GitHub API operations
  - `git_ops.py` - Git operations
  - `state.py` - State management
  - `utils.py` - Utilities
  - `workflow_ops.py` - Workflow operations
- Review each file for tac-5 specific paths and update for this project

### Step 4: Copy Main ADW Scripts
- Copy from `/Users/tjmcgovern/tac/tac-5/adws/`:
  - `adw_plan.py`
  - `adw_build.py`
  - `adw_test.py`
  - `adw_plan_build.py`
  - `adw_plan_build_test.py`
  - `README.md`
- Update shebang to use `uv run` syntax
- Add inline dependencies metadata using `# /// script` format

### Step 5: Copy Trigger Scripts
- Copy from `/Users/tjmcgovern/tac/tac-5/adws/adw_triggers/`:
  - `__init__.py`
  - `trigger_cron.py`
  - `trigger_webhook.py`
- Update for project-specific configuration

### Step 6: Adapt Claude Commands for Bun/Next.js Stack
- **Update `.claude/commands/bug.md`**:
  - Change "Relevant Files" section to reference Next.js structure
  - Update validation commands:
    - Replace `cd app/server && uv run pytest` with `bun test`
    - Replace `cd app/client && bun tsc --noEmit` with `bun run build` (Next.js does type checking)
    - Add `bun run lint` for ESLint validation
    - Add `bun run build:widget` for widget builds if affected
  - Add ADW variables: `issue_number: $1`, `adw_id: $2`, `issue_json: $3`
  - Update filename format: `issue-{issue_number}-adw-{adw_id}-sdlc_planner-{descriptive-name}.md`

- **Update `.claude/commands/feature.md`**:
  - Add ADW variables: `issue_number: $1`, `adw_id: $2`, `issue_json: $3`
  - Update filename format: `issue-{issue_number}-adw-{adw_id}-sdlc_planner-{descriptive-name}.md`
  - Add instruction to extract feature from `issue_json` variable
  - Ensure validation commands match our stack (already correct)

- **Update `.claude/commands/chore.md`** (copy from tac-5 and adapt):
  - Create new file based on tac-5 pattern
  - Adapt for Next.js structure
  - Use Bun commands for validation
  - Add ADW variables

### Step 7: Add New Claude Commands
- **Create `.claude/commands/classify_adw.md`**:
  - Copy from tac-5
  - No project-specific changes needed (analyzes text for ADW commands)

- **Create `.claude/commands/test.md`**:
  - Adapt from tac-5 pattern
  - Update test execution for Bun:
    - Linting: `bun run lint`
    - Type checking: `bun run build` (Next.js handles types)
    - Unit tests: `bun test`
    - Widget build: `bun run build:widget`
  - Remove Python pytest commands
  - Keep test result reporting format

- **Create `.claude/commands/find_plan_file.md`**:
  - Copy from tac-5 (searches specs/ for plans)
  - No changes needed

- **Create `.claude/commands/generate_branch_name.md`**:
  - Copy from tac-5 (generates semantic branch names)
  - No changes needed

### Step 8: Update .gitignore
- Add ADW-specific entries:
  ```
  # ADW (AI Developer Workflow)
  agents/
  adws/.venv/
  adws/__pycache__/
  adws/**/__pycache__/
  adws/**/*.pyc
  ```

### Step 9: Create ADW Documentation
- **Create `adws/README.md`**:
  - Copy structure from tac-5
  - Update for Bun/Next.js specifics
  - Document usage, setup, troubleshooting
  - Include examples for this project

- **Copy to `ai_docs/adw_implementation_guide.md`**:
  - Copy the reference guide for future use
  - Serves as canonical reference

### Step 10: Configure Environment Variables
- Create `.env.example` in project root with:
  ```bash
  # ADW Configuration
  GITHUB_REPO_URL="https://github.com/YOUR-USERNAME/ask-anything-ui"
  ANTHROPIC_API_KEY="sk-ant-xxxxx"
  CLAUDE_CODE_PATH="claude"  # Optional, defaults to "claude"
  GITHUB_PAT="ghp_xxxxx"     # Optional, only if different from gh auth
  ```
- Document in main README.md

### Step 11: Create Health Check Test
- Create `adws/adw_tests/health_check.py`:
  - Verify environment variables
  - Test GitHub CLI access
  - Test Claude Code CLI access
  - Validate directory structure
  - Check Python dependencies

### Step 12: Test ADW Installation
- Run health check: `cd adws && uv run adw_tests/health_check.py`
- Verify all dependencies installed
- Test GitHub auth: `gh auth status`
- Test Claude Code: `claude --version`
- Validate environment variables set

### Step 13: Update Main README
- Add "AI Developer Workflow (ADW)" section with:
  - Quick start guide
  - Available commands
  - Setup instructions
  - Link to `adws/README.md`

### Step 14: Create First Test Issue
- Create GitHub issue manually for testing
- Title: "Test ADW Setup"
- Body: "Testing AI Developer Workflow automation system"
- Label: Test issue for validation

### Step 15: Run First ADW Workflow
- Test planning phase: `cd adws && uv run adw_plan.py <issue-number>`
- Verify plan file created in `specs/`
- Verify branch created
- Verify PR created
- Review plan quality and accuracy

### Step 16: Validate Full Pipeline
- Run full pipeline: `cd adws && uv run adw_plan_build_test.py <issue-number>`
- Verify all phases complete successfully
- Check commits are semantic and descriptive
- Review PR description and links
- Ensure tests pass
- Validate zero regressions

### Step 17: Run Validation Commands
- Execute all validation commands to ensure ADW works correctly with zero regressions
- Verify no existing functionality broken
- Check all tests pass
- Ensure builds complete successfully

## Testing Strategy

### Unit Tests

**ADW Module Tests** (`adws/adw_tests/test_*.py`):
- Test `agent.py`: Claude Code CLI execution, JSONL parsing, error handling
- Test `github.py`: Issue fetching, comment creation, API interactions (mock GitHub CLI)
- Test `git_ops.py`: Branch operations, commit creation, PR management (mock git commands)
- Test `state.py`: State persistence, loading, JSON serialization
- Test `workflow_ops.py`: Classification logic, plan generation, file discovery
- Test `data_types.py`: Pydantic model validation, serialization

**Integration Tests**:
- Test `adw_plan.py` end-to-end with mock GitHub issue
- Test `adw_build.py` with existing plan file
- Test state chaining between scripts (plan → build → test)
- Test trigger scripts with mock webhook events

### Edge Cases

1. **Invalid Environment**:
   - Missing ANTHROPIC_API_KEY
   - Missing GITHUB_REPO_URL
   - Claude Code CLI not installed
   - GitHub CLI not authenticated

2. **Issue Processing**:
   - Issue not found
   - Issue already processed (idempotency)
   - Malformed issue body
   - Empty issue description

3. **Plan Generation**:
   - Plan file already exists
   - Invalid specs/ directory permissions
   - Classification fails (unclear issue type)

4. **Git Operations**:
   - Branch already exists
   - Merge conflicts
   - PR already exists for branch
   - Git authentication failures

5. **State Management**:
   - Corrupted state JSON
   - Missing state file for build phase
   - State version mismatches

6. **Test Execution**:
   - Build failures during test phase
   - Test suite failures
   - Widget build failures

## Acceptance Criteria

1. **Setup Complete**:
   - [ ] ADW directory structure created
   - [ ] Python environment initialized with uv
   - [ ] All dependencies installed
   - [ ] Environment variables configured
   - [ ] Health check passes

2. **Core Modules Functional**:
   - [ ] Claude Code CLI integration works
   - [ ] GitHub API operations succeed
   - [ ] Git operations create branches, commits, PRs
   - [ ] State management persists and loads correctly
   - [ ] Workflow operations classify and plan successfully

3. **Scripts Operational**:
   - [ ] `adw_plan.py` generates valid plans
   - [ ] `adw_build.py` implements plans correctly
   - [ ] `adw_test.py` runs Bun test suite
   - [ ] `adw_plan_build.py` chains plan + build
   - [ ] `adw_plan_build_test.py` runs full pipeline

4. **Commands Adapted**:
   - [ ] `/bug`, `/feature`, `/chore` generate plans for Bun/Next.js stack
   - [ ] `/classify_adw` extracts workflow information
   - [ ] `/test` runs Bun test commands
   - [ ] `/implement` executes plans correctly
   - [ ] `/commit` and `/pull_request` create semantic commits/PRs

5. **End-to-End Validation**:
   - [ ] Process test GitHub issue successfully
   - [ ] Plan file created in correct format
   - [ ] Implementation follows project conventions
   - [ ] Tests pass with zero regressions
   - [ ] PR created with proper description and links
   - [ ] Branch naming follows convention

6. **Documentation Complete**:
   - [ ] `adws/README.md` documents usage
   - [ ] Main README updated with ADW section
   - [ ] `.env.example` includes ADW variables
   - [ ] Implementation guide available in `ai_docs/`

## Validation Commands

Execute every command to validate the feature works correctly with zero regressions.

### ADW System Validation

```bash
# 1. Verify Python environment
cd adws/
uv run python -c "import sys; print(f'Python {sys.version}')"

# 2. Test imports
uv run python -c "from adw_modules.agent import execute_agent; print('✅ Imports working')"

# 3. Run health check
uv run python adw_tests/health_check.py

# 4. Verify GitHub CLI
gh auth status
gh issue list --repo YOUR-USERNAME/ask-anything-ui

# 5. Verify Claude Code CLI
claude --version

# 6. Test classification
claude /classify_adw "Test issue for ADW"
```

### End-to-End ADW Workflow

```bash
# 7. Create test issue
gh issue create --repo YOUR-USERNAME/ask-anything-ui \
  --title "Test ADW System" \
  --body "Validate AI Developer Workflow automation"

# 8. Run planning phase
cd adws/
uv run adw_plan.py <issue-number>

# 9. Verify plan file created
ls -la ../specs/issue-*-adw-*

# 10. Run full pipeline
uv run adw_plan_build_test.py <issue-number>

# 11. Check PR created
gh pr list --repo YOUR-USERNAME/ask-anything-ui
```

### Existing Codebase Validation (Zero Regressions)

```bash
# 12. Run all existing tests
bun test

# 13. Ensure linting passes
bun run lint

# 14. Verify Next.js build
bun run build

# 15. Verify widget build
bun run build:widget

# 16. Type checking (via Next.js build)
# Already validated in step 14

# 17. Run development server
bun run dev
# Manually verify: http://localhost:3000 loads correctly
```

### ADW-Generated Code Validation

```bash
# 18. Checkout ADW-generated branch
git checkout <adw-branch-name>

# 19. Run tests on ADW branch
bun test

# 20. Verify build on ADW branch
bun run build

# 21. Review PR
gh pr view <pr-number> --web
# Manually verify:
# - PR description is clear
# - Commits are semantic
# - Files changed are appropriate
# - Tests pass in CI
```

## Notes

### Architecture Decisions

1. **Python + uv for ADW**: Following the proven tac-5 pattern where orchestration uses Python for reliability and simplicity, while implementation uses the project's native stack (Bun/Next.js).

2. **State Management**: JSON-based state enables pipe-chaining between scripts (`adw_plan.py | adw_build.py`) for flexible workflow composition.

3. **Modularity**: Separate modules (`agent.py`, `github.py`, `git_ops.py`) enable testing, reuse, and maintenance.

4. **Claude Code Integration**: Uses CLI directly rather than API for better compatibility with existing commands and workflows.

### Future Enhancements

1. **Webhook Server**: Enable real-time processing via GitHub webhooks (optional)
2. **Continuous Monitoring**: Cron-based polling for automatic issue processing (optional)
3. **E2E Test Generation**: Extend to auto-generate E2E tests for UI changes
4. **Metrics Tracking**: Log time saved, success rates, issue processing stats
5. **Multi-Agent Coordination**: Specialized agents for different issue types
6. **PR Review Automation**: Auto-review and suggest improvements

### Dependencies Justification

**Python Dependencies** (isolated in `adws/`):
- `pydantic>=2.0.0` - Type-safe data models, validation, JSON serialization
- `python-dotenv>=1.0.0` - Environment variable management
- `requests>=2.31.0` - HTTP requests (potential GitHub API fallback)
- `pytest>=7.4.0` - ADW module testing (dev)
- `ruff>=0.1.0` - Python linting (dev)

**No main codebase dependencies added** - ADW is completely isolated.

### Prerequisites

Before implementation, ensure:
1. GitHub CLI installed and authenticated: `gh auth login`
2. Claude Code CLI installed: `claude --version`
3. Python 3.10+ available for uv
4. uv installed: `curl -LsSf https://astral.sh/uv/install.sh | sh`
5. Environment variables configured in `.env`

### Reference Implementation

Heavily based on `/Users/tjmcgovern/tac/tac-5` with adaptations for:
- Bun instead of npm/yarn
- Next.js App Router instead of separate client/server
- Bun test instead of pytest for main codebase
- Widget builds with Bun bundler
- Tailwind CSS v4 conventions

### Security Considerations

- Store API keys in `.env` (never commit)
- Use GitHub fine-grained tokens with minimal permissions
- Set up branch protection rules
- Require PR reviews for ADW-generated changes
- Monitor API usage and set billing alerts
- Validate ADW outputs before merging

### Troubleshooting Resources

- ADW README: `adws/README.md`
- Implementation Guide: `ai_docs/adw_implementation_guide.md`
- Health Check: `adws/adw_tests/health_check.py`
- Claude Code Docs: https://docs.anthropic.com/en/docs/claude-code
- GitHub CLI Docs: https://cli.github.com/
- uv Docs: https://docs.astral.sh/uv/
