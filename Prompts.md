# Prompts Log — Sprint 01

> Per the Prodesk IT AI Policy, all AI-assisted development must be logged. This file documents every prompt used while building the Prodesk IT landing page.

**AI Assistant Used:** Claude (Anthropic)
**Date:** 30/09/2026
**Sprint:** 01 — Corporate Brand Landing Page

---

## Prompt 01 — Project Planning & Structure

**Prompt:**
> I have a sprint assignment to build a responsive landing page with raw CSS (Phase 1), then UI/UX enhancements (Phase 2), then Tailwind migration (Phase 3). Help me plan the folder structure and file breakdown.

**Purpose:** Understand the overall architecture before writing code.

**Outcome:** Decided on a flat structure — `index.html`, `css/style.css`, `js/script.js`, plus a `src/input.css` for Tailwind source. Both raw and Tailwind HTML versions kept in repo for reviewer transparency.

---

## Prompt 02 — HTML Scaffold (Phase 1)

**Prompt:**
> Generate a semantic HTML5 scaffold for a landing page with: Navbar (logo left, links right, theme toggle, hamburger), Hero (badge, headline, subtitle, CTA, stats), Services grid (3 cards), About, and Footer (brand, links, social icons, copyright). Include proper ARIA labels and use inline SVG icons.

**Purpose:** Get an accessible, semantic base markup.

**Outcome:** Full `index.html` with ARIA-compliant markup. Verified every `<section>` has an `id` matching a nav link. Inline SVGs used instead of an icon font to avoid extra HTTP requests.

---

## Prompt 03 — Raw CSS Styling (Phase 1 + 2)

**Prompt:**
> Write a complete raw CSS stylesheet using CSS variables for theming. Include: reset, light/dark theme tokens via `[data-theme]`, sticky navbar with `backdrop-filter` glassmorphism, animated hero blobs, CSS Grid service cards with z-axis hover lift, hover micro-interactions on buttons, and full mobile responsiveness with a hamburger menu breakpoint at 768px.

**Purpose:** Build the entire styling layer with Flexbox + Grid only (no frameworks — Phase 1 constraint).

**Outcome:** `css/style.css` (~600 lines). Verified no Bootstrap/Tailwind classes leaked in.

---

## Prompt 04 — JavaScript Interactions

**Prompt:**
> Write vanilla JavaScript (IIFE) that handles: (1) dark/light theme toggle with `localStorage` + system preference fallback, (2) hamburger menu open/close with Escape key and outside-click handling, (3) sticky navbar shadow class on scroll, (4) scroll-spy for active nav link, (5) auto-year in footer, (6) reveal-on-scroll using IntersectionObserver with `prefers-reduced-motion` respect.

**Purpose:** Add all Phase 2 interactions with zero dependencies.

**Outcome:** `js/script.js` (~230 lines). No jQuery, no external libs. All handlers use event delegation where appropriate.

---

## Prompt 05 — Tailwind Environment Setup (Phase 3)

**Prompt:**
> Set up a production-grade Tailwind CSS v3 project using Tailwind CLI. Provide `tailwind.config.js` with custom brand colors, shadows, animations, and dark mode via `[data-theme="dark"]`. Also provide `src/input.css` with `@layer base / components / utilities` separating custom classes.

**Purpose:** Migrate to Tailwind without breaking existing design tokens.

**Outcome:** `tailwind.config.js`, `src/input.css`, and `package.json` scripts (`dev` + `build`) configured.

---

## Prompt 06 — Tailwind Migration

**Prompt:**
> Rewrite the raw HTML into Tailwind utility classes while keeping the exact same visual design. Preserve semantic HTML, ARIA labels, IDs, and the shared `js/script.js`. Use `dark:` variants mapped to `[data-theme="dark"]`.

**Purpose:** Full tech-stack migration keeping design parity.

**Outcome:** `index-tailwind.html` (later renamed to `index.html`). Visual parity verified side-by-side with `index-raw-css.html`.

---

## Prompt 07 — Custom CSS Bridge

**Prompt:**
> Some states (`.is-open` hamburger → X, `.is-open` mobile menu slide-in, `.is-scrolled` navbar shadow) are toggled by JS. Show how to keep those in Tailwind without polluting utility classes everywhere.

**Purpose:** Handle JS-driven states cleanly.

**Outcome:** Small `<style>` block in `<head>` for the three stateful classes. Utilities for everything else.

---

## Prompt 08 — README + Prompts.md

**Prompt:**
> Generate a professional `README.md` for a GitHub repo — with sections for Live URL, screenshots, features (mapped to Phases 1/2/3), tech stack table, project structure, local dev setup, design decisions, QA checklist, and author info. Also generate this `Prompts.md`.

**Purpose:** Fulfill the sprint's "Repo Requirements" (README with screenshot + Live URL, and Prompts.md).

**Outcome:** This file + `README.md`.

---

## Notes

- No code was copy-pasted blindly. Every snippet was read, tested in the browser, and adjusted where required (e.g., adjusting the mobile nav breakpoint, tweaking the blur radius on blobs).
- All placeholder assets (icons, hero text) are royalty-free or self-authored.
- No paid UI kits or template code was used.
