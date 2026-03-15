# Proyecto de Optimizacion sobre Grafos

## Descripcion
Este proyecto analiza una red dirigida de transporte o distribucion a partir de una matriz de datos y resuelve tres problemas clasicos de optimizacion sobre la misma estructura:

- `Flujo al costo minimo`
- `Flujo maximo`
- `Ruta mas corta`

El caso esta contextualizado por el documento `Enunciado.pdf` y se desarrolla principalmente en el notebook `ProyectoOpti1.ipynb`.

## Archivos principales

- `ProyectoOpti1.ipynb`: notebook principal del proyecto.
- `matriz_de_datos2.csv`: datos base de la red.
- `Enunciado.pdf`: planteamiento del problema.

## Informacion de entrada
La red se construye a partir de un archivo CSV con arcos dirigidos. Cada registro contiene:

- `Origen`
- `Destino`
- `Costo`
- `Distancia`
- `Capacidad`

## Alcance funcional
El proyecto permite:

- cargar y representar una red dirigida;
- identificar nodos fuente, intermedios y sumideros;
- resolver un modelo de flujo al costo minimo;
- resolver un modelo de flujo maximo;
- calcular rutas mas cortas desde un origen hacia destinos especificos;
- aplicar cambios de sensibilidad sobre la red;
- visualizar las soluciones sobre el grafo completo.

## Modelos incluidos

### 1. Flujo al costo minimo
Determina como enviar un flujo total fijo por la red minimizando el costo total de transporte, respetando capacidades y restricciones del problema.

### 2. Flujo maximo
Determina la mayor cantidad total de flujo que puede circular desde las fuentes hasta los sumideros, considerando unicamente la estructura y las capacidades de la red.

### 3. Ruta mas corta
Determina las rutas de menor distancia desde el nodo origen definido en el notebook hacia los destinos de interes del caso.

## Analisis de sensibilidad
El notebook incluye modificaciones puntuales sobre arcos de la red para evaluar el efecto de cambios en:

- `Costo`
- `Capacidad`
- `Distancia`

Estas pruebas permiten comparar el comportamiento de la red antes y despues de ajustes concretos.

## Visualizacion
El proyecto incluye visualizaciones del grafo base y de las soluciones obtenidas para cada modelo.

Entre las funcionalidades visuales disponibles:

- diferenciacion de fuentes, intermedios y sumideros;
- resaltado en rojo de aristas utilizadas por una solucion;
- resaltado de nodos involucrados en rutas o flujos;
- visualizacion de resultados directamente sobre el grafo completo;
- informacion emergente al pasar el cursor sobre las aristas;
- informacion emergente al pasar el cursor sobre nodos relevantes.

## Informacion disponible al pasar el cursor

### En aristas
Segun el modelo y la visualizacion, al dejar el cursor sobre una arista se puede consultar:

- costo;
- distancia;
- capacidad;
- flujo, cuando aplica.

### En nodos
En nodos relevantes se puede consultar informacion como:

- tipo de nodo;
- rol dentro de una ruta;
- flujo que sale de una fuente;
- flujo que llega a un sumidero.

## Resultados que entrega
El proyecto permite obtener:

- valor optimo del flujo al costo minimo;
- red efectivamente utilizada por la solucion de costo minimo;
- valor total del flujo maximo;
- arcos con flujo positivo en la solucion de flujo maximo;
- rutas mas cortas por destino;
- visualizaciones comparables de cada resultado sobre la red completa.

## Requisitos de uso
Para trabajar el proyecto se necesita un entorno capaz de ejecutar notebooks de Jupyter y las dependencias habituales usadas en analisis de redes y optimizacion.

Se recomienda ejecutar el notebook en orden, desde el inicio, para asegurar que la red y los modelos queden correctamente cargados antes de correr las secciones de sensibilidad y optimizacion.

## Resumen
Este proyecto estudia una misma red desde tres enfoques de optimizacion y presenta sus resultados de forma visual e interactiva, permitiendo analizar tanto el comportamiento base de la red como el efecto de cambios de sensibilidad sobre arcos especificos.
