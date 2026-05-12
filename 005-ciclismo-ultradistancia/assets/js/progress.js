/* ============================================
   progress.js — localStorage tracking
   API publica: window.CourseProgress
     - markVisited(pageId)
     - isVisited(pageId)
     - getVisitedCount()
     - getProgressPercent()
     - reset()
   ============================================ */

(function () {
  'use strict';
  const KEY = 'curso_ciclismo_ultra_progreso_v1';

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : { visited: [] };
    } catch (e) {
      return { visited: [] };
    }
  }
  function save(state) {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  }

  function markVisited(pageId) {
    const s = load();
    if (!s.visited.includes(pageId)) {
      s.visited.push(pageId);
      save(s);
    }
  }
  function isVisited(pageId) {
    return load().visited.includes(pageId);
  }
  function getVisitedCount() {
    return load().visited.length;
  }
  function getProgressPercent() {
    const total = (window.CourseUtils && window.CourseUtils.totalPages) || 33;
    return Math.round((getVisitedCount() / total) * 100);
  }
  function reset() { save({ visited: [] }); }

  window.CourseProgress = {
    markVisited,
    isVisited,
    getVisitedCount,
    getProgressPercent,
    reset
  };
})();
