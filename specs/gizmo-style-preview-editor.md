# Feature: Gizmo-Style Preview Editor with AI Chat

## Feature Description
A mobile-first conversational editing experience for microsite and widget customization. Users can modify their gist preview (microsite) and embedded widget using natural language AI commands in a Gizmo-inspired interface. The preview is displayed in an iPhone frame with a chat interface at the bottom for sending edit commands like "make the CTA button pink" or "/editwidget change text to friendly". The system uses OpenAI to extract structured edit parameters, validates them through guardrails, and updates the live preview in real-time with visual feedback during processing ("Brewing...", "Reflecting...").

## User Story
As a gist creator
I want to edit my microsite and widget using natural language in a mobile-optimized chat interface
So that I can quickly iterate on my design without needing technical knowledge or leaving the preview experience

## Problem Statement
The current preview page at `/preview/[slug]` is a static placeholder. Users who complete onboarding are directed to this page but have no way to:
1. See their generated microsite and widget in a realistic mobile preview
2. Make edits to styling, content, or layout through conversational AI
3. Toggle between editing the microsite vs. the widget
4. Get real-time visual feedback during AI processing
5. See changes applied instantly to the preview

This creates a dead-end user experience where users complete onboarding but can't interact with or customize their creation.

## Solution Statement
Build a complete Gizmo-style preview editor that:
1. **Mobile-First iPhone Frame**: Display microsite preview in an iPhone mockup (works on desktop too)
2. **Dual Edit Modes**: Toggle between editing microsite vs. widget with tab buttons
3. **AI Chat Interface**: Bottom chat input that accepts natural language and slash commands (`/editwidget`, `/editmicrosite`)
4. **OpenAI Parameter Extraction**: Convert user requests into structured JSON edits using OpenAI API
5. **Guardrail Validation**: Whitelist-based security layer that validates all edits before applying
6. **Live State Management**: Immutable state updates with real-time preview rendering
7. **Visual Processing States**: Animated "Brewing..." and "Reflecting..." indicators during AI operations
8. **Undo/Redo History**: Track edit history for reverting changes

**Tech Stack Compliance**: ✅ This solution uses only approved technologies:
- **Bun** for all package management and scripts
- **Next.js 15.4.5** App Router with server/client components
- **React 19.1.0** with hooks for state management
- **TypeScript** with strict mode for type safety
- **Tailwind CSS v4** for all styling (no CSS-in-JS)
- **shadcn/ui** components (Button, Input, Progress, Tabs, Card)
- **Zod** (already in dependencies) for schema validation

**New Dependencies Required**:
- `ai` (Vercel AI SDK v4) - For OpenAI integration with streaming and tool calling
- `openai` - OpenAI client library
- `immer` - For immutable state updates (optional, can use spread operators)

**Justification**:
- `ai`: Industry-standard SDK for LLM integration, works seamlessly with Next.js, supports streaming and tool calling needed for parameter extraction
- `openai`: Official OpenAI client, required for AI SDK integration
- `immer`: Simplifies immutable state updates for complex nested preview state (optional optimization)

## Relevant Files
Use these files to implement the feature:

### Existing Files to Modify

**`app/preview/[slug]/page.tsx`** (67 lines)
- Currently a placeholder preview page
- Will become the main preview editor page
- Needs to fetch gist data from Convex by slug
- Will render MobilePreviewFrame with chat interface
- Status: TODO placeholder awaiting implementation

**`components/preview/Sidebar.tsx`** (74 lines)
- Current sidebar for editing answers
- Will be replaced/refactored into chat-based editing
- Contains answer card display logic that may be repurposed

**`components/mini-site/MiniSiteLayout.tsx`** (30 lines)
- Wrapper for gist mini-sites
- Will be rendered inside iPhone frame
- Needs to accept dynamic props from preview state

**`components/mini-site/HeroSection.tsx`** (49 lines)
- Hero section component with headline, subhead, CTA
- Needs to accept and render dynamic styles from state
- Contains TODO for media rendering (image/video)

**`components/mini-site/FloatingCTA.tsx`** (43 lines)
- Floating widget/CTA button
- Needs to render based on widget state
- Will be the target for `/editwidget` commands

