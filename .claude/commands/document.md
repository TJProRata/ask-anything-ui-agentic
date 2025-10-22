# Document Feature

Generate concise markdown documentation for implemented features by:
1. Updating existing relevant documentation to reflect current codebase state
2. Creating new feature documentation in `app_docs/` based on git diff analysis

## Variables

adw_id: $1
spec_path: $2 if provided, otherwise leave it blank
documentation_screenshots_dir: $3 if provided, otherwise leave it blank

## Instructions

### 1. Analyze Changes
- Run `git diff origin/main --stat` to see files changed and lines modified
- Run `git diff origin/main --name-only` to get the list of changed files
- For significant changes (>50 lines), run `git diff origin/main <file>` on specific files to understand implementation details

### 2. Read Specification (if provided)
- If `spec_path` is provided, read the specification file to understand:
  - Original requirements and goals
  - Expected functionality
  - Success criteria
- Use this to frame documentation around what was requested vs what was built

### 3. Identify Existing Documentation to Update
- Based on changed files, identify relevant existing documentation in:
  - `docs/widgets/` - Widget component documentation
  - `docs/components/` - UI component documentation
  - `docs/integrations/` - Integration guides
  - `docs/widget/` - Widget system documentation
  - `README.md` - Project overview
  - `CLAUDE.md` - Developer guidance
- List all documentation files that need updates

### 4. Update Existing Documentation
- For each identified documentation file:
  - Read current content
  - Update to reflect current codebase state based on git diff
  - Preserve existing structure and formatting
  - Add new sections if needed (e.g., new props, new variants, new usage patterns)
  - Update examples to match current implementation
  - Mark deprecated features if any
- Ensure consistency across all updated documentation

### 5. Analyze and Copy Screenshots (if provided)
- If `documentation_screenshots_dir` is provided, list and examine screenshots
- Create `app_docs/assets/` directory if it doesn't exist
- Copy all screenshot files (*.png, *.jpg, *.gif) from `documentation_screenshots_dir` to `app_docs/assets/`
  - Preserve original filenames
  - Use `cp` command to copy files
- Use visual context to better describe UI changes or visual features
- Reference screenshots in documentation using relative paths (e.g., `assets/screenshot-name.png`)

### 6. Generate New Feature Documentation
- Create a new documentation file in `app_docs/` directory
- Filename format: `feature-{adw_id}-{descriptive-name}.md`
  - Replace `{descriptive-name}` with a short feature name (e.g., "user-auth", "data-export", "gist-creation-flow")
- Follow the Documentation Format below
- Focus on:
  - What was built (based on git diff)
  - How it works (technical implementation)
  - How to use it (user perspective)
  - Any configuration or setup required
  - References to updated existing documentation

### 7. Update Conditional Documentation
- After creating the documentation file, read `.claude/commands/conditional_docs.md`
- Add an entry for the new documentation file with appropriate conditions
- The entry should help future developers know when to read this documentation
- Format the entry following the existing pattern in the file

### 8. Final Output
- Report summary of documentation updates:
  - List of existing docs updated (with file paths)
  - Path to new app_docs feature documentation
  - Path to conditional_docs.md update

## Documentation Format (app_docs/)

```md
# <Feature Title>

**ADW ID:** <adw_id>
**Date:** <current date>
**Specification:** <spec_path or "N/A">

## Overview

<2-3 sentence summary of what was built and why>

## Screenshots

<If documentation_screenshots_dir was provided and screenshots were copied>

![<Description>](assets/<screenshot-filename.png>)

## What Was Built

<List the main components/features implemented based on the git diff analysis>

- <Component/feature 1>
- <Component/feature 2>
- <etc>

## Technical Implementation

### Files Modified

<List key files changed with brief description of changes>

- `<file_path>`: <what was changed/added>
- `<file_path>`: <what was changed/added>

### Key Changes

<Describe the most important technical changes in 3-5 bullet points>

## How to Use

<Step-by-step instructions for using the new feature>

1. <Step 1>
2. <Step 2>
3. <etc>

## Configuration

<Any configuration options, environment variables, or settings>

## Testing

<Brief description of how to test the feature>

## Related Documentation

<Links to updated existing documentation>

- [<Doc Title>](<relative path to updated doc>)
- [<Doc Title>](<relative path to updated doc>)

## Notes

<Any additional context, limitations, or future considerations>
```

## Conditional Docs Entry Format

After creating the documentation, add this entry to `.claude/commands/conditional_docs.md`:

```md
- app_docs/<your_documentation_file>.md
  - Conditions:
    - When working with <feature area>
    - When implementing <related functionality>
    - When troubleshooting <specific issues>
```

## Report Format

```md
## Documentation Updated

### Existing Documentation
- ✅ `<path>` - <what was updated>
- ✅ `<path>` - <what was updated>

### New Feature Documentation
- 📄 `app_docs/feature-<adw_id>-<name>.md`

### Conditional Documentation
- 🔗 `.claude/commands/conditional_docs.md` - Added entry for new feature doc
```
