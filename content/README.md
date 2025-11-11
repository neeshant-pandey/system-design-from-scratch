# Content Directory Structure

This directory contains all blog content for the System Design curriculum, organized in a 3-level hierarchy:

## Hierarchy
- **Level 1: Sections** (11 sections)
- **Level 2: Chapters** (50+ chapters)
- **Level 3: Topics** (200+ topics)

## Folder Naming Convention

```
content/
├── section-{n}-{section-name-slug}/
│   ├── ch-{section}-{chapter}-{chapter-name-slug}/
│   │   ├── {topic-name-slug}.tex
│   │   ├── {topic-name-slug}.tex
│   │   └── ...
│   └── ...
└── ...
```

### Example:
```
content/
├── section-1-foundations/
│   ├── ch-1-1-introduction-to-system-design/
│   │   ├── what-is-system-design.tex
│   │   ├── communication-coordination-scalability.tex
│   │   ├── resiliency-maintainability.tex
│   │   ├── anatomy-of-distributed-system.tex
│   │   └── system-design-interview-framework.tex
│   ├── ch-1-2-estimation-calculations/
│   └── ch-1-3-database-fundamentals/
├── section-2-communication/
│   ├── ch-2-1-network-fundamentals/
│   └── ...
└── ...
```

## LaTeX File Format

Each `.tex` file contains the full content for one topic. You can use:

- **Text formatting**: `\textbf{bold}`, `\textit{italic}`, `\texttt{code}`
- **Sections**: `\section{}`, `\subsection{}`, `\subsubsection{}`
- **Lists**: `\begin{itemize}`, `\begin{enumerate}`
- **Math**: `$inline math$`, `$$display math$$`
- **Code blocks**: `\begin{verbatim}` or `\begin{lstlisting}`
- **Images**: `\includegraphics{/assets/section-X/ch-X-Y/image.png}`

## Images

Store images in the corresponding assets folder:

```
assets/
├── section-1/
│   ├── ch-1-1/
│   │   ├── distributed-system-diagram.png
│   │   └── ...
│   └── ...
└── ...
```

Reference images in LaTeX using the full path from root:
```latex
\includegraphics[width=0.8\textwidth]{/assets/section-1/ch-1-1/distributed-system-diagram.png}
```

## Writing Content

1. Navigate to the appropriate chapter folder
2. Create or edit the `.tex` file for your topic
3. Write your content using LaTeX syntax
4. Save images to the corresponding `assets/` folder
5. The application will automatically load and render your content

## Content Mapping

The application dynamically loads content based on the curriculum structure defined in `src/App.jsx`. The file path is constructed as:

```
content/section-{n}-{slug}/ch-{section}-{chapter}-{slug}/{topic-slug}.tex
```

Topic names are automatically converted to slugs (lowercase, hyphens instead of spaces).
