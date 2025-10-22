// Professional CSS Framework - Adaptive Color System

// Color system state
let colorSystem = {
    mode: 'monochrome', // 'monochrome', 'one-color', 'two-colors', 'three-colors'
    colors: {
        accent: '#3b82f6',
        primary: '#3b82f6', 
        secondary: '#8b5cf6',
        tertiary: '#ec4899'
    }
};

// Framework name data
const frameworkNames = {
    'basis': 'Basis CSS',
    'basiscss': 'BasisCSS',
    'basis-framework': 'Basis Framework',
    'basis-design': 'Basis Design',
    'basiscss-ui': 'BasisCSS UI',
    'basis-ui': 'Basis UI'
};

// Color mode descriptions
const modeDescriptions = {
    'monochrome': 'Sophisticated offblack and offwhite palette. Timeless, professional, works in any industry.',
    'one-color': 'Monochrome foundation with one strategic highlight color. Used sparingly for impact.',
    'two-colors': 'Natural hierarchy with primary and secondary colors creating balanced design.',
    'three-colors': 'Rich layered design with primary, secondary, and tertiary spread throughout.'
};

// Neutral baselines for light and dark themes
const BASE_NEUTRALS = {
    light: {
        background: '#fdfefe',
        surface: '#ffffff',
        surfaceRaised: '#f6f8fb',
        surfaceMuted: '#eef2f7',
        border: '#dce3ef',
        borderSubtle: '#edf1f8',
        borderStrong: '#c5cfdd',
        text: '#0f172a',
        textSecondary: '#4b5563',
        textMuted: '#6b7280'
    },
    dark: {
        background: '#05070b',
        surface: '#090c11',
        surfaceRaised: '#0f141d',
        surfaceMuted: '#161c27',
        border: '#1f2633',
        borderSubtle: '#171d27',
        borderStrong: '#2a323f',
        text: '#f1f5f9',
        textSecondary: '#c7d2e2',
        textMuted: '#94a3b8'
    }
};

// Baseline semantic colors that will be shifted toward the active palette
const STATUS_BASE = {
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6'
};

// Utility helpers -----------------------------------------------------------

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

function hexToRgb(hex) {
    const clean = hex.replace('#', '');
    const bigint = parseInt(clean, 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    };
}

