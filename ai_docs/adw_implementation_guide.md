# ADW Implementation Guide - Add to Any Project

## Overview

This guide walks you through adding the **AI Developer Workflow (ADW)** system to any project. ADW automates GitHub issue processing from classification → planning → implementation → testing → PR creation.

---

## Prerequisites

### 1. Required Tools

```bash
# GitHub CLI
brew install gh              # macOS
# sudo apt install gh        # Ubuntu/Debian
# winget install --id GitHub.cli  # Windows

# Authenticate
gh auth login

# Claude Code CLI
# Install from: https://docs.anthropic.com/en/docs/claude-code

# Python with uv
curl -LsSf https://astral.sh/uv/install.sh | sh  # macOS/Linux
# powershell -c "irm https://astral.sh/uv/install.ps1 | iex"  # Windows

# Verify installations
gh --version
claude --version
uv --version
```

### 2. Required Environment Variables

```bash
# Add to your shell profile (~/.zshrc, ~/.bashrc, etc.)
export GITHUB_REPO_URL="https://github.com/YOUR-USERNAME/YOUR-REPO"
export ANTHROPIC_API_KEY="sk-ant-xxxxx"
export CLAUDE_CODE_PATH="claude"  # Optional, defaults to "claude"
export GITHUB_PAT="ghp_xxxxx"     # Optional, only if different from gh auth
```

### 3. GitHub Repository Setup

Your repository should have:
- Issues enabled
- Branch protection rules (recommended)
- CI/CD pipeline (recommended)

---

## Step 1: Copy Core ADW Files

### 1.1: Create Directory Structure

```bash
# In your project root
mkdir -p adws/adw_modules
mkdir -p adws/adw_triggers
mkdir -p adws/adw_tests
```

### 1.2: Copy Files from TAC-5

Copy these files from the TAC-5 project to your new project:

#### Core Modules (adws/adw_modules/)
```bash
# From TAC-5 to YOUR-PROJECT
cp adws/adw_modules/__init__.py          YOUR-PROJECT/adws/adw_modules/
cp adws/adw_modules/agent.py             YOUR-PROJECT/adws/adw_modules/
cp adws/adw_modules/data_types.py        YOUR-PROJECT/adws/adw_modules/
cp adws/adw_modules/github.py            YOUR-PROJECT/adws/adw_modules/
cp adws/adw_modules/git_ops.py           YOUR-PROJECT/adws/adw_modules/
cp adws/adw_modules/state.py             YOUR-PROJECT/adws/adw_modules/
cp adws/adw_modules/utils.py             YOUR-PROJECT/adws/adw_modules/
cp adws/adw_modules/workflow_ops.py      YOUR-PROJECT/adws/adw_modules/
```

#### Main Scripts (adws/)
```bash
cp adws/adw_plan.py                      YOUR-PROJECT/adws/
cp adws/adw_build.py                     YOUR-PROJECT/adws/
cp adws/adw_test.py                      YOUR-PROJECT/adws/
cp adws/adw_plan_build.py                YOUR-PROJECT/adws/
cp adws/adw_plan_build_test.py           YOUR-PROJECT/adws/
cp adws/README.md                        YOUR-PROJECT/adws/
```

#### Trigger Scripts (adws/adw_triggers/)
```bash
cp adws/adw_triggers/__init__.py         YOUR-PROJECT/adws/adw_triggers/
cp adws/adw_triggers/trigger_cron.py     YOUR-PROJECT/adws/adw_triggers/
cp adws/adw_triggers/trigger_webhook.py  YOUR-PROJECT/adws/adw_triggers/
```

#### Test Files (adws/adw_tests/) - Optional
```bash
cp adws/adw_tests/__init__.py            YOUR-PROJECT/adws/adw_tests/
cp adws/adw_tests/health_check.py        YOUR-PROJECT/adws/adw_tests/
# Copy other test files as needed
```

---

## Step 2: Set Up Claude Code Commands

### 2.1: Create .claude Directory

```bash
mkdir -p .claude/commands
mkdir -p .claude/commands/e2e
```

### 2.2: Copy Essential Commands

