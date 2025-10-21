# Create Git Commit

Create a git commit with a properly formatted conventional commit message.

## Usage

**Simple Format** (recommended):
```
/commit                              # Auto-generate from git changes
/commit feat                         # Specify type, auto-generate message
/commit feat add user authentication # Full specification
```

**All Parameters Optional**:
```
/commit                           # Analyze changes and auto-generate everything
/commit feat                      # Type only, generate message from changes
/commit fix resolve login bug     # Complete custom commit message
```

## Variables

- `$1` - type (optional): feat, fix, chore, docs, style, refactor, test, perf, ci, build
- `$2+` - message (optional): commit message description

## Instructions

**Commit Message Format** (Conventional Commits):

Format: `{type}: {description}`

**Type Options**:
- `feat` - New features
- `fix` - Bug fixes
- `chore` - Maintenance tasks
- `docs` - Documentation changes
- `style` - Code style/formatting
- `refactor` - Code refactoring
- `test` - Test additions/changes
- `perf` - Performance improvements
- `ci` - CI/CD changes
- `build` - Build system changes

**Message Guidelines**:
- Present tense (e.g., "add", "fix", "update" not "added", "fixed", "updated")
- Start with lowercase
- 50 characters or less for description
- No period at the end
- Be descriptive and specific

**Examples**:
- `feat: add user authentication module`
- `fix: resolve login validation error`
- `chore: update dependencies to latest versions`
- `docs: add API reference documentation`
- `refactor: simplify widget initialization`
- `test: add unit tests for API hooks`

**Auto-Generation Logic**:

1. **No parameters** (`/commit`):
   - Analyze `git diff --cached` and `git status`
   - Determine appropriate type from changed files
   - Generate descriptive message from changes

2. **Type only** (`/commit feat`):
   - Use specified type
   - Analyze changes to generate message
   - Ensure message fits the type

3. **Full specification** (`/commit feat add auth`):
   - Use provided type and message
   - Normalize message format (lowercase, present tense)

## Run

1. Check for changes:
   - Run `git status --short` to see what's changed
   - If no changes, report error and exit

2. Analyze changes (if auto-generating):
   - Run `git diff --cached --name-only` for staged files
   - Run `git diff --name-only` for unstaged files
   - Run `git status --short` for new files
   - Determine file types and scope of changes

3. Build commit message:
   - If type and message provided: normalize format
   - If type only: generate message from changes
   - If no params: determine type and message from changes
   - Enforce 50 character limit on description
   - Ensure present tense and lowercase start

4. Stage all changes:
   - Run `git add -A` to stage all changes

5. Create commit:
   - Run `git commit -m "{type}: {description}"`

6. Verify commit:
   - Run `git log -1 --oneline` to confirm

## Report

Return ONLY the commit message that was used (no additional text or explanation)
