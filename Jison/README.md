# JisonApp

Proyecto base con **Node.js**, **TypeScript**, **Express** y soporte para **Jison**.

## Requisitos previos

Asegúrate de tener instalado:

- Node.js
- npm

## Configuración inicial del proyecto

### 1. Inicializar proyecto Node.js

```bash
npm init -y
```

### 2. Instalar TypeScript y dependencias de desarrollo

```bash
npm install typescript ts-node @types/node --save-dev
```

### 3. Inicializar configuración de TypeScript

```bash
npx tsc --init
```

### 4. Instalar Nodemon globalmente

```bash
npm install -g nodemon
```

## Instalación de dependencias principales

### 5. Instalar Express

```bash
npm install express
npm install @types/express
```

### 6. Instalar CORS

```bash
npm install cors
npm install @types/cors --save-dev
```

### 7. Instalar Dotenv

```bash
npm install dotenv
npm install --save-dev @types/dotenv
```

## Instalación del proyecto al clonar el repositorio

Si el proyecto ya fue creado y solo lo clonaste, ejecuta:

```bash
npm install
```

## Generación del parser con Jison

Si el proyecto utiliza un archivo `.jison` y el parser no está incluido en el repositorio, debes generarlo con:

```bash
npm run parse
```

## Ejecución del proyecto

Para correr el proyecto en modo desarrollo:

```bash
npm run dev
```

## Notas

- `node_modules` no debe subirse al repositorio.
- El archivo `.env` tampoco debe subirse.
- Si usas Jison, lo ideal es ignorar el parser generado y reconstruirlo con `npm run parse`.

## Comandos útiles resumidos

```bash
npm init -y
npm install typescript ts-node @types/node --save-dev
npx tsc --init
npm install -g nodemon
npm install express
npm install @types/express
npm install cors
npm install @types/cors --save-dev
npm install dotenv
npm install --save-dev @types/dotenv
```
