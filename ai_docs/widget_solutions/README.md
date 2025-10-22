# Widget Solutions Documentation

This directory contains comprehensive documentation of widget implementation issues and their solutions. Use this as a reference when developing or debugging widget components.

## Contents

### [gist-widget-fixes.md](./gist-widget-fixes.md)
Complete documentation of four major issues encountered during gist creation widget development:

1. **Excessive White Space** - Dynamic height system blocked by min-height constraint
2. **Horizontal Position Shift** - Conflicting absolute and flex centering mechanisms
3. **Collapsed State Not Rendering** - Early return and page-level conditional rendering issues
4. **Slug Preview Layout Shift** - Missing AnimatePresence and layout animations

Each problem includes:
- Detailed symptoms and reproduction steps
- Root cause analysis with code references
- Step-by-step solution with code examples
- Explanation of why the solution works
- Testing checklist

## Quick Reference

### Common Widget Issues

| Issue | Quick Fix | Reference |
|-------|-----------|-----------|
| Excessive white space | Remove `min-h-[400px]` from content | [Problem 1](./gist-widget-fixes.md#problem-1-excessive-white-space-dynamic-height) |
| Horizontal shifting | Add `positioning="relative"` prop | [Problem 2](./gist-widget-fixes.md#problem-2-horizontal-position-shift-during-typing) |
| Collapsed state missing | Remove early return, always render widget | [Problem 3](./gist-widget-fixes.md#problem-3-collapsed-state-not-rendering) |
| Content jumping | Wrap conditional elements in AnimatePresence | [Problem 4](./gist-widget-fixes.md#problem-4-slug-preview-causes-vertical-layout-shift) |

### GlassWidgetContainer Best Practices

✅ **Do:**
- Pass `positioning="relative"` when parent uses flex centering
- Always include `isExpanded` and `onExpandChange` props
- Let container handle its own dynamic height
- Use AnimatePresence for conditional content
- Add `layout` prop to prevent sibling jumps

❌ **Don't:**
- Apply `min-height` constraints to content containers
- Use absolute positioning with flex parent
- Add early returns based on expanded state
- Render conditionally at page level
- Forget to pass positioning prop

### Testing Checklist

Before committing widget changes:
- [ ] Collapsed state renders and functions
- [ ] Widget remains centered during interactions
- [ ] Height adapts to content without white space
- [ ] Conditional content animates smoothly
- [ ] No layout jumps or shifts during typing
- [ ] All steps transition smoothly

## Implementation Templates

### Basic Widget Integration
```tsx
<GlassWidgetContainer
  className="w-full max-w-2xl mx-auto"
  isExpanded={isExpanded}
  onExpandChange={onExpandChange}
  positioning="relative"
>
  <GlassWidgetHeader>...</GlassWidgetHeader>
  <GlassWidgetContent>...</GlassWidgetContent>
  <GlassWidgetFooter>...</GlassWidgetFooter>
</GlassWidgetContainer>
```

### Conditional Content with Animation
```tsx
<AnimatePresence initial={false}>
  {condition && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="overflow-hidden"
    >
      {/* Dynamic content */}
    </motion.div>
  )}
</AnimatePresence>
```

## Related Documentation

- **Component Documentation**: `/docs/components/`
- **Widget Architecture**: `/docs/widget/`
- **Design System**: `/.cursor/rules/design_system_rules.mdc`
- **Project Overview**: `/README.md`

## Contributing

When adding new widget solutions documentation:

1. Create a new `.md` file in this directory
2. Follow the existing structure (Symptoms → Root Cause → Solution)
3. Include code examples and references
4. Add testing checklist
5. Update this README with links

## Maintenance

Keep this documentation updated when:
- New widget issues are discovered and solved
- Architectural patterns change
- Component APIs evolve
- Best practices are identified