**`hooks/use-gist-form.ts`** (163 lines)
- Form state management for gist creation
- Reducer pattern can be reference for preview state management
- Validation logic is good reference for guardrails

**`widgets/types.ts`** (61 lines)
- Widget configuration types
- Will need extensions for editable properties

**`components/widgets/onboarding-widget/types.ts`** (105 lines)
- Gist creation data types
- Defines the initial gist structure that preview will edit

### New Files

**`lib/ai/openai-client.ts`**
- OpenAI client initialization with API key management
- Environment variable handling for OPENAI_API_KEY
- Reusable client instance with error handling

**`lib/ai/edit-agent.ts`**
- AI agent for parameter extraction using Vercel AI SDK
- Tool calling setup for structured output
- System prompts for microsite vs. widget editing contexts

**`lib/ai/guardrails.ts`**
- Validation layer for edit safety
- Whitelisted properties for microsite and widget
- Zod schemas for type validation
- Value validators (hex colors, sizes, URLs, etc.)

**`lib/preview/state-manager.ts`**
- Preview state type definitions
- State update functions (immutable)
- Diff generation for change tracking
- Undo/redo history management

**`lib/preview/editable-properties.ts`**
- Complete lists of editable properties
- Property metadata (type, validation rules, defaults)
- Separate definitions for microsite vs. widget

**`schemas/preview-edit.ts`**
- Zod schemas for edit validation
- Microsite edit schema
- Widget edit schema
- AI tool response schemas

**`app/api/edit-preview/route.ts`**
- POST endpoint for processing edit requests
- Parses user input and target (microsite/widget)
- Calls AI agent for parameter extraction
- Runs guardrail validation
- Returns validated edits or error

**`hooks/use-preview-state.ts`**
- React hook for managing preview state
- Integrates with state manager
- Provides undo/redo functions
- Handles optimistic updates

**`hooks/use-edit-chat.ts`**
- React hook for chat functionality
- Manages message history
- Handles streaming responses
- Processing state management ("Brewing...", "Reflecting...")

**`components/preview/MobilePreviewFrame.tsx`**
- iPhone frame component
- Responsive scaling for desktop
- Renders preview content in frame
- Handles frame interactions

**`components/preview/ChatInterface.tsx`**
- Bottom chat input with tab selector
- Microsite vs. Widget toggle buttons
- Message input with placeholder hints
- Processing state animations
- Message history display (optional)

**`components/preview/ProcessingIndicator.tsx`**
- Animated "Brewing..." component
- Rainbow gradient progress bar
- Timer display (e.g., "3.4s")
- Different states: "Reflecting...", "Harmonizing..."

**`components/preview/EditableMiniSite.tsx`**
- Wrapper for MiniSiteLayout that accepts state
- Applies dynamic styles from preview state
- Renders HeroSection and FloatingCTA with state props
- Handles state-to-props mapping

**`components/preview/EditableWidget.tsx`**
- Wrapper for FloatingCTA that accepts widget state
- Applies dynamic styles and content
- Renders widget based on editable properties

## Implementation Plan
**IMPORTANT**: All implementation must strictly follow the Tech Stack Requirements (Bun, Next.js 15, React 19, TypeScript, Tailwind CSS v4, shadcn/ui).

### Phase 1: Foundation (State Management & Types)
Set up the core type system, state management, and validation infrastructure that all other features will depend on. This includes defining what properties can be edited, how state is structured, and how changes are validated.

**Tasks**:
1. Create editable property definitions with metadata
2. Build Zod schemas for type-safe validation
3. Implement immutable state manager with update functions
4. Create preview state hook with undo/redo
5. Write unit tests for state management and validation

### Phase 2: AI Integration (OpenAI + Guardrails)
Build the AI layer that converts natural language into structured edits. Includes OpenAI client setup, parameter extraction agent, and security validation through guardrails.

**Tasks**:
1. Set up OpenAI client with environment configuration
2. Implement edit agent with tool calling and system prompts
3. Build guardrail validation layer with whitelisting
4. Create API route for edit processing
5. Write integration tests for AI agent and guardrails
6. Test with example inputs and edge cases

### Phase 3: UI Components (Preview Frame & Chat)
Create the visual interface components including the mobile preview frame, chat interface, and processing indicators. All components use shadcn/ui primitives and Tailwind CSS.

