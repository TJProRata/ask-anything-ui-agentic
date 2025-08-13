# FloatingWidget Integration Guide

This guide shows how to embed the Ask Anything FloatingWidget on any website, with notes for CSP and CDN hosting.

## Quick start — script tag auto-init

Include the built IIFE bundle and pass a JSON config via `data-widget-config`. The widget will create a container if not present and mount inside a Shadow DOM for style isolation.

```html
<div id="ask-anything"></div>
<script
  src="/dist/widget.js"
  data-widget-config='{
    "containerId": "ask-anything",
    "apiKey": "",
    "apiEndpoint": "/api/widget",
    "theme": "dark",
    "buttonText": "Ask",
    "headerTitle": "Ask Anything",
    "placeholder": "Type your message"
  }'
></script>
```

## Programmatic init

```html
<div id="ask-anything"></div>
<script src="/dist/widget.js"></script>
<script>
  window.FloatingWidget.init({
    containerId: "ask-anything",
    apiKey: "",
    apiEndpoint: "/api/widget",
    theme: "dark",
    buttonText: "Ask",
    headerTitle: "Ask Anything",
    placeholder: "Type your message"
  });
  // Instances available at: window.FloatingWidget.instances
  // Each entry contains { root, shadowRoot, config }
}</script>
```

## Configuration reference

See `widgets/types.ts` for full JSDoc. Common fields:

- `containerId` (string, required): DOM id where the Shadow DOM host is attached.
- `apiKey` (string): API key for your backend.
- `apiEndpoint` (string, default `/api/widget`): API route for message roundtrip.
- `theme` ("light" | "dark" | "custom"): Selects base token preset.
- `customStyles` (Record<string, string>): Override any allowed widget CSS variable.
- `cspNonce` (string): Optional CSP nonce applied to the injected `<style>` tag inside the Shadow DOM.
- `buttonText`, `headerTitle`, `placeholder` (strings): UI copy.
- `position` ("bottom-right" | "bottom-left" | "top-right" | "top-left" | "center"): Widget anchor position.
- `initialExpanded` (boolean): Start opened.
- `onReady`, `onMessage`, `onExpand`, `onCollapse`: Lifecycle callbacks.

## Theming and CSS variables

The widget injects compact base CSS and exposes CSS variables under the Shadow DOM host. You can override selected variables via `customStyles` or switch themes via `theme`.

Examples:

```js
window.FloatingWidget.init({
  containerId: "ask-anything",
  apiKey: "",
  theme: "dark",
  customStyles: {
    "--widget-bg": "#0b1220",
    "--widget-text": "#ffffff",
    "--widget-primary": "#36e1ae"
  }
});
```

## Content Security Policy (CSP)

The widget injects a `<style>` element into its Shadow DOM. If your site uses a strict CSP that blocks inline styles, you have two options:

1) Provide a style nonce and pass it via config as `cspNonce`. Ensure your script tag and the widget config use the same nonce value.

```html
<script src="/dist/widget.js" nonce="<NONCE>" data-widget-config='{"containerId":"ask","cspNonce":"<NONCE>"}'></script>
```

2) Use a CSP style hash that matches the generated `<style>` content. This is more complex and not recommended for dynamic themes. Prefer nonces when possible.

Note: Your policy must allow `script-src` for where you host `widget.js` and `style-src` to accept the nonce or hash.

Minimal example policy (adjust to your origin and needs):

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-<NONCE>'; style-src 'self' 'nonce-<NONCE>'; connect-src 'self' https://your-api.example; img-src 'self' data:; font-src 'self' data:;
```

## CDN hosting and caching

- Host `widget.js` on a CDN with long-lived cache headers (e.g., `Cache-Control: public, max-age=31536000, immutable`).
- Use the hashed filename variant produced by the build (e.g., `widget.abcd1234.js`) for versioned deploys.
- Keep a stable alias (e.g., `widget.latest.js`) if you need a moving target for testing.

## Local development

- Build the widget: `bun run build:widget` (outputs to `public/dist/`).
- Test isolation via `public/widget-host-test.html` loaded from your dev server.
- The Next.js `/widgets` page also demonstrates both component and IIFE embed modes.


## Further reading

- Public API reference: `docs/WIDGET-API.md`
- Tokens and theming: `docs/TOKENS.md`

