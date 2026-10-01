/* =========================================================
   PRODESK IT — Landing Page Interactions
   Phase 2 : Theme toggle, Hamburger, Sticky nav, Active link
   ========================================================= */

(function () {
  "use strict";

  /* ---------------------------------------------------------
     0. Utility shortcuts
  --------------------------------------------------------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------------------------------------------------------
     1. THEME CONTROLLER (Dark / Light)
     - Reads saved preference from localStorage
     - Falls back to system preference
     - Toggles data-theme on <html>
  --------------------------------------------------------- */
  const THEME_KEY = "prodesk-theme";
  const htmlEl = document.documentElement;
  const themeToggle = $("#themeToggle");

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme) {
    htmlEl.setAttribute("data-theme", theme);

    if (themeToggle) {
      const isDark = theme === "dark";
      themeToggle.setAttribute("aria-pressed", String(isDark));
      themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
      );
    }
  }

  function initTheme() {
    applyTheme(getPreferredTheme());

    if (!themeToggle) return;

    themeToggle.addEventListener("click", () => {
      const current = htmlEl.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";

      applyTheme(next);
      localStorage.setItem(THEME_KEY, next);
    });

    // React to system changes ONLY if user hasn't chosen manually
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (!localStorage.getItem(THEME_KEY)) {
          applyTheme(e.matches ? "dark" : "light");
        }
      });
  }

  /* ---------------------------------------------------------
     2. HAMBURGER MENU (Mobile)
  --------------------------------------------------------- */
  const hamburger = $("#hamburger");
  const navLinks = $("#navLinks");

  function closeMenu() {
    if (!hamburger || !navLinks) return;
    hamburger.classList.remove("is-open");
    navLinks.classList.remove("is-open");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Open navigation menu");
  }

  function openMenu() {
    if (!hamburger || !navLinks) return;
    hamburger.classList.add("is-open");
    navLinks.classList.add("is-open");
    hamburger.setAttribute("aria-expanded", "true");
    hamburger.setAttribute("aria-label", "Close navigation menu");
  }

  function initHamburger() {
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener("click", () => {
      const isOpen = navLinks.classList.contains("is-open");
      isOpen ? closeMenu() : openMenu();
    });

    // Close menu on nav-link click (mobile UX)
    $$(".nav-link", navLinks).forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!navLinks.classList.contains("is-open")) return;
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        closeMenu();
      }
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });

    // Auto-close when resizing back to desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) closeMenu();
    });
  }

  /* ---------------------------------------------------------
     3. STICKY NAVBAR — add .is-scrolled after scroll
  --------------------------------------------------------- */
  const navbar = $("#navbar");

  function initStickyNav() {
    if (!navbar) return;

    const onScroll = () => {
      if (window.scrollY > 12) {
        navbar.classList.add("is-scrolled");
      } else {
        navbar.classList.remove("is-scrolled");
      }
    };

    onScroll(); // set initial state
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------------------------------------------------------
     4. ACTIVE NAV LINK on scroll (scroll-spy)
  --------------------------------------------------------- */
  function initScrollSpy() {
    const sections = $$("main section[id], footer[id]");
    const links = $$(".nav-link");
    if (!sections.length || !links.length) return;

    const NAV_OFFSET = 110;

    const onScroll = () => {
      let currentId = "";

      sections.forEach((sec) => {
        const top = sec.offsetTop - NAV_OFFSET;
        if (window.scrollY >= top) {
          currentId = sec.id;
        }
      });

      // If we're at the very bottom, force last section active
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 4
      ) {
        currentId = sections[sections.length - 1].id;
      }

      links.forEach((link) => {
        const href = link.getAttribute("href") || "";
        link.classList.toggle(
          "active",
          href === `#${currentId}`
        );
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------------------------------------------------------
     5. AUTO YEAR in footer
  --------------------------------------------------------- */
  function initYear() {
    const yearEl = $("#year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  /* ---------------------------------------------------------
     6. REVEAL on scroll (subtle fade-up for sections)
  --------------------------------------------------------- */
  function initReveal() {
    const targets = $$(".service-card, .section-header, .about-inner");
    if (!targets.length) return;

    // If user prefers reduced motion, skip
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    targets.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      el.style.transition =
        "opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)";
    });

    const io = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach((el) => io.observe(el));
  }

  /* ---------------------------------------------------------
     7. INIT — run everything on DOM ready
  --------------------------------------------------------- */
  function init() {
    initTheme();
    initHamburger();
    initStickyNav();
    initScrollSpy();
    initYear();
    initReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
