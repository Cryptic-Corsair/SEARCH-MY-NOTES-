---
name: Search My Notes UI Aesthetic
description: Detailed documentation on the UI patterns, theming system, and visual aesthetic used in the Search My Notes application.
---

# Search My Notes - UI & Aesthetic Guide

This document outlines the core design principles, CSS patterns, and component structures used to create the distinctive "Search My Notes" aesthetic. Use this guide when extending the application or building new components to ensure visual consistency.

## 1. Core Design Philosophy
The application blends **Glassmorphism**, **Neon/Glowing Accents**, and **Heavy Typography** to create a modern, slightly retro-futuristic, and highly tactile interface. It avoids flat design in favor of depth, reflections, and ambient lighting.

## 2. Typography
The typography is intentionally heavy and distinctive.
*   **Primary Font (Body & Headings):** `Doto` (sans-serif).
    *   *Crucial Rule:* The body font weight is globally forced to **900** (Black) across all screen sizes for a bold, chunky appearance.
*   **Display Font:** `Playfair Display` (serif) - used for elegant, high-contrast accents (`.font-display`).
*   **Pixel Font:** `Press Start 2P` (monospace) - used for retro/gaming accents (`.font-pixel`).

## 3. Dynamic Theming System
Instead of relying solely on Tailwind's built-in dark mode, the app uses a dynamic, inline CSS-variable injection system.

### Implementation:
Themes are defined as JavaScript objects:
```javascript
const THEMES = [
  { name: 'Dark Salmon', bg: '#1a1515', text: '#ffffff', primary: '#FA8072', secondary: '#2d2a2a', accent: '#DC143C', isLight: false },
  // ... other themes
];
```
These are injected into the root container of the page:
```jsx
<div style={{ 
  '--bg': theme.bg, 
  '--text': theme.text, 
  '--primary': theme.primary, 
  '--secondary': theme.secondary, 
  '--accent': theme.accent 
}}>
```
*Rule:* Components must use these variables (e.g., `bg-[var(--bg)]`, `text-[var(--primary)]`) rather than hardcoded Tailwind colors (like `bg-blue-500`).

## 4. Signature Visual Effects

### A. Glassmorphism & Glossy Capsules
Buttons and containers (like the `TopBar` and `CustomDropdown` capsules) use a specific "glossy pill" recipe:
1.  **Base:** Semi-transparent background with heavy blur: `bg-[var(--secondary)]/20 backdrop-blur-xl`.
2.  **Border:** Subtle borders adapted to the theme: `border-[var(--accent)]/30` (light themes) or `border-white/40` (dark themes).
3.  **Glossy Overlay:** An absolute positioned inset div creates a shiny reflection:
    ```jsx
    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
    ```

### B. Ambient Glows (Background Blobs)
To prevent flat backgrounds, large, heavily blurred decorative divs are placed fixed in the background to create ambient lighting:
```jsx
<div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--primary)]/20 blur-[120px] rounded-full pointer-events-none -z-10" />
```

### C. Neon Hover States
Interactive elements glow when hovered, utilizing the primary or accent colors:
*   `hover:shadow-[0_0_15px_var(--primary)]`
*   `hover:bg-[var(--primary)]/20`

### D. Animated "Running" Borders
The `SearchBox` features a custom CSS animation (`border-run`) that creates a moving gradient border effect:
*   **CSS:** Uses an `::after`/`::before` pseudo-element with a linear gradient that animates its `background-position`.
*   **Tailwind Class:** `animate-border-run`.

## 5. Key Components

### The Browser Mockup
When search results (PDFs/URLs) are displayed, they are framed in a custom "Browser Window" mockup to maintain the app's aesthetic rather than just showing a raw iframe.
*   **Header:** `bg-[var(--text)]/5 border-b border-[var(--text)]/10`
*   **Traffic Lights:** Red, Amber, Green dots (`w-3 h-3 rounded-full`) on the top left.
*   **URL Bar:** A centered, pill-shaped div displaying the current URL.

### Info/About Drawer
Uses `framer-motion` for a smooth, spring-based slide-up animation from the bottom of the screen.
*   **Animation Props:** `initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}`
*   **Styling:** Rounded top corners (`rounded-t-[3rem]`), heavy top border, and a drag-handle visual cue for mobile.

## 6. Layout & Spacing
*   **Fullscreen Canvas:** The main layout uses `h-[100dvh] w-screen overflow-hidden` to act as an app-like canvas.
*   **Z-Indexing:** 
    *   `-z-10`: Background blobs and paths.
    *   `z-10`: Main content/browser window.
    *   `z-50`: TopBar and Search overlays.
    *   `z-[100]`: Modals and Info drawers.
