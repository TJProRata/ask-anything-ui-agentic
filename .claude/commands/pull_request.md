# Create Pull Request

Create and push a pull request with auto-generated title and comprehensive body.

## Usage

**Simple Format** (recommended):
```
/pull_request                    # Auto-detect from current branch
/pull_request 123                # Reference issue #123
/pull_request 123 Custom Title   # Custom title with issue reference
```

**All Parameters Optional**:
```
/pull_request                           # Use current branch, auto-generate everything
/pull_request 123                       # Add "Closes #123" to PR body
/pull_request 123 Add user auth feature # Custom title with issue reference
```

## Variables

- `$1` - issue_number (optional): Issue number to reference and close
- `$2+` - custom_title (optional): Custom PR title (overrides auto-generation)

## Instructions

**PR Title Format** (auto-generated from branch name):

Branch name format `{category}/{name}` converts to title:
- `feat/add-user-auth` → `feat: add user auth`
- `bug/fix-login-error` → `bug: fix login error`
- `chore/update-deps` → `chore: update deps`

**With issue number**:
- `feat/add-user-auth` + issue #123 → `feat: #123 - add user auth`

**Category prefix mapping**:
- `feat` → `feat:` (New feature)
- `bug`, `fix` → `fix:` (Bug fix)
- `chore` → `chore:` (Maintenance)
- `docs` → `docs:` (Documentation)
- `style` → `style:` (Code style)
- `refactor` → `refactor:` (Refactoring)
- `test` → `test:` (Tests)
- `perf` → `perf:` (Performance)
- `ci` → `ci:` (CI/CD)
- `build` → `build:` (Build system)

**PR Body Structure**:

```markdown
## Summary

[Auto-generated from recent commits]

## Changes

- [List of changed files from git diff]

## Issue Reference

Closes #[issue_number] (if provided)

## Testing Checklist

- [ ] Code builds successfully
- [ ] All tests pass
- [ ] No linting errors
- [ ] Manual testing completed
- [ ] Documentation updated (if needed)
```

## Run

1. Get current branch name: `git branch --show-current`
2. Verify not on main: ensure branch ≠ `main`
3. Get commit summary: `git log origin/main..HEAD --oneline`
4. Get changed files: `git diff origin/main...HEAD --name-only`
5. Get diff stats: `git diff origin/main...HEAD --stat`
6. Build PR title:
   - Extract category and name from branch
   - Apply category prefix mapping
   - Add issue number if provided (format: `{category}: #{issue} - {name}`)
   - Or use custom_title if provided
7. Build PR body:
   - Summary section from commits
   - Changes section from file list
   - Issue reference section (if issue_number provided)
   - Testing checklist
8. Check if branch is pushed: `git rev-parse --abbrev-ref --symbolic-full-name @{u}` (2>/dev/null)
9. If not pushed: `git push -u origin {branch_name}`
10. Create PR: `gh pr create --title "{title}" --body "{body}" --base main`
11. Capture PR URL from output

## Report

Return ONLY the PR URL that was created (no additional text or explanation)
