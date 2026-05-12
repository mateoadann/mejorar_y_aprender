# Mejorar y Aprender — CLAUDE.md

## Que es este proyecto

Repositorio personal de Mateo para proyectos de aprendizaje sobre IA, automatizaciones y desarrollo de software. Cada proyecto vive en su propia carpeta numerada con el formato `NNN-slug-del-proyecto`.

## Contexto del usuario

Mateo tiene un negocio de **automatizaciones y software a medida** para empresas, personas y departamentos dentro de empresas. Aprende mejor con **visualizaciones, diagramas y relaciones** — es una persona muy visual. Los proyectos de este repo son herramientas de aprendizaje que tambien funcionan como referencia de consulta para su trabajo diario.

## Estructura del repositorio

```
mejorar_y_aprender/
├── NNN-slug-del-proyecto/     ← cada proyecto en su carpeta numerada
├── mejorar_y_aprender.txt     ← archivo original de articulos fuente
├── README.md                  ← indice general del repo
└── CLAUDE.md                  ← este archivo
```

### Convenciones de nombres

- Carpetas de proyectos: `NNN-slug-del-proyecto` (ej: `001-curso-ai-agents`, `002-ui-components-atlas`)
- El numero es secuencial, con 3 digitos paddeados (001, 002, 003...)
- El slug es kebab-case, descriptivo, en espanol o ingles segun corresponda
- Antes de crear un nuevo proyecto, verificar el ultimo numero usado

## Proyectos existentes

### 001-curso-ai-agents
- **Que es**: Curso visual interactivo basado en 3 articulos sobre Claude Managed Agents, memoria de agentes (Cognee), y roadmap AI Engineer 2026
- **Stack**: HTML/CSS/JS vanilla, dark mode, sin dependencias externas
- **Estructura**: 4 modulos (managed-agents, memoria, roadmap, integrador), ~21 paginas HTML
- **API JS publica**: `window.CourseProgress` (localStorage key: `curso_ai_agents_progreso_v1`), `window.CourseAnimations`, `window.CourseDiagrams`
- **Paleta**: fondo `#0a0a0f`, texto `#e5e5e7`, acento primario `#ff6b35`, acento secundario `#6366f1`
- **Notas importantes**:
  - El articulo original dice "4 componentes" de Managed Agents — la doc oficial dice 3 primitivas (agent, environment, session). Corregido en el curso.
  - Pricing confirmado: $0.08/session-hour + tokens + $10/1000 web searches
  - Managed Agents lanzados 8 abril 2026 en public beta

### 002-ui-components-atlas
- **Que es**: Atlas enciclopedico de ~80 componentes UI con demos interactivas, anatomia Shadcn/Radix, vocabulario cross-framework, y prompts para coding agents
- **Stack**: HTML/CSS vanilla + Tailwind CSS via CDN, dark mode Shadcn
- **Estructura**: 9 modulos (fundamentos, inputs, navegacion, feedback, display, overlays, layout, patrones avanzados, cheatsheet), ~95 paginas HTML
- **Paleta Shadcn dark**: background `#09090b`, foreground `#fafafa`, muted `#27272a`, primary `#fafafa`, destructive `#7f1d1d`
- **API JS publica**: `window.AtlasIndex` (indice de componentes con buscador global via ⌘K), `window.AtlasDemos`, `window.AtlasNav`
- **Template**: `_template-component.html` para crear nuevas paginas de componentes
- **Estructura fija de cada pagina de componente**: Demo > Anatomia > Variantes > Estados > Vocabulario cross-framework > Do/Don't > Prompts > Alternativas > Referencias > Nav prev/next
- **Notas importantes**:
  - Los prompts para coding agents estan en INGLES (es el idioma que mejor entienden los agentes)
  - El Modulo 08 (Cheatsheet) tiene: tabla global buscable, decision tree con 6 grupos de preguntas, y biblioteca de 54 prompts