**Tasks**:
1. Build MobilePreviewFrame with iPhone mockup and responsive scaling
2. Implement ChatInterface with tabs, input, and message display
3. Create ProcessingIndicator with animated states
4. Build EditableMiniSite and EditableWidget wrapper components
5. Add chat hook for message management and streaming
6. Test components in isolation with Storybook or dev pages

### Phase 4: Preview Page Integration
Integrate all pieces into the main `/preview/[slug]` page with Convex data fetching, real-time state updates, and full user flow from chat input to preview update.

**Tasks**:
1. Update preview page to fetch gist data from Convex
2. Wire preview state hook with fetched data
3. Connect chat interface to edit API
4. Implement optimistic UI updates
5. Add error handling and user feedback
6. Wire undo/redo UI controls
7. Test complete user flow end-to-end

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### Step 1: Install Required Dependencies
- Run `bun add ai openai zod` to install AI SDK, OpenAI client, and Zod (if not already installed)
- Run `bun add -d @types/node` to ensure Node types are available
- Verify installations in package.json
- Update `.env.local` to include `OPENAI_API_KEY=your_key_here` placeholder with documentation comment

### Step 2: Create Editable Property Definitions
- Create `lib/preview/editable-properties.ts`
- Define `MicrositeEditableProperty` type with property name, type, validation rules, default values
- Define `WidgetEditableProperty` type with similar structure
- Export `MICROSITE_EDITABLE_PROPERTIES` array (backgroundColor, headerColor, heroHeadline, heroSubhead, ctaText, etc.)
- Export `WIDGET_EDITABLE_PROPERTIES` array (backgroundColor, textColor, buttonText, borderRadius, position, etc.)
- Add property metadata: display name, description, value type (color | size | text | url)
- Write JSDoc documentation for all exports

### Step 3: Build Zod Validation Schemas
- Create `schemas/preview-edit.ts`
- Define `MicrositeEditSchema` using Zod with all editable microsite properties
- Define `WidgetEditSchema` using Zod with all editable widget properties
- Create `EditRequestSchema` with fields: target ("microsite" | "widget"), description (string), edits (record)
- Create `EditResponseSchema` with fields: success (boolean), edits (record), errors (array)
- Add custom validators: hexColor, cssSize, validUrl
- Export all schemas with proper TypeScript types

### Step 4: Implement Preview State Manager
- Create `lib/preview/state-manager.ts`
- Define `PreviewState` type with micrositeState and widgetState
- Define `MicrositeState` interface with all editable properties
- Define `WidgetState` interface with all editable properties
- Create `applyMicrositeEdit` function that immutably updates microsite state
- Create `applyWidgetEdit` function that immutably updates widget state
- Create `generateDiff` function to compare old and new states
- Create `createInitialState` function from gist data
- Add TypeScript strict type checking throughout
- Write unit tests in `lib/preview/state-manager.test.ts`

### Step 5: Create Preview State Hook with Undo/Redo
- Create `hooks/use-preview-state.ts`
- Use `useReducer` for state management with history tracking
- Implement `PreviewStateAction` types: APPLY_EDIT, UNDO, REDO, RESET
- Create `previewStateReducer` that handles all actions
- Manage history stack (max 50 entries) with current index
- Export hook with: `state`, `applyEdit`, `undo`, `redo`, `canUndo`, `canRedo`
- Add optimistic update support with rollback
- Write unit tests using React Testing Library

### Step 6: Set Up OpenAI Client
- Create `lib/ai/openai-client.ts`
- Import OpenAI from 'openai' package
- Create singleton client instance with API key from `process.env.OPENAI_API_KEY`
- Add error handling for missing API key
- Export `getOpenAIClient()` function with lazy initialization
- Add JSDoc documentation about environment variable requirements
- Create helper type `OpenAIClientConfig` for future extensibility

