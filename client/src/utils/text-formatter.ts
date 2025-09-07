/**
 * Simple text formatting utilities for function descriptions and examples
 */

/**
 * Formats function descriptions by adding proper structure and bullet points
 */
export function formatDescription(description: string): string {
  if (!description) return description;

  let formatted = description.trim();

  // Check if it contains field descriptions that should be bullet points
  if (formatted.includes('The record can contain the following fields:')) {
    // Split at the introduction
    const parts = formatted.split(/The record can contain the following fields?:/i);
    if (parts.length === 2) {
      const intro = parts[0].trim();
      const fieldsText = parts[1].trim();
      
      // Extract individual field descriptions
      const fields = extractFields(fieldsText);
      
      if (fields.length > 0) {
        return intro + '.\n\nThe record can contain the following fields:\n\n' + fields.join('\n');
      }
    }
  }

  return formatted;
}

/**
 * Formats example code for better readability
 */
export function formatExampleCode(code: string): string {
  if (!code) return code;

  let formatted = code;
  
  // Add line breaks before Usage/Output sections
  formatted = formatted.replace(/(Usage|Output)Power Query M/gi, '\n\n$1:\nPower Query M\n');
  formatted = formatted.replace(/Usage:/g, 'Usage:\n');
  formatted = formatted.replace(/Output:/g, '\nOutput:\n');
  
  return formatted.trim();
}

/**
 * Extract individual fields from concatenated text
 */
function extractFields(text: string): string[] {
  const fields: string[] = [];
  
  // Common field patterns in Power Query documentation
  const fieldPatterns = [
    /Implementation:\s*([^.]*(?:\.[^A-Z][^:]*)*)/gi,
    /StartPage:\s*([^.]*(?:\.[^A-Z][^:]*)*)/gi,
    /EndPage:\s*([^.]*(?:\.[^A-Z][^:]*)*)/gi,
    /MultiPageTables:\s*([^.]*(?:\.[^A-Z][^:]*)*)/gi,
    /EnforceBorderLines:\s*([^.]*(?:\.[^A-Z][^:]*)*)/gi,
    /CreateNavigationProperties:\s*([^.]*(?:\.[^A-Z][^:]*)*)/gi,
    /NavigationPropertyNameGenerator:\s*([^.]*(?:\.[^A-Z][^:]*)*)/gi,
    /CommandTimeout:\s*([^.]*(?:\.[^A-Z][^:]*)*)/gi,
    /ConnectionTimeout:\s*([^.]*(?:\.[^A-Z][^:]*)*)/gi,
    /HierarchicalNavigation:\s*([^.]*(?:\.[^A-Z][^:]*)*)/gi,
    /Query:\s*([^.]*(?:\.[^A-Z][^:]*)*)/gi,
    /SqlCompatibleWindowsAuth:\s*([^.]*(?:\.[^A-Z][^:]*)*)/gi,
    /TypeMap:\s*([^.]*(?:\.[^A-Z][^:]*)*)/gi
  ];
  
  fieldPatterns.forEach(pattern => {
    const matches = text.matchAll(pattern);
    for (const match of matches) {
      if (match[0] && match[1]) {
        const fieldName = match[0].split(':')[0];
        const description = match[1].trim();
        fields.push(`• **${fieldName}**: ${description}.`);
        // Remove the matched text to avoid duplicates
        text = text.replace(match[0], '');
      }
    }
  });
  
  return fields;
}