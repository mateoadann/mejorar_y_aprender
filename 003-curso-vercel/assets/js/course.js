// =========================================================
// Curso Vercel — JS compartido (progreso + interacciones)
// =========================================================

(function () {
  "use strict";

  const STORAGE_KEY = "curso_vercel_progreso_v1";

  // --- Progreso en localStorage ---
  const CourseProgress = {
    load() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : { completed: [] };
      } catch (e) {
        return { completed: [] };
      }
    },
    save(state) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (e) {
        /* noop */
      }
    },
    isComplete(id) {
      return this.load().completed.includes(id);
    },
    mark(id) {
      const state = this.load();
      if (!state.completed.includes(id)) {
        state.completed.push(id);
        this.save(state);
      }
    },
    unmark(id) {
      const state = this.load();
      state.completed = state.completed.filter((x) => x !== id);
      this.save(state);
    },
    toggle(id) {
      this.isComplete(id) ? this.unmark(id) : this.mark(id);
      return this.isComplete(id);
    },
    percentage(total) {
      const count = this.load().completed.length;
      return total > 0 ? Math.round((count / total) * 100) : 0;
    },
    reset() {
      this.save({ completed: [] });
    },
  };

  // --- Total de paginas del curso (hardcoded)
  // home + M00(5) + M01(4) + M02(5) + M03(5) + M04(4) + M05(4) + M06(1) = 29
  // Trackeamos solo paginas de contenido marcables (sin el home) = 28 entradas
  // pero en practica marcamos m00..m06 (indices) + sus sub-paginas = 7 + 22 = 29 ids
  const TOTAL_PAGES = 29;

  // --- Inicializacion ---
  function init() {
    updateProgressPill();
    hookMarkButton();
    hookModuleCards();
    animateFlowArrows();
  }

  function updateProgressPill() {
    const pill = document.querySelector("[data-progress-pill]");
    if (!pill) return;
    const pct = CourseProgress.percentage(TOTAL_PAGES);
    const completed = CourseProgress.load().completed.length;
    // Construccion via DOM segura (sin innerHTML)
    pill.textContent = "";
    pill.appendChild(document.createTextNode("Progreso: "));
    const strong = document.createElement("strong");
    strong.textContent = `${completed}/${TOTAL_PAGES}`;
    pill.appendChild(strong);
    pill.appendChild(document.createTextNode(" "));
    const span = document.createElement("span");
    span.style.color = "var(--text-3)";
    span.textContent = `(${pct}%)`;
    pill.appendChild(span);
  }

  function hookMarkButton() {
    const btn = document.querySelector("[data-mark-complete]");
    if (!btn) return;
    const pageId = btn.dataset.markComplete;
    const render = () => {
      const done = CourseProgress.isComplete(pageId);
      btn.textContent = done ? "Completado ✓" : "Marcar como visto";
      btn.classList.toggle("done", done);
    };
    render();
    btn.addEventListener("click", () => {
      CourseProgress.toggle(pageId);
      render();
      updateProgressPill();
    });
  }

  function hookModuleCards() {
    document.querySelectorAll("[data-page-id]").forEach((card) => {
      if (CourseProgress.isComplete(card.dataset.pageId)) {
        card.classList.add("done");
      }
    });
  }

  function animateFlowArrows() {
    const arrows = document.querySelectorAll(".flow-arrow");
    arrows.forEach((a, i) => {
      a.style.animation = `pulse 2s ease-in-out ${i * 0.2}s infinite`;
    });
  }

  // Expongo global por si alguna pagina necesita interactuar
  window.CourseProgress = CourseProgress;
  window.CourseUtils = {
    totalPages: TOTAL_PAGES,
    updatePill: updateProgressPill,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
