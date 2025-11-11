/**
 * Content Loader Utility
 * Loads blog content from the /content directory structure
 */

/**
 * Convert a string to URL-friendly slug
 * Example: "What is System Design?" -> "what-is-system-design"
 */
export function toSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Extract section number from section ID
 * Example: "section-1" -> 1, "SECTION I: FOUNDATIONS" -> 1
 */
export function getSectionNumber(section) {
  if (typeof section === 'string') {
    // If it's like "section-1"
    const match = section.match(/section-(\d+)/i);
    if (match) return parseInt(match[1]);

    // If it's like "SECTION I: FOUNDATIONS"
    const romanMatch = section.match(/SECTION ([IVX]+)/i);
    if (romanMatch) {
      return romanToInt(romanMatch[1]);
    }
  }
  return section;
}

/**
 * Convert Roman numerals to integers
 */
function romanToInt(roman) {
  const romanMap = {
    'I': 1, 'V': 5, 'X': 10, 'L': 50,
    'C': 100, 'D': 500, 'M': 1000
  };

  let result = 0;
  for (let i = 0; i < roman.length; i++) {
    const current = romanMap[roman[i]];
    const next = romanMap[roman[i + 1]];

    if (next && current < next) {
      result -= current;
    } else {
      result += current;
    }
  }
  return result;
}

/**
 * Extract section name slug from section title
 * Example: "SECTION I: FOUNDATIONS" -> "foundations"
 */
export function getSectionSlug(sectionTitle) {
  const match = sectionTitle.match(/SECTION [IVX]+:\s*(.+)/i);
  return match ? toSlug(match[1]) : toSlug(sectionTitle);
}

/**
 * Extract chapter numbers from chapter ID
 * Example: "ch-1-1" -> { section: 1, chapter: 1 }
 */
export function getChapterNumbers(chapterId) {
  const match = chapterId.match(/ch-(\d+)-(\d+)/);
  if (match) {
    return {
      section: parseInt(match[1]),
      chapter: parseInt(match[2])
    };
  }
  return null;
}

/**
 * Build file path for a topic's content
 * @param {object} curriculum - The curriculum data structure
 * @param {string} sectionId - Section ID (e.g., "section-1")
 * @param {string} chapterId - Chapter ID (e.g., "ch-1-1")
 * @param {string} topicName - Topic name (e.g., "What is System Design?")
 * @returns {string} - File path (e.g., "content/section-1-foundations/ch-1-1-introduction-to-system-design/what-is-system-design.tex")
 */
export function buildContentPath(curriculum, sectionId, chapterId, topicName) {
  // Find section and chapter in curriculum
  const section = curriculum.find(s => s.id === sectionId);
  if (!section) return null;

  const chapter = section.chapters.find(c => c.id === chapterId);
  if (!chapter) return null;

  // Build path components
  const sectionNum = getSectionNumber(sectionId);
  const sectionSlug = getSectionSlug(section.section);
  const chapterNums = getChapterNumbers(chapterId);
  const chapterSlug = toSlug(chapter.title);
  const topicSlug = toSlug(topicName);

  return `/content/section-${sectionNum}-${sectionSlug}/ch-${chapterNums.section}-${chapterNums.chapter}-${chapterSlug}/${topicSlug}.tex`;
}

/**
 * Load content for a specific topic
 * @param {string} path - Path to the .tex file
 * @returns {Promise<string>} - Content of the file
 */
export async function loadContent(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load content: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    console.error('Error loading content:', error);
    return null;
  }
}

/**
 * Load content for a specific topic by identifying its location
 * @param {object} curriculum - The curriculum data structure
 * @param {string} topicName - Topic name to load
 * @returns {Promise<{content: string, path: string}>} - Content and path
 */
export async function loadTopicContent(curriculum, topicName) {
  // Find the topic's location in the curriculum
  for (const section of curriculum) {
    for (const chapter of section.chapters) {
      if (chapter.topics.includes(topicName)) {
        const path = buildContentPath(curriculum, section.id, chapter.id, topicName);
        const content = await loadContent(path);
        return { content, path };
      }
    }
  }

  return { content: null, path: null };
}
