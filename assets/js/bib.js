// Renderiza bibliography.bib en la página /bibliography/
// Requiere citation-js cargado en el layout
(async function () {
  if (!location.pathname.startsWith('/bibliography')) return;
  try {
    const res = await fetch('/bibliography.bib');
    if (!res.ok) throw new Error('No se encontró bibliography.bib');
    const bibtex = await res.text();
    // Citation-js puede consumir BibTeX directamente
    const cite = new Cite(bibtex);
    // Render como HTML (estilo APA por defecto)
    const bibList = cite.get({ type: 'string', style: 'apa', format: 'html' });
    const container = document.getElementById('bibliography-content');
    if (container) container.innerHTML = bibList;
  } catch (err) {
    console.error('Error cargando bibliografía:', err);
    const container = document.getElementById('bibliography-content');
    if (container) container.innerHTML = '<p>Error cargando la bibliografía.</p>';
  }
})();