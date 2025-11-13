/**
 * Glossary search functionality
 * Loads glossary.json and provides search/filter capabilities
 */

let glossaryData = [];

// Load glossary data
async function loadGlossary() {
  try {
    const response = await fetch('assets/glossary.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    glossaryData = await response.json();
    displayGlossary(glossaryData);
    setupSearch();
  } catch (error) {
    console.error('Error loading glossary:', error);
    const container = document.getElementById('glossary-container');
    if (container) {
      container.innerHTML = '<p class="error">Error al cargar el glosario. Por favor, inténtalo de nuevo más tarde.</p>';
    }
  }
}

// Display glossary entries
function displayGlossary(entries) {
  const container = document.getElementById('glossary-container');
  if (!container) return;

  if (entries.length === 0) {
    container.innerHTML = '<p>No se encontraron términos.</p>';
    return;
  }

  // Sort entries alphabetically by term
  const sortedEntries = [...entries].sort((a, b) => 
    a.term.localeCompare(b.term, 'es', { sensitivity: 'base' })
  );

  const html = sortedEntries.map(entry => `
    <div class="glossary-entry">
      <h3 class="glossary-term">${escapeHtml(entry.term)}</h3>
      <div class="glossary-definition">${formatDefinition(entry.definition)}</div>
    </div>
  `).join('');

  container.innerHTML = html;
}

// Format definition (convert markdown links, preserve formatting)
function formatDefinition(text) {
  // Convert markdown links [text](url) to HTML links
  let formatted = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  
  // Convert line breaks to <br> for better display
  formatted = formatted.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');
  
  return '<p>' + formatted + '</p>';
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Setup search functionality
function setupSearch() {
  const searchInput = document.getElementById('glossary-search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    
    if (query === '') {
      displayGlossary(glossaryData);
      return;
    }

    const filtered = glossaryData.filter(entry => 
      entry.term.toLowerCase().includes(query) ||
      entry.definition.toLowerCase().includes(query)
    );

    displayGlossary(filtered);
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadGlossary);
} else {
  loadGlossary();
}
