/* ==========================================================================
   animations.js — Activa clases de animación al entrar al viewport usando
   IntersectionObserver. Respeta prefers-reduced-motion.

   Uso en HTML:
     <div class="fade-in">...</div>
     <div class="slide-up" data-animate-delay="200">...</div>
     <div class="slide-in-left" data-animate-delay="400">...</div>

   Clases soportadas automáticamente:
     .fade-in, .slide-up, .slide-in-left, .slide-in-right, .draw-line,
     .draw-line-svg

   data-animate-delay: retraso en ms antes de aplicar la animación.
   ========================================================================== */

(function () {
    "use strict";

    const ANIMATION_SELECTORS = [
        ".fade-in",
        ".slide-up",
        ".slide-in-left",
        ".slide-in-right",
        ".draw-line",
        ".draw-line-svg",
    ].join(",");

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
    ).matches;

    /**
     * Aplica la clase .visible a un elemento respetando data-animate-delay.
     */
    function reveal(el) {
        const delay = parseInt(el.dataset.animateDelay, 10) || 0;
        if (delay > 0) {
            el.style.setProperty("--animate-delay", delay + "ms");
        }
        // Force reflow no es necesario: la variable y la clase pueden aplicarse juntas.
        el.classList.add("visible");
    }

    /**
     * Inicializa el IntersectionObserver y observa todos los elementos con
     * las clases de animación soportadas.
     */
    function initAnimations() {
        const elements = document.querySelectorAll(ANIMATION_SELECTORS);

        // Si el usuario prefiere menos movimiento: mostrar todo inmediatamente.
        if (prefersReducedMotion) {
            elements.forEach((el) => el.classList.add("visible"));
            return;
        }

        // Fallback para navegadores sin IntersectionObserver.
        if (!("IntersectionObserver" in window)) {
            elements.forEach((el) => el.classList.add("visible"));
            return;
        }

        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        reveal(entry.target);
                        obs.unobserve(entry.target);
                    }
                });
            },
            {
                root: null,
                rootMargin: "0px 0px -10% 0px",
                threshold: 0.1,
            },
        );

        elements.forEach((el) => observer.observe(el));
    }

    // API pública para re-escanear cuando se inyecta contenido nuevo.
    window.CourseAnimations = {
        init: initAnimations,
        reveal: reveal,
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initAnimations);
    } else {
        initAnimations();
    }
})();
