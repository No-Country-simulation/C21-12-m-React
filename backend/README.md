
# Documentación: Configuración y Uso de Prisma

## Requisitos previos
Asegúrate de tener las siguientes herramientas instaladas en tu sistema:

- **Node.js**: [Descargar Node.js](https://nodejs.org)
- **PostgreSQL**: [Descargar PostgreSQL](https://www.postgresql.org/download/)
- **Yarn o npm**: Yarn se recomienda, pero también puedes usar npm.
  
## Instalación de dependencias

1. Abre una terminal en el directorio del proyecto.
2. Ejecuta uno de los siguientes comandos para instalar las dependencias necesarias:

### Instalación con Yarn:
```bash
yarn add @prisma/client express
yarn add -D prisma @types/express typescript ts-node nodemon @types/node
```

### Instalación con npm:
```bash
npm install @prisma/client express
npm install --save-dev prisma @types/express typescript ts-node nodemon @types/node
```

## Inicializar Prisma

Después de instalar Prisma, debes inicializarlo para generar el esquema de la base de datos:

1. Ejecuta el siguiente comando para inicializar Prisma con PostgreSQL como base de datos.

```bash
npx prisma init
```

Esto creará un directorio `prisma` con un archivo `schema.prisma` y un archivo `.env` donde se almacenará la URL de conexión de la base de datos.

2. Configura la URL de conexión en el archivo `.env`:

```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombredb?schema=public"
```

## Configuración del esquema de Prisma

En el archivo `schema.prisma`, define tus modelos de datos. Por ejemplo:

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
}
```

## Migraciones con Prisma

Una vez que hayas definido tus modelos, puedes crear y aplicar migraciones para reflejar los cambios en la base de datos.

### Crear una migración:

```bash
yarn prisma:migrate
```

Este comando genera una nueva migración que refleja los cambios realizados en el esquema.

### Sincronizar la base de datos (push):

Si solo quieres sincronizar el esquema sin crear una migración (útil en desarrollo), puedes usar:

```bash
yarn prisma:db-push
```

## Generar el cliente de Prisma

Para generar el cliente de Prisma que usarás en tu código para interactuar con la base de datos, ejecuta:

```bash
yarn prisma:generate
```

Esto generará el cliente en `node_modules/.prisma/client`.

## Explorar la base de datos con Prisma Studio

Prisma Studio te permite explorar y editar tus datos de manera visual. Para abrir Prisma Studio, ejecuta:

```bash
yarn prisma:studio
```

## Uso de Prisma en el proyecto


- **Generar cliente Prisma:** `yarn prisma:generate`
- **Ejecutar migraciones:** `yarn prisma:migrate`
- **Sincronizar base de datos:** `yarn prisma:db-push`
- **Abrir Prisma Studio:** `yarn prisma:studio`

---


