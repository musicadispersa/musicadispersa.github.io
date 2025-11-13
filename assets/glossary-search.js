// Buscador simple que carga assets/glossary.json y muestra resultados en el header
(async function(){
  const input = document.getElementById('glossary-search');
  const resultsBox = document.getElementById('glossary-results');
  let entries = [];

  try {
    const r = await fetch('assets/glossary.json');
    entries = await r.json();
  } catch (e) {
    console.warn('No se pudo cargar el glosario:', e);
    entries = [];
  }

  function render(matches) {
    resultsBox.innerHTML = '';
    if (!matches.length) {
      const div = document.createElement('div');
      div.className = 'search-item';
      div.textContent = 'No hay resultados';
      resultsBox.appendChild(div);
      return;
    }
    matches.slice(0, 8).forEach(item => {
      const div = document.createElement('div');
      div.className = 'search-item';
      div.setAttribute('role','option');
      div.innerHTML = '<strong>' + item.term + '</strong><span class="muted"> — ' + (item.definition || '') + '</span>';
      div.addEventListener('click', () => {
        window.location.href = 'glosario.html#' + encodeURIComponent(item.term);
      });
      resultsBox.appendChild(div);
    });
  }

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) {
      resultsBox.classList.remove('open');
      resultsBox.innerHTML = '';
      return;
    }
    const matches = entries.filter(e => e.term.toLowerCase().includes(q) || (e.definition || '').toLowerCase().includes(q));
    render(matches);
    resultsBox.classList.add('open');
  });

  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !resultsBox.contains(e.target)) {
      resultsBox.classList.remove('open');
    }
  });
})();