### Step 7: Build Guardrail Validation Layer
- Create `lib/ai/guardrails.ts`
- Define `GuardrailResult` type with allowed (boolean), errors (string[]), sanitizedEdits (record)
- Create `validateMicrositeEdit` function that checks against MICROSITE_EDITABLE_PROPERTIES whitelist
- Create `validateWidgetEdit` function that checks against WIDGET_EDITABLE_PROPERTIES whitelist
- Implement value validators: `isValidHexColor`, `isValidCSSSize`, `isValidUrl`, `isValidText`
- Add property existence check (reject unknown properties)
- Add XSS prevention for text fields (sanitize HTML)
- Export main `validateEdit(target, edits)` function that routes to correct validator
- Write unit tests with valid and invalid inputs, edge cases, XSS attempts

### Step 8: Implement AI Edit Agent
- Create `lib/ai/edit-agent.ts`
- Import `generateText` from 'ai' package and OpenAI client
- Define system prompts for microsite editing context (include editable properties list, examples)
- Define system prompts for widget editing context
- Create `extractEditParameters` async function with params: `userInput`, `target`, `currentState`
- Use OpenAI `gpt-4o` model with tool calling for structured output
- Define tool schema matching `EditRequestSchema`
- Return extracted edits or error message
- Add timeout handling (30s max)
- Write integration tests with example inputs

### Step 9: Create Edit API Route
- Create `app/api/edit-preview/route.ts`
- Implement POST handler with NextRequest/NextResponse
- Parse request body: `{ userInput: string, target: "microsite" | "widget", currentState: object }`
- Validate request using Zod schemas
- Call `extractEditParameters` from edit agent
- Pass AI results through guardrail validation
- Return validated edits or validation errors
- Add error handling with proper HTTP status codes (400, 500)
- Add rate limiting consideration (comment for future)
- Test with curl or Postman

### Step 10: Build Chat Hook for Message Management
- Create `hooks/use-edit-chat.ts`
- Manage message history state: `{ id, text, sender: "user" | "ai", timestamp }`
- Create `sendMessage` function that calls edit API
- Track processing state: "idle" | "reflecting" | "brewing" | "harmonizing" | "error"
- Implement auto-state rotation for visual variety
- Add estimated time counter based on average response time
- Handle streaming responses (future enhancement placeholder)
- Export: `messages`, `sendMessage`, `processingState`, `isProcessing`, `estimatedTime`
- Write unit tests for state transitions

### Step 11: Create Processing Indicator Component
- Create `components/preview/ProcessingIndicator.tsx`
- Accept props: `state` ("reflecting" | "brewing" | "harmonizing"), `estimatedTime` (number)
- Render animated progress bar with rainbow gradient using Tailwind
- Display state text with animated ellipsis ("Brewing...")
- Show timer in seconds (e.g., "3.4s")
- Use framer-motion for smooth animations
- Add pulsing effect for progress bar
- Make component visually match Gizmo screenshots
- Export with proper TypeScript types

### Step 12: Build Mobile Preview Frame Component
- Create `components/preview/MobilePreviewFrame.tsx`
- Create iPhone frame mockup with Tailwind (rounded corners, notch, camera hole)
- Accept `children` prop to render preview content
- Make responsive: full-height mobile on mobile, scaled-down frame on desktop
- Add CSS transforms for scaling on desktop (scale-75 or similar)
- Include device chrome: status bar, home indicator
- Add prop `variant` for "iphone-14" (default) with future Android support
- Use shadcn/ui `Card` as base component
- Export with TypeScript props interface

### Step 13: Create Chat Interface Component
- Create `components/preview/ChatInterface.tsx`
- Use shadcn/ui `Tabs` for Microsite/Widget toggle
- Build input area with shadcn/ui `Input` component
- Add send button with shadcn/ui `Button`
- Show placeholder hints: "Try 'make the button pink' or /editwidget..."
- Display `ProcessingIndicator` when `isProcessing` is true
- Optional: Show recent message history (last 3 messages)
- Accept props: `onSendMessage`, `isProcessing`, `processingState`, `selectedTab`, `onTabChange`
- Style to match Gizmo's bottom chat UI with dark background
- Make input sticky to bottom on mobile
- Export with TypeScript props interface

### Step 14: Build Editable MiniSite Wrapper
- Create `components/preview/EditableMiniSite.tsx`
- Accept `state` prop of type `MicrositeState`
- Map state properties to component props
- Render `MiniSiteLayout` with `HeroSection` and `FloatingCTA`
- Apply dynamic styles via Tailwind classes based on state (background colors, text colors)
- Handle hero headline, subhead, CTA text from state
- Apply background style (gradient, solid, image)
- Render component tree: Layout → Hero → CTA
- Export with TypeScript props interface

