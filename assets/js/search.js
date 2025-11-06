(async function () {
  async function loadIndex() {
    const res = await fetch('/assets/js/glossary.json');
    return res.ok ? res.json() : [];
  }

  function initSearchBox() {
    const input = document.getElementById('site-search');
    if (!input) return;
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        const q = input.value.trim();
        if (q) location.href = '/search/?q=' + encodeURIComponent(q);
      }
    });
  }

  async function renderSearchPage() {
    if (!location.pathname.startsWith('/search')) return;
    const params = new URLSearchParams(location.search);
    const q = params.get('q') || '';
    const container = document.getElementById('search-results');
    const input = document.getElementById('site-search');
    if (input && q) input.value = q;

    const index = await loadIndex();
    const fuse = new Fuse(index, {
      keys: ['title', 'term', 'content'],
      threshold: 0.4,
      includeMatches: true,
      minMatchCharLength: 2,
    });

    let results = q ? fuse.search(q).map(r => r.item) : index;
    if (!container) return;

    container.innerHTML = '';
    if (q && results.length === 0) {
      container.innerHTML = '<p>No se encontraron resultados para «' + q + '».</p>';
      return;
    }

    const ul = document.createElement('ul');
    ul.className = 'search-results';
    results.forEach(item => {
      const li = document.createElement('li');
      li.className = 'search-item';
      li.innerHTML = '<a href="' + (item.url || '#') + '"><strong>' + item.title + '</strong></a>' +
                     (item.term ? ' <em>(' + item.term + ')</em>' : '') +
                     '<div class="search-hit">' + (item.excerpt || (item.content || '').slice(0,200)) + '...</div>';
      ul.appendChild(li);
    });
    container.appendChild(ul);
  }

  initSearchBox();
  renderSearchPage();
})();
