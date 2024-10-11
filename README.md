# C21-12-m-React

Este repositorio contiene tanto el **frontend** como el **backend** de la aplicación. Utilizamos **Yarn Workspaces** para gestionar las dependencias de manera eficiente entre ambos paquetes.

## Estructura del Proyecto

- **frontend/**: Código del frontend desarrollado con [Vite](https://vitejs.dev/) y React.
- **backend/**: Código del backend desarrollado con [Express](https://expressjs.com/) y TypeScript.
- **design/**: Contiene los diseños y recursos gráficos. **Esta carpeta no es necesaria** para ejecutar la aplicación.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes componentes:

- [Node.js](https://nodejs.org/) versión 16 o superior.
- [Yarn](https://yarnpkg.com/) como gestor de dependencias (recomendado).

## Instalación de Dependencias

Para instalar todas las dependencias del proyecto, sigue los siguientes pasos:

1. Clona este repositorio:

   ```bash
   git clone https://github.com/No-Country-simulation/C21-12-m-React.git
   ```

2. Instala las dependencias del backend:

   ```bash
   cd backend
   yarn install
   # O alternativamente con npm
   npm install
   ```

3. Instala las dependencias del frontend:

   ```bash
   cd ../frontend
   yarn install
   # O alternativamente con npm
   npm install
   ```

## Puesta en Marcha

1. Inicia el backend:

   ```bash
   cd backend
   yarn start
   ```

2. Inicia el frontend:

   ```bash
   cd ../frontend
   yarn dev
   ```

## Notas

- Si tienes algún problema con las dependencias, asegúrate de estar utilizando la versión correcta de Node.js.
- Para contribuir o sugerir cambios, abre un pull request en este repositorio.
