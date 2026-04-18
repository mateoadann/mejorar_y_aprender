// =========================================================
// Agent Infrastructure 2026 — utils.js
// API publica: window.CourseUtils
// Helpers: nav prev/next, toggle, copy-to-clipboard,
// actualizacion del progress pill del header,
// render de progreso del home y de modulos
// =========================================================

(function () {
  "use strict";

  // --- Util: DOM ready helper ---
  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  // --- Progress pill (en el header, presente en todas las paginas) ---
  function updateProgressPill() {
    const pill = document.querySelector("[data-progress-pill]");
    if (!pill) return;

    const CP = window.CourseProgress;
    if (!CP) return;

    const visited = CP.getVisitedCount();
    const total = CP.TOTAL_PAGES;
    const pct = CP.getPercentage();

    // Construccion segura via DOM
    pill.textContent = "";

    const labelText = document.createTextNode("Progreso ");
    pill.appendChild(labelText);

    const strong = document.createElement("strong");
    strong.textContent = `${visited}/${total}`;
    pill.appendChild(strong);

    // mini fill bar
    const fill = document.createElement("span");
    fill.className = "progress-pill-fill";
    fill.style.setProperty("--progress", `${pct}%`);
    pill.appendChild(fill);

    const pctSpan = document.createElement("span");
    pctSpan.textContent = `${pct}%`;
    pill.appendChild(pctSpan);
  }

  // --- Global progress bar (home) ---
  function updateGlobalProgress() {
    const CP = window.CourseProgress;
    if (!CP) return;

    const visited = CP.getVisitedCount();
    const total = CP.TOTAL_PAGES;
    const pct = CP.getPercentage();

    const countEl = document.querySelector("[data-global-count]");
    if (countEl) countEl.textContent = `${visited}/${total}`;

    const pctEl = document.querySelector("[data-global-pct]");
    if (pctEl) pctEl.textContent = `${pct}%`;

    const barEl = document.querySelector("[data-global-bar]");
    if (barEl) barEl.style.width = `${pct}%`;
  }

  // --- Module cards progress (home) ---
  function updateModuleCards() {
    const CP = window.CourseProgress;
    if (!CP) return;

    document.querySelectorAll("[data-module-id]").forEach((card) => {
      const moduleId = card.dataset.moduleId;
      const pct = CP.getModuleProgress(moduleId);
      const visited = CP.getModuleVisitedCount(moduleId);
      const total = CP.getModuleTotal(moduleId);

      const fill = card.querySelector("[data-module-fill]");
      if (fill) fill.style.width = `${pct}%`;

      const label = card.querySelector("[data-module-label]");
      if (label) label.textContent = `${visited}/${total}`;

      if (pct === 100) {
        card.classList.add("complete");
      } else {
        card.classList.remove("complete");
      }
    });
  }

  // --- Mark-as-visited button (en cada pagina interna) ---
  function hookMarkBtn(pageId) {
    const btn = document.querySelector("[data-mark-visited]");
    if (!btn || !pageId) return;

    const CP = window.CourseProgress;
    if (!CP) return;

    const render = () => {
      const done = CP.isVisited(pageId);
      btn.textContent = done ? "Marcada como vista" : "Marcar como vista";
      btn.classList.toggle("visited", done);
    };
    render();

    btn.addEventListener("click", () => {
      CP.toggle(pageId);
      render();
      updateProgressPill();
    });
  }

  // --- API publica: initNav ---
  // Inicializa una pagina interna: marca pageId como visitada
  // automaticamente al cargar, setea links prev/next, y engancha
  // el boton de "marcar como vista" si existe.
  function initNav(opts) {
    opts = opts || {};
    const { prev, next, pageId, autoMark } = opts;

    const CP = window.CourseProgress;

    // Auto-marca al cargar (por defecto true)
    if (pageId && CP && autoMark !== false) {
      CP.markAsVisited(pageId);
    }

    // Setea prev/next si los selectores o valores estan
    if (prev) {
      const prevEl = document.querySelector("[data-nav-prev]");
      if (prevEl) {
        if (typeof prev === "string") {
          prevEl.setAttribute("href", prev);
        } else if (prev && prev.href) {
          prevEl.setAttribute("href", prev.href);
          const titleEl = prevEl.querySelector(".page-nav-title");
          if (titleEl && prev.title) titleEl.textContent = prev.title;
        }
      }
    } else {
      const prevEl = document.querySelector("[data-nav-prev]");
      if (prevEl) prevEl.classList.add("disabled");
    }

    if (next) {
      const nextEl = document.querySelector("[data-nav-next]");
      if (nextEl) {
        if (typeof next === "string") {
          nextEl.setAttribute("href", next);
        } else if (next && next.href) {
          nextEl.setAttribute("href", next.href);
          const titleEl = nextEl.querySelector(".page-nav-title");
          if (titleEl && next.title) titleEl.textContent = next.title;
        }
      }
    } else {
      const nextEl = document.querySelector("[data-nav-next]");
      if (nextEl) nextEl.classList.add("disabled");
    }

    // Mark-as-visited btn
    hookMarkBtn(pageId);

    // Update header pill
    updateProgressPill();
  }

  // --- API publica: copyToClipboard ---
  function copyToClipboard(text, button) {
    const doCopy = navigator.clipboard && navigator.clipboard.writeText
      ? navigator.clipboard.writeText(text)
      : new Promise((resolve, reject) => {
          try {
            const ta = document.createElement("textarea");
            ta.value = text;
            ta.style.position = "fixed";
            ta.style.top = "-1000px";
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            document.body.removeChild(ta);
            resolve();
          } catch (e) {
            reject(e);
          }
        });

    return doCopy.then(() => {
      if (button) {
        const original = button.textContent;
        button.classList.add("copied");
        button.textContent = "Copiado";
        setTimeout(() => {
          button.classList.remove("copied");
          button.textContent = original;
        }, 1800);
      }
    });
  }

  // --- Engancha todos los [data-copy] automaticamente ---
  function hookCopyButtons() {
    document.querySelectorAll("[data-copy]").forEach((btn) => {
      if (btn._copyBound) return;
      btn._copyBound = true;
      btn.addEventListener("click", () => {
        // dataset.copy puede ser un selector a un elemento
        // que contenga el texto, o texto directo con prefijo "text:"
        const target = btn.getAttribute("data-copy");
        let text = "";
        if (target && target.startsWith("text:")) {
          text = target.slice(5);
        } else if (target) {
          const src = document.querySelector(target);
          if (src) {
            text = src.innerText || src.textContent || "";
          }
        }
        if (text) copyToClipboard(text, btn);
      });
    });
  }

  // --- API publica: toggleSection (accordion simple) ---
  function toggleSection(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.toggle("is-open");
    // aria
    const trigger = document.querySelector(`[data-toggle="${id}"]`);
    if (trigger) {
      const expanded = el.classList.contains("is-open");
      trigger.setAttribute("aria-expanded", expanded ? "true" : "false");
    }
  }

  // --- Engancha [data-toggle] automaticamente ---
  function hookToggles() {
    document.querySelectorAll("[data-toggle]").forEach((trigger) => {
      if (trigger._toggleBound) return;
      trigger._toggleBound = true;
      trigger.addEventListener("click", () => {
        const id = trigger.getAttribute("data-toggle");
        toggleSection(id);
      });
    });
  }

  // --- Reset progreso (boton opcional) ---
  function hookResetBtn() {
    const btn = document.querySelector("[data-reset-progress]");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const ok = window.confirm(
        "Esto borra tu progreso local. ¿Seguro que querés continuar?"
      );
      if (!ok) return;
      window.CourseProgress.reset();
      updateProgressPill();
      updateGlobalProgress();
      updateModuleCards();
    });
  }

  // --- Init global en cada pagina ---
  ready(() => {
    updateProgressPill();
    updateGlobalProgress();
    updateModuleCards();
    hookCopyButtons();
    hookToggles();
    hookResetBtn();
  });

  // =========================================================
  // API base (spec): initPage, createDiagram, highlightCode
  // =========================================================

  // --- Metadata de modulos para breadcrumbs/nav automatico ---
  const MODULES = [
    {
      id: "M00",
      slug: "m00-fundamentos",
      title: "Fundamentos",
      pages: [
        { id: "M00-00", slug: "00-intro", title: "Que es infraestructura de agentes" },
        { id: "M00-01", slug: "01-las-4-capas", title: "Las 4 capas de la infraestructura" },
        { id: "M00-02", slug: "02-por-que-compone", title: "Por que compone con el tiempo" },
      ],
    },
    {
      id: "M01",
      slug: "m01-knowledge-layer",
      title: "Knowledge Layer",
      pages: [
        { id: "M01-00", slug: "00-kbl-vs-bf", title: "KBL vs Brand Foundation" },
        { id: "M01-01", slug: "01-estructura-wiki", title: "Estructura del wiki" },
        { id: "M01-02", slug: "02-ingest-pipeline", title: "El pipeline de ingest" },
        { id: "M01-03", slug: "03-kbl-vs-rag", title: "Por que KBL supera a RAG" },
      ],
    },
    {
      id: "M02",
      slug: "m02-agent-stack",
      title: "Agent Stack",
      pages: [
        { id: "M02-00", slug: "00-anatomia-stack", title: "Anatomia del stack" },
        { id: "M02-01", slug: "01-harness-thin", title: "Harness thin: conductor < 200 LOC" },
        { id: "M02-02", slug: "02-context-budget", title: "Context budget: asignacion de tokens" },
        { id: "M02-03", slug: "03-progressive-disclosure", title: "Progressive disclosure de skills" },
        { id: "M02-04", slug: "04-salience-scoring", title: "Salience scoring" },
      ],
    },
    {
      id: "M03",
      slug: "m03-memoria",
      title: "Memoria 4 capas",
      pages: [
        { id: "M03-00", slug: "00-working", title: "Working memory: estado vivo" },
        { id: "M03-01", slug: "01-episodic", title: "Episodic memory: que paso antes" },
        { id: "M03-02", slug: "02-semantic", title: "Semantic memory: abstracciones" },
        { id: "M03-03", slug: "03-dream-cycle", title: "Dream cycle: compresion nocturna" },
      ],
    },
    {
      id: "M04",
      slug: "m04-skills-protocols",
      title: "Skills & Protocols",
      pages: [
        { id: "M04-00", slug: "00-skill-anatomy", title: "Anatomia de un skill" },
        { id: "M04-01", slug: "01-skillforge", title: "Skillforge: el skill que crea skills" },
        { id: "M04-02", slug: "02-protocols", title: "Protocols: tool schemas + permissions" },
        { id: "M04-03", slug: "03-hooks-lifecycle", title: "Hooks: el enforcement layer" },
      ],
    },
    {
      id: "M05",
      slug: "m05-knowledge-graphs",
      title: "Knowledge Graphs",
      pages: [
        { id: "M05-00", slug: "00-subgraph-matching", title: "El problema: subgraph matching" },
        { id: "M05-01", slug: "01-indexing-spo", title: "Indexing: 6 permutaciones SPO" },
        { id: "M05-02", slug: "02-traversal", title: "Traversal: BFS, DFS, Dijkstra, A*" },
        { id: "M05-03", slug: "03-query-planning", title: "Query planning y join ordering" },
        { id: "M05-04", slug: "04-embeddings-bloom", title: "Embeddings, Bloom y aproximaciones" },
      ],
    },
    {
      id: "M06",
      slug: "m06-claude-code-ops",
      title: "Claude Code Ops",
      pages: [
        { id: "M06-00", slug: "00-context-rot", title: "Context rot y la ventana de 1M" },
        { id: "M06-01", slug: "01-branching-point", title: "Cada turno es un branching point" },
        { id: "M06-02", slug: "02-rewind-vs-correct", title: "Rewind vs corregir" },
        { id: "M06-03", slug: "03-subagents-strategy", title: "Subagents: delegation strategy" },
      ],
    },
    {
      id: "M07",
      slug: "m07-integrador",
      title: "Integrador",
      pages: [
        { id: "M07-00", slug: "00-los-6-loops", title: "Los 6 feedback loops" },
        { id: "M07-01", slug: "01-mi-propio-stack", title: "Arma tu propio stack" },
        { id: "M07-02", slug: "02-cheatsheet", title: "Cheatsheet final" },
      ],
    },
  ];

  function _flatPages() {
    const out = [];
    MODULES.forEach((m) => {
      m.pages.forEach((p) => {
        out.push({
          pageId: p.id,
          moduleId: m.id,
          moduleSlug: m.slug,
          moduleTitle: m.title,
          pageSlug: p.slug,
          pageTitle: p.title,
          href: `${m.slug}/${p.slug === "index" ? "index.html" : p.slug + ".html"}`,
        });
      });
    });
    return out;
  }

  function _pathToRoot(pageId) {
    // Las paginas internas viven en /<m??-slug>/<archivo>.html
    return pageId ? "../" : "./";
  }

  function _renderBreadcrumb(entry) {
    const crumb = document.querySelector("[data-breadcrumb]");
    if (!crumb || !entry) return;
    const root = _pathToRoot(entry.pageId);

    // Construccion 100% via DOM (sin innerHTML)
    while (crumb.firstChild) crumb.removeChild(crumb.firstChild);

    const mkLink = (text, href) => {
      const a = document.createElement("a");
      a.setAttribute("href", href);
      a.textContent = text;
      return a;
    };
    const mkSep = () => {
      const s = document.createElement("span");
      s.className = "breadcrumb-sep";
      s.textContent = "/";
      return s;
    };

    crumb.appendChild(mkLink("Inicio", `${root}index.html`));
    crumb.appendChild(mkSep());
    crumb.appendChild(
      mkLink(entry.moduleTitle, `${root}${entry.moduleSlug}/index.html`)
    );
    crumb.appendChild(mkSep());

    const current = document.createElement("span");
    current.className = "breadcrumb-current";
    current.textContent = entry.pageTitle;
    crumb.appendChild(current);
  }

  function _renderPrevNext(entry) {
    const flat = _flatPages();
    const idx = flat.findIndex((p) => p.pageId === entry.pageId);
    if (idx === -1) return;
    const prev = idx > 0 ? flat[idx - 1] : null;
    const next = idx < flat.length - 1 ? flat[idx + 1] : null;
    const root = _pathToRoot(entry.pageId);

    const nav = document.querySelector(".nav-prev-next");
    if (!nav) return;

    const prevEl = nav.querySelector("[data-nav-prev]");
    const nextEl = nav.querySelector("[data-nav-next]");

    const updateEl = (el, target) => {
      if (!el) return;
      if (target) {
        el.setAttribute("href", `${root}${target.href}`);
        const t = el.querySelector(".nav-title, .page-nav-title");
        if (t) t.textContent = target.pageTitle;
        el.classList.remove("disabled");
      } else {
        el.classList.add("disabled");
        el.removeAttribute("href");
      }
    };

    updateEl(prevEl, prev);
    updateEl(nextEl, next);
  }

  /**
   * Init de una pagina interna (spec base).
   * - Marca pageId como visitada
   * - Renderiza breadcrumb via [data-breadcrumb]
   * - Renderiza nav prev/next via .nav-prev-next con [data-nav-prev] [data-nav-next]
   * - Highlightea codigo presente en la pagina
   * - Actualiza pill de progreso
   *
   * @param {string} pageId ej "M00-01"
   * @param {string} moduleId ej "M00"
   */
  function initPage(pageId, moduleId) {
    const CP = window.CourseProgress;
    if (CP && pageId) CP.markVisited(pageId);

    const flat = _flatPages();
    const entry = flat.find((p) => p.pageId === pageId);
    if (entry) {
      _renderBreadcrumb(entry);
      _renderPrevNext(entry);
    }

    document.querySelectorAll(".code-block code, code[data-lang]").forEach((el) => {
      if (el._highlighted) return;
      try {
        highlightCode(el);
      } catch (e) { /* noop */ }
    });

    updateProgressPill();
  }

  /**
   * Helper para construir un SVG inline a partir de un config simple.
   *
   * svgConfig = {
   *   width, height, viewBox, ariaLabel,
   *   nodes: [{ x, y, w, h, label, variant: "default"|"accent"|"alt" }],
   *   edges: [{ from, to, variant: "default"|"accent"|"alt" }],
   * }
   *
   * @param {object} svgConfig
   * @returns {SVGElement}
   */
  function createDiagram(svgConfig) {
    const cfg = svgConfig || {};
    const W = cfg.width || 800;
    const H = cfg.height || 400;
    const vb = cfg.viewBox || `0 0 ${W} ${H}`;
    const NS = "http://www.w3.org/2000/svg";

    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("class", "svg-diagram");
    svg.setAttribute("viewBox", vb);
    svg.setAttribute("width", String(W));
    svg.setAttribute("height", String(H));
    svg.setAttribute("role", "img");
    if (cfg.ariaLabel) svg.setAttribute("aria-label", cfg.ariaLabel);

    const defs = document.createElementNS(NS, "defs");
    const marker = document.createElementNS(NS, "marker");
    marker.setAttribute("id", "arrow-head");
    marker.setAttribute("viewBox", "0 0 10 10");
    marker.setAttribute("refX", "9");
    marker.setAttribute("refY", "5");
    marker.setAttribute("markerWidth", "6");
    marker.setAttribute("markerHeight", "6");
    marker.setAttribute("orient", "auto-start-reverse");
    const arrowPath = document.createElementNS(NS, "path");
    arrowPath.setAttribute("d", "M0 0 L10 5 L0 10 z");
    arrowPath.setAttribute("class", "svg-arrowhead");
    marker.appendChild(arrowPath);
    defs.appendChild(marker);
    svg.appendChild(defs);

    const nodes = Array.isArray(cfg.nodes) ? cfg.nodes : [];
    const edges = Array.isArray(cfg.edges) ? cfg.edges : [];

    edges.forEach((e) => {
      if (nodes[e.from] == null || nodes[e.to] == null) return;
      const a = nodes[e.from];
      const b = nodes[e.to];
      const x1 = a.x + (a.w || 120) / 2;
      const y1 = a.y + (a.h || 48) / 2;
      const x2 = b.x + (b.w || 120) / 2;
      const y2 = b.y + (b.h || 48) / 2;
      const line = document.createElementNS(NS, "line");
      line.setAttribute("x1", String(x1));
      line.setAttribute("y1", String(y1));
      line.setAttribute("x2", String(x2));
      line.setAttribute("y2", String(y2));
      line.setAttribute("marker-end", "url(#arrow-head)");
      const cls =
        e.variant === "accent"
          ? "svg-edge-accent"
          : e.variant === "alt"
          ? "svg-edge-alt"
          : "svg-edge";
      line.setAttribute("class", cls);
      svg.appendChild(line);
    });

    nodes.forEach((n) => {
      const w = n.w || 140;
      const h = n.h || 48;
      const rect = document.createElementNS(NS, "rect");
      rect.setAttribute("x", String(n.x));
      rect.setAttribute("y", String(n.y));
      rect.setAttribute("width", String(w));
      rect.setAttribute("height", String(h));
      rect.setAttribute("rx", "8");
      rect.setAttribute(
        "class",
        n.variant === "accent"
          ? "svg-node-bg-accent"
          : n.variant === "alt"
          ? "svg-node-bg-alt"
          : "svg-node-bg"
      );
      svg.appendChild(rect);

      if (n.label) {
        const txt = document.createElementNS(NS, "text");
        txt.setAttribute("x", String(n.x + w / 2));
        txt.setAttribute("y", String(n.y + h / 2 + 4));
        txt.setAttribute("text-anchor", "middle");
        txt.setAttribute("class", "svg-label");
        txt.textContent = n.label;
        svg.appendChild(txt);
      }
    });

    return svg;
  }

  // --- Syntax highlight simple (python/bash/js) ---
  const _HL_LANGS = {
    python: {
      kw: new Set([
        "def","class","return","if","else","elif","for","while","in","not","and",
        "or","import","from","as","with","try","except","finally","raise","pass",
        "None","True","False","yield","lambda","async","await","self"
      ]),
      builtin: new Set(["print","len","range","list","dict","set","tuple","str","int","float"]),
      comment: "#",
    },
    bash: {
      kw: new Set(["if","then","else","fi","for","in","do","done","while","function","return","case","esac"]),
      builtin: new Set(["echo","cd","ls","cat","grep","awk","sed","export","source","curl","wget"]),
      comment: "#",
    },
    js: {
      kw: new Set([
        "const","let","var","function","return","if","else","for","while","do","switch",
        "case","break","continue","new","class","extends","import","from","export",
        "default","async","await","try","catch","finally","throw","typeof","instanceof",
        "null","true","false","undefined","this"
      ]),
      builtin: new Set(["console","document","window","Math","JSON","Array","Object","Promise"]),
      comment: "//",
    },
  };

  function _classifyWord(word, spec) {
    if (spec.kw.has(word)) return "tok-keyword";
    if (spec.builtin.has(word)) return "tok-builtin";
    if (/^\d+(\.\d+)?$/.test(word)) return "tok-number";
    return null;
  }

  function _appendSpan(parent, cls, text) {
    if (cls) {
      const span = document.createElement("span");
      span.className = cls;
      span.textContent = text;
      parent.appendChild(span);
    } else {
      parent.appendChild(document.createTextNode(text));
    }
  }

  /**
   * Resaltado de sintaxis simple basado en DOM (sin innerHTML).
   * Lee el lenguaje desde data-lang o class="language-xxx".
   * Alias soportados: sh/shell -> bash; javascript/ts/typescript -> js.
   *
   * @param {HTMLElement} codeEl
   */
  function highlightCode(codeEl) {
    if (!codeEl || codeEl._highlighted) return;

    let lang = codeEl.getAttribute("data-lang");
    if (!lang) {
      const cls = codeEl.className || "";
      const m = cls.match(/language-([\w+-]+)/);
      if (m) lang = m[1];
    }
    if (!lang) return;
    lang = lang.toLowerCase();
    if (lang === "sh" || lang === "shell") lang = "bash";
    if (lang === "javascript" || lang === "ts" || lang === "typescript") lang = "js";

    const spec = _HL_LANGS[lang];
    if (!spec) return;

    const src = codeEl.textContent || "";
    const lines = src.split("\n");

    // Reemplazamos contenido via DOM
    while (codeEl.firstChild) codeEl.removeChild(codeEl.firstChild);

    lines.forEach((line, lineIdx) => {
      let i = 0;
      let wordBuf = "";
      const flushWord = () => {
        if (!wordBuf) return;
        const cls = _classifyWord(wordBuf, spec);
        _appendSpan(codeEl, cls, wordBuf);
        wordBuf = "";
      };

      const inString = { active: false, quote: "", buf: "" };

      while (i < line.length) {
        const ch = line[i];

        if (!inString.active && spec.comment && line.startsWith(spec.comment, i)) {
          flushWord();
          _appendSpan(codeEl, "tok-comment", line.slice(i));
          i = line.length;
          break;
        }

        if (inString.active) {
          inString.buf += ch;
          if (ch === inString.quote && line[i - 1] !== "\\") {
            _appendSpan(codeEl, "tok-string", inString.buf);
            inString.active = false;
            inString.quote = "";
            inString.buf = "";
          }
          i++;
          continue;
        }

        if (ch === '"' || ch === "'" || ch === "`") {
          flushWord();
          inString.active = true;
          inString.quote = ch;
          inString.buf = ch;
          i++;
          continue;
        }

        if (/[A-Za-z0-9_]/.test(ch)) {
          wordBuf += ch;
        } else {
          flushWord();
          _appendSpan(codeEl, null, ch);
        }
        i++;
      }

      if (inString.active) {
        _appendSpan(codeEl, "tok-string", inString.buf);
      } else {
        flushWord();
      }

      if (lineIdx < lines.length - 1) {
        _appendSpan(codeEl, null, "\n");
      }
    });

    codeEl._highlighted = true;
  }

  // --- Theme toggle (opcional — default dark) ---
  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme || "dark";
  }

  function toggleTheme() {
    const current = document.documentElement.dataset.theme || "dark";
    applyTheme(current === "dark" ? "light" : "dark");
  }

  // --- Expongo API publica ---
  window.CourseUtils = {
    // spec base
    initPage,
    createDiagram,
    highlightCode,
    applyTheme,
    toggleTheme,

    // utilidades originales (compat)
    initNav,
    copyToClipboard,
    toggleSection,
    updateProgressPill,
    updateGlobalProgress,
    updateModuleCards,

    // lectura
    MODULES,
  };
})();
