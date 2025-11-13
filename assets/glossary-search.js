// glossary-search.js - Search and display glossary terms
(function() {
  let glossaryData = [];
  
  // Load glossary data from JSON
  async function loadGlossary() {
    try {
      const response = await fetch('assets/glossary.json');
      if (!response.ok) {
        throw new Error('Failed to load glossary');
      }
      glossaryData = await response.json();
      displayGlossary(glossaryData);
      setupSearch();
    } catch (error) {
      console.error('Error loading glossary:', error);
      document.getElementById('glossary-container').innerHTML = 
        '<div class="no-results">Error al cargar el glosario.</div>';
    }
  }
  
  // Display glossary items
  function displayGlossary(items) {
    const container = document.getElementById('glossary-container');
    
    if (!items || items.length === 0) {
      container.innerHTML = '<div class="no-results">No se encontraron términos.</div>';
      return;
    }
    
    const html = items.map(item => `
      <div class="glossary-item">
        <h2 class="glossary-term">${escapeHtml(item.term)}</h2>
        <div class="glossary-definition">${escapeHtml(item.definition)}</div>
      </div>
    `).join('');
    
    container.innerHTML = html;
  }
  
  // Setup search functionality
  function setupSearch() {
    const searchInput = document.getElementById('glossary-search');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function(e) {
      const query = e.target.value.toLowerCase().trim();
      
      if (!query) {
        displayGlossary(glossaryData);
        return;
      }
      
      const filtered = glossaryData.filter(item => {
        const termMatch = item.term.toLowerCase().includes(query);
        const defMatch = item.definition.toLowerCase().includes(query);
        return termMatch || defMatch;
      });
      
      displayGlossary(filtered);
    });
  }
  
  // Escape HTML to prevent XSS
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadGlossary);
  } else {
    loadGlossary();
  }
})();
