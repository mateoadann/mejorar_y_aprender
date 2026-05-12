/* ============================================
   utils.js — catalogo MODULES + helpers
   API publica:
     window.CourseUtils.initPage(pageId, moduleId)
     window.MODULES (catalogo)
   Construye DOM con createElement (no innerHTML).
   ============================================ */

(function () {
  'use strict';

  const MODULES = [
    {
      id: 'M00', slug: 'M00-fundamentos', code: 'M00',
      title: 'Fundamentos integradores',
      desc: 'Antes de los sistemas alineamos el mapa: que hace especial al ultra y por que los 5 ejes se necesitan entre si.',
      pages: [
        { slug: '00-bienvenida',     title: 'Bienvenida y como usar este curso' },
        { slug: '01-ultra-vs-road',  title: 'Que distingue al ultra de una road race' },
        { slug: '02-los-cinco-ejes', title: 'El mapa de los 5 ejes' }
      ]
    },
    {
      id: 'M01', slug: 'M01-fisiologia', code: 'M01',
      title: 'Fisiologia del ultra',
      desc: 'El motor: que sustratos quemas, donde estan tus umbrales y por que el ultra es una guerra de fat oxidation.',
      pages: [
        { slug: '00-sustratos',              title: 'Glucogeno, grasa y el crossover' },
        { slug: '01-fatmax-y-zonas',         title: 'FatMax, Z2 y la maquina mitocondrial' },
        { slug: '02-umbrales',               title: 'LT1, LT2, MLSS, FTP, CP' },
        { slug: '03-vo2max-economia-umbral', title: 'VO2max, economia, umbral' },
        { slug: '04-bonk-drift-rabdo',       title: 'Que falla bajo carga' }
      ]
    },
    {
      id: 'M02', slug: 'M02-entrenamiento', code: 'M02',
      title: 'Entrenamiento y periodizacion',
      desc: 'Como se construye un motor para 12+ horas: distribucion de intensidad, debate Z2, taper y strength.',
      pages: [
        { slug: '00-distribucion-intensidad',     title: 'Polarized, pyramidal, Norwegian' },
        { slug: '01-debate-z2-san-millan-coggan', title: 'Debate Z2: San Millan vs Coggan' },
        { slug: '02-bloques-y-taper',             title: 'Bloques, deload y taper' },
        { slug: '03-strength-y-volumen-ultra',    title: 'Strength training y volumen' }
      ]
    },
    {
      id: 'M03', slug: 'M03-nutricion', code: 'M03',
      title: 'Nutricion e hidratacion',
      desc: '60 → 90 → 120 g/h. Gut training, sodio individual y por que los pros comen real food.',
      pages: [
        { slug: '00-carbs-hora',              title: 'La escalera 60-90-120 g/h' },
        { slug: '01-gut-training',            title: 'Entrenar la panza' },
        { slug: '02-hidratacion-sodio',       title: 'Sweat sodium y EAH' },
        { slug: '03-fat-adaptation-real-food', title: 'Fat adaptation y real food' }
      ]
    },
    {
      id: 'M04', slug: 'M04-equipamiento', code: 'M04',
      title: 'Equipamiento y setup',
      desc: 'Geometria endurance, contact points sin saddle sores y rolling resistance — la bici que termina.',
      pages: [
        { slug: '00-geometria-fit',     title: 'Geometria y fitting' },
        { slug: '01-contact-points',    title: 'Sillin, manillar, pedales' },
        { slug: '02-ruedas-tires',      title: 'Tubeless y rolling resistance' },
        { slug: '03-bikepacking-setup', title: 'Setup bikepacking' }
      ]
    },
    {
      id: 'M05', slug: 'M05-psicologia', code: 'M05',
      title: 'Psicologia y manejo mental',
      desc: 'En +12h la mente decide tanto como el cuerpo. Marcora, Noakes, mantras y la ventana 2am-6am.',
      pages: [
        { slug: '00-modelos-marcora-noakes',       title: 'Marcora vs Central Governor' },
        { slug: '01-self-talk-y-metas',            title: 'Self-talk, mantras, goal-setting' },
        { slug: '02-taper-madness-hallucinations', title: 'Taper madness y hallucinations' },
        { slug: '03-toolkit-mental',               title: 'Toolkit mental practico' }
      ]
    },
    {
      id: 'M06', slug: 'M06-recovery', code: 'M06',
      title: 'Recovery y sueño',
      desc: 'Multi-day sleep collapse, micronaps de 20 min y el espectro OTS. Como no destruirte.',
      pages: [
        { slug: '00-sleep-multi-day', title: 'Sueno multi-day y micronaps' },
        { slug: '01-recovery-tools',  title: 'CWI, sauna, sleep banking' },
        { slug: '02-ots-spectrum',    title: 'Overreach → NFOR → OTS' }
      ]
    },
    {
      id: 'M07', slug: 'M07-pacing-carreras', code: 'M07',
      title: 'Pacing y carreras reales',
      desc: 'Pacing por duracion + 4 carreras icono desarmadas con setups ganadores.',
      pages: [
        { slug: '00-pacing-por-duracion', title: 'Pacing por duracion' },
        { slug: '01-tcr-tour-divide',     title: 'TCR y Tour Divide: era Gemperle' },
        { slug: '02-pbp-unbound-raam',    title: 'PBP, Unbound XL, RAAM' },
        { slug: '03-setups-ganadores',    title: 'Setups ganadores desarmados' }
      ]
    },
    {
      id: 'M08', slug: 'M08-cheatsheet', code: 'M08',
      title: 'Integrador / cheatsheet',
      desc: 'Tu propio plan: pentagono cerrado, decision-trees y referencia rapida.',
      pages: [
        { slug: '00-mi-propio-plan', title: 'Diseña tu ultra' },
        { slug: '01-cheatsheet',     title: 'Cheatsheet maestro' }
      ]
    }
  ];

  function buildFlat() {
    const out = [];
    MODULES.forEach(m => {
      m.pages.forEach(p => {
        out.push({
          pageId: m.id + '-' + p.slug,
          moduleId: m.id,
          moduleSlug: m.slug,
          moduleTitle: m.title,
          moduleCode: m.code,
          slug: p.slug,
          title: p.title,
          href: '../' + m.slug + '/' + p.slug + '.html'
        });
      });
    });
    return out;
  }
  const FLAT = buildFlat();
  const TOTAL_PAGES = FLAT.length;

  function findIndex(pageId) { return FLAT.findIndex(x => x.pageId === pageId); }
  function getModule(moduleId) { return MODULES.find(m => m.id === moduleId); }

  function el(tag, opts) {
    const node = document.createElement(tag);
    if (!opts) return node;
    if (opts.class) node.className = opts.class;
    if (opts.text != null) node.textContent = opts.text;
    if (opts.href) node.setAttribute('href', opts.href);
    if (opts.attrs) {
      Object.keys(opts.attrs).forEach(k => node.setAttribute(k, opts.attrs[k]));
    }
    if (opts.children) {
      opts.children.forEach(c => { if (c) node.appendChild(c); });
    }
    return node;
  }

  function clearNode(n) {
    while (n.firstChild) n.removeChild(n.firstChild);
  }

  function renderBreadcrumb(target, pageId, moduleId) {
    const m = getModule(moduleId);
    if (!m) return;
    clearNode(target);
    const cur = FLAT.find(x => x.pageId === pageId);

    target.appendChild(el('a', { href: '../index.html', text: 'Curso' }));
    target.appendChild(el('span', { class: 'breadcrumb-sep', text: '/' }));
    target.appendChild(el('a', { href: '../' + m.slug + '/index.html', text: m.code + ' · ' + m.title }));
    target.appendChild(el('span', { class: 'breadcrumb-sep', text: '/' }));
    target.appendChild(el('span', { class: 'breadcrumb-current', text: cur ? cur.title : '' }));
  }

  function renderPageNav(target, pageId) {
    const idx = findIndex(pageId);
    if (idx === -1) return;
    clearNode(target);
    const prev = idx > 0 ? FLAT[idx - 1] : null;
    const next = idx < FLAT.length - 1 ? FLAT[idx + 1] : null;

    if (prev) {
      target.appendChild(el('a', {
        class: 'page-nav-link prev',
        href: prev.href,
        children: [
          el('span', { class: 'page-nav-link-label', text: '← Anterior' }),
          el('span', { class: 'page-nav-link-title', text: prev.title })
        ]
      }));
    } else {
      target.appendChild(el('span', { class: 'page-nav-link disabled' }));
    }

    if (next) {
      target.appendChild(el('a', {
        class: 'page-nav-link next',
        href: next.href,
        children: [
          el('span', { class: 'page-nav-link-label', text: 'Siguiente →' }),
          el('span', { class: 'page-nav-link-title', text: next.title })
        ]
      }));
    } else {
      target.appendChild(el('span', { class: 'page-nav-link disabled' }));
    }
  }

  function initPage(pageId, moduleId) {
    const bc = document.querySelector('[data-breadcrumb]');
    if (bc) renderBreadcrumb(bc, pageId, moduleId);

    const nav = document.querySelector('[data-page-nav]');
    if (nav) renderPageNav(nav, pageId);

    const pill = document.querySelector('[data-progress-pill]');
    if (pill && window.CourseProgress) {
      window.CourseProgress.markVisited(pageId);
      const visited = window.CourseProgress.getVisitedCount();
      pill.textContent = visited + ' / ' + TOTAL_PAGES;
    }
  }

  window.MODULES = MODULES;
  window.CourseUtils = {
    initPage,
    findIndex,
    getModule,
    flat: FLAT,
    totalPages: TOTAL_PAGES,
    el,
    clearNode
  };
})();
