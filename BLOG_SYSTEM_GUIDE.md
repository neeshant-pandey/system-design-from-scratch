# Blog Content System Guide

This guide explains how to use the LaTeX-based blog content system for the System Design curriculum.

## 📁 Directory Structure

```
project-root/
├── content/                                    # All blog content
│   ├── section-{n}-{section-slug}/
│   │   ├── ch-{section}-{chapter}-{chapter-slug}/
│   │   │   ├── {topic-slug}.tex
│   │   │   └── ...
│   │   └── ...
│   └── README.md
├── assets/                                     # All images and media
│   ├── section-{n}/
│   │   ├── ch-{section}-{chapter}/
│   │   │   ├── image.png
│   │   │   └── ...
│   │   └── ...
│   └── README.md
└── src/
    ├── components/
    │   └── LatexRenderer.jsx                  # LaTeX parser & renderer
    └── utils/
        └── contentLoader.js                   # Content loading utilities
```

## ✍️ Writing Blog Content

### 1. Create the Content File

Navigate to the appropriate chapter folder and create a `.tex` file for your topic. The filename should be the topic name converted to a slug (lowercase, hyphens for spaces).

**Example:**
- Topic: "What is System Design?"
- File: `content/section-1-foundations/ch-1-1-introduction-to-system-design/what-is-system-design.tex`

### 2. LaTeX Syntax Supported

#### Text Formatting

```latex
\textbf{bold text}         % Bold
\textit{italic text}       % Italic
\texttt{code or monospace} % Monospace/code
```

#### Headings

```latex
\section{Main Section}           % H3 - Large heading
\subsection{Subsection}          % H4 - Medium heading
\subsubsection{Subsubsection}    % H5 - Small heading
```

#### Lists

```latex
% Bullet list
\begin{itemize}
\item First item
\item Second item
\item Third item
\end{itemize}

% Numbered list
\begin{enumerate}
\item First step
\item Second step
\item Third step
\end{enumerate}
```

#### Math Expressions

```latex
% Inline math
The complexity is $O(n \log n)$ for this algorithm.

% Display math (centered)
$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$
```

#### Code Blocks

```latex
\begin{verbatim}
function example() {
  console.log("Code block");
  return true;
}
\end{verbatim}
```

#### Images

```latex
\includegraphics{/assets/section-1/ch-1-1/diagram.png}

% With optional width parameter
\includegraphics[width=0.8\textwidth]{/assets/section-1/ch-1-1/diagram.png}
```

**Important:** Always use absolute paths starting with `/assets/`

### 3. Example Blog Post

See `content/section-1-foundations/ch-1-1-introduction-to-system-design/what-is-system-design.tex` for a complete example that demonstrates:

- Multiple heading levels
- Text formatting (bold, italic, code)
- Bullet and numbered lists
- Nested lists
- Code blocks
- Math expressions (inline)
- Structured sections with good flow

## 🖼️ Adding Images

### 1. Save Image to Assets Folder

```bash
# Create folder if it doesn't exist
mkdir -p assets/section-X/ch-X-Y

# Save your image
cp ~/diagram.png assets/section-X/ch-X-Y/descriptive-name.png
```

### 2. Reference in LaTeX

```latex
\includegraphics{/assets/section-X/ch-X-Y/descriptive-name.png}
```

### Image Guidelines

- **Format**: PNG for screenshots, SVG for diagrams (if possible)
- **Size**: Optimize images to < 500KB when possible
- **Naming**: Use descriptive kebab-case names (e.g., `load-balancer-architecture.png`)
- **Dark theme**: Ensure images look good on black background
- **Resolution**: At least 1200px width for diagrams

## 🎨 Styling

The blog system automatically applies your existing "Sophisticated Minimal Theme":

