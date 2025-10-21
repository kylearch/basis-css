# Basis CSS

A professional CSS framework with an adaptive color system that supports multiple color modes and automatic light/dark theme switching.

## Features

- **Adaptive Color System**: Choose from 4 color modes:
  - Monochrome: Sophisticated offblack and offwhite palette
  - One-color: Monochrome foundation with one strategic highlight color
  - Two-colors: Natural hierarchy with primary and secondary colors
  - Three-colors: Rich layered design with primary, secondary, and tertiary colors

- **Automatic Theme Switching**: Respects system preferences for light/dark mode
- **Comprehensive Components**: Buttons, cards, forms, tables, alerts, modals, and more
- **Utility Classes**: Spacing, typography, flexbox, grid utilities
- **Zero Dependencies**: Pure CSS and vanilla JavaScript
- **Responsive Design**: Mobile-first approach with responsive utilities

## Installation

### npm

```bash
npm install basis-css
```

### Composer (PHP)

```bash
composer require basis-css/basis-css
```

### CDN

You can also include Basis CSS directly via CDN:

```html
<link rel="stylesheet" href="https://unpkg.com/basis-css@latest/style.css">
<script src="https://unpkg.com/basis-css@latest/app.js"></script>
```

## Usage

### Basic Setup

Include the CSS and JavaScript files in your HTML:

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="path/to/style.css">
</head>
<body>
  <div class="container">
    <h1>Hello, Basis CSS!</h1>
    <button class="btn btn-primary">Click me</button>
  </div>

  <script src="path/to/app.js"></script>
</body>
</html>
```

### Color Modes

Switch between color modes programmatically:

```javascript
// Switch to one-color mode with a custom accent
colorSystem.mode = 'one-color';
colorSystem.colors.accent = '#3b82f6';
updateColorSystem();

// Switch to two-colors mode
colorSystem.mode = 'two-colors';
colorSystem.colors.primary = '#3b82f6';
colorSystem.colors.secondary = '#8b5cf6';
updateColorSystem();

// Switch to three-colors mode
colorSystem.mode = 'three-colors';
colorSystem.colors.primary = '#3b82f6';
colorSystem.colors.secondary = '#8b5cf6';
colorSystem.colors.tertiary = '#ec4899';
updateColorSystem();

// Reset to monochrome
resetToMonochrome();
```

### Manual Theme Control

Override system theme preferences:

```html
<!-- Force dark mode -->
<html data-color-scheme="dark">

<!-- Force light mode -->
<html data-color-scheme="light">
```

## Components

### Buttons

```html
<button class="btn btn-primary">Primary Button</button>
<button class="btn btn-secondary">Secondary Button</button>
<button class="btn btn-tertiary">Tertiary Button</button>
<button class="btn btn-outline">Outline Button</button>
<button class="btn btn-ghost">Ghost Button</button>
```

### Cards

```html
<div class="card">
  <div class="card-header">
    <h4>Card Title</h4>
  </div>
  <div class="card-body">
    <p>Card content goes here.</p>
  </div>
</div>
```

### Forms

```html
<div class="form-group">
  <label class="form-label">Email</label>
  <input type="email" class="form-control" placeholder="Enter email">
</div>
```

### Alerts

```html
<div class="alert alert-primary">This is a primary alert</div>
<div class="alert alert-success">This is a success alert</div>
<div class="alert alert-danger">This is a danger alert</div>
```

## Customization

All colors are defined as CSS custom properties and can be overridden:

```css
:root {
  --color-primary: #your-color;
  --color-secondary: #your-color;
  --font-family-base: "Your Font", sans-serif;
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use in personal and commercial projects.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
