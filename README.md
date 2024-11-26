
# Gestión de Superhéroes - Backend

Este proyecto es un sistema backend para la gestión de superhéroes, diseñado con **Node.js** y **MongoDB**. 
Implementa un diseño modular y escalable, utilizando **Express** para la gestión de rutas y **Mongoose** como ORM para la base de datos.

## Descripción del Proyecto

El sistema permite realizar operaciones CRUD sobre superhéroes con las siguientes funcionalidades:
- Registro de nuevos superhéroes.
- Consulta y búsqueda de superhéroes.
- Actualización de datos existentes.
- Eliminación de registros.

El código sigue un diseño por capas para garantizar la separación de responsabilidades:
- **Configuración:** Conexión a la base de datos.
- **Modelos:** Definición de la estructura de datos.
- **Repositorios:** Capa de persistencia con acceso directo a la base de datos.
- **Servicios:** Lógica de negocio.
- **Controladores:** Gestión de solicitudes HTTP.
- **Rutas:** Definición de endpoints.

## Estructura del Proyecto

```
src/
├── config/
│   └── dbConfig.mjs           # Configuración de la conexión a MongoDB
├── models/
│   └── SuperHero.mjs          # Definición del modelo SuperHero
├── repositories/
│   ├── IRepository.mjs        # Interfaz CRUD
│   └── SuperHeroRepository.mjs # Implementación de los métodos CRUD
├── services/
│   └── superheroesService.mjs # Lógica de negocio
├── controllers/
│   └── superheroesController.mjs # Controladores HTTP
├── routes/
│   └── superHeroRoutes.mjs    # Rutas de la API
├── views/
│   └── responseView.mjs       # Formateo de respuestas
└── app.mjs                    # Archivo principal del servidor
```

## Tecnologías Utilizadas

- **Node.js**
- **Express.js**
- **MongoDB** con **Mongoose**
- **JavaScript (ES6)**

## Instalación y Ejecución

1. Clona este repositorio:
   ```bash
   git clone https://github.com/usuario/repositorio-superheroes.git
   cd repositorio-superheroes
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura la base de datos en `src/config/dbConfig.mjs` reemplazando el URI con tus credenciales de MongoDB.

4. Ejecuta el servidor:
   ```bash
   npm start
   ```

5. Accede al servidor en [http://localhost:3000/api/heroes](http://localhost:3000/api/heroes).

## Endpoints Principales

- **GET /api/heroes**: Obtiene todos los superhéroes.
- **GET /api/heroes/:id**: Obtiene un superhéroe por su ID.
- **POST /api/heroes**: Crea un nuevo superhéroe.
- **PUT /api/heroes/:id**: Actualiza un superhéroe existente.
- **DELETE /api/heroes/:id**: Elimina un superhéroe.

## Mejoras Futuras

- Implementar paginación en los resultados.
- Agregar autenticación y autorización para los endpoints.
- Incluir pruebas automatizadas.

---

### Autor
Lucas Nieto

Este proyecto fue desarrollado como parte de un trabajo práctico para practicar el diseño de sistemas backend con Node.js y MongoDB.
