# Assets Directory

This directory contains all images, diagrams, and other media files for the blog content.

## Structure

Assets are organized to match the content hierarchy:

```
assets/
├── section-{n}/
│   ├── ch-{section}-{chapter}/
│   │   ├── image1.png
│   │   ├── diagram.svg
│   │   └── ...
│   └── ...
└── ...
```

## Supported Formats

- **Images**: PNG, JPG, JPEG, SVG, WebP
- **Diagrams**: SVG (recommended for scalability)
- **Icons**: SVG, PNG

## Naming Conventions

Use descriptive, lowercase names with hyphens:

✅ Good:
- `distributed-system-architecture.png`
- `load-balancer-diagram.svg`
- `database-replication-flow.png`

❌ Avoid:
- `image1.png`
- `Diagram Final V2.png`
- `Screen Shot 2024-11-11.png`

## Referencing in LaTeX

Reference images using the full path from the root:

```latex
\includegraphics[width=0.8\textwidth]{/assets/section-1/ch-1-1/distributed-system-diagram.png}
```

## Image Guidelines

1. **Resolution**: Use high-quality images (at least 1200px width for diagrams)
2. **Format**: Prefer SVG for diagrams, PNG for screenshots
3. **Size**: Optimize images to keep file sizes reasonable (< 500KB)
4. **Alt Text**: Consider accessibility when creating diagrams
5. **Dark Theme**: Ensure images look good on the dark background (#000000)

## Creating Diagrams

Recommended tools:
- **Excalidraw**: For hand-drawn style diagrams
- **draw.io**: For professional flowcharts
- **Figma**: For polished illustrations
- **PlantUML**: For generating diagrams from code