#### Core ADW Commands
```bash
# From TAC-5 to YOUR-PROJECT
cp .claude/commands/classify_adw.md      YOUR-PROJECT/.claude/commands/
cp .claude/commands/bug.md               YOUR-PROJECT/.claude/commands/
cp .claude/commands/feature.md           YOUR-PROJECT/.claude/commands/
cp .claude/commands/chore.md             YOUR-PROJECT/.claude/commands/
cp .claude/commands/implement.md         YOUR-PROJECT/.claude/commands/
cp .claude/commands/commit.md            YOUR-PROJECT/.claude/commands/
cp .claude/commands/pull_request.md      YOUR-PROJECT/.claude/commands/
```

#### Testing Commands
```bash
cp .claude/commands/test.md              YOUR-PROJECT/.claude/commands/
cp .claude/commands/test_e2e.md          YOUR-PROJECT/.claude/commands/
cp .claude/commands/validate_and_fix.md  YOUR-PROJECT/.claude/commands/
cp .claude/commands/pre_commit_validate.md YOUR-PROJECT/.claude/commands/
```

#### Helper Commands
```bash
cp .claude/commands/generate_branch_name.md YOUR-PROJECT/.claude/commands/
cp .claude/commands/find_plan_file.md    YOUR-PROJECT/.claude/commands/
cp .claude/commands/prime.md             YOUR-PROJECT/.claude/commands/
cp .claude/commands/start.md             YOUR-PROJECT/.claude/commands/
```

#### E2E Test Examples
```bash
cp .claude/commands/e2e/test_basic_query.md YOUR-PROJECT/.claude/commands/e2e/
# Copy as templates for your own E2E tests
```

### 2.3: Copy Testing Documentation

```bash
mkdir -p ai_docs

cp ai_docs/testing_strategy_feedback_loops.md YOUR-PROJECT/ai_docs/
cp ai_docs/feedback_loops_example_walkthrough.md YOUR-PROJECT/ai_docs/
cp ai_docs/README_TESTING.md YOUR-PROJECT/ai_docs/
```

---

## Step 3: Customize for Your Project

### 3.1: Update Command Files

Each `.claude/commands/*.md` file references project-specific paths. Update these:

#### In `bug.md`, `feature.md`, `chore.md`:

