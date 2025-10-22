# OnboardingWidget Phases

Detailed documentation of all 15 onboarding phases.

## Phase Overview

| Phase | Title | Type | Duration | User Input |
|-------|-------|------|----------|------------|
| 1 | Welcome | Introduction | 10s | None |
| 2 | Goal Selection | Configuration | 15s | Selection |
| 3 | Team Setup | Configuration | 20s | Form input |
| 4 | Integration | Configuration | 15s | Selection |
| 5 | AI Assistant | Feature intro | 10s | None |
| 6 | Prompt Testing | Interactive | 30s | Text input |
| 7 | Response Review | Review | 15s | Feedback |
| 8 | Preview Mode | Demonstration | 20s | None |
| 9 | Widget Customization | Configuration | 25s | Selections |
| 10 | Preview Testing | Interactive | 30s | User testing |
| 11 | Advanced Features | Feature intro | 15s | None |
| 12 | Analytics Setup | Configuration | 20s | Toggles |
| 13 | Security Settings | Configuration | 20s | Toggles |
| 14 | Readiness Check | Assessment | 10s | None |
| 15 | Voice Testing | Interactive | 45s | Voice input |

## Detailed Phase Descriptions

### Phase 1: Welcome
**Goal**: Introduce the onboarding experience

**UI Components**:
- Animated welcome message
- Brand gradient header
- Blue star icon
- Progress indicator (0%)

**User Actions**: Read and proceed

**Animations**: Streaming text effect on title

---

### Phase 2: Goal Selection
**Goal**: Understand user objectives

**UI Components**:
- Multiple choice selection
- Goal cards with descriptions
- Progress indicator (7%)

**User Actions**: Select primary goal from:
- Customer Support
- Lead Generation
- Product Information
- General Assistance

**Validation**: At least one goal must be selected

---

### Phase 3: Team Setup
**Goal**: Configure team and workspace

**UI Components**:
- Form inputs (team name, size)
- Dropdown selections
- Progress indicator (13%)

**User Actions**:
- Enter team name
- Select team size
- Choose industry

**Validation**: All fields required

---

### Phase 4: Integration
**Goal**: Select integration platforms

**UI Components**:
- Platform logos
- Checkbox selections
- Progress indicator (20%)

**User Actions**: Select integrations:
- Slack
- Microsoft Teams
- Salesforce
- HubSpot
- Zendesk
- Custom API

---

### Phase 5: AI Assistant Introduction
**Goal**: Introduce AI capabilities

**UI Components**:
- AI feature showcase
- Wand icon animation
- Capability list
- Progress indicator (27%)

**User Actions**: Read and proceed

**Animations**: Fade-in feature cards

---

### Phase 6: Prompt Testing
**Goal**: Test AI prompt and response

**UI Components**:
- PromptInput with gradient border
- Real-time response display
- SearchingAnimation during processing
- Progress indicator (33%)

**User Actions**:
- Enter test prompt
- Submit for AI processing
- Review response

**Features**:
- Character counter
- Submit button states
- Loading animation

---

### Phase 7: Response Review
**Goal**: Gather feedback on AI response

**UI Components**:
- Response display
- Thumbs up/down feedback
- Comment field
- Progress indicator (40%)

**User Actions**:
- Rate response quality
- Optionally provide feedback

---

### Phase 8: Preview Mode
**Goal**: Demonstrate widget preview

**UI Components**:
- GifHousing with preview.gif
- Feature highlights
- Progress indicator (47%)

**User Actions**: Watch preview animation

**Asset**: `preview.gif` (520KB)

---

### Phase 9: Widget Customization
**Goal**: Configure widget appearance

**UI Components**:
- Color picker
- Position selector
- Size options
- Progress indicator (53%)

**User Actions**:
- Select widget theme
- Choose placement
- Set dimensions

**Preview**: Live preview of selections

---

### Phase 10: Preview Testing
**Goal**: Interact with customized widget

**UI Components**:
- Live widget preview
- Interaction instructions
- Progress indicator (60%)

**User Actions**: Test widget functionality

---

### Phase 11: Advanced Features
**Goal**: Introduce premium features

**UI Components**:
- PricingCard components
- Feature comparison
- Progress indicator (67%)

**User Actions**: Review feature tiers

**Features Shown**:
- Analytics dashboard
- Custom branding
- Priority support
- Advanced integrations

---

### Phase 12: Analytics Setup
**Goal**: Configure analytics tracking

**UI Components**:
- Toggle switches
- Metric descriptions
- Progress indicator (73%)

**User Actions**: Enable/disable:
- Conversation tracking
- User behavior analytics
- Performance metrics
- Custom events

---

### Phase 13: Security Settings
**Goal**: Configure security options

**UI Components**:
- Security toggle switches
- Encryption badges
- Compliance indicators
- Progress indicator (80%)

**User Actions**: Enable/disable:
- End-to-end encryption
- Data retention policies
- GDPR compliance
- SOC 2 compliance

---

### Phase 14: Readiness Check
**Goal**: Calculate deployment readiness

**UI Components**:
- ReadinessScoreGauge (circular)
- DualPhaseProgress indicator
- Checklist of completed items
- Progress indicator (87%)

**Calculation**: Based on:
- Completed configuration (40%)
- Integration setup (30%)
- Testing completion (20%)
- Security settings (10%)

**User Actions**: Review readiness score

---

### Phase 15: Voice Testing & Completion
**Goal**: Test voice mode and celebrate completion

**UI Components**:
- Voice mode interface
- Microphone button with animation
- GifHousing with celebration.gif
- SuccessPhase component
- Progress indicator (100%)

**User Actions**:
1. Click microphone to activate
2. Speak test phrase
3. Review voice transcription
4. Celebrate completion

**Asset**: `celebration.gif` (23MB)

**Success Metrics Shown**:
- Setup completion: 100%
- Features configured: 12/15
- Integrations: 3 connected
- Readiness score: 95%

**Final Actions**:
- "Launch Dashboard" button
- "Download Summary" option
- "Share Progress" option

## Phase Navigation

### Carousel Controls
- **Previous**: Navigate to previous phase
- **Next**: Navigate to next phase (if validation passes)
- **Direct Jump**: Click phase dots to jump directly

### Keyboard Navigation
- `←` Previous phase
- `→` Next phase
- `Escape` Close widget
- `Tab` Navigate within phase

### Touch Gestures
- Swipe left: Next phase
- Swipe right: Previous phase

## Validation Rules

Each phase can have validation requirements:

```typescript
const canProceedToNext = () => {
  switch (currentPhase) {
    case 2: return selectedGoals.length > 0;
    case 3: return teamName && teamSize && industry;
    case 4: return integrations.length > 0;
    case 6: return promptSubmitted && responseReceived;
    case 9: return theme && position && size;
    default: return true;
  }
};
```

## Progress Calculation

Overall progress is calculated as:
```
progress = (currentPhase / 15) * 100
```

Each phase represents ~6.67% progress increment.

## Phase Transitions

All phase transitions use Framer Motion animations:

```typescript
const phaseTransition = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.3 }
};
```

## Error States

Each phase can display error states:
- Form validation errors
- API call failures
- Asset loading failures
- Browser compatibility warnings

## Future Phase Ideas

Potential additions:
- **Phase 16**: Integration testing
- **Phase 17**: Custom branding upload
- **Phase 18**: Team invitations
- **Phase 19**: Workflow automation
- **Phase 20**: Performance baseline