### 003-curso-vercel
- **Que es**: Curso teorico-visual sobre Vercel — que es, que servicios provee, como encaja en el ecosistema de agentes AI y por que un emprendedor deberia considerarlo para deploy. Cero codigo ejecutable, todo conceptual con diagramas.
- **Stack**: HTML/CSS/JS vanilla, dark mode inspirado en Vercel (negro + brand blue/violeta + gradiente AI rosa/violeta/azul)
- **Estructura**: 7 modulos (00-fundamentos-deploy, 01-que-es-vercel, 02-servicios, 03-vercel-ai, 04-flujo-deploy, 05-por-que-vercel, 06-cheatsheet), 29 paginas HTML total
- **Paleta**: bg `#000000`, text `#fafafa`, brand `#0070f3`, brand-2 `#7928ca`, ai-grad (rosa #ff0080 → violeta #7928ca → azul #0070f3), success `#0cce6b`, warning `#f5a623`
- **API JS publica**: `window.CourseProgress` (localStorage key `curso_vercel_progreso_v1`, total 29 paginas), `window.CourseUtils`
- **Notas importantes**:
  - Datos verificados con docs oficiales de Vercel 2026 (via context7 `/llmstxt/vercel_llms_txt`)
  - Pricing confirmado: Hobby $0 (non-commercial, 100GB BW + 1M edge + 4h CPU + 1M invocations), Pro $20/mes/seat con $20 credit incluido, Enterprise custom con 99.99% SLA
  - Vercel se auto-define hoy como "AI Cloud" — no es solo frontend hosting
  - Fluid Compute: NO cobra tiempo esperando APIs externas (DBs, APIs, LLMs) — diferenciador clave para apps AI
  - Productos AI cubiertos: v0, AI SDK (sdk.vercel.ai), AI Gateway, Vercel Agent (nuevo 2026), Vercel Sandbox (nuevo 2026)
  - Target de usuario: Mateo NUNCA hizo un deploy en la practica, tiene teoria — el curso es el puente teoria→practica
  - Los prompts del cheatsheet (M06) estan en INGLES (mismo patron que 002-ui-components-atlas)

### 004-agent-infrastructure-2026
- **Que es**: Curso integrador teorico-visual sobre infraestructura de agentes AI 2026. Sintetiza 4 articulos fuente (Knowledge Layer de Shann Holmberg, Agent Stack de Av1dlive, Knowledge Graphs optimization de techwith_ram, Claude Code session management de trq212). Cero codigo ejecutable, todo conceptual con diagramas ASCII, SVG inline y callouts.
- **Stack**: HTML/CSS/JS vanilla, dark mode tech
- **Estructura**: 8 modulos, 32 paginas HTML:
  - M00 Fundamentos (3 pag) — las 4 capas de infra, compounding
  - M01 Knowledge Layer (4 pag) — KBL + Brand Foundation, pipeline ingest, KBL vs RAG
  - M02 Agent Stack (5 pag) — anatomia, harness thin <200 LOC, context budget, progressive disclosure, salience scoring
  - M03 Memoria 4 capas (4 pag) — working, episodic, semantic, dream cycle
  - M04 Skills & Protocols (4 pag) — skill anatomy, skillforge, protocols (tool schemas + permissions), hooks lifecycle
  - M05 Knowledge Graphs (5 pag) — subgraph matching, SPO indexing, traversal (BFS/DFS/Dijkstra/A*/bidirectional), query planning, embeddings+bloom
  - M06 Claude Code Ops (4 pag) — context rot, branching point, rewind vs correct, subagents strategy
  - M07 Integrador (3 pag) — los 6 feedback loops, checklist mi propio stack, cheatsheet
- **Paleta**: bg `#0a0e1a`, bg-elev `#111827`, bg-card `#1a2332`, border `#2d3748`, text `#e5e7eb`, accent primary `#00d4ff` (cyan tech), accent secondary `#b794f4` (violeta), success `#10b981`, warning `#fbbf24`
- **API JS publica**: `window.CourseProgress` (localStorage key `curso_agent_infra_progreso_v1`, total 32 paginas), `window.CourseUtils.initPage(pageId, moduleId)` — el catalogo `MODULES` vive en `assets/js/utils.js` (breadcrumb y nav prev/next se resuelven automaticamente por pageId)
- **Notas importantes**:
  - CSS modular: `base.css` importa `main.css` + `components.css` + `diagrams.css`
  - Clases clave de componentes: `.ascii-diagram` con spans `.ascii-accent` (cyan) / `.ascii-accent-alt` (violeta) / `.ascii-dim` para diagramas ASCII coloreados, `.concept-grid` + `.concept-card`, `.layer-stack`, `.timeline`, `.comparison-table` con sides `.good`/`.bad`, `.callout-info/warning/violet/success/danger`, `.data-table` con `.table-wrap`
  - Patron de cada pagina: header sticky con breadcrumb auto + hero con eyebrow `MXX · Modulo` + 5-9 secciones con diagramas y callouts + mini-resumen de cierre en callout-violet + nav prev/next auto
  - Gotcha evitado: el catalogo MODULES en utils.js debe matchear los filenames reales (no slugs teoricos) para que prev/next funcione — sincronizado en consolidacion final
  - Fuentes principales: karpathy LLM wiki, Garry Tan 4-layer memory, Harrison Chase "Your Harness Your Memory", leapfrog triejoin (Veldhuizen 2014), TransE embeddings

### 005-ciclismo-ultradistancia
- **Que es**: Curso teorico-visual sobre ciclismo de ultradistancia (rutas +200km) para ciclistas con experiencia real (+10 rutas largas). Sintetiza ~32.000 palabras de research web verificable (papers PubMed, coaches San Millan/Seiler/Coggan/Friel, atletas Sehili/Wilcox/Kolbinger/Morton/Gemperle).
- **Stack**: HTML/CSS/JS vanilla, dark mode, dualismo metabolico cyan/naranja
- **Target especifico**: Mateo es ciclista practicante con +10 rutas de +200km, NO principiante. Curso da por sentado experiencia real y profundiza el "por que" de lo que ya intuye.
- **Estructura**: 9 modulos, 33 paginas HTML:
  - M00 Fundamentos (3 pag) — ultra vs road, pentagono 5 ejes, compounding
  - M01 Fisiologia (5 pag) — sustratos, FatMax, umbrales (LT1/LT2/MLSS/FTP/CP), VO2max-economia-umbral, bonk+drift+rabdo
  - M02 Entrenamiento (4 pag) — distribucion intensidad, debate Z2 San Millan vs Coggan, bloques+taper, strength+volumen
  - M03 Nutricion (4 pag) — carbs/h (escalera 60-90-120), gut training, hidratacion+sodio, fat adaptation+real food
  - M04 Equipamiento (4 pag) — geometria+fit, contact points, ruedas+tires, bikepacking setup
  - M05 Psicologia (4 pag) — Marcora vs Noakes, self-talk+metas, taper madness+hallucinations, toolkit mental
  - M06 Recovery (3 pag) — sleep multi-day, recovery tools, OTS spectrum
  - M07 Pacing y carreras (4 pag) — pacing por duracion, TCR+Tour Divide, PBP+Unbound+RAAM, setups ganadores
  - M08 Integrador (2 pag) — mi propio plan, cheatsheet maestro
- **Paleta dualismo crossover**: bg `#0a0e1a`, bg-elev `#111827`, bg-card `#1a2332`, border `#2d3748`, text `#e5e7eb`, accent primary cyan `#06b6d4` (glucogeno/energia rapida), accent secondary naranja `#f97316` (FatMax/grasa/endurance), success `#10b981`, warning `#fbbf24`, danger `#ef4444`. Cyan + naranja replica visualmente el crossover de Brooks/Mercier que es columna vertebral del curso.
- **API JS publica**: `window.CourseProgress` (localStorage key `curso_ciclismo_ultra_progreso_v1`, total 33 paginas), `window.CourseUtils.initPage(pageId, moduleId)`. Catalogo MODULES en `assets/js/utils.js` SINCRONIZADO con filenames reales (gotcha del 004 evitado).
- **Componente nuevo introducido**: `.race-card` con `.race-card-header`, `.race-card-name`, `.race-card-result`, `.race-card-meta`, `.race-card-specs`, `.race-card-spec-label`, `.race-card-spec-value`. Usado masivamente en M07-03 (setups ganadores) y como referencia en M04.
- **Pipeline de construccion (template para futuros cursos)**:
  - Fase 1 — Research: 7 agentes general-purpose en paralelo (1 por eje tematico), cada uno produce dossier 4000+ palabras con fuentes verificables guardado en engram
  - Fase 2 — Sintesis: 1 agente sintetizador consolida los 7 dossiers en outline maestro con decisiones arquitectonicas (modulos, paginas, paleta, hooks)
  - Fase 3 — Construccion: 1 agente por modulo en paralelo, cada uno con dossier especifico + reglas + template
  - Fase 4 — Consolidacion: actualizar README+CLAUDE.md, verificar catalogo MODULES vs filenames reales, commit
- **Hooks pedagogicos potentes (verificables)**:
  - Experimento Marcora 2014 caras subliminales 16ms: +178s/+13% time-to-exhaustion (Frontiers in Human Neuroscience)
  - Caso Camaron PMC9025025: 10358km en 24 dias, deep sleep 27%→46% (cuerpo prioriza reparacion sobre REM)
  - Robin Gemperle Tour Divide 2025: 11d 19h 14m, primer sub-12 days en historia
  - Strasser RAAM 2014 record INVICTO: 7d 15h 56m
  - Burke 2017 race walkers: LCHF empeora economia O2 -6.6%
- **Debates explicitos marcados (no escondidos)**:
  - Z2: San Millan (lactato 1.7-1.9 mmol/L) vs Coggan (%FTP 56-75)
  - Effort perception: Marcora (psicobiologico) vs Noakes (Central Governor)
  - Fat adaptation: Burke 2017 vs Volek/Phinney (matiz: sirve para metabolic flexibility, NO para racing)
  - Ratio glucosa:fructosa: 2:1 (Jeukendrup clasico) vs 1:0.8 (Hearris 2022)
  - Polarized vs pyramidal en elite
- **Reglas pedagogicas**: voseo rioplatense, palabras sin traduccion literal al espanol quedan en INGLES con `<em>` (FatMax, FTP, bonk, cardiac drift, gut training, sweat sodium, self-supported, etc.), distribucion 50/50 tecnico vs blando, debates abiertos mostrados side-by-side (no elegir bando)

## Reglas para crear nuevos proyectos

1. Crear carpeta con el siguiente numero disponible: `NNN-slug-del-proyecto/`
2. Cada proyecto es INDEPENDIENTE (su propio HTML/CSS/JS o stack que corresponda)
3. Preferir dark mode y diseno visual moderno
4. El usuario aprende mejor con graficos, diagramas, timelines, relaciones visuales — no muros de texto
5. Si el proyecto es un curso/referencia, incluir ejercicios practicos cuando sea posible
6. Actualizar el README.md del repo con el nuevo proyecto
7. Si el contenido viene de articulos, verificar datos contra fuentes oficiales y marcar correcciones

## Reglas de codigo

- HTML/CSS/JS vanilla por defecto. Tailwind via CDN es aceptable cuando aporta valor (como en el atlas que replica Shadcn).
- NO usar frameworks JS (React, Vue, etc) a menos que el proyecto lo requiera explicitamente
- NO usar emojis en el contenido
- Espanol rioplatense en texto visible ("podes", "tenes", "aca", "bien", "dale")
- Conventional commits en ingles para git
- Mobile responsive siempre

## Sobre las sesiones de trabajo

- Los proyectos suelen construirse con sub-agentes en paralelo (uno por modulo/seccion)
- Patron post-construccion: (1) verificar archivos, (2) actualizar indices/registros, (3) actualizar home/README, (4) commit
- Guardar descubrimientos importantes en engram (project: "mejorar_y_aprender")