function rgbToHex({ r, g, b }) {
    const toHex = (n) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function rgbToHsl({ r, g, b }) {
    const nr = r / 255;
    const ng = g / 255;
    const nb = b / 255;

    const max = Math.max(nr, ng, nb);
    const min = Math.min(nr, ng, nb);
    const delta = max - min;

    let h = 0;
    if (delta !== 0) {
        switch (max) {
            case nr:
                h = ((ng - nb) / delta) % 6;
                break;
            case ng:
                h = (nb - nr) / delta + 2;
                break;
            default:
                h = (nr - ng) / delta + 4;
                break;
        }
        h *= 60;
        if (h < 0) h += 360;
    }

    const l = (max + min) / 2;
    const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    return { h, s, l };
}

function hslToRgb({ h, s, l }) {
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;

    let r = 0;
    let g = 0;
    let b = 0;

    if (0 <= h && h < 60) {
        r = c;
        g = x;
    } else if (60 <= h && h < 120) {
        r = x;
        g = c;
    } else if (120 <= h && h < 180) {
        g = c;
        b = x;
    } else if (180 <= h && h < 240) {
        g = x;
        b = c;
    } else if (240 <= h && h < 300) {
        r = x;
        b = c;
    } else {
        r = c;
        b = x;
    }

    const to255 = (n) => clamp(Math.round((n + m) * 255), 0, 255);
    return { r: to255(r), g: to255(g), b: to255(b) };
}

function adjustLightness(hex, amount) {
    const hsl = rgbToHsl(hexToRgb(hex));
    hsl.l = clamp(hsl.l + amount / 100, 0, 1);
    return rgbToHex(hslToRgb(hsl));
}

function adjustSaturation(hex, amount) {
    const hsl = rgbToHsl(hexToRgb(hex));
    hsl.s = clamp(hsl.s + amount / 100, 0, 1);
    return rgbToHex(hslToRgb(hsl));
}

function shiftHue(hex, amount) {
    const hsl = rgbToHsl(hexToRgb(hex));
    hsl.h = (hsl.h + amount) % 360;
    if (hsl.h < 0) hsl.h += 360;
    return rgbToHex(hslToRgb(hsl));
}

function mixColors(colorA, colorB, weight) {
    const w = clamp(weight, 0, 1);
    const rgbA = hexToRgb(colorA);
    const rgbB = hexToRgb(colorB);
    return rgbToHex({
        r: rgbA.r * (1 - w) + rgbB.r * w,
        g: rgbA.g * (1 - w) + rgbB.g * w,
        b: rgbA.b * (1 - w) + rgbB.b * w
    });
}

function hexToRgba(hex, alpha) {
    const { r, g, b } = hexToRgb(hex);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function hexToRgbString(hex) {
    const { r, g, b } = hexToRgb(hex);
    return `${r}, ${g}, ${b}`;
}

function getRelativeLuminance(hex) {
    const { r, g, b } = hexToRgb(hex);
    const channel = (value) => {
        const v = value / 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };

    const R = channel(r);
    const G = channel(g);
    const B = channel(b);
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function getReadableTextColor(hex, theme) {
    const luminance = getRelativeLuminance(hex);
    const darkContrast = (luminance + 0.05) / 0.05;
    const lightContrast = 1.05 / (luminance + 0.05);
    const prefersLightText = theme === 'dark' || lightContrast > darkContrast;
    return prefersLightText ? '#ffffff' : '#0b1011';
}

function getTintWeights(count) {
    switch (count) {
        case 0:
            return { light: 0, dark: 0 };
        case 1:
            return { light: 0.035, dark: 0.05 };
        case 2:
            return { light: 0.048, dark: 0.065 };
        default:
            return { light: 0.058, dark: 0.075 };
    }
}

function tintNeutralBase(basePalette, colors, weight, theme) {
    if (!colors.length || weight <= 0) {
        return { ...basePalette };
    }

    const themeScalar = theme === 'light' ? 0.4 : 0.5;
    const baseline = clamp(weight * themeScalar, 0, theme === 'light' ? 0.08 : 0.12);
    const surfaceWeight = clamp(baseline + (theme === 'light' ? 0.004 : 0.007), 0, theme === 'light' ? 0.1 : 0.14);
    const raisedWeight = clamp(baseline + (theme === 'light' ? 0.008 : 0.012), 0, theme === 'light' ? 0.12 : 0.16);
    const subtleWeight = clamp(baseline - 0.005, 0, 0.08);
    const borderWeight = clamp(baseline - 0.008, 0, 0.06);
    const borderStrongWeight = clamp(baseline, 0, 0.1);
    const textSecondaryWeight = clamp(baseline - 0.01, 0, 0.06);

    const tint = (color, w) =>
        colors.reduce((acc, accent) => mixColors(acc, accent, w), color);

    const backgroundWeight = clamp(baseline * (theme === 'light' ? 0.65 : 0.8), 0, theme === 'light' ? 0.08 : 0.12);

    return {
        background: tint(basePalette.background, backgroundWeight),
        surface: tint(basePalette.surface, surfaceWeight),
        surfaceRaised: tint(basePalette.surfaceRaised, raisedWeight),
        surfaceMuted: tint(basePalette.surfaceMuted, raisedWeight),
        border: tint(basePalette.border, borderWeight),
        borderSubtle: tint(basePalette.borderSubtle, subtleWeight),
        borderStrong: tint(basePalette.borderStrong, borderStrongWeight),
        text: basePalette.text,
        textSecondary: tint(basePalette.textSecondary, textSecondaryWeight),
        textMuted: tint(basePalette.textMuted, textSecondaryWeight)
    };
}

function buildIntentPalette(hex, themeNeutrals, theme) {
    if (!hex) {
        return null;
    }

    const baseColor =
        theme === 'light'
            ? adjustLightness(hex, 0)
            : adjustLightness(hex, -8);

    const hoverColor =
        theme === 'light'
            ? adjustLightness(baseColor, -6)
            : adjustLightness(baseColor, -5);

    const activeColor =
        theme === 'light'
            ? adjustLightness(baseColor, -12)
            : adjustLightness(baseColor, -9);

    const contrastText = getReadableTextColor(baseColor, theme);
    const alphaBase = theme === 'light' ? 0.14 : 0.22;
    const alphaHover = theme === 'light' ? 0.22 : 0.28;
    const alphaActive = theme === 'light' ? 0.28 : 0.34;

    const softBase = mixColors(themeNeutrals.surfaceMuted, baseColor, theme === 'light' ? 0.12 : 0.18);
    const softBorder = mixColors(themeNeutrals.border, baseColor, theme === 'light' ? 0.18 : 0.24);

    return {
        base: baseColor,
        hover: hoverColor,
        active: activeColor,
        contrast: contrastText,
        softHex: softBase,
        softBorderHex: softBorder,
        soft: hexToRgba(baseColor, alphaBase),
        softHover: hexToRgba(baseColor, alphaHover),
        softActive: hexToRgba(baseColor, alphaActive)
    };
}

function computeActiveColors(mode, colors) {
    const defaultAccent = '#3b82f6';
    const suppliedPrimary = colors.primary || colors.accent || defaultAccent;
    const suppliedSecondary = colors.secondary || shiftHue(suppliedPrimary, 35);
    const suppliedTertiary = colors.tertiary || shiftHue(suppliedSecondary, -55);

    switch (mode) {
        case 'monochrome':
            return {
                accent: '#1e293b',
                primary: '#1e293b',
                secondary: '#cbd5e1',
                tertiary: '#e2e8f0'
            };
        case 'one-color': {
            const accent = colors.accent || suppliedPrimary;
            return {
                accent,
                primary: accent,
                secondary: adjustSaturation(adjustLightness(accent, 6), -25),
                tertiary: adjustLightness(accent, 22)
            };
        }
        case 'two-colors':
            return {
                accent: suppliedPrimary,
                primary: suppliedPrimary,
                secondary: suppliedSecondary,
                tertiary: mixColors(suppliedPrimary, suppliedSecondary, 0.5)
            };
        case 'three-colors':
        default:
            return {
                accent: suppliedPrimary,
                primary: suppliedPrimary,
                secondary: colors.secondary || suppliedSecondary,
                tertiary: colors.tertiary || suppliedTertiary
            };
    }
}

function generatePalette(mode, colors) {
    const active = computeActiveColors(mode, colors);
    const colorPool = [active.primary, active.secondary, active.tertiary].filter(Boolean);
    const tintWeights = getTintWeights(colorPool.length);

    const lightNeutrals = tintNeutralBase(BASE_NEUTRALS.light, colorPool, tintWeights.light, 'light');
    const darkNeutrals = tintNeutralBase(BASE_NEUTRALS.dark, colorPool, tintWeights.dark, 'dark');

    const lightPrimary = buildIntentPalette(active.primary, lightNeutrals, 'light');
    const darkPrimary = buildIntentPalette(active.primary, darkNeutrals, 'dark');
    const lightSecondary = buildIntentPalette(active.secondary, lightNeutrals, 'light');
    const darkSecondary = buildIntentPalette(active.secondary, darkNeutrals, 'dark');
    const lightTertiary = buildIntentPalette(active.tertiary, lightNeutrals, 'light');
    const darkTertiary = buildIntentPalette(active.tertiary, darkNeutrals, 'dark');

    const accentForFocus = active.accent || active.primary || '#2563eb';
    const influence = colorPool.length ? 0.12 + colorPool.length * 0.03 : 0.08;
    const blendStatus = (baseHex) => mixColors(baseHex, active.primary || baseHex, influence);

    return {
        light: {
            background: lightNeutrals.background,
            surface: lightNeutrals.surface,
            surfaceRaised: lightNeutrals.surfaceRaised,
            surfaceMuted: lightNeutrals.surfaceMuted,
            border: lightNeutrals.border,
            borderSubtle: lightNeutrals.borderSubtle,
            borderStrong: lightNeutrals.borderStrong,
            text: lightNeutrals.text,
            textSecondary: lightNeutrals.textSecondary,
            textMuted: lightNeutrals.textMuted,
            primary: lightPrimary?.base || lightNeutrals.text,
            primaryHover: lightPrimary?.hover || adjustLightness(lightNeutrals.text, -8),
            primaryActive: lightPrimary?.active || adjustLightness(lightNeutrals.text, -16),
            primaryContrast: lightPrimary?.contrast || '#ffffff',
            primarySoft: lightPrimary?.soft || hexToRgba(lightNeutrals.text, 0.12),
            primarySoftHover: lightPrimary?.softHover || hexToRgba(lightNeutrals.text, 0.2),
            primarySoftActive: lightPrimary?.softActive || hexToRgba(lightNeutrals.text, 0.26),
            primarySoftBorder: lightPrimary?.softBorderHex || mixColors(lightNeutrals.border, lightNeutrals.text, 0.25),
            secondary: lightSecondary?.soft || hexToRgba(lightNeutrals.textSecondary, 0.12),
            secondaryHover: lightSecondary?.softHover || hexToRgba(lightNeutrals.textSecondary, 0.18),
            secondaryActive: lightSecondary?.softActive || hexToRgba(lightNeutrals.textSecondary, 0.22),
            secondaryContrast: lightSecondary?.contrast || lightNeutrals.text,
            secondarySolid: lightSecondary?.base || lightNeutrals.textSecondary,
            secondarySolidHover: lightSecondary?.hover || adjustLightness(lightNeutrals.textSecondary, -6),
            secondarySolidActive: lightSecondary?.active || adjustLightness(lightNeutrals.textSecondary, -10),
            tertiary: lightTertiary?.soft || hexToRgba(lightNeutrals.textMuted, 0.14),
            tertiaryHover: lightTertiary?.softHover || hexToRgba(lightNeutrals.textMuted, 0.2),
            tertiaryActive: lightTertiary?.softActive || hexToRgba(lightNeutrals.textMuted, 0.26),
            tertiaryContrast: lightTertiary?.contrast || lightNeutrals.text,
            tertiarySolid: lightTertiary?.base || lightNeutrals.textMuted,
            tertiarySolidHover: lightTertiary?.hover || adjustLightness(lightNeutrals.textMuted, -6),
            tertiarySolidActive: lightTertiary?.active || adjustLightness(lightNeutrals.textMuted, -10),
            focusRing: hexToRgba(accentForFocus, 0.4),
            selectCaret: lightNeutrals.text,
            success: blendStatus(STATUS_BASE.success),
            warning: blendStatus(STATUS_BASE.warning),
            danger: blendStatus(STATUS_BASE.danger),
            info: blendStatus(STATUS_BASE.info),
            cardBorder: hexToRgba(lightNeutrals.border, 0.12),
            cardBorderInner: hexToRgba(lightNeutrals.borderSubtle, 0.1)
        },
        dark: {
            background: darkNeutrals.background,
            surface: darkNeutrals.surface,
            surfaceRaised: darkNeutrals.surfaceRaised,
            surfaceMuted: darkNeutrals.surfaceMuted,
            border: darkNeutrals.border,
            borderSubtle: darkNeutrals.borderSubtle,
            borderStrong: darkNeutrals.borderStrong,
            text: darkNeutrals.text,
            textSecondary: darkNeutrals.textSecondary,
            textMuted: darkNeutrals.textMuted,
            primary: darkPrimary?.base || adjustLightness(darkNeutrals.text, -10),
            primaryHover: darkPrimary?.hover || adjustLightness(darkNeutrals.text, -6),
            primaryActive: darkPrimary?.active || adjustLightness(darkNeutrals.text, -2),
            primaryContrast: darkPrimary?.contrast || '#0d1214',
            primarySoft: darkPrimary?.soft || hexToRgba(darkNeutrals.text, 0.22),
            primarySoftHover: darkPrimary?.softHover || hexToRgba(darkNeutrals.text, 0.28),
            primarySoftActive: darkPrimary?.softActive || hexToRgba(darkNeutrals.text, 0.34),
            primarySoftBorder: darkPrimary?.softBorderHex || mixColors(darkNeutrals.border, darkNeutrals.text, 0.3),
            secondary: darkSecondary?.soft || hexToRgba(darkNeutrals.textSecondary, 0.18),
            secondaryHover: darkSecondary?.softHover || hexToRgba(darkNeutrals.textSecondary, 0.24),
            secondaryActive: darkSecondary?.softActive || hexToRgba(darkNeutrals.textSecondary, 0.3),
            secondaryContrast: darkSecondary?.contrast || darkNeutrals.text,
            secondarySolid: darkSecondary?.base || darkNeutrals.textSecondary,
            secondarySolidHover: darkSecondary?.hover || adjustLightness(darkNeutrals.textSecondary, 8),
            secondarySolidActive: darkSecondary?.active || adjustLightness(darkNeutrals.textSecondary, 12),
            tertiary: darkTertiary?.soft || hexToRgba(darkNeutrals.textMuted, 0.22),
            tertiaryHover: darkTertiary?.softHover || hexToRgba(darkNeutrals.textMuted, 0.28),
            tertiaryActive: darkTertiary?.softActive || hexToRgba(darkNeutrals.textMuted, 0.34),
            tertiaryContrast: darkTertiary?.contrast || darkNeutrals.text,
            tertiarySolid: darkTertiary?.base || darkNeutrals.textMuted,
            tertiarySolidHover: darkTertiary?.hover || adjustLightness(darkNeutrals.textMuted, 8),
            tertiarySolidActive: darkTertiary?.active || adjustLightness(darkNeutrals.textMuted, 12),
            focusRing: hexToRgba(accentForFocus, 0.45),
            selectCaret: darkNeutrals.text,
            success: blendStatus(STATUS_BASE.success),
            warning: blendStatus(STATUS_BASE.warning),
            danger: blendStatus(STATUS_BASE.danger),
            info: blendStatus(STATUS_BASE.info),
            cardBorder: hexToRgba(darkNeutrals.border, 0.22),
            cardBorderInner: hexToRgba(darkNeutrals.borderSubtle, 0.2)
        }
    };
}

function getActiveScheme() {
    const root = document.documentElement;
    const forcedScheme = root.getAttribute('data-color-scheme');
    if (forcedScheme === 'light' || forcedScheme === 'dark') {
        return forcedScheme;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

function applyActiveSchemeTokens(root, schemePalette) {
    if (!schemePalette) return;

    const set = (name, value) => {
        if (value !== undefined && value !== null) {
            root.style.setProperty(name, value);
        }
    };

    set('--color-background', schemePalette.background);
    set('--color-surface', schemePalette.surface);
    set('--color-surface-raised', schemePalette.surfaceRaised);
    set('--color-surface-muted', schemePalette.surfaceMuted);
    set('--color-text', schemePalette.text);
    set('--color-text-secondary', schemePalette.textSecondary);
    set('--color-text-muted', schemePalette.textMuted);

    set('--color-border', schemePalette.border);
    set('--color-border-light', schemePalette.borderSubtle);
    set('--color-border-secondary', schemePalette.borderStrong);

    set('--color-primary', schemePalette.primary);
    set('--color-primary-hover', schemePalette.primaryHover);
    set('--color-primary-active', schemePalette.primaryActive);
    set('--color-primary-soft', schemePalette.primarySoft);
    set('--color-primary-soft-hover', schemePalette.primarySoftHover);
    set('--color-primary-soft-active', schemePalette.primarySoftActive);
    set('--color-primary-soft-border', schemePalette.primarySoftBorder);
    set('--color-btn-primary-text', schemePalette.primaryContrast);

    set('--color-secondary', schemePalette.secondary);
    set('--color-secondary-hover', schemePalette.secondaryHover);
    set('--color-secondary-active', schemePalette.secondaryActive);
    set('--color-secondary-solid', schemePalette.secondarySolid);
    set('--color-secondary-solid-hover', schemePalette.secondarySolidHover);
    set('--color-secondary-solid-active', schemePalette.secondarySolidActive);

    set('--color-tertiary', schemePalette.tertiary);
    set('--color-tertiary-hover', schemePalette.tertiaryHover);
    set('--color-tertiary-active', schemePalette.tertiaryActive);
    set('--color-tertiary-solid', schemePalette.tertiarySolid);
    set('--color-tertiary-solid-hover', schemePalette.tertiarySolidHover);
    set('--color-tertiary-solid-active', schemePalette.tertiarySolidActive);

    set('--color-focus-ring', schemePalette.focusRing);
    set('--color-select-caret', schemePalette.selectCaret);

    set('--color-card-border', schemePalette.cardBorder);
    set('--color-card-border-inner', schemePalette.cardBorderInner);

    set('--color-success', schemePalette.success);
    set('--color-warning', schemePalette.warning);
    set('--color-error', schemePalette.danger);
    set('--color-danger', schemePalette.danger);
    set('--color-info', schemePalette.info);

    set('--color-success-rgb', hexToRgbString(schemePalette.success));
    set('--color-warning-rgb', hexToRgbString(schemePalette.warning));
    set('--color-error-rgb', hexToRgbString(schemePalette.danger));
    set('--color-info-rgb', hexToRgbString(schemePalette.info));

    set('--color-mode', `'${colorSystem.mode}'`);
}

// Initialize the demo
document.addEventListener('DOMContentLoaded', function() {
    initializeColorMode();
    initializeColorInputs();
    updateColorSystem();

    const schemeMedia = window.matchMedia('(prefers-color-scheme: dark)');
    if (schemeMedia) {
        const schemeListener = () => updateColorSystem();
        if (schemeMedia.addEventListener) {
            schemeMedia.addEventListener('change', schemeListener);
        } else if (schemeMedia.addListener) {
            schemeMedia.addListener(schemeListener);
        }
    }
    
    // Add event listeners for color mode buttons
    const modeButtons = document.querySelectorAll('.mode-btn');
    modeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const mode = this.dataset.mode;
            switchColorMode(mode);
        });
    });
    
    // Add event listeners for color inputs
    ['accent', 'primary', 'secondary', 'tertiary'].forEach(colorType => {
        const colorInput = document.getElementById(colorType + 'Color');
        const textInput = document.getElementById(colorType + 'Color-text');
        
        if (colorInput && textInput) {
            colorInput.addEventListener('input', (e) => {
                textInput.value = e.target.value;
                updateColorValue(colorType, e.target.value);
            });
            
            textInput.addEventListener('input', (e) => {
                if (isValidHexColor(e.target.value)) {
                    colorInput.value = e.target.value;
                    updateColorValue(colorType, e.target.value);
                }
            });
        }
    });
});

// Initialize color mode to monochrome
function initializeColorMode() {
    colorSystem.mode = 'monochrome';
    const modeButtons = document.querySelectorAll('.mode-btn');
    modeButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === 'monochrome');
    });
}