**Find and replace**:
```markdown
# OLD (TAC-5 specific)
Focus on the following files:
- `README.md` - Contains the project overview and instructions.
- `app/**` - Contains the codebase client/server.
- `scripts/**` - Contains the scripts to start and stop the server + client.
- `adws/**` - Contains the AI Developer Workflow (ADW) scripts.

# NEW (Your project)
Focus on the following files:
- `README.md` - Contains the project overview
- `src/**` - Contains your application code
- `tests/**` - Contains your test files
- `adws/**` - Contains the AI Developer Workflow (ADW) scripts
```

#### In `test.md`:

**Update test commands** to match your project structure:

```markdown
# OLD (TAC-5)
- Command: `cd app/server && uv run pytest tests/ -v --tb=short`

# NEW (Your project - examples)
# Node.js project:
- Command: `npm test`

# Python project:
- Command: `pytest tests/ -v`

# Ruby project:
- Command: `bundle exec rspec`

# Go project:
- Command: `go test ./...`
```

### 3.2: Update Validation Commands

In `bug.md` and `feature.md`, update the validation section:

```markdown
## Validation Commands

# CUSTOMIZE THESE for your project stack

# Python project:
- `pytest tests/ -v`
- `mypy src/`
- `ruff check .`

# Node.js/TypeScript:
- `npm test`
- `npm run lint`
- `npm run type-check`
- `npm run build`

# Ruby:
- `bundle exec rspec`
- `bundle exec rubocop`

# Go:
- `go test ./...`
- `golint ./...`
- `go build`

# Rust:
- `cargo test`
- `cargo clippy`
- `cargo build`
```

### 3.3: Customize Agent Prompts

The ADW agents use Claude Code CLI with custom commands. The commands reference your project structure, so make sure they're accurate.

**Key files to review**:
- `.claude/commands/classify_adw.md` - Issue classification logic
- `.claude/commands/implement.md` - Implementation instructions
- `.claude/commands/bug.md` - Bug fix planning
- `.claude/commands/feature.md` - Feature planning
- `.claude/commands/chore.md` - Chore/maintenance planning

---

## Step 4: Configure Python Dependencies

### 4.1: Create pyproject.toml (if you don't have one)

```bash
cd adws/
uv init
```

### 4.2: Add Dependencies

```bash
cd adws/

# Core dependencies
uv add pydantic          # Data validation
uv add python-dotenv     # Environment variables
uv add requests          # HTTP requests (for GitHub API)

# Optional but recommended
uv add pytest            # Testing
uv add ruff              # Linting
```

### 4.3: Your adws/pyproject.toml should look like:

```toml
[project]
name = "adws"
version = "0.1.0"
description = "AI Developer Workflow automation"
readme = "README.md"
requires-python = ">=3.10"
dependencies = [
    "pydantic>=2.0.0",
    "python-dotenv>=1.0.0",
    "requests>=2.31.0",
]

[project.optional-dependencies]
dev = [
    "pytest>=7.4.0",
    "ruff>=0.1.0",
]

[tool.ruff]
line-length = 100
target-version = "py310"

[tool.pytest.ini_options]
testpaths = ["adw_tests"]
python_files = ["test_*.py"]
```

---

## Step 5: Test Your Setup

### 5.1: Health Check

```bash
cd adws/

# Test Python environment
uv run python -c "import sys; print(f'Python {sys.version}')"

# Test imports
uv run python -c "from adw_modules.agent import execute_agent; print('✅ Imports working')"

# Run health check (if you copied the test file)
uv run python adw_tests/health_check.py
```

### 5.2: Test GitHub Integration

```bash
# Verify GitHub CLI is authenticated
gh auth status

# Test GitHub API access
gh issue list --repo YOUR-USERNAME/YOUR-REPO

# Create a test issue
gh issue create --repo YOUR-USERNAME/YOUR-REPO \
  --title "Test ADW Setup" \
  --body "Testing ADW automation system"
```

### 5.3: Test Claude Code CLI

```bash
# Verify Claude Code works
claude --version

# Test a simple command
claude /prime

# Test ADW classification (requires an issue)
# First, create issue #1 if you don't have one
claude /classify_adw "Test issue for ADW"
```

### 5.4: Run Your First ADW Workflow

```bash
cd adws/

# Process a test issue (replace 1 with your test issue number)
uv run adw_plan.py 1

# Check the generated plan
ls -la specs/

# If plan looks good, run build
uv run adw_build.py

# Or run full pipeline
uv run adw_plan_build.py 1
```

---

## Step 6: Optional Enhancements

### 6.1: Add Pre-Commit Hooks

Create `.git/hooks/pre-commit`:

```bash
#!/bin/bash
# Run validation before committing

echo "🔍 Running pre-commit validation..."

# Run your project's validation
# Customize based on your stack:

# Python:
pytest tests/ || exit 1
ruff check . || exit 1

# Node.js:
# npm test || exit 1
# npm run lint || exit 1

# Ruby:
# bundle exec rspec || exit 1
# bundle exec rubocop || exit 1

echo "✅ Pre-commit validation passed"
```

Make it executable:
```bash
chmod +x .git/hooks/pre-commit
```

### 6.2: Set Up Webhook Server (Optional)

For real-time GitHub event processing:

```bash
# Start webhook server
cd adws/
uv run adw_triggers/trigger_webhook.py

# In another terminal, expose it (using ngrok or similar)
# Install ngrok: brew install ngrok
ngrok http 8001

# Configure GitHub webhook:
# 1. Go to repo Settings → Webhooks → Add webhook
# 2. Payload URL: https://YOUR-NGROK-URL.ngrok.io/gh-webhook
# 3. Content type: application/json
# 4. Select events: Issues, Issue comments
# 5. Save
```

### 6.3: Add Continuous Monitoring (Optional)

For automatic issue processing every 20 seconds:

```bash
cd adws/
uv run adw_triggers/trigger_cron.py

# Keep this running in background or use process manager:
# pm2, supervisor, systemd, etc.
```

---

## Step 7: Project-Specific Customization

### 7.1: Customize Test Commands

Create a project-specific test configuration in `.claude/commands/test.md`:

#### Example: Node.js Project
```markdown
## Test Execution Sequence

### 1. Linting
- Command: `npm run lint`
- test_name: "linting"

### 2. Type Check
- Command: `npm run type-check`
- test_name: "type_check"

### 3. Unit Tests
- Command: `npm test`
- test_name: "unit_tests"

### 4. Build
- Command: `npm run build`
- test_name: "build"
```

#### Example: Python Project
```markdown
## Test Execution Sequence

### 1. Linting
- Command: `ruff check .`
- test_name: "linting"

### 2. Type Check
- Command: `mypy src/`
- test_name: "type_check"

### 3. Unit Tests
- Command: `pytest tests/ -v`
- test_name: "unit_tests"
```

#### Example: Ruby Project
```markdown
## Test Execution Sequence

### 1. Linting
- Command: `bundle exec rubocop`
- test_name: "linting"

### 2. Unit Tests
- Command: `bundle exec rspec`
- test_name: "unit_tests"
```

### 7.2: Customize E2E Tests

Create E2E test templates for your application:

```bash
# Example: Web app E2E test
# .claude/commands/e2e/test_user_login.md

# Test: User Login Flow

## Setup
1. Start application: `npm run dev`
2. Open browser: http://localhost:3000

## Test Steps

### Step 1: Navigate to Login Page
1. Click "Login" button
2. ✅ Verify: Login form appears
3. 📸 Screenshot: `login_form.png`

### Step 2: Enter Credentials
1. Enter email: "test@example.com"
2. Enter password: "testpass123"
3. Click "Submit"
4. ✅ Verify: Redirected to dashboard
5. 📸 Screenshot: `dashboard.png`

### Step 3: Verify Login Persistence
1. Refresh page
2. ✅ Verify: Still logged in
3. ✅ Verify: User name displayed in header
```

### 7.3: Add Project Documentation

Update your project's README.md:

```markdown
## AI Developer Workflow (ADW)

This project uses ADW for automated issue processing.

### Quick Start

Process a GitHub issue:
```bash
cd adws/
uv run adw_plan_build.py <issue-number>
```

### Available Commands

- `uv run adw_plan.py <issue>` - Generate implementation plan
- `uv run adw_build.py` - Implement existing plan
- `uv run adw_test.py <issue>` - Run tests and report results
- `uv run adw_plan_build_test.py <issue>` - Full pipeline

### Monitoring

Start continuous monitoring:
```bash
cd adws/
uv run adw_triggers/trigger_cron.py
```

For details, see [adws/README.md](adws/README.md)
```

---

## Step 8: Common Customizations by Framework

### Node.js / TypeScript Projects

**Key Files to Update**:
- `.claude/commands/test.md` - Update to use `npm test`, `npm run build`
- `.claude/commands/bug.md` - Update validation commands
- `.claude/commands/feature.md` - Update validation commands

**Example Test Commands**:
```bash
npm run lint        # ESLint
npm run type-check  # TypeScript
npm test            # Jest/Vitest
npm run build       # Production build
```

### Python Projects

**Key Files to Update**:
- `.claude/commands/test.md` - Use `pytest`, `mypy`, `ruff`
- Add to pyproject.toml for your main project

**Example Test Commands**:
```bash
ruff check .                    # Linting
mypy src/                       # Type checking
pytest tests/ -v                # Unit tests
python -m py_compile src/*.py   # Syntax check
```

### Ruby / Rails Projects

**Key Files to Update**:
- `.claude/commands/test.md` - Use `rspec`, `rubocop`
- `.claude/commands/bug.md` - Update paths (app/, lib/, spec/)

**Example Test Commands**:
```bash
bundle exec rubocop     # Linting
bundle exec rspec       # Tests
rails db:test:prepare   # Test DB setup
```

### Go Projects

**Key Files to Update**:
- `.claude/commands/test.md` - Use `go test`, `golint`, `go build`

**Example Test Commands**:
```bash
go fmt ./...      # Format code
golint ./...      # Linting
go test ./...     # Tests
go build          # Build
```

### Rust Projects

**Key Files to Update**:
- `.claude/commands/test.md` - Use `cargo test`, `cargo clippy`

**Example Test Commands**:
```bash
cargo fmt --check   # Format check
cargo clippy        # Linting
cargo test          # Tests
cargo build         # Build
```

---

## Troubleshooting

### Issue: "Claude Code CLI not found"
```bash
# Verify installation
which claude

# If not found, install from:
# https://docs.anthropic.com/en/docs/claude-code

# Or set explicit path
export CLAUDE_CODE_PATH="/path/to/claude"
```

### Issue: "GitHub authentication failed"
```bash
# Re-authenticate
gh auth logout
gh auth login

# Verify
gh auth status

# If using PAT, ensure it has correct scopes:
# - repo (full control)
# - workflow
# - write:packages (if using packages)
```

### Issue: "Agent execution failed"
```bash
# Check agent output
cat agents/*/sdlc_planner/raw_output.jsonl | tail -1 | jq .

