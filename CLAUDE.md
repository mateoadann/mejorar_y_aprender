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