// Initialize color inputs with default values
function initializeColorInputs() {
    const colorInputs = {
        'accent': '#3b82f6',
        'primary': '#3b82f6', 
        'secondary': '#8b5cf6',
        'tertiary': '#ec4899'
    };
    
    Object.entries(colorInputs).forEach(([type, color]) => {
        const colorInput = document.getElementById(type + 'Color');
        const textInput = document.getElementById(type + 'Color-text');
        
        if (colorInput && textInput) {
            colorInput.value = color;
            textInput.value = color;
            colorSystem.colors[type] = color;
        }
    });
}

// Framework name switcher functionality
function initializeFrameworkNameSwitcher() {
    const nameCards = document.querySelectorAll('.name-card');
    const frameworkNameEl = document.getElementById('currentName');
    
    nameCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            nameCards.forEach(c => c.classList.remove('active'));
            // Add active class to clicked card
            this.classList.add('active');
            // Update framework name display
            const name = this.dataset.name;
            frameworkNameEl.textContent = frameworkNames[name];
        });
    });
}

// Validate hex color format
function isValidHexColor(hex) {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
}

// Switch color mode
function switchColorMode(mode) {
    colorSystem.mode = mode;
    
    // Update active button
    const modeButtons = document.querySelectorAll('.mode-btn');
    modeButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    
    // Show/hide appropriate color inputs
    showColorInputsForMode(mode);
    
    // Update description
    updateModeDescription(mode);
    
    // Update the entire color system
    updateColorSystem();
}

