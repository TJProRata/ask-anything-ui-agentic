# Generate Git Branch Name

Generate and create a new git branch with a consistent naming convention.

## Usage

**Simple Format** (recommended):
```
/generate_branch_name {category} {name}
```

**All Parameters Optional**:
```
/generate_branch_name              # Interactive prompting
/generate_branch_name feat         # Category only, prompt for name
/generate_branch_name feat my-feature  # Full specification
```

## Variables

- `$1` - category (optional): feat, bug, fix, chore, docs, style, refactor, test, perf, ci, build
- `$2+` - name (optional): descriptive branch name (rest of arguments joined)

## Instructions

**Branch Format**: `{category}/{name}`

**Category Options**:
- `feat` - New features
- `bug` or `fix` - Bug fixes
- `chore` - Maintenance tasks
- `docs` - Documentation changes
- `style` - Code style/formatting
- `refactor` - Code refactoring
- `test` - Test additions/changes
- `perf` - Performance improvements
- `ci` - CI/CD changes
- `build` - Build system changes

**Name Guidelines**:
- All lowercase
- Words separated by hyphens
- 2-6 words maximum
- Descriptive of the task
- No special characters except hyphens

**Examples**:
- `feat/add-user-authentication`
- `bug/fix-login-error`
- `chore/update-dependencies`
- `docs/api-reference-update`
- `refactor/simplify-widget-api`

## Run

1. If no category provided, prompt user for category
2. If no name provided, prompt user for descriptive name
3. Normalize inputs (lowercase, replace spaces with hyphens)
4. Run `git checkout main`
5. Run `git pull`
6. Run `git checkout -b {category}/{name}`

## Report

Return ONLY the branch name that was created (no additional text or explanation)
