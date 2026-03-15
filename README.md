# Proyecto de Optimizacion sobre Grafos

## Descripcion general
Este proyecto resuelve un caso academico de optimizacion sobre una red dirigida construida a partir del archivo `matriz_de_datos2.csv`. La misma red se analiza desde tres perspectivas clasicas de optimizacion:

1. `Flujo al costo minimo`
2. `Flujo maximo`
3. `Ruta mas corta`

El desarrollo principal esta en el notebook `ProyectoOpti1.ipynb`, que ademas incluye visualizaciones del grafo, comentarios explicativos y analisis de sensibilidad mediante cambios manuales sobre arcos especificos.

El documento `Enunciado.pdf` contiene el planteamiento original del problema y sirve como marco conceptual del proyecto.

## Objetivo del proyecto
El objetivo es modelar una red de transporte o distribucion y estudiar como se comporta bajo distintos criterios de decision:

- minimizar el costo total de transporte;
- maximizar la cantidad total de flujo que puede atravesar la red;
- encontrar las rutas de menor distancia hacia nodos destino de interes.

Ademas, el proyecto incorpora cambios puntuales sobre la red para observar si las soluciones mejoran, es decir, incluye una capa de `analisis de sensibilidad`.

## Estructura del repositorio
El proyecto contiene tres archivos principales:

- `ProyectoOpti1.ipynb`: notebook principal con la implementacion y las visualizaciones.
- `matriz_de_datos2.csv`: matriz base de arcos y atributos de la red.
- `Enunciado.pdf`: enunciado del trabajo.

## Fuente de datos
La red se define a partir de una matriz de arcos con las siguientes columnas:

- `Origen`: nodo de salida del arco.
- `Destino`: nodo de llegada del arco.
- `Costo`: costo asociado a usar ese arco.
- `Distancia`: longitud o peso usado en el problema de ruta mas corta.
- `Capacidad`: cantidad maxima de flujo que puede pasar por el arco.

Cada fila del archivo representa una conexion dirigida `Origen -> Destino`.

## Idea general del notebook
El notebook sigue una secuencia logica:

1. importar librerias;
2. cargar y limpiar los datos;
3. construir el grafo dirigido;
4. identificar fuentes, sumideros e intermedios;
5. dibujar el grafo base;
6. resolver cada modelo de optimizacion;
7. aplicar cambios de sensibilidad;
8. comparar e interpretar visualmente los resultados.

## Componentes principales

### 1. Construccion del grafo
La red se crea como un `DiGraph` de `networkx` usando los atributos del CSV. En esta etapa se hace tambien:

- limpieza de columnas;
- conversion de tipos;
- clasificacion automatica de nodos:
  - `Fuentes`: nodos sin entrada;
  - `Sumideros`: nodos sin salida;
  - `Intermedios`: nodos internos de la red.

Tambien se calcula una disposicion por columnas para que la visualizacion del grafo sea mas legible.

### 2. Visualizacion del grafo
El notebook incluye una funcion de visualizacion reutilizable que:

- dibuja todo el grafo;
- diferencia visualmente fuentes, intermedios y sumideros;
- resalta en rojo aristas y nodos usados en una solucion;
- muestra informacion al pasar el mouse sobre arcos y nodos;
- en los modelos de flujo, muestra cuanto flujo sale de las fuentes y cuanto llega a los sumideros.

Esto hace que la interpretacion sea mucho mas visual y pedagogica.

### 3. Modelo de flujo al costo minimo
Este modelo busca mover exactamente `600` unidades por la red al menor costo posible.

#### Funcion objetivo
Minimizar la suma del flujo enviado por cada arco multiplicado por su costo.

#### Restricciones principales

- el flujo por un arco no puede superar su capacidad;
- en nodos intermedios se cumple conservacion de flujo;
- el total enviado desde las fuentes debe ser exactamente `600`;
- al menos `120` unidades deben llegar al nodo `80`.

Esa ultima restriccion garantiza que llegue por lo menos el `20%` del flujo total al nodo `80`, ya que:

- `20% de 600 = 120`

En el notebook esto se implementa explicitamente, por lo que no es una suposicion sino una condicion obligatoria del modelo.

### 4. Modelo de flujo maximo
Este modelo ignora los costos y se concentra unicamente en las capacidades.

La idea es calcular cuanto flujo total puede atravesar la red desde todas las fuentes hasta todos los sumideros.

Para resolverlo de forma estandar se agrega:

- una `superfuente S`, conectada a todas las fuentes;
- un `supersumidero T`, conectado a todos los sumideros.

Luego se usa el algoritmo de flujo maximo de `networkx`.

### 5. Modelo de ruta mas corta
Este modelo usa el atributo `Distancia`.

En la version actual del notebook, se calcula la ruta mas corta:

- desde el nodo `1`
- hacia los destinos `78`, `79` y `80`

Es decir, no se escoge solo una ruta final, sino que se obtiene una ruta optima independiente para cada destino.

