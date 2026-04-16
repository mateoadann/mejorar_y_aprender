/* ============================================================
   UI Components Atlas — demos.js
   Helpers para demos interactivas.
   ============================================================ */

(function () {
  "use strict";

  const registry = new Map();

  function initDemo(demoId, config) {
    const el = document.getElementById(demoId);
    if (!el) {
      console.warn(`[AtlasDemos] Demo "${demoId}" no encontrada`);
      return null;
    }
    const instance = {
      id: demoId,
      el,
      config: config || {},
      state: {},
    };
    registry.set(demoId, instance);

    // Auto-bind tabs if the demo uses .demo-tabs structure
    const tabsList = el.querySelector(".demo-tabs");
    if (tabsList) {
      bindTabs(el);
    }

    // Auto-bind collapsible code toggle
    const toggle = el.querySelector(".demo-code__toggle");
    const code = el.querySelector(".demo-code");
    if (toggle && code) {
      toggle.addEventListener("click", () => {
        const isOpen = code.classList.toggle("is-open");
        toggle.classList.toggle("is-open", isOpen);
      });
    }

    // Run user-provided init
    if (typeof config?.onInit === "function") {
      try {
        config.onInit(instance);
      } catch (err) {
        console.error(`[AtlasDemos] Error initializing "${demoId}":`, err);
      }
    }
    return instance;
  }

  function bindTabs(container) {
    const tabs = container.querySelectorAll(".demo-tabs__tab");
    const panels = container.querySelectorAll(".demo-tabs__panel");

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.getAttribute("data-tab");
        tabs.forEach((t) => t.classList.toggle("is-active", t === tab));
        panels.forEach((p) => {
          p.classList.toggle(
            "is-active",
            p.getAttribute("data-tab-panel") === target
          );
        });
      });
    });
  }

  function bindCodeTabs(container) {
    const tabs = container.querySelectorAll(".code-tabs__tab");
    const panels = container.querySelectorAll(".code-tabs__panel");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.getAttribute("data-tab");
        tabs.forEach((t) => t.classList.toggle("is-active", t === tab));
        panels.forEach((p) => {
          p.classList.toggle(
            "is-active",
            p.getAttribute("data-tab-panel") === target
          );
        });
      });
    });
  }

  async function copyCode(blockIdOrEl, btn) {
    let el;
    if (typeof blockIdOrEl === "string") {
      el = document.getElementById(blockIdOrEl);
    } else {
      el = blockIdOrEl;
    }
    if (!el) return false;

    const text = el.innerText || el.textContent || "";
    try {
      await navigator.clipboard.writeText(text);
      if (btn) {
        const original = btn.textContent;
        btn.textContent = "Copiado";
        btn.classList.add("is-copied");
        setTimeout(() => {
          btn.textContent = original;
          btn.classList.remove("is-copied");
        }, 1500);
      }
      return true;
    } catch (err) {
      console.error("[AtlasDemos] No se pudo copiar:", err);
      return false;
    }
  }

  function highlightPreview(demoId) {
    const inst = registry.get(demoId);
    if (!inst) return;
    const preview = inst.el.querySelector(".demo-preview");
    if (!preview) return;
    preview.classList.remove("demo-preview--highlighted");
    void preview.offsetWidth; // restart animation
    preview.classList.add("demo-preview--highlighted");
  }

  // Auto-wire buttons with data-copy-target on page load
  document.addEventListener("DOMContentLoaded", () => {
    // copy buttons in code-tabs / prompt-library
    document.querySelectorAll("[data-copy-target]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-copy-target");
        copyCode(target, btn);
      });
    });

    // auto-init any element with data-atlas-demo
    document.querySelectorAll("[data-atlas-demo]").forEach((el) => {
      if (!el.id) el.id = "demo-" + Math.random().toString(36).slice(2, 9);
      initDemo(el.id, {});
    });

    // bind any code-tabs found
    document.querySelectorAll(".code-tabs").forEach(bindCodeTabs);
  });

  window.AtlasDemos = {
    initDemo,
    copyCode,
    highlightPreview,
    bindTabs,
    bindCodeTabs,
    registry,
  };
})();