### Step 15: Build Editable Widget Wrapper
- Create `components/preview/EditableWidget.tsx`
- Accept `state` prop of type `WidgetState`
- Map widget state to FloatingCTA props
- Apply dynamic styles: backgroundColor, textColor, borderRadius, padding
- Handle button text, position, size from state
- Render `FloatingCTA` with computed props
- Add wrapper div for positioning based on state.position
- Export with TypeScript props interface

### Step 16: Update Preview Page with Full Integration
- Update `app/preview/[slug]/page.tsx`
- Add Convex query to fetch gist by slug (use existing Convex setup)
- Create `createInitialState` from fetched gist data
- Initialize `usePreviewState` hook with initial state
- Initialize `useEditChat` hook
- Render page layout:
  - MobilePreviewFrame containing EditableMiniSite and EditableWidget
  - ChatInterface at bottom
  - Undo/Redo buttons in top bar (optional)
- Wire `ChatInterface.onSendMessage` to `sendMessage` from chat hook
- Handle edit responses: update preview state on success, show errors
- Add loading state while fetching gist data
- Add error state if gist not found
- Make page responsive with proper mobile layout

### Step 17: Add Error Handling and User Feedback
- Add error toast notifications using shadcn/ui `Sonner`
- Show success feedback when edit applied ("Changes applied!")
- Display validation errors from guardrails in chat
- Add retry mechanism for failed API calls
- Handle network errors gracefully
- Add loading skeletons for initial page load
- Implement empty states (no gist found, no edits yet)
- Add helpful error messages ("Sorry, I couldn't understand that. Try being more specific.")

### Step 18: Implement Undo/Redo UI Controls
- Add undo/redo buttons to preview page header
- Use shadcn/ui `Button` with icon-only variant
- Import icons from `lucide-react`: `Undo2`, `Redo2`
- Wire to `undo()` and `redo()` from preview state hook
- Disable buttons when `!canUndo` or `!canRedo`
- Add keyboard shortcuts: Cmd+Z for undo, Cmd+Shift+Z for redo
- Add tooltip showing shortcut keys
- Update UI immediately on undo/redo

### Step 19: Write Unit Tests for State Management
- Create `lib/preview/state-manager.test.ts`
- Test `applyMicrositeEdit` with valid edits
- Test `applyWidgetEdit` with valid edits
- Test immutability (original state unchanged)
- Test `generateDiff` with various state changes
- Test `createInitialState` with sample gist data
- Use Bun test runner: `bun test state-manager.test.ts`

### Step 20: Write Integration Tests for AI Agent
- Create `lib/ai/edit-agent.test.ts`
- Mock OpenAI responses using test fixtures
- Test parameter extraction with example inputs:
  - "make the button pink" → `{ backgroundColor: "#FFC0CB" }`
  - "change headline to Welcome" → `{ heroHeadline: "Welcome" }`
  - "/editwidget larger text" → `{ fontSize: "18px" }`
- Test error handling (invalid responses, timeouts)
- Test guardrail integration
- Use Bun test runner with async/await

### Step 21: Write Component Tests
- Create `components/preview/ChatInterface.test.tsx`
- Test tab switching between Microsite and Widget
- Test message sending on Enter key and button click
- Test processing state display
- Create `components/preview/MobilePreviewFrame.test.tsx`
- Test responsive rendering
- Test children rendering
- Use React Testing Library with happy-dom

### Step 22: End-to-End Manual Testing
- Start dev server: `bun run dev`
- Navigate to `/preview/test-slug`
- Test microsite editing: Type "make the background purple"
- Verify processing indicator appears
- Verify preview updates with new background color
- Test widget editing: Switch to Widget tab, type "make button text say Hello"
- Verify widget updates in preview
- Test undo/redo with keyboard shortcuts
- Test error cases: Invalid input, unknown properties
- Test on mobile device using localhost tunnel
- Test on desktop at various screen sizes

