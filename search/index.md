---
title: "Buscar en el sitio"
layout: default
permalink: /search/
---

<form role="search" onsubmit="event.preventDefault(); const q=document.getElementById('site-search').value; if(q) location.href='/search/?q='+encodeURIComponent(q);">
  <input id="site-search" placeholder="Buscar en el glosario..." aria-label="Buscar en el sitio" />
  <button type="submit">Buscar</button>
</form>

<section id="search-results" aria-live="polite">
  <p>Introduce un término y pulsa Enter o usa el botón Buscar.</p>
</section>
