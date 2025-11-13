(async function () {
  // Load glossary data from JSON
  async function loadGlossary() {
    try {
      const res = await fetch('/assets/glossary.json');
      return res.ok ? res.json() : [];
    } catch (error) {
      console.error('Error loading glossary:', error);
      return [];
    }
  }

  // Render glossary entries
  function renderGlossary(entries) {
    const container = document.getElementById('glossary-list');
    if (!container) return;

    if (entries.length === 0) {
      container.innerHTML = '<p>No hay términos disponibles en el glosario.</p>';
      return;
    }

    const dl = document.createElement('dl');
    dl.className = 'glossary-entries';

    entries.forEach(entry => {
      const dt = document.createElement('dt');
      dt.className = 'glossary-term';
      dt.textContent = entry.term;

      const dd = document.createElement('dd');
      dd.className = 'glossary-definition';
      // Convert markdown-style content to HTML (basic conversion)
      dd.innerHTML = entry.definition
        .replace(/\n\n/g, '</p><p>')
        .replace(/^/, '<p>')
        .replace(/$/, '</p>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
        .replace(/> (.+)/g, '<blockquote>$1</blockquote>');

      dl.appendChild(dt);
      dl.appendChild(dd);
    });

    container.innerHTML = '';
    container.appendChild(dl);
  }

  // Filter glossary entries based on search term
  function filterGlossary(entries, searchTerm) {
    if (!searchTerm) return entries;
    
    const term = searchTerm.toLowerCase();
    return entries.filter(entry => 
      entry.term.toLowerCase().includes(term) || 
      entry.definition.toLowerCase().includes(term)
    );
  }

  // Initialize glossary page
  async function initGlossary() {
    const searchInput = document.getElementById('glossary-search-input');
    if (!searchInput) return; // Not on glossary page

    const glossaryData = await loadGlossary();
    renderGlossary(glossaryData);

    // Add search functionality
    searchInput.addEventListener('input', function(e) {
      const filtered = filterGlossary(glossaryData, e.target.value);
      renderGlossary(filtered);
    });
  }

  // Run initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlossary);
  } else {
    initGlossary();
  }
})();
