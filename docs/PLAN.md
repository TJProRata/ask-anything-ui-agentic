# Ask Anything UI Development Plan

## Executive Summary

This document outlines a comprehensive development plan for the Ask Anything UI project, addressing critical technical debt, implementing missing functionality, and establishing a path to production readiness. The plan is organized into 4 phases with clear priorities and deliverables.

## Current State Assessment

### Project Status
- **Version**: 0.1.0
- **Stack**: Next.js 15.4.5, React 19.1.0, TypeScript 5.9.2, Tailwind CSS v4
- **Foundation**:  Solid modern architecture established
- **Widget Functionality**: =§ Basic structure, critical pieces missing
- **Production Readiness**: L Multiple blocking issues

### Critical Blocking Issues
1. **FloatingWidget prop duplication** - Component interface confusion
2. **Build entry point mismatch** - Points to React component instead of initializer
3. **Widget Manager styles empty** - No actual Tailwind CSS injection
4. **FloatingWidgetPanel stub** - Core UI not implemented
5. **No Shadow DOM styles** - Widget styles won't work in production

## Phase 1: Foundation Fixes (Week 1-2)
*Goal: Get the widget to a working, embeddable state*

### 1.1 Fix Widget Component Architecture
**Priority**: CRITICAL

#### Tasks:
- [ ] **Fix FloatingWidget props** (components/widgets/floating-widget/floating-widget.tsx:9-30)
  - Remove `extends WidgetConfig` from interface
  - Keep only `config` prop for configuration
  - Clean up prop destructuring
  
- [ ] **Implement FloatingWidgetPanel UI** (components/widgets/floating-widget/floating-widget.tsx:131-170)
  - Create proper chat interface with message bubbles
  - Add input field with send button
  - Implement message display area with scroll
  - Add header with close button
  - Include loading states and error display

#### Expected Outcome:
```typescript
// Clean interface without duplication
interface FloatingWidgetProps {
  config: WidgetConfig;
}

// Fully functional panel component
export function FloatingWidgetPanel({...}) {
  // Complete chat UI implementation
}
```

### 1.2 Fix Build System
**Priority**: CRITICAL

#### Tasks:
- [ ] **Update build entry point** (scripts/build.widget.ts:5)
  - Change from `floating-widget.tsx` to `scripts/initialize.widget.ts`
  - Ensure IIFE format properly wraps initialization
  
- [ ] **Generate widget styles bundle** (widgets/widget-manager.tsx:8)
  - Extract Tailwind styles for widget components
  - Create CSS bundle from globals.css subset
  - Inject into widgetStyles constant

- [ ] **Fix widget initialization** (scripts/initialize.widget.ts:25-40)
  - Ensure auto-initialization works from script tag
  - Test data-widget-config parsing
  - Verify global namespace setup

#### Build Configuration:
```typescript
// Updated build.widget.ts
const ENTRY_POINT = "scripts/initialize.widget.ts";

// Add CSS extraction plugin
plugins: [
  {
    name: "extract-widget-styles",
    setup(build) {
      // Extract and bundle Tailwind CSS
    }
  }
]
```

### 1.3 Implement Shadow DOM Styling
**Priority**: HIGH

#### Tasks:
- [ ] **Create widget-specific styles** (new file: styles/widget.css)
  - Extract necessary Tailwind utilities
  - Add CSS reset for Shadow DOM
  - Include component-specific styles
  
- [ ] **Bundle styles with widget** (widgets/widget-manager.tsx:7-8)
  - Import compiled CSS as string
  - Inject into Shadow DOM on initialization
  - Ensure style isolation

#### Deliverable:
Working widget that can be embedded via:
```html
<script src="dist/widget.js" 
        data-widget-config='{"containerId":"widget","apiKey":"key"}'></script>
```

## Phase 2: Core Functionality (Week 3-4)
*Goal: Complete widget features and API integration*

### 2.1 API Integration
**Priority**: HIGH

#### Tasks:
- [ ] **Create mock API endpoint** (app/api/widget/route.ts)
  - Implement POST handler for messages
  - Add mock response generation
  - Include proper error handling
  
