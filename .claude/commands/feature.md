# Feature Planning

Create a new plan in specs/*.md to implement the `Feature` using the exact specified markdown `Plan Format`. Follow the `Instructions` to create the plan use the `Relevant Files` to focus on the right files.

## Variables
issue_number: $1
adw_id: $2
issue_json: $3

## Instructions

- IMPORTANT: You're writing a plan to implement a net new feature based on the `Feature` that will add value to the application.
- IMPORTANT: The `Feature` describes the feature that will be implemented but remember we're not implementing a new feature, we're creating the plan that will be used to implement the feature based on the `Plan Format` below.
- Create the plan in the `specs/` directory with filename: `issue-{issue_number}-adw-{adw_id}-sdlc_planner-{descriptive-name}.md`
  - Replace `{descriptive-name}` with a short, descriptive name based on the feature (e.g., "add-auth-system", "implement-search", "create-dashboard")
- Use the `Plan Format` below to create the plan.
- Research the codebase to understand existing patterns, architecture, and conventions before planning the feature.
- IMPORTANT: Replace every <placeholder> in the `Plan Format` with the requested value. Add as much detail as needed to implement the feature successfully.
- Use your reasoning model: THINK HARD about the feature requirements, design, and implementation approach.
- Follow existing patterns and conventions in the codebase. Don't reinvent the wheel.
- Design for extensibility and maintainability.
- If you need a new library, use `bun add` and be sure to report it in the `Notes` section of the `Plan Format`.
- Respect requested files in the `Relevant Files` section.
- Start your research by reading the `README.md` and `CLAUDE.md` files.

## Tech Stack Requirements

**CRITICAL: All features MUST use the following technology stack. DO NOT introduce alternative technologies.**

- **Runtime**: Bun (NOT npm, yarn, or pnpm)
- **Framework**: Next.js 15.4.5 with App Router
- **UI Library**: React 19.1.0
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS v4 with Lightning CSS (NOT CSS-in-JS, styled-components, or emotion)
- **Components**: shadcn/ui based on Radix UI (NOT Material-UI, Ant Design, or other component libraries)
- **Build**: Custom Bun bundler for widget builds
- **Testing**: Bun test runner with happy-dom and Testing Library

**Commands**:
- Use `bun` commands exclusively (e.g., `bun run dev`, `bun add`, `bun test`)
- Widget builds use `bun run build:widget`
- NO `npm`, `yarn`, `pnpm`, or `uv` commands

## Relevant Files

Focus on the following directories based on the feature type:
- `README.md` & `CLAUDE.md` - Project overview, architecture, and development guidelines
- `app/**` - Next.js App Router pages and API routes
- `components/ui/**` - shadcn/ui primitive components (Radix-based)
- `components/widgets/**` - Embeddable widget implementations
- `components/ask-anything/**` - AI chat-specific components
- `hooks/**` - Custom React hooks
- `widgets/**` - Widget runtime, types, and design tokens
- `scripts/**` - Build scripts for widget bundling
- `docs/**` - Architecture and component documentation
- `app/globals.css` - Global styles and Tailwind configuration

## Plan Format

```md
# Feature: <feature name>

## Feature Description
<describe the feature in detail, including its purpose and value to users>

## User Story
As a <type of user>
I want to <action/goal>
So that <benefit/value>

## Problem Statement
<clearly define the specific problem or opportunity this feature addresses>

## Solution Statement
<describe the proposed solution approach and how it solves the problem>

**Tech Stack Compliance**: Confirm this solution uses only approved technologies (Bun, Next.js 15, React 19, TypeScript, Tailwind CSS v4, shadcn/ui). List any new dependencies and justify their necessity.

## Relevant Files
Use these files to implement the feature:

<find and list the files that are relevant to the feature describe why they are relevant in bullet points. If there are new files that need to be created to implement the feature, list them in an h3 'New Files' section.>

## Implementation Plan
**IMPORTANT**: All implementation must strictly follow the Tech Stack Requirements (Bun, Next.js 15, React 19, TypeScript, Tailwind CSS v4, shadcn/ui).

### Phase 1: Foundation
<describe the foundational work needed before implementing the main feature>

### Phase 2: Core Implementation
<describe the main implementation work for the feature>

### Phase 3: Integration
<describe how the feature will integrate with existing functionality>

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

<list step by step tasks as h3 headers plus bullet points. use as many h3 headers as needed to implement the feature. Order matters, start with the foundational shared changes required then move on to the specific implementation. Include creating tests throughout the implementation process. Your last step should be running the `Validation Commands` to validate the feature works correctly with zero regressions.>

## Testing Strategy
### Unit Tests
<describe unit tests needed for the feature>

### Integration Tests
<describe integration tests needed for the feature>

### Edge Cases
<list edge cases that need to be tested>

## Acceptance Criteria
<list specific, measurable criteria that must be met for the feature to be considered complete>

## Validation Commands
Execute every command to validate the feature works correctly with zero regressions.

<list commands you'll use to validate with 100% confidence the feature is implemented correctly with zero regressions. every command must execute without errors so be specific about what you want to run to validate the feature works as expected. Include commands to test the feature end-to-end.>
- `bun test` - Run all tests to validate feature works with zero regressions
- `bun run lint` - Ensure code meets linting standards
- `bun run build` - Verify Next.js application builds successfully
- `bun run build:widget` - Verify widget bundle builds successfully (if widget changes made)

## Notes
<optionally list any additional notes, future considerations, or context that are relevant to the feature that will be helpful to the developer>
```

## Feature
Extract the feature details from the `issue_json` variable (parse the JSON and use the title and body fields).

## Report
- Summarize the work you've just done in a concise bullet point list.
- Include the full path to the plan file you created (e.g., `specs/issue-456-adw-xyz789-sdlc_planner-add-auth-system.md`)