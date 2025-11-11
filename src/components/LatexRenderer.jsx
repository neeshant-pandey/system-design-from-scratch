import React from 'react';
import { Box, Typography } from '@mui/material';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

/**
 * Parse LaTeX content and convert to React components
 * This is a simplified LaTeX parser that handles common blog content patterns
 */

/**
 * Parse LaTeX commands and convert to React elements
 */
function parseLatexContent(latex) {
  if (!latex) return [];

  const elements = [];
  let currentIndex = 0;
  let key = 0;

  // Split content into lines for easier processing
  const lines = latex.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    // Skip empty lines
    if (!line) {
      i++;
      continue;
    }

    // Handle sections
    if (line.startsWith('\\section{')) {
      const content = extractBraceContent(line, '\\section{');
      elements.push(
        <Typography
          key={key++}
          variant="h3"
          sx={{
            mt: 5,
            mb: 2.5,
            fontWeight: 600,
            color: '#e5c07b',
            position: 'relative',
            pb: 1,
            borderBottom: '1px solid rgba(229, 192, 123, 0.2)',
            letterSpacing: '-0.01em',
          }}
        >
          {content}
        </Typography>
      );
      i++;
      continue;
    }

    // Handle subsections
    if (line.startsWith('\\subsection{')) {
      const content = extractBraceContent(line, '\\subsection{');
      elements.push(
        <Typography
          key={key++}
          variant="h4"
          sx={{
            mt: 4,
            mb: 2,
            fontWeight: 600,
            color: '#cbd5e1',
            position: 'relative',
            paddingLeft: '12px',
            '&::before': {
              content: '""',
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              width: '3px',
              height: '60%',
              background: 'rgba(203, 213, 225, 0.4)',
              borderRadius: '2px',
            }
          }}
        >
          {content}
        </Typography>
      );
      i++;
      continue;
    }

    // Handle subsubsections
    if (line.startsWith('\\subsubsection{')) {
      const content = extractBraceContent(line, '\\subsubsection{');
      elements.push(
        <Typography
          key={key++}
          variant="h5"
          sx={{
            mt: 3,
            mb: 1.5,
            fontWeight: 500,
            color: '#94a3b8',
          }}
        >
          {content}
        </Typography>
      );
      i++;
      continue;
    }

    // Handle display math ($$...$$)
    if (line.startsWith('$$')) {
      let mathContent = '';
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('$$')) {
        mathContent += lines[i] + '\n';
        i++;
      }
      elements.push(
        <Box key={key++} sx={{ my: 2, textAlign: 'center' }}>
          <BlockMath math={mathContent.trim()} />
        </Box>
      );
      i++;
      continue;
    }

    // Handle itemize (bullet lists)
    if (line.startsWith('\\begin{itemize}')) {
      const listItems = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('\\end{itemize}')) {
        const itemLine = lines[i].trim();
        if (itemLine.startsWith('\\item ')) {
          const content = itemLine.substring(6);
          listItems.push(parseInlineFormatting(content));
        }
        i++;
      }
      elements.push(
        <Box
          key={key++}
          component="ul"
          sx={{
            my: 2,
            pl: 3,
            '& li::marker': {
              color: '#d4af37',
              fontSize: '1.1em',
            }
          }}
        >
          {listItems.map((item, idx) => (
            <Typography
              key={idx}
              component="li"
              variant="body1"
              sx={{ mb: 1.5 }}
            >
              {item}
            </Typography>
          ))}
        </Box>
      );
      i++;
      continue;
    }

    // Handle enumerate (numbered lists)
    if (line.startsWith('\\begin{enumerate}')) {
      const listItems = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('\\end{enumerate}')) {
        const itemLine = lines[i].trim();
        if (itemLine.startsWith('\\item ')) {
          const content = itemLine.substring(6);
          listItems.push(parseInlineFormatting(content));
        }
        i++;
      }
      elements.push(
        <Box
          key={key++}
          component="ol"
          sx={{
            my: 2,
            pl: 3,
            '& li::marker': {
              color: '#c9a961',
              fontWeight: 600,
            }
          }}
        >
          {listItems.map((item, idx) => (
            <Typography
              key={idx}
              component="li"
              variant="body1"
              sx={{ mb: 1.5 }}
            >
              {item}
            </Typography>
          ))}
        </Box>
      );
      i++;
      continue;
    }

    // Handle code blocks (verbatim, lstlisting, minted)
    if (line.startsWith('\\begin{verbatim}') ||
        line.startsWith('\\begin{lstlisting}') ||
        line.startsWith('\\begin{minted}')) {
      let codeContent = '';
      let language = 'text'; // default to plain text
      let endTag = '\\end{verbatim}';

      // Determine environment type and language
      if (line.startsWith('\\begin{lstlisting}')) {
        endTag = '\\end{lstlisting}';
        // Extract language from [language=python] or similar
        const langMatch = line.match(/\[.*?language\s*=\s*(\w+)/i);
        if (langMatch) {
          language = langMatch[1].toLowerCase();
        }
      } else if (line.startsWith('\\begin{minted}')) {
        endTag = '\\end{minted}';
        // Extract language from \begin{minted}{python}
        const langMatch = line.match(/\\begin\{minted\}\{(\w+)\}/);
        if (langMatch) {
          language = langMatch[1].toLowerCase();
        }
      }

      // Collect code content
      i++;
      while (i < lines.length && !lines[i].trim().startsWith(endTag)) {
        codeContent += lines[i] + '\n';
        i++;
      }

      // Render with syntax highlighting
      elements.push(
        <Box
          key={key++}
          sx={{
            my: 3,
            position: 'relative',
            borderLeft: '2px solid rgba(212, 175, 55, 0.3)',
            '& pre': {
              margin: 0,
              padding: '20px !important',
              backgroundColor: 'rgba(30, 30, 30, 0.5) !important',
              border: '1px solid rgba(212, 175, 55, 0.15)',
              borderLeft: 'none',
              borderRadius: 0,
              fontSize: '0.875rem',
            },
            '& code': {
              fontFamily: "'Fira Code', 'Consolas', 'Monaco', monospace",
            },
            '&::after': language !== 'text' ? {
              content: `"${language}"`,
              position: 'absolute',
              top: '12px',
              right: '12px',
              color: 'rgba(212, 175, 55, 0.6)',
              padding: '2px 8px',
              fontSize: '0.7rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
            } : {}
          }}
        >
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            showLineNumbers={language !== 'text'}
            wrapLines={true}
            customStyle={{
              margin: 0,
              padding: '20px',
              backgroundColor: 'transparent',
              borderRadius: 0,
            }}
          >
            {codeContent.trim()}
          </SyntaxHighlighter>
        </Box>
      );
      i++;
      continue;
    }

    // Handle images
    if (line.includes('\\includegraphics')) {
      const imagePath = extractImagePath(line);
      if (imagePath) {
        elements.push(
          <Box key={key++} sx={{ my: 3, textAlign: 'center' }}>
            <img
              src={imagePath}
              alt="Diagram"
              style={{
                maxWidth: '100%',
                height: 'auto',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            />
          </Box>
        );
      }
      i++;
      continue;
    }

    // Handle regular paragraphs
    let paragraph = line;
    i++;

    // Collect multi-line paragraphs
    while (i < lines.length && lines[i].trim() && !isLatexCommand(lines[i])) {
      paragraph += ' ' + lines[i].trim();
      i++;
    }

    if (paragraph) {
      elements.push(
        <Typography key={key++} variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
          {parseInlineFormatting(paragraph)}
        </Typography>
      );
    }
  }

  return elements;
}

/**
 * Check if a line starts with a LaTeX command
 */
function isLatexCommand(line) {
  const trimmed = line.trim();
  return (
    trimmed.startsWith('\\section{') ||
    trimmed.startsWith('\\subsection{') ||
    trimmed.startsWith('\\subsubsection{') ||
    trimmed.startsWith('\\begin{') ||
    trimmed.startsWith('\\end{') ||
    trimmed.startsWith('$$') ||
    trimmed.startsWith('\\item') ||
    trimmed.includes('\\includegraphics')
  );
}

/**
 * Extract content from braces
 * Example: extractBraceContent("\\section{Hello World}", "\\section{") -> "Hello World"
 */
function extractBraceContent(text, command) {
  const start = text.indexOf(command) + command.length;
  let braceCount = 1;
  let end = start;

  while (end < text.length && braceCount > 0) {
    if (text[end] === '{') braceCount++;
    if (text[end] === '}') braceCount--;
    if (braceCount > 0) end++;
  }

  return text.substring(start, end);
}

/**
 * Extract image path from \includegraphics command
 */
function extractImagePath(text) {
  // Match \includegraphics[options]{path} or \includegraphics{path}
  const match = text.match(/\\includegraphics(?:\[.*?\])?\{(.+?)\}/);
  return match ? match[1] : null;
}

/**
 * Parse inline formatting (bold, italic, code, math)
 */
function parseInlineFormatting(text) {
  const parts = [];
  let currentIndex = 0;
  let key = 0;

  // Regular expressions for inline commands
  const patterns = [
    { regex: /\$([^$]+)\$/g, type: 'math' },
    { regex: /\\textbf\{([^}]+)\}/g, type: 'bold' },
    { regex: /\\textit\{([^}]+)\}/g, type: 'italic' },
    { regex: /\\texttt\{([^}]+)\}/g, type: 'code' },
  ];

  // Find all matches
  const matches = [];
  patterns.forEach(({ regex, type }) => {
    let match;
    const r = new RegExp(regex.source, 'g');
    while ((match = r.exec(text)) !== null) {
      matches.push({
        type,
        start: match.index,
        end: match.index + match[0].length,
        content: match[1],
        fullMatch: match[0],
      });
    }
  });

  // Sort matches by position
  matches.sort((a, b) => a.start - b.start);

  // Build the output
  matches.forEach((match) => {
    // Add text before this match
    if (match.start > currentIndex) {
      parts.push(text.substring(currentIndex, match.start));
    }

    // Add the formatted content
    switch (match.type) {
      case 'math':
        parts.push(<InlineMath key={key++} math={match.content} />);
        break;
      case 'bold':
        parts.push(
          <strong key={key++} style={{ color: '#e5c07b', fontWeight: 600 }}>
            {match.content}
          </strong>
        );
        break;
      case 'italic':
        parts.push(
          <em key={key++} style={{ color: '#cbd5e1', fontStyle: 'italic' }}>
            {match.content}
          </em>
        );
        break;
      case 'code':
        parts.push(
          <code
            key={key++}
            style={{
              backgroundColor: 'rgba(212, 175, 55, 0.08)',
              color: '#d4af37',
              padding: '2px 6px',
              borderRadius: '3px',
              border: '1px solid rgba(212, 175, 55, 0.15)',
              fontFamily: "'Fira Code', 'Consolas', monospace",
              fontSize: '0.9em',
              fontWeight: 500,
            }}
          >
            {match.content}
          </code>
        );
        break;
    }

    currentIndex = match.end;
  });

  // Add remaining text
  if (currentIndex < text.length) {
    parts.push(text.substring(currentIndex));
  }

  return parts.length > 0 ? parts : text;
}

/**
 * Main LaTeX Renderer Component
 */
export default function LatexRenderer({ content }) {
  if (!content) {
    return (
      <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
        Content not available. This topic hasn't been written yet.
      </Typography>
    );
  }

  const elements = parseLatexContent(content);

  return (
    <Box sx={{ '& > *:first-of-type': { mt: 0 } }}>
      {elements}
    </Box>
  );
}
