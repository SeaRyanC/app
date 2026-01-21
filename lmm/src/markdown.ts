import { marked } from 'marked';

// Custom extension to render tildes as underline instead of strikethrough
// Supports both ~text~ (single) and ~~text~~ (double) as underline
const underlineExtension = {
  name: 'underline',
  level: 'inline' as const,
  start(src: string) {
    return src.indexOf('~');
  },
  tokenizer(src: string) {
    // Match both ~text~ and ~~text~~ patterns
    const rule = /^~{1,2}(?=\S)([\s\S]*?\S)~{1,2}(?!~)/;
    const match = rule.exec(src);
    if (match) {
      return {
        type: 'underline',
        raw: match[0],
        text: match[1],
        tokens: [],
      };
    }
    return undefined;
  },
  renderer(token: { text: string }) {
    return `<u>${token.text}</u>`;
  },
};

// Configure marked for inline use with custom underline extension
marked.use({
  gfm: true,
  breaks: true,
  extensions: [underlineExtension],
});

export function parseMarkdown(text: string): string {
  // Parse markdown to HTML
  return marked.parse(text, { async: false }) as string;
}

// Parse markdown to structured tokens for PDF rendering
export interface TextSegment {
  text: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  newline: boolean;
}

export function parseMarkdownToSegments(text: string): TextSegment[] {
  const segments: TextSegment[] = [];
  
  // Split by lines first
  const lines = text.split('\n');
  
  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const line = lines[lineIndex] ?? '';
    
    if (lineIndex > 0) {
      segments.push({ text: '', bold: false, italic: false, underline: false, newline: true });
    }
    
    // Process inline formatting
    const remaining = line;
    let currentBold = false;
    let currentItalic = false;
    let currentUnderline = false;
    
    // Simple state machine for markdown parsing
    let buffer = '';
    let i = 0;
    
    while (i < remaining.length) {
      const char = remaining[i];
      const nextChar = remaining[i + 1];
      
      // Check for bold (** or __)
      if ((char === '*' && nextChar === '*') || (char === '_' && nextChar === '_')) {
        if (buffer) {
          segments.push({
            text: buffer,
            bold: currentBold,
            italic: currentItalic,
            underline: currentUnderline,
            newline: false,
          });
          buffer = '';
        }
        currentBold = !currentBold;
        i += 2;
        continue;
      }
      
      // Check for italic (* or _) but not at word boundaries for _
      if ((char === '*' && nextChar !== '*') || (char === '_' && nextChar !== '_')) {
        // Make sure it's not escaped
        const prevChar = remaining[i - 1];
        if (prevChar !== '\\') {
          if (buffer) {
            segments.push({
              text: buffer,
              bold: currentBold,
              italic: currentItalic,
              underline: currentUnderline,
              newline: false,
            });
            buffer = '';
          }
          currentItalic = !currentItalic;
          i += 1;
          continue;
        }
      }
      
      // Check for underline (~~ or ~) - supports both single and double tildes
      if (char === '~') {
        // Check if it's double tilde first
        if (nextChar === '~') {
          if (buffer) {
            segments.push({
              text: buffer,
              bold: currentBold,
              italic: currentItalic,
              underline: currentUnderline,
              newline: false,
            });
            buffer = '';
          }
          currentUnderline = !currentUnderline;
          i += 2;
          continue;
        }
        // Single tilde - only treat as underline if next char is not whitespace (opening)
        // or if we're already in underline mode (closing)
        const prevChar = remaining[i - 1];
        const isOpening = !currentUnderline && nextChar !== undefined && nextChar !== ' ' && nextChar !== '\t';
        const isClosing = currentUnderline && (prevChar !== undefined && prevChar !== ' ' && prevChar !== '\t');
        if (isOpening || isClosing) {
          if (buffer) {
            segments.push({
              text: buffer,
              bold: currentBold,
              italic: currentItalic,
              underline: currentUnderline,
              newline: false,
            });
            buffer = '';
          }
          currentUnderline = !currentUnderline;
          i += 1;
          continue;
        }
      }
      
      buffer += char;
      i += 1;
    }
    
    if (buffer) {
      segments.push({
        text: buffer,
        bold: currentBold,
        italic: currentItalic,
        underline: currentUnderline,
        newline: false,
      });
    }
  }
  
  return segments;
}

// Convert markdown to plain text (for simple preview)
export function markdownToPlainText(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/__(.+?)__/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/_(.+?)_/g, '$1')
    .replace(/~~(.+?)~~/g, '$1')
    .replace(/~(.+?)~/g, '$1');
}
