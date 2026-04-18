# 004 · Agent Infrastructure 2026

Curso visual integrador sobre infraestructura de agentes AI en 2026: **knowledge layer**, **agent stack**, **memoria de 4 capas**, **skills & protocols**, **knowledge graphs** y **Claude Code operations**. Cero codigo ejecutable; todo conceptual con diagramas y relaciones visuales.

Cuarto proyecto del repo [`mejorar_y_aprender`](../README.md).

## Que vas a aprender

8 modulos, 32 paginas:

| # | Modulo | Paginas | De que va |
|---|--------|---------|-----------|
| M00 | Fundamentos | 3 | Las 4 capas de infraestructura. Por que un LLM solo no alcanza. |
| M01 | Knowledge Layer | 4 | KBL (Knowledge-Based Layer) + Brand Foundation. Tu moat real. |
| M02 | Agent Stack | 5 | Harness, context budget, progressive disclosure. |
| M03 | Memoria 4 capas | 4 | Working, episodic, semantic, personal. |
| M04 | Skills & Protocols | 4 | Self-rewrite, permisos, hooks. |
| M05 | Knowledge Graphs | 5 | Indexing, traversal, embeddings. |
| M06 | Claude Code Ops | 4 | Context rot, rewind, subagents. |
| M07 | Integrador | 3 | Los 6 loops, tu propio stack, cheatsheet final. |

## Stack

- HTML / CSS / JS vanilla
- Sin build step, sin dependencias externas, sin framework JS
- Dark mode tech (azul profundo + cyan + violeta)
- Mobile responsive

## Estructura de carpetas

```
004-agent-infrastructure-2026/
├── index.html                 ← home del curso
├── _template-page.html        ← template para paginas nuevas
├── README.md                  ← este archivo
├── assets/
│   ├── css/
│   │   ├── base.css           ← entry point (importa los tres archivos de abajo)
│   │   ├── main.css           ← variables, reset, tipografia, layout
│   │   ├── components.css     ← cards, botones, callouts, code blocks
│   │   └── diagrams.css       ← diagramas, timelines, layer-stacks
│   └── js/
│       ├── progress.js        ← window.CourseProgress (localStorage)
│       └── utils.js           ← window.CourseUtils (initPage, diagrams, highlight)
├── m00-fundamentos/           ← 3 paginas
├── m01-knowledge-layer/       ← 4 paginas
├── m02-agent-stack/           ← 5 paginas
├── m03-memoria/               ← 4 paginas
├── m04-skills-protocols/      ← 4 paginas
├── m05-knowledge-graphs/      ← 5 paginas
├── m06-claude-code-ops/       ← 4 paginas
└── m07-integrador/            ← 3 paginas
```

## API publica JS

### `window.CourseProgress`

- LocalStorage key: `curso_agent_infra_progreso_v1`
- `markVisited(pageId)` marca una pagina como vista
- `isVisited(pageId)` devuelve boolean
- `getProgress()` devuelve `{ visited, total: 32, percentage, pages }`
- `getModuleProgress(moduleId)` porcentaje 0-100 de un modulo
- `reset()` borra todo el progreso

### `window.CourseUtils`

- `initPage(pageId, moduleId)` marca visitada + renderiza breadcrumb + nav prev/next + pill de progreso
- `createDiagram(svgConfig)` helper para construir SVGs inline con nodos + aristas
- `highlightCode(codeElement)` resaltado simple (python/bash/js)
- `toggleTheme()` / `applyTheme(name)` toggle opcional (default dark)

## Paleta

| Variable | Hex | Uso |
|----------|-----|-----|
| `--bg` | `#0a0e1a` | fondo base |
| `--bg-elevated` | `#111827` | cards, bloques |
| `--bg-raised` | `#161d2e` | hover |
| `--border` | `#1f2937` | bordes sutiles |
| `--text` | `#e5e7eb` | texto base |
| `--text-muted` | `#9ca3af` | texto secundario |
| `--accent-cyan` | `#00d4ff` | acento primario |
| `--accent-violet` | `#b794f4` | acento secundario |
| `--success` | `#10b981` | ok, completo |
| `--warning` | `#fbbf24` | cuidado |
| `--danger` | `#ef4444` | error, no-hagas-esto |

## Como correrlo localmente

Abri `index.html` directamente en el navegador. No requiere server, ni build, ni instalacion.

```bash
open index.html
# o en linux
xdg-open index.html
```

Tip: si queres que funcione todo el progreso entre tabs tambien, podes servirlo con cualquier server simple:

```bash
python3 -m http.server 8000
# despues abri http://localhost:8000
```

## Fuentes del contenido

Los 4 articulos que integramos en este curso:

1. **Karpathy — knowledge layer as the new moat**: por que la capa de conocimiento es el verdadero diferenciador en una era de modelos commodity. Base del M01.
2. **Garry Tan — the modern agent stack 2026**: capas del stack, harness, context budget, progressive disclosure. Base del M02, M03 y M04.
3. **Knowledge Graphs — blazing-fast optimization**: algoritmos eficientes sobre grafos (random walks, PageRank, pathfinding). Base del M05.
4. **Anthropic — Claude Code session management + 1M context**: como Claude Code maneja sesiones largas, compactacion, rewind, subagents y worktrees. Base del M06.

El M07 integra las cuatro fuentes en una arquitectura completa, con un cheatsheet final.

## Convenciones

- Espanol rioplatense (voseo): "podes", "tenes", "dale".
- Sin emojis en el contenido visible.
- Nada de frameworks JS: cero React, cero Vue.
- HTML valida (DOCTYPE, `lang="es"`, charset utf-8, viewport).
- Mobile-first CSS; desktop se activa con `@media (min-width: 768px)`.
- Los prompts para coding agents (si aparecen en el cheatsheet) van en ingles, que es lo que mejor entienden los agentes.

## Estado

Completo. Las 32 paginas estan escritas, el home enlaza a los primeros archivos reales de cada modulo, y el catalogo `MODULES` de `assets/js/utils.js` esta sincronizado con los filenames reales (breadcrumb y prev/next automaticos).
