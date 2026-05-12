/* ============================================================
   Curso 005 · Nutricion Ciclismo Ruta — utils & progress
   SEGURIDAD: todos los datos inyectados con innerHTML provienen
   de constantes hardcodeadas en este archivo (MODULES). No hay
   entrada de usuario ni fuente externa. No es un vector XSS.
   ============================================================ */

(function () {
  'use strict';

  // Catalogo MODULES — debe matchear filenames reales
  const MODULES = [
    {
      id: 'm00',
      num: '00',
      title: 'Fundamentos',
      desc: 'Por qué la nutrición es performance en ciclismo profesional. El proyecto UCI Sports Nutrition. Las 3 componentes del gasto energético.',
      path: 'm00-fundamentos/',
      pages: [
        { id: '00-intro', file: '00-intro.html', title: 'La nutrición como factor de performance' },
        { id: '01-uci-project', file: '01-uci-project.html', title: 'UCI Sports Nutrition Project' },
        { id: '02-gasto-energetico', file: '02-gasto-energetico.html', title: 'Las 3 componentes del gasto energético' },
      ],
    },
    {
      id: 'm01',
      num: '01',
      title: 'Demandas del ciclismo pro',
      desc: 'Grand Tours, Monuments, 1-day races. Por qué el racing es estocástico. Power-to-mass ratio. Cómo cambió la velocidad del pelotón.',
      path: 'm01-demandas/',
      pages: [
        { id: '00-tipos-carrera', file: '00-tipos-carrera.html', title: 'Grand Tours, Monuments y 1-day' },
        { id: '01-racing-estocastico', file: '01-racing-estocastico.html', title: 'Racing estocástico y el peloton' },
        { id: '02-power-to-mass', file: '02-power-to-mass.html', title: 'Power-to-mass ratio' },
      ],
    },
    {
      id: 'm02',
      num: '02',
      title: 'Metabolismo energético',
      desc: 'CHO vs grasa como fuel. Rol de la proteína. Balance energético. Gasto 5,000–9,000 kcal/día en Grand Tours.',
      path: 'm02-metabolismo/',
      pages: [
        { id: '00-cho-vs-grasa', file: '00-cho-vs-grasa.html', title: 'Carbohidratos vs grasas como fuel' },
        { id: '01-proteina', file: '01-proteina.html', title: 'Proteína: cuánta y cuándo' },
        { id: '02-balance-energetico', file: '02-balance-energetico.html', title: 'Balance energético en Grand Tours' },
        { id: '03-gasto-grand-tour', file: '03-gasto-grand-tour.html', title: 'Anatomía del gasto en un Grand Tour' },
      ],
    },
    {
      id: 'm03',
      num: '03',
      title: 'La revolución del carbohidrato',
      desc: 'De 23 g/h (1989) a 120+ g/h (2026). Glucosa + fructosa. Múltiples transportadores. Training the gut.',
      path: 'm03-carbohidrato/',
      pages: [
        { id: '00-timeline', file: '00-timeline.html', title: 'Timeline: 40 años de CHO en ruta' },
        { id: '01-multiple-transport', file: '01-multiple-transport.html', title: 'Multiple transportable carbs' },
        { id: '02-fuentes-cho', file: '02-fuentes-cho.html', title: 'Fuentes: bebidas, geles, sólidos, hidrogeles' },
        { id: '03-training-gut', file: '03-training-gut.html', title: 'Training the gut' },
      ],
    },
    {
      id: 'm04',
      num: '04',
      title: 'Estrategia de carrera',
      desc: 'Fuel for work required. 1-day vs stage race. Cuándo comer qué. Tácticas de peloton y aggressive racing.',
      path: 'm04-estrategia/',
      pages: [
        { id: '00-fuel-for-work', file: '00-fuel-for-work.html', title: 'Fuel for the work required' },
        { id: '01-1day-vs-stage', file: '01-1day-vs-stage.html', title: '1-day vs stage race' },
        { id: '02-plan-carrera', file: '02-plan-carrera.html', title: 'Plan de carrera: antes, durante, después' },
      ],
    },
    {
      id: 'm05',
      num: '05',
      title: 'Hidratación y sodio',
      desc: 'Sudor y déficit. Umbral <2% BM. El mito del sodio. Hiperhidratación. Pre-cooling y condiciones extremas.',
      path: 'm05-hidratacion/',
      pages: [
        { id: '00-sudor-deficit', file: '00-sudor-deficit.html', title: 'Sudor, déficit y el umbral del 2%' },
        { id: '01-sodio', file: '01-sodio.html', title: 'El mito del sodio' },
        { id: '02-condiciones-extremas', file: '02-condiciones-extremas.html', title: 'Calor, altitud y pre-cooling' },
      ],
    },
    {
      id: 'm06',
      num: '06',
      title: 'Body mass management',
      desc: 'Power-to-mass ratio. Making weight con low-fiber/low-residue. Riesgos de RED-S y low energy availability.',
      path: 'm06-body-mass/',
      pages: [
        { id: '00-power-to-mass-bm', file: '00-power-to-mass-bm.html', title: 'Por qué cada kilo importa' },
        { id: '01-making-weight', file: '01-making-weight.html', title: 'Making weight: low-fiber y fluid shifts' },
        { id: '02-riesgos', file: '02-riesgos.html', title: 'Riesgos: RED-S y low energy availability' },
      ],
    },
    {
      id: 'm07',
      num: '07',
      title: 'Integrador y cheatsheet',
      desc: 'Tablas 2 y 3 del paper interactivas. Decision tree. Checklist completo para preparar una carrera.',
      path: 'm07-integrador/',
      pages: [
        { id: '00-tablas-cho', file: '00-tablas-cho.html', title: 'Tablas de CHO diario (hombres y mujeres)' },
        { id: '01-decision-tree', file: '01-decision-tree.html', title: 'Decision tree: ¿cuánto como hoy?' },
        { id: '02-cheatsheet', file: '02-cheatsheet.html', title: 'Cheatsheet integrador' },
      ],
    },
  ];

  const TOTAL_PAGES = MODULES.reduce((sum, m) => sum + m.pages.length, 0);
  const STORAGE_KEY = 'curso_nutricion_ciclismo_progreso_v1';

  const FLAT_PAGES = [];
  MODULES.forEach((m) => {
    m.pages.forEach((p) => {
      FLAT_PAGES.push({
        ...p,
        moduleId: m.id,
        moduleNum: m.num,
        moduleTitle: m.title,
        relPath: m.path + p.file,
        fullId: m.id + '/' + p.id,
      });
    });
  });

  const CourseProgress = {
    getAll() {
      try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
      catch (e) { return {}; }
    },
    saveAll(data) {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) {}
    },
    markVisited(pageId) {
      const all = this.getAll();
      all[pageId] = { visited: true, ts: Date.now() };
      this.saveAll(all);
    },
    isVisited(pageId) { return !!this.getAll()[pageId]; },
    totalVisited() { return Object.keys(this.getAll()).length; },
    percent() { return Math.min(100, Math.round((this.totalVisited() / TOTAL_PAGES) * 100)); },
    reset() { try { localStorage.removeItem(STORAGE_KEY); } catch (e) {} },
  };

  function findPageIndex(fullId) { return FLAT_PAGES.findIndex((p) => p.fullId === fullId); }
  function findModule(moduleId) { return MODULES.find((m) => m.id === moduleId); }

  // Safe DOM creation helpers (avoid innerHTML with dynamic content)
  function el(tag, attrs, children) {
    const n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach((k) => {
      if (k === 'class') n.className = attrs[k];
      else if (k === 'text') n.textContent = attrs[k];
      else n.setAttribute(k, attrs[k]);
    });
    if (children) children.forEach((c) => { if (c) n.appendChild(c); });
    return n;
  }

  function buildHeader(pageCtx) {
    const header = document.querySelector('[data-site-header]');
    if (!header) return;
    header.textContent = '';

    const inner = el('div', { class: 'site-header-inner' });
    const brandHref = pageCtx ? '../index.html' : 'index.html';
    const brand = el('a', { href: brandHref, class: 'site-brand' }, [
      el('span', { class: 'site-brand-logo', text: 'N' }),
      el('span', { text: 'Nutrición · Ciclismo de Ruta' }),
    ]);
    inner.appendChild(brand);

    if (pageCtx) {
      const m = findModule(pageCtx.moduleId);
      const full = pageCtx.moduleId + '/' + pageCtx.pageId;
      const p = FLAT_PAGES.find((fp) => fp.fullId === full);
      if (m && p) {
        const nav = el('nav', { class: 'site-breadcrumb' }, [
          el('a', { href: '../index.html', text: 'Inicio' }),
          el('span', { class: 'sep', text: '/' }),
          el('span', { text: 'M' + m.num }),
          el('span', { class: 'sep', text: '/' }),
          el('span', { text: p.title }),
        ]);
        inner.appendChild(nav);
      }
    }
    header.appendChild(inner);
  }

  function buildPrevNext(pageCtx) {
    const container = document.querySelector('[data-page-nav]');
    if (!container) return;
    container.textContent = '';
    const fullId = pageCtx.moduleId + '/' + pageCtx.pageId;
    const idx = findPageIndex(fullId);
    if (idx === -1) return;

    const prev = idx > 0 ? FLAT_PAGES[idx - 1] : null;
    const next = idx < FLAT_PAGES.length - 1 ? FLAT_PAGES[idx + 1] : null;

    function makeBtn(page, kind) {
      const href = '../' + page.relPath;
      const labelTxt = kind === 'prev'
        ? '← Anterior · M' + page.moduleNum
        : 'Siguiente · M' + page.moduleNum + ' →';
      return el('a', { href: href, class: 'page-nav-btn ' + kind }, [
        el('div', { class: 'label', text: labelTxt }),
        el('div', { class: 'title', text: page.title }),
      ]);
    }

    if (prev) container.appendChild(makeBtn(prev, 'prev'));
    else container.appendChild(el('span', { class: 'page-nav-btn prev disabled' }, [
      el('div', { class: 'label', text: 'Inicio' })
    ]));

    if (next) container.appendChild(makeBtn(next, 'next'));
    else {
      container.appendChild(el('a', { href: '../index.html', class: 'page-nav-btn next' }, [
        el('div', { class: 'label', text: 'Fin del curso ↩' }),
        el('div', { class: 'title', text: 'Volver al inicio' }),
      ]));
    }
  }

  function buildProgressBar() {
    const bar = document.querySelector('[data-progress-bar]');
    if (!bar) return;
    bar.textContent = '';
    const fill = el('div', { class: 'progress-bar-fill' });
    fill.style.width = CourseProgress.percent() + '%';
    bar.appendChild(fill);
  }

  function buildFooter() {
    const footer = document.querySelector('[data-site-footer]');
    if (!footer) return;
    footer.textContent = '';
    const container = el('div', { class: 'container' });

    const p1 = el('p', null, [
      document.createTextNode('Curso teórico-visual basado en Jeukendrup et al. (2026), '),
      el('em', { text: 'UCI Sports Nutrition Project: Race Nutrition for Road Cycling' }),
      document.createTextNode(', '),
      el('a', { href: 'https://doi.org/10.1123/ijsnem.2025-0239', target: '_blank', rel: 'noopener', text: 'IJSNEM 36(3): 215–232' }),
      document.createTextNode('.'),
    ]);
    const p2 = el('p', null, [
      document.createTextNode('Parte del repo '),
      el('a', { href: '../../README.md', text: 'mejorar_y_aprender' }),
      document.createTextNode('.'),
    ]);
    container.appendChild(p1);
    container.appendChild(p2);
    footer.appendChild(container);
  }

  function initPage(pageCtx) {
    if (pageCtx) {
      CourseProgress.markVisited(pageCtx.moduleId + '/' + pageCtx.pageId);
      buildHeader(pageCtx);
      buildPrevNext(pageCtx);
    } else {
      buildHeader(null);
    }
    buildProgressBar();
    buildFooter();
  }

  window.CourseProgress = CourseProgress;
  window.CourseUtils = { MODULES, FLAT_PAGES, TOTAL_PAGES, initPage, findModule };
})();
