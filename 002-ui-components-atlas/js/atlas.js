/* ============================================================
   UI Components Atlas — atlas.js
   Buscador global + indice de componentes.
   Usa metodos DOM seguros (no innerHTML con input del usuario).
   ============================================================ */

(function () {
  "use strict";

  // ------------------------------------------------------------
  // Indice maestro de componentes.
  // ------------------------------------------------------------
  const components = [
    // Fundamentos
    { name: "Spacing Scale", category: "00-fundamentos", slug: "spacing", available: true, aliases: ["espaciado", "gap", "padding"] },
    { name: "Typography", category: "00-fundamentos", slug: "typography", available: true, aliases: ["tipografia", "texto", "font"] },
    { name: "Color Tokens", category: "00-fundamentos", slug: "colors", available: true, aliases: ["paleta", "color", "tokens"] },
    { name: "Radius", category: "00-fundamentos", slug: "radius", available: true, aliases: ["border-radius", "corners", "rounded"] },

    // Inputs y Controles
    { name: "Button", category: "01-inputs-controles", slug: "button", available: true, aliases: ["btn", "boton"] },
    { name: "Input", category: "01-inputs-controles", slug: "input", available: true, aliases: ["textbox", "text field"] },
    { name: "Textarea", category: "01-inputs-controles", slug: "textarea", available: true, aliases: ["area de texto"] },
    { name: "Select", category: "01-inputs-controles", slug: "select", available: true, aliases: ["dropdown", "combo"] },
    { name: "Checkbox", category: "01-inputs-controles", slug: "checkbox", available: true, aliases: ["tilde", "check"] },
    { name: "Radio Group", category: "01-inputs-controles", slug: "radio", available: true, aliases: ["radio button"] },
    { name: "Switch", category: "01-inputs-controles", slug: "switch", available: true, aliases: ["toggle", "on off"] },
    { name: "Slider", category: "01-inputs-controles", slug: "slider", available: true, aliases: ["range"] },
    { name: "Combobox", category: "01-inputs-controles", slug: "combobox", available: true, aliases: ["autocomplete", "typeahead"] },
    { name: "Date Picker", category: "01-inputs-controles", slug: "date-picker", available: true, aliases: ["calendar", "calendario"] },
    { name: "File Input", category: "01-inputs-controles", slug: "file-input", available: true, aliases: ["upload", "file upload"] },
    { name: "Input OTP", category: "01-inputs-controles", slug: "input-otp", available: true, aliases: ["otp", "one time password", "pin"] },
    { name: "Number Input", category: "01-inputs-controles", slug: "number-input", available: true, aliases: ["stepper"] },
    { name: "Search", category: "01-inputs-controles", slug: "search", available: true, aliases: ["buscador"] },
    { name: "Command Menu", category: "01-inputs-controles", slug: "command", available: true, aliases: ["command k", "cmdk", "palette"] },

    // Navegacion
    { name: "Navbar", category: "02-navegacion", slug: "navbar", available: true, aliases: ["top nav", "header nav", "app bar"] },
    { name: "Sidebar", category: "02-navegacion", slug: "sidebar", available: true, aliases: ["side nav", "drawer", "panel lateral"] },
    { name: "Tabs", category: "02-navegacion", slug: "tabs", available: true, aliases: ["pestanas", "tab bar"] },
    { name: "Breadcrumbs", category: "02-navegacion", slug: "breadcrumbs", available: true, aliases: ["migas de pan", "ruta"] },
    { name: "Pagination", category: "02-navegacion", slug: "pagination", available: true, aliases: ["paginador", "paginacion"] },
    { name: "Stepper", category: "02-navegacion", slug: "stepper", available: true, aliases: ["wizard", "steps", "pasos"] },
    { name: "Command Palette", category: "02-navegacion", slug: "command-palette", available: true, aliases: ["cmdk", "command k", "quick actions"] },
    { name: "Drawer", category: "02-navegacion", slug: "drawer", available: true, aliases: ["sheet", "side panel", "slide out"] },
    { name: "Bottom Nav", category: "02-navegacion", slug: "bottom-nav", available: true, aliases: ["tab bar", "mobile nav"] },
    { name: "Mega Menu", category: "02-navegacion", slug: "mega-menu", available: true, aliases: ["navigation menu", "dropdown menu"] },

    // Feedback y Estado
    { name: "Toast", category: "03-feedback-estado", slug: "toast", available: true, aliases: ["snackbar", "notification", "sonner"] },
    { name: "Alert", category: "03-feedback-estado", slug: "alert", available: true, aliases: ["inline message", "aviso"] },
    { name: "Banner", category: "03-feedback-estado", slug: "banner", available: true, aliases: ["announcement", "cookie banner"] },
    { name: "Dialog", category: "03-feedback-estado", slug: "dialog", available: true, aliases: ["modal", "ventana modal"] },
    { name: "Alert Dialog", category: "03-feedback-estado", slug: "alert-dialog", available: true, aliases: ["confirm", "confirmation", "confirm modal"] },
    { name: "Popover", category: "03-feedback-estado", slug: "popover", available: true, aliases: ["floating panel", "flyout"] },
    { name: "Tooltip", category: "03-feedback-estado", slug: "tooltip", available: true, aliases: ["hint", "hover text"] },
    { name: "Progress", category: "03-feedback-estado", slug: "progress", available: true, aliases: ["progress bar", "barra de progreso"] },
    { name: "Spinner", category: "03-feedback-estado", slug: "spinner", available: true, aliases: ["loader", "loading", "circular progress"] },
    { name: "Skeleton", category: "03-feedback-estado", slug: "skeleton", available: true, aliases: ["placeholder", "shimmer", "loading state"] },
    { name: "Empty State", category: "03-feedback-estado", slug: "empty-state", available: true, aliases: ["no data", "zero state", "onboarding state"] },
    { name: "Error State", category: "03-feedback-estado", slug: "error-state", available: true, aliases: ["404", "500", "result error"] },

    // Display de Datos
    { name: "Card", category: "04-display-datos", slug: "card", available: true, aliases: ["tarjeta", "box"] },
    { name: "Table", category: "04-display-datos", slug: "table", available: true, aliases: ["tabla", "grid estatica"] },
    { name: "List", category: "04-display-datos", slug: "list", available: true, aliases: ["lista", "listado"] },
    { name: "Tree View", category: "04-display-datos", slug: "tree-view", available: true, aliases: ["tree", "arbol", "file explorer"] },
    { name: "Timeline", category: "04-display-datos", slug: "timeline", available: true, aliases: ["linea de tiempo", "activity"] },
    { name: "Accordion", category: "04-display-datos", slug: "accordion", available: true, aliases: ["acordeon", "faq", "expandible"] },
    { name: "Collapsible", category: "04-display-datos", slug: "collapsible", available: true, aliases: ["show more", "expand", "colapsable"] },
    { name: "Carousel", category: "04-display-datos", slug: "carousel", available: true, aliases: ["slider", "slideshow", "embla"] },
    { name: "Avatar", category: "04-display-datos", slug: "avatar", available: true, aliases: ["profile pic", "user image"] },
    { name: "Badge / Chip / Tag", category: "04-display-datos", slug: "badge-chip-tag", available: true, aliases: ["badge", "chip", "tag", "label"] },
    { name: "Stat Card", category: "04-display-datos", slug: "stat-card", available: true, aliases: ["kpi", "metric card", "dashboard card"] },
    { name: "Kanban Card", category: "04-display-datos", slug: "kanban-card", available: true, aliases: ["task card", "trello card", "issue card"] },

    // Overlays
    { name: "Dropdown Menu", category: "05-overlays", slug: "dropdown-menu", available: true, aliases: ["menu", "action menu", "more menu"] },
    { name: "Context Menu", category: "05-overlays", slug: "context-menu", available: true, aliases: ["right click menu", "menu contextual"] },
    { name: "Hover Card", category: "05-overlays", slug: "hover-card", available: true, aliases: ["profile preview", "link preview"] },
    { name: "Menubar", category: "05-overlays", slug: "menubar", available: true, aliases: ["application menu", "app menu", "desktop menu"] },
    { name: "Sheet", category: "05-overlays", slug: "sheet", available: true, aliases: ["slide panel", "edit panel", "form drawer"] },
    { name: "Modal Fullscreen", category: "05-overlays", slug: "modal-fullscreen", available: true, aliases: ["fullscreen dialog", "lightbox"] },
    { name: "Toast Overlay System", category: "05-overlays", slug: "toast-overlay-system", available: true, aliases: ["toaster", "sonner", "toast stack"] },
    { name: "Backdrop", category: "05-overlays", slug: "backdrop", available: true, aliases: ["overlay", "mask", "scrim"] },

    // Layout
    { name: "Container", category: "06-layout", slug: "container", available: true, aliases: ["wrapper", "max-width"] },
    { name: "Grid", category: "06-layout", slug: "grid", available: true, aliases: ["css grid", "grilla"] },
    { name: "Flex / Stack", category: "06-layout", slug: "flex-stack", available: true, aliases: ["flexbox", "hstack", "vstack"] },
    { name: "Divider", category: "06-layout", slug: "divider", available: true, aliases: ["separator", "linea", "hr"] },
    { name: "Spacer", category: "06-layout", slug: "spacer", available: true, aliases: ["space", "push", "gap filler"] },
    { name: "Aspect Ratio", category: "06-layout", slug: "aspect-ratio", available: true, aliases: ["ratio", "16:9", "proportions"] },
    { name: "Scroll Area", category: "06-layout", slug: "scroll-area", available: true, aliases: ["scrollbar", "overflow", "custom scroll"] },
    { name: "Resizable", category: "06-layout", slug: "resizable", available: true, aliases: ["split panel", "resize", "drag resize"] },
    { name: "Separator Section", category: "06-layout", slug: "separator-section", available: true, aliases: ["section divider", "heading section"] },
    { name: "Page Layout", category: "06-layout", slug: "page-layout", available: true, aliases: ["app shell", "template", "dashboard layout"] },

    // Patrones Avanzados
    { name: "Data Table", category: "07-patrones-avanzados", slug: "data-table", available: true, aliases: ["tabla con sort/filter", "tanstack table"] },
    { name: "Form", category: "07-patrones-avanzados", slug: "form", available: true, aliases: ["formulario", "react hook form"] },
    { name: "Form Wizard", category: "07-patrones-avanzados", slug: "form-wizard", available: true, aliases: ["multi-step form", "checkout wizard"] },
    { name: "Drag and Drop", category: "07-patrones-avanzados", slug: "drag-drop", available: true, aliases: ["dnd", "sortable", "reorder"] },
    { name: "Infinite Scroll", category: "07-patrones-avanzados", slug: "infinite-scroll", available: true, aliases: ["scroll infinito", "feed"] },
    { name: "Virtualized List", category: "07-patrones-avanzados", slug: "virtualized-list", available: true, aliases: ["windowing", "virtual list", "react-virtual"] },
    { name: "Rich Text Editor", category: "07-patrones-avanzados", slug: "rich-text-editor", available: true, aliases: ["wysiwyg", "tiptap", "lexical"] },
    { name: "Code Editor", category: "07-patrones-avanzados", slug: "code-editor", available: true, aliases: ["monaco", "codemirror", "syntax editor"] },
    { name: "Kanban Board", category: "07-patrones-avanzados", slug: "kanban-board", available: true, aliases: ["trello board", "task board", "pipeline"] },
    { name: "Masked Input", category: "07-patrones-avanzados", slug: "masked-input", available: true, aliases: ["phone mask", "card mask", "formatted input"] },

    // Cheatsheet Global
    { name: "Tabla Global", category: "08-cheatsheet", slug: "tabla-global", available: true, aliases: ["cheatsheet", "referencia rapida"] },
    { name: "Decision Tree", category: "08-cheatsheet", slug: "decision-tree", available: true, aliases: ["que componente usar", "flowchart"] },
    { name: "Prompt Library", category: "08-cheatsheet", slug: "prompt-library", available: true, aliases: ["prompts", "copy paste", "coding agent"] },
  ];

  const categoryLabels = {
    "00-fundamentos": "Fundamentos",
    "01-inputs-controles": "Inputs y Controles",
    "02-navegacion": "Navegacion",
    "03-feedback-estado": "Feedback y Estado",
    "04-display-datos": "Display de Datos",
    "05-overlays": "Overlays",
    "06-layout": "Layout",
    "07-patrones-avanzados": "Patrones Avanzados",
    "08-cheatsheet": "Cheatsheet Global",
  };

  // ------------------------------------------------------------
  // Path helpers
  // ------------------------------------------------------------
  function getBasePath() {
    const path = window.location.pathname;
    const parts = path.split("/").filter(Boolean);
    const atlasIdx = parts.indexOf("ui-components-atlas");
    if (atlasIdx === -1) return "";
    const depth = parts.length - atlasIdx - 1;
    if (depth <= 1) return "";
    return "../".repeat(depth - 1);
  }

  function getComponentUrl(comp) {
    return `${getBasePath()}${comp.category}/${comp.slug}.html`;
  }

  function getCategoryUrl(categorySlug) {
    return `${getBasePath()}${categorySlug}/index.html`;
  }

  // ------------------------------------------------------------
  // Search matching
  // ------------------------------------------------------------
  function matchesQuery(comp, q) {
    const query = q.toLowerCase().trim();
    if (!query) return true;
    if (comp.name.toLowerCase().includes(query)) return true;
    if (comp.slug.includes(query)) return true;
    const cat = categoryLabels[comp.category] || "";
    if (cat.toLowerCase().includes(query)) return true;
    if (comp.aliases && comp.aliases.some((a) => a.toLowerCase().includes(query))) {
      return true;
    }
    return false;
  }

  // ------------------------------------------------------------
  // Safe DOM rendering (no innerHTML with user input)
  // ------------------------------------------------------------
  function clearNode(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
  }

  function createElement(tag, opts) {
    const el = document.createElement(tag);
    if (!opts) return el;
    if (opts.className) el.className = opts.className;
    if (opts.text != null) el.textContent = opts.text;
    if (opts.attrs) {
      Object.keys(opts.attrs).forEach((k) => {
        el.setAttribute(k, opts.attrs[k]);
      });
    }
    return el;
  }

  function renderEmpty(resultsEl, query) {
    clearNode(resultsEl);
    const empty = createElement("div", { className: "atlas-search__empty" });
    empty.appendChild(document.createTextNode("No encontramos nada para "));
    const strong = createElement("strong", { text: query });
    empty.appendChild(strong);
    resultsEl.appendChild(empty);
  }

  function renderResults(resultsEl, query) {
    const filtered = components.filter((c) => matchesQuery(c, query)).slice(0, 12);
    clearNode(resultsEl);

    if (filtered.length === 0) {
      renderEmpty(resultsEl, query);
      return;
    }

    filtered.forEach((comp, i) => {
      const catLabel = categoryLabels[comp.category] || comp.category;
      const href = comp.available ? getComponentUrl(comp) : "#";

      const a = createElement("a", {
        className:
          "atlas-search__result" + (i === 0 ? " is-active" : ""),
        attrs: {
          href,
          "data-idx": String(i),
          role: "option",
        },
      });

      if (!comp.available) {
        a.setAttribute("aria-disabled", "true");
      }

      const left = createElement("span");
      const name = createElement("span", {
        className: "atlas-search__result-name",
        text: comp.name,
      });
      const cat = createElement("span", {
        className: "atlas-search__result-category",
        text: " — " + catLabel,
      });
      left.appendChild(name);
      left.appendChild(cat);
      a.appendChild(left);

      if (!comp.available) {
        const tag = createElement("span", {
          className: "atlas-search__result-tag",
          text: "Pronto",
        });
        a.appendChild(tag);
      }

      resultsEl.appendChild(a);
    });
  }

  // ------------------------------------------------------------
  // Init search UI
  // ------------------------------------------------------------
  function initSearch() {
    const input = document.querySelector("[data-atlas-search-input]");
    const resultsEl = document.querySelector("[data-atlas-search-results]");
    if (!input || !resultsEl) return;

    let activeIdx = 0;

    function open() {
      resultsEl.classList.add("is-open");
    }
    function close() {
      resultsEl.classList.remove("is-open");
    }

    function updateActive() {
      const items = resultsEl.querySelectorAll(".atlas-search__result");
      items.forEach((el, i) => {
        el.classList.toggle("is-active", i === activeIdx);
      });
    }

    input.addEventListener("input", () => {
      renderResults(resultsEl, input.value);
      activeIdx = 0;
      if (input.value.trim()) open();
      else close();
    });

    input.addEventListener("focus", () => {
      if (input.value.trim()) {
        renderResults(resultsEl, input.value);
        open();
      }
    });

    input.addEventListener("keydown", (e) => {
      const items = resultsEl.querySelectorAll(".atlas-search__result");
      if (e.key === "ArrowDown") {
        e.preventDefault();
        activeIdx = Math.min(activeIdx + 1, items.length - 1);
        updateActive();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        activeIdx = Math.max(activeIdx - 1, 0);
        updateActive();
      } else if (e.key === "Enter") {
        const active = items[activeIdx];
        if (active && active.getAttribute("aria-disabled") !== "true") {
          window.location.href = active.getAttribute("href");
        }
      } else if (e.key === "Escape") {
        input.blur();
        close();
      }
    });

    // cmd+k / ctrl+k
    document.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        input.focus();
        input.select();
      }
    });

    // click outside closes
    document.addEventListener("click", (e) => {
      if (!resultsEl.contains(e.target) && e.target !== input) {
        close();
      }
    });
  }

  // ------------------------------------------------------------
  // Meta counter (total componentes disponibles)
  // ------------------------------------------------------------
  function initMetaCounter() {
    const el = document.querySelector("[data-atlas-meta]");
    if (!el) return;
    const total = 80;
    const available = components.filter((c) => c.available).length;
    clearNode(el);
    const strong = createElement("strong", { text: String(available) });
    el.appendChild(strong);
    el.appendChild(document.createTextNode(" de " + total + " disponibles"));
  }

  // ------------------------------------------------------------
  // Public API
  // ------------------------------------------------------------
  window.AtlasIndex = {
    components,
    categoryLabels,
    getComponentUrl,
    getCategoryUrl,
    getBasePath,
  };

  document.addEventListener("DOMContentLoaded", () => {
    initSearch();
    initMetaCounter();
  });
})();