- **Background**: Black (#000000) with grid pattern
- **Text**: Off-white (#f5f5f5)
- **Accent**: Yellow (#facc15)
- **Font**: Space Grotesk

All LaTeX content is rendered with these styles automatically. No need to add any custom styling in your `.tex` files.

## 🚀 Workflow

### Adding New Content

1. **Identify the topic location** in the curriculum (section → chapter → topic)
2. **Navigate to the folder**: `content/section-X-slug/ch-X-Y-slug/`
3. **Create the `.tex` file**: `topic-slug.tex`
4. **Write your content** using LaTeX syntax
5. **Add images** to `assets/section-X/ch-X-Y/` if needed
6. **Test locally**: Run `npm run dev` and navigate to your topic
7. **Commit your changes**: `git add . && git commit -m "Add content for [topic]"`

### Creating Folders for New Sections

If you're writing content for a section that doesn't have a folder yet:

```bash
# Example: Section 2, Chapter 1
mkdir -p content/section-2-communication/ch-2-1-network-fundamentals
mkdir -p assets/section-2/ch-2-1
```

Use the naming conventions:
- Section number + slug of section name
- Chapter numbers + slug of chapter title

## 🔧 Technical Details

### How Content is Loaded

1. When a user clicks a topic, the app calls `loadTopicContent(curriculum, topicName)`
2. The content loader:
   - Finds the topic's location in the curriculum structure
   - Builds the file path using the naming conventions
   - Fetches the `.tex` file content
3. The `LatexRenderer` component:
   - Parses the LaTeX syntax
   - Converts it to React/MUI components
   - Renders math with KaTeX
   - Applies the theme styling

### File Path Construction

The system automatically constructs paths based on the curriculum structure in `src/App.jsx`:

```javascript
// Topic: "What is System Design?"
// Section: "SECTION I: FOUNDATIONS" (id: "section-1")
// Chapter: "Introduction to System Design" (id: "ch-1-1")

// Results in:
// content/section-1-foundations/ch-1-1-introduction-to-system-design/what-is-system-design.tex
```

### Troubleshooting

**Content not loading?**
- Check that the file path matches the expected pattern
- Verify the filename slug matches the topic name (lowercase, hyphens)
- Check browser console for errors
- Ensure the `.tex` file is in the correct folder

**LaTeX not rendering correctly?**
- Make sure you're using supported LaTeX commands (see syntax above)
- Check for unclosed braces `{}` or environments (`\begin{}` without `\end{}`)
- Math expressions must be wrapped in `$` or `$$`
- Code blocks must use `\begin{verbatim}` ... `\end{verbatim}`

**Images not showing?**
- Use absolute paths: `/assets/...` not `./assets/...` or `../assets/...`
- Verify the image file exists in the assets folder
- Check image file extension matches the path (case-sensitive on Linux)

## 📝 Best Practices

1. **Start with an outline**: Use sections and subsections to structure your content
2. **Include examples**: Real-world examples make concepts concrete
3. **Use visuals**: Diagrams are often worth a thousand words
4. **Keep paragraphs short**: Aim for 3-5 sentences per paragraph
5. **Use lists**: Lists are scannable and easy to digest
6. **Code blocks**: Show actual implementations when relevant
7. **Math notation**: Use math mode for algorithms and formulas
8. **Link concepts**: Reference related topics (manually for now)
9. **Test locally**: Always preview your content before committing
10. **Commit frequently**: Make small, focused commits as you write

## 🎯 Content Checklist

Before considering a topic complete, ensure it includes:

- [ ] Clear introduction explaining what the topic covers
- [ ] Real-world motivation (why does this matter?)
- [ ] Key concepts with definitions
- [ ] At least one concrete example or case study
- [ ] Code snippets or algorithms where applicable
- [ ] Diagrams or visuals (when helpful)
- [ ] Summary or conclusion
- [ ] Optional: Links to next topics or related concepts

## 🌟 Example Topics to Write

Start with these high-impact topics:

1. **What is System Design?** ✅ (Complete - use as template!)
2. **Communication, Coordination & Scalability**
3. **Database Basics (SQL vs NoSQL)**
4. **Caching Strategies**
5. **Load Balancing**
6. **Message Queues**
7. **CAP Theorem**

Each topic should be comprehensive but focused—aim for 2000-4000 words.

## 📚 Resources

- **LaTeX Math**: [Overleaf Math Symbols](https://www.overleaf.com/learn/latex/List_of_Greek_letters_and_math_symbols)
- **KaTeX**: [Supported Functions](https://katex.org/docs/supported.html)
- **System Design**: Use your curriculum as a guide for scope and depth

---

Happy writing! 🚀 Build the definitive system design curriculum, one topic at a time.
