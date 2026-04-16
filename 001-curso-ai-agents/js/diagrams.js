/* ==========================================================================
   diagrams.js — Helper base para diagramas interactivos

   Este archivo es un stub intencional: los módulos del curso lo extienden
   con diagramas específicos (arquitectura de managed agents, memoria
   de agentes, etc).

   Cómo añadir un diagrama desde un módulo:
   ------------------------------------------------------------------------
   1. Marcá el contenedor con data-diagram="mi-diagrama-id" en el HTML:
        <div data-diagram="mi-arquitectura"></div>

   2. Registrá un renderer desde el JS del módulo:
        CourseDiagrams.register("mi-arquitectura", function (el) {
            // Manipular el DOM dentro de `el` para dibujar el diagrama.
            // Podés crear .diagram-box y .arrow-line programáticamente.
        });

   3. Llamá a CourseDiagrams.initDiagrams() (se hace automáticamente al
      cargar el DOM, pero si inyectás contenido dinámico, hay que re-llamar).
   ========================================================================== */

(function () {
    "use strict";

    const registry = new Map();

    /**
     * Registra un renderer para un tipo de diagrama.
     * @param {string} name — identificador único del diagrama
     * @param {(el: HTMLElement) => void} renderer
     */
    function register(name, renderer) {
        if (typeof renderer !== "function") return;
        registry.set(name, renderer);
    }

    /**
     * Ejecuta todos los renderers registrados sobre los contenedores
     * que tengan data-diagram coincidente. Ignora los ya renderizados.
     */
    function initDiagrams() {
        document.querySelectorAll("[data-diagram]").forEach((el) => {
            if (el.dataset.diagramRendered === "true") return;
            const name = el.dataset.diagram;
            const renderer = registry.get(name);
            if (renderer) {
                try {
                    renderer(el);
                    el.dataset.diagramRendered = "true";
                } catch (err) {
                    console.error(
                        "Error al renderizar el diagrama '" + name + "':",
                        err,
                    );
                }
            }
        });
    }

    /**
     * Helper: crea un nodo .diagram-box con contenido y clases opcionales.
     * @param {string} text
     * @param {{ label?: string, variant?: "primary"|"secondary" }} [opts]
     * @returns {HTMLDivElement}
     */
    function createBox(text, opts) {
        const options = opts || {};
        const box = document.createElement("div");
        box.className = "diagram-box";
        if (options.variant === "primary") box.classList.add("primary");
        if (options.variant === "secondary") box.classList.add("secondary");
        if (options.label) {
            const label = document.createElement("span");
            label.className = "label";
            label.textContent = options.label;
            box.appendChild(label);
        }
        const content = document.createElement("span");
        content.textContent = text;
        box.appendChild(content);
        return box;
    }

    /**
     * Helper: crea una flecha como span.
     * @param {"right"|"left"|"down"|"up"|"bi"} [dir]
     * @returns {HTMLSpanElement}
     */
    function createArrow(dir) {
        const arrow = document.createElement("span");
        arrow.className = "arrow arrow-" + (dir || "right");
        return arrow;
    }

    // API pública
    window.CourseDiagrams = {
        register: register,
        initDiagrams: initDiagrams,
        createBox: createBox,
        createArrow: createArrow,
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initDiagrams);
    } else {
        initDiagrams();
    }
})();