// Show appropriate color inputs for current mode
function showColorInputsForMode(mode) {
    const allGroups = ['accent-group', 'primary-group', 'secondary-group', 'tertiary-group'];
    
    // Hide all groups first
    allGroups.forEach(groupId => {
        const group = document.getElementById(groupId);
        if (group) group.style.display = 'none';
    });
    
    // Show relevant groups based on mode
    switch (mode) {
        case 'monochrome':
            // No color inputs shown
            break;
        case 'one-color':
            document.getElementById('accent-group').style.display = 'block';
            break;
        case 'two-colors':
            document.getElementById('primary-group').style.display = 'block';
            document.getElementById('secondary-group').style.display = 'block';
            break;
        case 'three-colors':
            document.getElementById('primary-group').style.display = 'block';
            document.getElementById('secondary-group').style.display = 'block';
            document.getElementById('tertiary-group').style.display = 'block';
            break;
    }
}

// Update mode description
function updateModeDescription(mode) {
    const descElement = document.getElementById('modeDescription');
    if (descElement && modeDescriptions[mode]) {
        descElement.textContent = modeDescriptions[mode];
    }
}

// Update specific color value
function updateColorValue(colorType, color) {
    colorSystem.colors[colorType] = color;
    updateColorSystem();
}

// Reset to monochrome
function resetToMonochrome() {
    switchColorMode('monochrome');
}

