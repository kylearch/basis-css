# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Basis CSS is a zero-dependency CSS framework with an adaptive color system that dynamically generates color palettes based on selected color modes (monochrome, one-color, two-colors, three-colors). The framework provides automatic light/dark theme switching and a comprehensive component library.

## Commands

**Build TypeScript:**
```bash
npm run build
```
Compiles TypeScript files from `src/` to `dist/` using the configuration in `tsconfig.json`.

**Install Dependencies:**
```bash
npm install
```
Currently only installs TypeScript as a dev dependency.

**View Demo:**
Open `index.html` in a browser to see the interactive color system demo and component showcase.

## Architecture

### Core Files
- **app.js** (821 lines): Contains the entire color system engine including:
  - Color space conversions (hex/RGB/HSL)
  - Palette generation algorithm that creates light/dark themes
  - WCAG contrast calculations for text readability
  - CSS custom property application to DOM
  - Event handling for color mode switching and input changes

- **style.css** (2108 lines): Complete CSS framework with:
  - CSS custom properties for theming (--basis-light-*, --basis-dark-*)
  - Component styles (buttons, cards, forms, alerts, modals, tables)
  - Responsive utilities and grid system
  - Light/dark theme switching via `data-color-scheme` attribute

- **index.html**: Interactive demo showcasing the color system configurator and all components with live code examples.

### Color System Algorithm
The framework generates palettes through this process:
1. User selects color mode (monochrome/one/two/three colors) and provides hex colors
2. System derives missing colors via hue shifting (secondary = primary + 35°, tertiary = secondary - 55°)
3. Applies weighted tinting to neutral base colors based on active colors
4. Generates intent palettes with hover/active states and contrast-aware text colors
5. Outputs complete light and dark theme palettes as CSS variables

### Key Functions in app.js
- `generatePalette()`: Main palette generation function
- `updateColorSystem()`: Updates the entire color system when changes occur
- `applyActiveSchemeTokens()`: Applies CSS custom properties to the document
- `buildIntentPalette()`: Creates color variations (base, hover, active, soft)
- `getReadableTextColor()`: Determines optimal text color for contrast

## Distribution Methods

The framework supports three installation methods:
1. **npm**: `npm install basis-css`
2. **Composer (PHP)**: `composer require basis-css/basis-css`
3. **CDN**: Available via unpkg.com

## Development Notes

- The TypeScript setup exists but main functionality is currently in vanilla JavaScript (app.js)
- No testing framework is currently configured
- The framework uses CSS custom properties that can be overridden at the `:root` level for customization
- Theme switching respects system preferences via `prefers-color-scheme` but can be overridden with `data-color-scheme="light"` or `data-color-scheme="dark"` on the HTML element