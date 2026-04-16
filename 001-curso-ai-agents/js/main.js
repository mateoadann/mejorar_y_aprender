/* ==========================================================================
   main.js — Tracking de progreso del curso con localStorage
   ==========================================================================
   API pública:
     CourseProgress.markCompleted(lessonId)
     CourseProgress.isCompleted(lessonId)
     CourseProgress.getCompleted()
     CourseProgress.getPercent(totalLessons)
     CourseProgress.reset()
     CourseProgress.updateProgressBar(selector, totalLessons)
   ========================================================================== */

(function () {
    "use strict";

    const STORAGE_KEY = "curso_ai_agents_progreso_v1";
    const TOTAL_LESSONS_DEFAULT = 20; // default si no se pasa

    /**
     * Lee el array de lecciones completadas desde localStorage.
     * @returns {string[]}
     */
    function readCompleted() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return [];
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
        } catch (err) {
            console.warn("No se pudo leer progreso del curso:", err);
            return [];
        }
    }

    /**
     * Guarda el array de lecciones completadas en localStorage.
     * @param {string[]} lessons
     */
    function writeCompleted(lessons) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(lessons));
        } catch (err) {
            console.warn("No se pudo guardar progreso del curso:", err);
        }
    }

    /**
     * Marca una lección como completada. Idempotente.
     * @param {string} lessonId
     */
    function markCompleted(lessonId) {
        if (!lessonId) return;
        const lessons = readCompleted();
        if (!lessons.includes(lessonId)) {
            lessons.push(lessonId);
            writeCompleted(lessons);
            document.dispatchEvent(
                new CustomEvent("course:lesson-completed", {
                    detail: { lessonId, total: lessons.length },
                }),
            );
        }
    }

    /**
     * Devuelve true si la lección ya fue completada.
     */
    function isCompleted(lessonId) {
        return readCompleted().includes(lessonId);
    }

    /**
     * Devuelve el array completo de lecciones leídas.
     */
    function getCompleted() {
        return readCompleted();
    }

    /**
     * Devuelve el porcentaje de progreso del curso (0-100).
     * @param {number} totalLessons — total del curso
     */
    function getPercent(totalLessons) {
        const total = totalLessons || TOTAL_LESSONS_DEFAULT;
        const completed = readCompleted().length;
        if (total <= 0) return 0;
        return Math.min(100, Math.round((completed / total) * 100));
    }

    /**
     * Resetea el progreso.
     */
    function reset() {
        writeCompleted([]);
        document.dispatchEvent(new CustomEvent("course:reset"));
    }

    /**
     * Actualiza una barra de progreso visual dada su selector.
     * Espera encontrar: .progress-bar-fill y opcionalmente un elemento
     * con [data-progress-percent] y [data-progress-count].
     * @param {string} selector
     * @param {number} totalLessons
     */
    function updateProgressBar(selector, totalLessons) {
        const root = document.querySelector(selector);
        if (!root) return;

        const total = totalLessons || TOTAL_LESSONS_DEFAULT;
        const completed = readCompleted().length;
        const percent = getPercent(total);

        const fill = root.querySelector(".progress-bar-fill");
        if (fill) {
            fill.style.setProperty("--progress-value", percent + "%");
        }

        const percentEl = root.querySelector("[data-progress-percent]");
        if (percentEl) percentEl.textContent = percent + "%";

        const countEl = root.querySelector("[data-progress-count]");
        if (countEl) countEl.textContent = completed + " / " + total;
    }

    /**
     * Auto-inicialización: busca cualquier [data-progress-widget] y lo
     * actualiza al cargar la página.
     */
    function autoInit() {
        document.querySelectorAll("[data-progress-widget]").forEach((el) => {
            const total = parseInt(el.dataset.totalLessons, 10) || TOTAL_LESSONS_DEFAULT;
            const selector =
                "#" + el.id ||
                "[data-progress-widget='" + el.dataset.progressWidget + "']";
            if (el.id) {
                updateProgressBar("#" + el.id, total);
            } else {
                // Fallback: actualizar directo sin selector
                const percent = getPercent(total);
                const fill = el.querySelector(".progress-bar-fill");
                if (fill) fill.style.setProperty("--progress-value", percent + "%");
                const percentEl = el.querySelector("[data-progress-percent]");
                if (percentEl) percentEl.textContent = percent + "%";
                const countEl = el.querySelector("[data-progress-count]");
                if (countEl)
                    countEl.textContent =
                        readCompleted().length + " / " + total;
            }
        });

        // Botón para marcar lección actual como completada
        document
            .querySelectorAll("[data-mark-completed]")
            .forEach((btn) => {
                const lessonId = btn.dataset.markCompleted;
                if (isCompleted(lessonId)) {
                    btn.textContent = "Lección completada";
                    btn.classList.add("completed");
                }
                btn.addEventListener("click", () => {
                    markCompleted(lessonId);
                    btn.textContent = "Lección completada";
                    btn.classList.add("completed");
                });
            });
    }

    // API pública
    window.CourseProgress = {
        markCompleted: markCompleted,
        isCompleted: isCompleted,
        getCompleted: getCompleted,
        getPercent: getPercent,
        reset: reset,
        updateProgressBar: updateProgressBar,
    };

    // Copy buttons para .code-block
    function initCopyButtons() {
        document.querySelectorAll(".code-block-copy").forEach((btn) => {
            btn.addEventListener("click", () => {
                const block = btn.closest(".code-block");
                if (!block) return;
                const code = block.querySelector("code, pre");
                if (!code) return;
                const text = code.innerText;
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(text).then(() => {
                        const original = btn.textContent;
                        btn.textContent = "Copiado";
                        btn.classList.add("copied");
                        setTimeout(() => {
                            btn.textContent = original;
                            btn.classList.remove("copied");
                        }, 1500);
                    });
                }
            });
        });
    }

    // Auto init
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
            autoInit();
            initCopyButtons();
        });
    } else {
        autoInit();
        initCopyButtons();
    }
})();