### Step 23: API Key Environment Setup
- Add `OPENAI_API_KEY` to `.env.local`
- Add `.env.local` to `.gitignore` (verify already present)
- Create `.env.example` with placeholder: `OPENAI_API_KEY=sk-...`
- Add documentation comment in code about required environment variable
- Verify API key validation on server startup
- Test with invalid/missing API key to ensure proper error handling

### Step 24: Validation Commands
Execute every command to validate the feature works correctly with zero regressions:

- `bun test` - Run all tests to validate feature works with zero regressions
- `bun run lint` - Ensure code meets linting standards
- `bun run build` - Verify Next.js application builds successfully
- `bun run dev` - Start dev server and manually test preview page at `/preview/test-slug`
- Manual test: Chat input with natural language edit
- Manual test: Tab switching between Microsite and Widget
- Manual test: Undo/redo functionality
- Manual test: Processing state animations
- Manual test: Mobile responsive layout
- Manual test: Error handling with invalid input

## Testing Strategy

### Unit Tests
**State Management** (`lib/preview/state-manager.test.ts`):
- Test `applyMicrositeEdit` returns new state object (immutability)
- Test `applyWidgetEdit` updates correct properties
- Test `generateDiff` identifies changed properties
- Test `createInitialState` maps gist data correctly

**Guardrails** (`lib/ai/guardrails.test.ts`):
- Test whitelist enforcement (reject unknown properties)
- Test value validation (colors, sizes, URLs)
- Test XSS prevention in text fields
- Test edge cases: empty edits, null values, malformed data

**Schemas** (`schemas/preview-edit.test.ts`):
- Test Zod schema validation for valid inputs
- Test rejection of invalid inputs
- Test custom validators (hexColor, cssSize)

### Integration Tests
**AI Agent** (`lib/ai/edit-agent.test.ts`):
- Test parameter extraction with mocked OpenAI responses
- Test timeout handling (30s limit)
- Test error handling (API errors, invalid responses)
- Test with example inputs from different edit types

**API Route** (`app/api/edit-preview/route.test.ts`):
- Test POST with valid request body
- Test validation errors return 400 status
- Test guardrail rejection returns structured errors
- Test success response format matches schema

**Chat Hook** (`hooks/use-edit-chat.test.ts`):
- Test message history updates on send
- Test processing state transitions
- Test error state handling
- Test estimated time calculations

### Component Tests
**ChatInterface** (`components/preview/ChatInterface.test.tsx`):
- Test tab switching updates selected tab
- Test send button triggers onSendMessage callback
- Test Enter key sends message
- Test processing indicator appears when isProcessing=true
- Test disabled state during processing

**MobilePreviewFrame** (`components/preview/MobilePreviewFrame.test.tsx`):
- Test renders children inside frame
- Test responsive classes applied correctly
- Test frame mockup structure (notch, borders)

**ProcessingIndicator** (`components/preview/ProcessingIndicator.test.tsx`):
- Test displays correct state text
- Test timer displays estimated time
- Test animation classes applied

### Edge Cases
1. **Empty or Invalid Input**:
   - User sends empty message → Show "Please enter an edit command"
   - User sends gibberish → AI returns "I couldn't understand that" → Display in chat

2. **Unknown Properties**:
   - User requests edit to non-existent property → Guardrail blocks → Return error message
   - Example: "change the footer color" when footer isn't editable → "Sorry, footer color isn't editable"

3. **Invalid Values**:
   - User requests invalid color: "make it banana" → AI might extract, but guardrail validates → Reject if not valid hex
   - User requests huge font size: "make text 1000px" → Guardrail enforces max size → Limit to reasonable range

4. **Concurrent Edits**:
   - User sends multiple messages quickly → Queue messages, process sequentially
   - Show "Processing previous edit..." message

5. **Undo/Redo Edge Cases**:
   - Undo at beginning of history → Button disabled, no action
   - Redo at end of history → Button disabled, no action
   - New edit after undo → Clear forward history

6. **API Failures**:
   - OpenAI API timeout → Show "Request timed out, please try again"
   - Network error → Show "Connection error, check your internet"
   - Rate limit hit → Show "Too many requests, please wait a moment"

7. **Missing Gist Data**:
   - Invalid slug → Show 404 page "Gist not found"
   - Gist exists but user lacks access → Show 403 "Access denied"