Despues, el notebook dibuja una visualizacion separada para cada una de esas tres rutas.

## Analisis de sensibilidad
El proyecto incorpora cambios manuales para observar como responden los modelos.

### Cambio en costo minimo
Se reduce el costo del arco:

- `62 -> 78`

Objetivo: volver ese enlace mas atractivo dentro del modelo de costo minimo.

### Cambio en flujo maximo
Se aumentan las capacidades de:

- `63 -> 46`
- `63 -> 17`
- `23 -> 59`

Objetivo: probar si ampliar esos enlaces aumenta el flujo total transportable.

### Cambio en ruta mas corta
Se reduce la distancia del arco:

- `6 -> 14`

Objetivo: verificar si acortar ese tramo mejora las rutas desde `1` hasta `78`, `79` y `80`.

## Nota importante sobre estos cambios
Los cambios de sensibilidad del notebook son `cambios dirigidos`, es decir, se escogen como pruebas razonables sobre arcos interesantes de la red.

Eso significa que:

- si pueden mejorar una solucion;
- pero no demuestran automaticamente que sean `los mejores cambios posibles`.

Para garantizar eso haria falta un analisis mas exhaustivo sobre muchos candidatos o una formulacion especifica de optimizacion de mejoras de red.

## Dependencias
El notebook usa principalmente:

- `pandas`
- `networkx`
- `pulp`
- `numpy`
- `IPython.display`

Si vas a ejecutarlo en un entorno nuevo, asegúrate de tener estas librerias instaladas.

Ejemplo:

```bash
pip install pandas networkx pulp numpy ipython
```

## Como ejecutar el proyecto
La forma recomendada de trabajar este proyecto es abrir el notebook y ejecutarlo en orden, de arriba hacia abajo.

### Orden sugerido

1. ejecutar la carga de librerias;
2. ejecutar la carga del CSV;
3. ejecutar la construccion del grafo;
4. ejecutar cada bloque de optimizacion en el orden del notebook.

### Muy importante
Las celdas de sensibilidad y de optimizacion usan la variable `G`, que representa el grafo ya construido.

Si intentas correr una celda aislada antes de construir `G`, apareceran errores como:

```python
NameError: name 'G' is not defined
```

Si eso pasa:

1. reinicia el kernel;
2. ejecuta el notebook desde arriba.

## Que entrega conceptualmente este proyecto
Este proyecto no construye una aplicacion web ni una API; construye un `analisis de decision sobre una red`.

En otras palabras, responde:

- por donde conviene mover flujo si se quiere gastar menos;
- cuanto flujo maximo soporta la red;
- cual es la ruta mas corta desde un origen hacia destinos especificos;
- como cambian esas respuestas cuando se modifica la red.

## Interpretacion de resultados
Las salidas del notebook permiten observar:

- arcos con flujo positivo;
- valor objetivo del costo minimo;
- valor del flujo maximo;
- rutas mas cortas y su distancia;
- grafo completo resaltando las aristas usadas.

Gracias a la visualizacion interactiva, al pasar el mouse por un arco se puede consultar:

- costo;
- distancia;
- capacidad;
- flujo, cuando aplique.

Y al pasar el mouse por nodos relevantes, se puede ver:

- rol del nodo;
- flujo que entra o sale, cuando corresponda.

## Decisiones de diseño destacables

### Una sola red, varios problemas
La red base es la misma para todos los modelos. Lo que cambia es el criterio de optimizacion:

- `Costo`
- `Capacidad`
- `Distancia`

### Visualizacion orientada a explicacion
La forma de dibujar el grafo no es decorativa: organiza la red para facilitar la lectura y entender el papel de cada nodo.

### Notacion consistente
Los mismos nodos, arcos y atributos se mantienen a lo largo del notebook, lo que hace mas facil comparar resultados.

## Limitaciones actuales

- no hay un archivo `requirements.txt` o `environment.yml`;
- el analisis de sensibilidad no busca automaticamente el mejor cambio posible;
- el proyecto esta concentrado en un notebook, no en modulos Python separados;
- algunas salidas guardadas en el notebook pueden corresponder a ejecuciones anteriores, por lo que conviene re-ejecutar las celdas para ver resultados actualizados.

## Posibles mejoras futuras

- separar la logica del notebook en funciones o scripts Python;
- agregar `requirements.txt`;
- automatizar comparaciones `base vs modificado`;
- implementar un analisis sistematico de candidatos de sensibilidad;
- exportar resultados a tablas o reportes;
- agregar una seccion de conclusiones comparativas entre modelos.

## Resumen corto
Este proyecto analiza una red dirigida de transporte bajo tres enfoques de optimizacion: costo minimo, flujo maximo y ruta mas corta. El notebook principal construye el grafo desde un CSV, resuelve los modelos, aplica cambios de sensibilidad y visualiza de manera clara las soluciones obtenidas.