- [ ] **Update useWidgetAPI hook** (hooks/use-widget-api.ts:8)
  - Change default endpoint to `/api/widget`
  - Add retry logic
  - Implement proper error types

#### API Route Structure:
```typescript
// app/api/widget/route.ts
export async function POST(request: Request) {
  const { message, history } = await request.json();
  
  // Mock AI response for now
  return Response.json({
    message: "AI response here",
    metadata: { confidence: 0.95 }
  });
}
```

### 2.2 Component Organization
**Priority**: MEDIUM

#### Tasks:
- [ ] **Restructure widget components**
  - Move FloatingWidget to `/widgets/components/`
  - Create clear separation from app components
  - Update import paths
  
- [ ] **Create component library structure**
  - `/widgets/components/` - Widget-specific components
  - `/components/ui/` - Shared UI primitives
  - `/components/app/` - Application components

### 2.3 Type System Standardization
**Priority**: MEDIUM

#### Tasks:
- [ ] **Create comprehensive error types** (widgets/types.ts)
  ```typescript
  export interface WidgetError {
    code: 'API_ERROR' | 'NETWORK_ERROR' | 'VALIDATION_ERROR';
    message: string;
    details?: unknown;
  }
  ```
  
- [ ] **Enforce consistent type usage**
  - Use WidgetMessage interface everywhere
  - Add proper generic types for API responses
  - Create type guards for runtime validation

## Phase 3: Testing & Quality (Week 5-6)
*Goal: Establish testing infrastructure and quality assurance*

### 3.1 Testing Framework Setup
**Priority**: HIGH

#### Tasks:
- [ ] **Install testing dependencies**
  ```bash
  bun add -d vitest @testing-library/react @testing-library/user-event
  bun add -d @vitest/ui happy-dom
  ```
  
- [ ] **Configure Vitest** (vitest.config.ts)
  - Setup test environment
  - Configure coverage reporting
  - Add test scripts to package.json

- [ ] **Create test structure**
  - Unit tests for hooks
  - Component tests for widgets
  - Integration tests for build process
  - E2E tests for widget embedding

#### Test Coverage Goals:
- Widget components: 80%
- API hooks: 90%
- Build process: 70%
- Overall: 75%

### 3.2 Quality Assurance
**Priority**: MEDIUM

#### Tasks:
- [ ] **Add pre-commit hooks** (using husky)
  - Lint checks
  - Type checking
  - Test execution
  
- [ ] **Setup CI/CD pipeline** (.github/workflows/ci.yml)
  - Automated testing
  - Build verification
  - Bundle size checking

### 3.3 Documentation
**Priority**: MEDIUM

#### Tasks:
- [ ] **Create integration guide** (docs/INTEGRATION.md)
  - Step-by-step embedding instructions
  - Configuration options
  - Troubleshooting guide
  
- [ ] **Add JSDoc comments**
  - Document all public APIs
  - Add usage examples
  - Include type information

## Phase 4: Production Readiness (Week 7-8)
*Goal: Optimize, secure, and prepare for deployment*

### 4.1 Performance Optimization
**Priority**: HIGH

#### Tasks:
- [ ] **Bundle size optimization**
  - Implement tree shaking
  - Code splitting for large components
  - Lazy loading for non-critical features
  - Target: <50KB gzipped
  
- [ ] **Runtime performance**
  - Add React.memo where appropriate
  - Implement virtual scrolling for messages
  - Optimize re-renders

### 4.2 Security & Compliance
**Priority**: HIGH

#### Tasks:
- [ ] **Security audit**
  - XSS prevention in Shadow DOM
  - CSP compliance
  - API key security
  - Input sanitization
  
- [ ] **Accessibility**
  - ARIA labels and roles
  - Keyboard navigation
  - Screen reader support
  - WCAG 2.1 AA compliance

### 4.3 Production Infrastructure
**Priority**: MEDIUM

#### Tasks:
- [ ] **CDN deployment**
  - Setup CDN for widget distribution
  - Implement versioning strategy
  - Add cache headers
  
- [ ] **Monitoring & Analytics**
  - Error tracking (Sentry integration)
  - Performance monitoring
  - Usage analytics
  - Bundle size tracking

