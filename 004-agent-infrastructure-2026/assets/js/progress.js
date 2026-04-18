// =========================================================
// Agent Infrastructure 2026 — progress.js
// API publica: window.CourseProgress
// Tracking de paginas visitadas via localStorage
// Storage key: curso_agent_infra_progreso_v1
// =========================================================

(function () {
  "use strict";

  const STORAGE_KEY = "curso_agent_infra_progreso_v1";
  const TOTAL_PAGES = 32;

  // Mapa de modulos: moduleId -> array de pageIds
  // moduleId va de "M00" a "M07"
  const MODULE_PAGES = {
    "M00": ["M00-00", "M00-01", "M00-02"],                           // 3
    "M01": ["M01-00", "M01-01", "M01-02", "M01-03"],                 // 4
    "M02": ["M02-00", "M02-01", "M02-02", "M02-03", "M02-04"],       // 5
    "M03": ["M03-00", "M03-01", "M03-02", "M03-03"],                 // 4
    "M04": ["M04-00", "M04-01", "M04-02", "M04-03"],                 // 4
    "M05": ["M05-00", "M05-01", "M05-02", "M05-03", "M05-04"],       // 5
    "M06": ["M06-00", "M06-01", "M06-02", "M06-03"],                 // 4
    "M07": ["M07-00", "M07-01", "M07-02"],                           // 3
  };

  // --- Storage helpers (con fallback silencioso si localStorage falla) ---
  function _load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { visited: [] };
      const parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.visited)) {
        return { visited: [] };
      }
      return parsed;
    } catch (e) {
      return { visited: [] };
    }
  }

  function _save(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      /* noop — private mode, quota exceeded, etc */
    }
  }

  // --- API publica ---
  const CourseProgress = {
    STORAGE_KEY,
    TOTAL_PAGES,
    MODULE_PAGES,

    /**
     * Marca una pagina como visitada (idempotente).
     * @param {string} pageId - ej: "M00-00", "M03-02"
     */
    markAsVisited(pageId) {
      if (!pageId || typeof pageId !== "string") return;
      const state = _load();
      if (!state.visited.includes(pageId)) {
        state.visited.push(pageId);
        _save(state);
      }
    },

    /**
     * Quita una pagina de las visitadas.
     * @param {string} pageId
     */
    unmarkAsVisited(pageId) {
      if (!pageId || typeof pageId !== "string") return;
      const state = _load();
      state.visited = state.visited.filter((x) => x !== pageId);
      _save(state);
    },

    /**
     * Toggle entre visitada / no visitada. Devuelve el estado nuevo.
     * @param {string} pageId
     * @returns {boolean}
     */
    toggle(pageId) {
      if (this.isVisited(pageId)) {
        this.unmarkAsVisited(pageId);
        return false;
      }
      this.markAsVisited(pageId);
      return true;
    },

    /**
     * @param {string} pageId
     * @returns {boolean}
     */
    isVisited(pageId) {
      if (!pageId) return false;
      return _load().visited.includes(pageId);
    },

    /**
     * Cantidad total de paginas visitadas.
     * @returns {number}
     */
    getVisitedCount() {
      // Filtramos por pageIds validos (no cuentan ids huerfanos si cambia el curso)
      const validIds = Object.values(MODULE_PAGES).flat();
      return _load().visited.filter((id) => validIds.includes(id)).length;
    },

    /**
     * Porcentaje global 0-100.
     * @returns {number}
     */
    getPercentage() {
      return TOTAL_PAGES > 0
        ? Math.round((this.getVisitedCount() / TOTAL_PAGES) * 100)
        : 0;
    },

    /**
     * Porcentaje de progreso de un modulo.
     * @param {string} moduleId - ej: "M00", "M03"
     * @returns {number} 0-100
     */
    getModuleProgress(moduleId) {
      const pages = MODULE_PAGES[moduleId];
      if (!pages || pages.length === 0) return 0;
      const state = _load();
      const visited = pages.filter((id) => state.visited.includes(id)).length;
      return Math.round((visited / pages.length) * 100);
    },

    /**
     * Cantidad de paginas visitadas en un modulo.
     * @param {string} moduleId
     * @returns {number}
     */
    getModuleVisitedCount(moduleId) {
      const pages = MODULE_PAGES[moduleId];
      if (!pages) return 0;
      const state = _load();
      return pages.filter((id) => state.visited.includes(id)).length;
    },

    /**
     * Total de paginas de un modulo.
     * @param {string} moduleId
     * @returns {number}
     */
    getModuleTotal(moduleId) {
      return (MODULE_PAGES[moduleId] || []).length;
    },

    /**
     * Lista todos los pageIds visitados.
     * @returns {string[]}
     */
    list() {
      return [..._load().visited];
    },

    /**
     * Borra todo el progreso.
     */
    reset() {
      _save({ visited: [] });
    },

    /**
     * Alias canonico de la API base (spec).
     * @param {string} pageId
     */
    markVisited(pageId) {
      this.markAsVisited(pageId);
    },

    /**
     * Alias: cantidad total de paginas del curso.
     * @returns {number}
     */
    getTotal() {
      return TOTAL_PAGES;
    },

    /**
     * Snapshot del progreso (shape spec):
     *   { visited: number, total: 32, percentage: number, pages: string[] }
     * @returns {{visited:number,total:number,percentage:number,pages:string[]}}
     */
    getProgress() {
      const pages = this.list();
      const visited = this.getVisitedCount();
      return {
        visited,
        total: TOTAL_PAGES,
        percentage: this.getPercentage(),
        pages,
      };
    },
  };

  // Expongo global
  window.CourseProgress = CourseProgress;
})();
