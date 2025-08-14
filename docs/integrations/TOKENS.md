## Widget Tokens and Theming

Source of truth: `styles/widget.css` and `widgets/design-tokens.ts`.

### Supported CSS Variables

```text
--widget-bg
--widget-text
--widget-primary
--widget-border
```

### Presets

See `widgets/design-tokens.ts#widgetThemePresets` for the built-in `light` and `dark` token values. Use `theme: 'custom'` with `customStyles` to override any of the supported variables.

### Mapping to App Tokens

- `--widget-bg` ≈ app `--background` / `--card`
- `--widget-text` ≈ app `--foreground`
- `--widget-primary` ≈ app `--primary`
- `--widget-border` ≈ app `--border`

### Example Override

```js
window.FloatingWidget.init({
  containerId: 'ask-anything',
  apiKey: '',
  theme: 'custom',
  customStyles: {
    '--widget-bg': '#0b1220',
    '--widget-text': '#ffffff',
    '--widget-primary': '#36e1ae',
    '--widget-border': '#1f2a44'
  }
});
```