// Update the CSS custom properties based on color system
function updateColorSystem() {
    const root = document.documentElement;
    const palette = generatePalette(colorSystem.mode, colorSystem.colors);

    Object.entries(palette.light).forEach(([token, value]) => {
        root.style.setProperty(`--basis-light-${token}`, value);
    });

    Object.entries(palette.dark).forEach(([token, value]) => {
        root.style.setProperty(`--basis-dark-${token}`, value);
    });

    const activeScheme = getActiveScheme();
    applyActiveSchemeTokens(root, palette[activeScheme]);

    // Update tertiary button visibility
    updateTertiaryElements();
    
    // Update preview swatches
    updatePreviewSwatches(palette, activeScheme);
}

// Update elements that should only show in certain modes
function updateTertiaryElements() {
    const tertiaryButtons = document.querySelectorAll('.btn-tertiary');
    const tertiaryAlerts = document.querySelectorAll('.alert-tertiary');
    
    const showTertiary = colorSystem.mode === 'three-colors';
    
    [...tertiaryButtons, ...tertiaryAlerts].forEach(el => {
        el.style.display = showTertiary ? '' : 'none';
    });
}

// Update preview color swatches
function updatePreviewSwatches(palette, scheme) {
    if (!palette) return;
    const current = palette[scheme] || palette.light;
    const swatches = document.querySelectorAll('.preview-swatch');

    swatches.forEach((swatch) => {
        const token = swatch.dataset.color;
        if (!token) return;

        switch (token) {
            case 'bg':
                swatch.style.background = current.background;
                swatch.style.color = current.text;
                swatch.textContent = scheme === 'dark' ? 'Background · Dark' : 'Background · Light';
                break;
            case 'surface':
                swatch.style.background = current.surfaceRaised;
                swatch.style.color = current.text;
                swatch.textContent = scheme === 'dark' ? 'Surface · Dark' : 'Surface · Light';
                break;
            case 'text':
                swatch.style.background = current.primary;
                swatch.style.color = current.primaryContrast;
                swatch.textContent = 'Primary Accent';
                break;
            default:
                break;
        }
    });
}

// Modal functionality
function openModal() {
    const modal = document.getElementById('exampleModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('exampleModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-backdrop')) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Copy code snippet functionality
function copyCodeSnippet(element) {
    const code = element.querySelector('code');
    if (code) {
        const text = code.textContent;
        navigator.clipboard.writeText(text).then(() => {
            // Show brief success feedback
            const originalText = element.textContent;
            element.textContent = 'Copied!';
            setTimeout(() => {
                element.innerHTML = originalText;
            }, 1000);
        });
    }
}

// Add click handlers to code snippets for copying
document.addEventListener('DOMContentLoaded', function() {
    const codeSnippets = document.querySelectorAll('.code-snippet');
    codeSnippets.forEach(snippet => {
        snippet.style.cursor = 'pointer';
        snippet.title = 'Click to copy code';
        snippet.addEventListener('click', () => copyCodeSnippet(snippet));
    });
});

// Export functions to global scope for HTML onclick handlers
window.resetToMonochrome = resetToMonochrome;
window.openModal = openModal;
window.closeModal = closeModal;
window.switchColorMode = switchColorMode;
