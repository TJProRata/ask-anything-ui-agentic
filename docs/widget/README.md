# Widget Documentation

Complete documentation for the Ask Anything embeddable widget system.

## Overview

The widget system transforms React components into embeddable third-party widgets that can be integrated into any website with complete style isolation.

## Documentation Structure

### Core Documentation
- [Pipeline](./PIPELINE.md) - Complete widget architecture and build process
- [API Reference](./API.md) - Public API documentation
- [Integration Guide](./INTEGRATION.md) - How to embed widgets in your site

### Widget Components
- [Floating Widget](./floating-widget/) - Main expandable chat widget

### Examples
- [Basic Integration](./examples/basic.html) - Simple embedding example
- [Advanced Config](./examples/advanced.html) - Full configuration options
- [Multiple Widgets](./examples/multiple.html) - Running multiple widget instances

## Quick Links

### For Developers
- [Getting Started](./INTEGRATION.md#quick-start)
- [Configuration Options](./API.md#configuration)
- [Theming Guide](../integrations/TOKENS.md)

### For Integrators
- [CDN Setup](./INTEGRATION.md#cdn-hosting)
- [CSP Configuration](./INTEGRATION.md#content-security-policy)
- [Troubleshooting](./INTEGRATION.md#troubleshooting)

## Widget Features

- 🛡️ **Shadow DOM Isolation** - Zero CSS conflicts
- 🎨 **Theming System** - Light/dark presets with custom overrides
- 📦 **IIFE Bundle** - Single script tag integration
- ⚡ **Lightweight** - ~236KB including React
- 🔒 **Secure** - CSP compliant with nonce support
- ♿ **Accessible** - ARIA labels and keyboard navigation

## Support

For issues or questions, refer to the [main documentation](../README.md) or check the [troubleshooting guide](./INTEGRATION.md#troubleshooting).