# Check Claude Code version
claude --version

# Verify API key
echo $ANTHROPIC_API_KEY | head -c 20
```

### Issue: "Import errors in Python"
```bash
# Reinstall dependencies
cd adws/
uv sync

# Verify imports manually
uv run python -c "from adw_modules import agent"
```

### Issue: "Tests not running correctly"
```bash
# Update test commands in .claude/commands/test.md
# Ensure commands match your project structure

# Test manually first
cd YOUR-PROJECT
npm test  # or pytest, or your test command

# Then update test.md with working commands
```

---

## Success Checklist

✅ **Setup Complete**
- [ ] All ADW files copied to new project
- [ ] Claude Code commands copied and customized
- [ ] Environment variables configured
- [ ] Python dependencies installed (uv sync)
- [ ] GitHub CLI authenticated
- [ ] Claude Code CLI installed and working

✅ **Customization Complete**
- [ ] Project paths updated in command files
- [ ] Test commands updated for your stack
- [ ] Validation commands updated for your stack
- [ ] E2E test templates created
- [ ] README.md updated with ADW instructions

✅ **Testing Complete**
- [ ] Health check passes
- [ ] GitHub API access works
- [ ] Claude Code commands work
- [ ] First ADW workflow completes successfully
- [ ] Plan file generated correctly
- [ ] Build phase works
- [ ] Test phase works
- [ ] PR created successfully

✅ **Optional Enhancements**
- [ ] Pre-commit hooks configured
- [ ] Webhook server set up (if using)
- [ ] Continuous monitoring enabled (if using)
- [ ] Team trained on ADW usage
- [ ] Documentation updated

---

## Next Steps

### Immediate (Today)
1. Process your first GitHub issue with ADW
2. Review the generated plan
3. Let ADW implement the solution
4. Review the PR created

### Short-term (This Week)
1. Process 3-5 issues to build confidence
2. Customize commands based on learnings
3. Create project-specific E2E tests
4. Train team members on ADW

### Long-term (This Month)
1. Enable continuous monitoring
2. Set up webhook for instant processing
3. Track metrics (time saved, quality)
4. Refine prompts based on outcomes
5. Expand to more issue types

---

## Resources

### Documentation
- ADW README: `adws/README.md`
- Testing Guide: `ai_docs/README_TESTING.md`
- Feedback Loops: `ai_docs/testing_strategy_feedback_loops.md`

### Example Projects
- TAC-5 (reference implementation)
- Your customized project

### Support
- Claude Code Docs: https://docs.anthropic.com/en/docs/claude-code
- GitHub CLI Docs: https://cli.github.com/
- uv Docs: https://docs.astral.sh/uv/

---

## Summary

You've just implemented a complete **AI Developer Workflow** system that:

✅ Automatically processes GitHub issues
✅ Generates implementation plans
✅ Implements solutions autonomously
✅ Runs comprehensive tests
✅ Creates pull requests with detailed summaries
✅ Provides feedback loops for quality assurance

**Time to first PR**: ~10 minutes
**Time saved per issue**: 60+ minutes
**Quality**: 99% confidence with comprehensive testing

**Welcome to autonomous development!** 🚀
