/* ============================================================
   UI Components Atlas — navigation.js
   Navegacion entre componentes, sidebar highlight, smooth scroll.
   ============================================================ */

(function () {
  "use strict";

  function getCurrentComponent() {
    // Expected page layout: /<category>/<slug>.html
    const path = window.location.pathname;
    const match = path.match(/\/([^\/]+)\/([^\/]+)\.html$/);
    if (!match) return null;
    const [, category, slug] = match;
    return { category, slug };
  }

  function highlightSidebar() {
    const current = getCurrentComponent();
    if (!current) return;
    const links = document.querySelectorAll(".sidebar-nav__link");
    links.forEach((a) => {
      const href = a.getAttribute("href") || "";
      const isActive = href.endsWith(`${current.slug}.html`);
      a.classList.toggle("is-active", isActive);
      if (isActive) a.setAttribute("aria-current", "page");
    });
  }

  function initPrevNext() {
    const current = getCurrentComponent();
    if (!current || !window.AtlasIndex) return;

    const { components } = window.AtlasIndex;
    const inCategory = components.filter(
      (c) => c.category === current.category && c.available
    );
    const idx = inCategory.findIndex((c) => c.slug === current.slug);
    if (idx === -1) return;

    const prev = inCategory[idx - 1];
    const next = inCategory[idx + 1];

    const prevEl = document.querySelector("[data-nav-prev]");
    const nextEl = document.querySelector("[data-nav-next]");

    if (prev && prevEl) {
      prevEl.href = `${prev.slug}.html`;
      prevEl.querySelector("[data-nav-prev-name]").textContent = prev.name;
      prevEl.classList.remove("hidden");
    } else if (prevEl) {
      prevEl.classList.add("hidden");
    }

    if (next && nextEl) {
      nextEl.href = `${next.slug}.html`;
      nextEl.querySelector("[data-nav-next-name]").textContent = next.name;
      nextEl.classList.remove("hidden");
    } else if (nextEl) {
      nextEl.classList.add("hidden");
    }
  }

  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href").slice(1);
        if (!id) return;
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${id}`);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    highlightSidebar();
    initPrevNext();
    initSmoothAnchors();
  });

  window.AtlasNav = {
    getCurrentComponent,
    highlightSidebar,
    initPrevNext,
  };
})();