## Acceptance Criteria
1. ✅ Preview page displays gist microsite in iPhone frame on mobile and desktop
2. ✅ Chat interface appears at bottom with Microsite/Widget tab toggle
3. ✅ User can type natural language edit and press Enter or click Send
4. ✅ Processing indicator appears during AI operations with state ("Brewing...", "Reflecting...")
5. ✅ Preview updates in real-time when edit succeeds (within 2-5 seconds)
6. ✅ Widget tab allows editing widget properties separately from microsite
7. ✅ Guardrails reject invalid or dangerous edits with clear error messages
8. ✅ Undo button reverts last edit, Redo button reapplies it
9. ✅ Keyboard shortcuts work (Cmd+Z for undo, Cmd+Shift+Z for redo)
10. ✅ Error states display helpful messages (validation errors, API errors, not found)
11. ✅ Mobile responsive: chat input sticky to bottom, frame scales appropriately
12. ✅ All edits are validated against whitelist (only allowed properties can be changed)
13. ✅ Color values are validated as hex colors, sizes have units, URLs are valid format
14. ✅ XSS prevention: text fields are sanitized before applying to preview
15. ✅ Zero regressions: All existing tests pass, build succeeds, lint passes

## Validation Commands
Execute every command to validate the feature works correctly with zero regressions:

- `bun test` - Run all unit and integration tests (expect 100% pass rate)
- `bun run lint` - Run ESLint and ensure zero errors
- `bun run build` - Build Next.js app and verify successful compilation
- `bun run dev` - Start dev server at http://localhost:3000
- Manual: Navigate to `/preview/test-slug` and verify page loads
- Manual: Type "make the background purple" in chat and verify update
- Manual: Switch to Widget tab and type "make button larger"
- Manual: Click undo button and verify previous state restored
- Manual: Test on mobile device (use localhost tunnel or deployed preview)
- Manual: Test error cases: invalid input, unknown property, network error simulation

## Notes

### Future Enhancements
1. **Streaming Responses**: Implement streaming for longer AI responses, update UI as tokens arrive
2. **Voice Input**: Add speech-to-text for mobile users using Web Speech API
3. **Template Suggestions**: Show common edit examples ("Make it modern", "Add urgency")
4. **Collaborative Editing**: Real-time multi-user editing with Convex presence
5. **Export History**: Allow users to export edit history as JSON for reproducibility
6. **A/B Testing**: Create variants of microsite with different edits, compare metrics
7. **AI Suggestions**: Proactive AI suggestions based on gist type and goal
8. **Visual Editing**: Click-to-edit mode where clicking elements opens contextual edit panel
9. **Preset Styles**: Pre-defined style palettes (Modern, Bold, Minimal) applied via command
10. **Advanced Guardrails**: Use AI to detect intent-based threats (e.g., "make it look like Facebook" → brand violation)

### Implementation Considerations
1. **OpenAI Costs**: Monitor token usage, implement caching for repeated requests
2. **Rate Limiting**: Add rate limiting to prevent abuse (max 10 edits/minute per user)
3. **State Persistence**: Consider saving preview state to Convex for cross-device access
4. **Accessibility**: Ensure chat interface is keyboard navigable and screen-reader friendly
5. **Performance**: Optimize re-renders, use React.memo for preview components
6. **Error Recovery**: Implement automatic retry with exponential backoff for transient errors
7. **Analytics**: Track edit types, success rates, common failures for improvement
8. **Security**: Never execute user-provided code, always use declarative style updates
9. **Mobile Performance**: Test on low-end devices, optimize animation performance
10. **Internationalization**: Consider i18n for processing states and error messages (future)

### Related Documentation
- Vercel AI SDK: https://sdk.vercel.ai/docs
- OpenAI API: https://platform.openai.com/docs/api-reference
- Zod: https://zod.dev
- shadcn/ui: https://ui.shadcn.com
- Immer (optional): https://immerjs.github.io/immer/

### Design References
- Gizmo mobile interface (Apple's app editing experience)
- iPhone frame mockups: https://www.figma.com/community/file/1129430806086978367
- Processing states: Linear app loading states, Railway deploy states
- Chat UX: ChatGPT mobile, Claude app mobile interface
