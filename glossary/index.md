---
title: "Glosario"
layout: default
permalink: /glossary/
---

## Glosario de términos

Términos técnicos y conceptuales utilizados en **Ecos desde los márgenes**.

### Buscar en el glosario

Utiliza el [buscador](/search/) para encontrar términos específicos en el glosario.

### Términos disponibles

{% for term in site.glossary %}
- [{{ term.title }}]({{ term.url }})
{% endfor %}

---

_El glosario se actualizará con nuevos términos conforme se publiquen los volúmenes de la serie._