### 4.4 Design System Implementation
**Priority**: LOW

#### Tasks:
- [ ] **Implement design tokens** (widgets/design-tokens.ts)
  - Create token system from Figma
  - Add theming capabilities
  - Document token usage
  
- [ ] **Figma integration** (Phase 5 - Future)
  - API connection setup
  - Token extraction pipeline
  - Component sync

## Success Metrics

### Phase 1 Success Criteria
- [ ] Widget builds successfully as IIFE bundle
- [ ] Widget can be embedded via script tag
- [ ] Basic chat UI is functional
- [ ] Shadow DOM isolation works

### Phase 2 Success Criteria
- [ ] API integration works (mock or real)
- [ ] Messages send and receive properly
- [ ] Component organization is clear
- [ ] Type safety throughout

### Phase 3 Success Criteria
- [ ] 75% test coverage achieved
- [ ] CI/CD pipeline operational
- [ ] Documentation complete
- [ ] No critical bugs

### Phase 4 Success Criteria
- [ ] Bundle size <50KB gzipped
- [ ] WCAG 2.1 AA compliant
- [ ] Security audit passed
- [ ] Production deployment ready

## Risk Mitigation

### Technical Risks
1. **Shadow DOM complexity**: Start with minimal styles, iterate
2. **Bundle size growth**: Monitor continuously, split features
3. **Browser compatibility**: Test early, polyfill if needed
4. **Performance issues**: Profile regularly, optimize proactively

### Project Risks
1. **Scope creep**: Stick to phases, defer non-critical features
2. **Integration issues**: Test with real sites early
3. **API dependencies**: Build with mocks first
4. **Timeline slippage**: Weekly reviews, adjust scope not timeline

## Timeline Summary

| Phase | Duration | Start | End | Status |
|-------|----------|-------|-----|--------|
| Phase 1: Foundation | 2 weeks | Week 1 | Week 2 | =€ Ready to start |
| Phase 2: Core Features | 2 weeks | Week 3 | Week 4 | =Ë Planned |
| Phase 3: Testing | 2 weeks | Week 5 | Week 6 | =Ë Planned |
| Phase 4: Production | 2 weeks | Week 7 | Week 8 | =Ë Planned |

**Total Duration**: 8 weeks to production-ready MVP

## Next Steps

1. **Immediate Actions** (Today):
   - Fix FloatingWidget prop duplication
   - Start implementing FloatingWidgetPanel UI
   - Update build entry point

2. **This Week**:
   - Complete Phase 1.1 (Component Architecture)
   - Begin Phase 1.2 (Build System)
   - Create widget styles bundle

3. **Team Alignment**:
   - Review plan with stakeholders
   - Assign task ownership
   - Setup weekly progress reviews

## Appendix: Technical Details

### File Modifications Required

#### Critical Files to Modify:
1. `components/widgets/floating-widget/floating-widget.tsx` - Fix props, implement panel
2. `scripts/build.widget.ts` - Update entry point
3. `widgets/widget-manager.tsx` - Add actual styles
4. `scripts/initialize.widget.ts` - Ensure auto-init works
5. `app/api/widget/route.ts` - Create API endpoint (new file)

#### New Files to Create:
1. `styles/widget.css` - Widget-specific styles
2. `widgets/design-tokens.ts` - Design system tokens
3. `vitest.config.ts` - Test configuration
4. `docs/INTEGRATION.md` - Integration guide
5. `__tests__/` - Test directory structure

### Dependencies to Add

```json
{
  "devDependencies": {
    "vitest": "^2.0.0",
    "@testing-library/react": "^16.0.0",
    "@testing-library/user-event": "^14.0.0",
    "@vitest/ui": "^2.0.0",
    "happy-dom": "^15.0.0",
    "husky": "^9.0.0",
    "@sentry/nextjs": "^8.0.0"
  }
}
```

---

**Document Version**: 1.0.0  
**Created**: January 2025  
**Status**: Ready for Review  
**Author**: Development Team with Claude Code

*This is a living document that will be updated as the project progresses.*