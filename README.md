# Proyecto final: Analisis de informacion - coronavirus

Proyecto final de la materia de Ingeniería de Aplicaciones Web.

## Composición del proyecto:

La el proyecto consta de 4 paginas:

- Home:
  Es la página inicial a la cual el usuario accede. Consta de un breve resumen sobre el coronavirus, formas de contagio y maneras de prevenirlo.

- Noticias:
  Esta página le provee al usuario las noticias más recientes sobre el COVID-19 posteadas desde las cuentas oficiales de los diarios más reconocidos de Argentina, España y Estados Unidos.
  El objetivo de esta página es brindar un panorama general de diferentes puntos del mundo desde fuentes confiables e información objetiva.

- Análisis:
  Esta sección nos muestra diferentes análisis obtenidos de data relacionada con los casos de covid en el mundo utilizando una API y datos obtenidos a partir de tweets.
  Esta es la página central y la recuperación de información se basa en dos sectores: tweets y informacion recuperada de la API de covid19.mathdro.id

  Informacion obtenida por API de covid19.mathdro.id:

  - Cantidad de muertes, recuperaciones y confirmados por covid-19 hasta la fecha
  - Línea cronológica de los casos de confirmados y muertes desde el 2020.
  - Un gráfico más detallado que nos permite visualizar la cantidad de muertes, recuperaciones y confirmados por covid-19 por país.
  - Un gráfico mundial que nos muestra cuáles países poseen mayores muertes en proporción a los pacientes confirmados.

  Información obtenida por API de twitter:

  - Los Hashtags más utilizados por las personas que postean tweets relacionados con el coronavirus.
  - Análisis de la información de tweets posteada separando por tweets positivos negativos y neutrales.
  - Un registro de la cantidad de tweets obtenidos por la api en comparación a los días anteriores.

- Mundo:
  Permite al usuario realizar una busqueda geografica de tweets posteados que mencionan diferentes tópicos como el covid-19 con un máximo de 100 km. El objetivo de esa pagina es obtener mayor información de tweets en una determinada zona filtrando por una conjunción de palabras claves.
