# Etapa 1: Compilación
FROM node:20 AS builder
# Usamos una imagen base de Node.js versión 18 para compilar el proyecto Angular

WORKDIR /app
# Establecemos el directorio de trabajo dentro del contenedor

COPY package*.json ./
# Copiamos los archivos package.json y package-lock.json (si existe) para instalar dependencias

RUN npm install
# Instalamos todas las dependencias necesarias del proyecto (Angular, herramientas, etc.)

COPY . .
# Copiamos el resto del código fuente del proyecto al contenedor

RUN npm run build:ssr
# Compilamos el proyecto en modo SSR (Server-Side Rendering)
# Esto genera el contenido dentro de la carpeta dist/PlataformaCafeteriaFront

# Etapa 2: Producción con Node.js
FROM node:20-alpine
# Usamos una imagen más liviana de Node.js (versión Alpine) para correr la aplicación en producción

WORKDIR /app
# Establecemos nuevamente el directorio de trabajo

# Copiamos desde la etapa anterior (builder) los archivos necesarios
COPY --from=builder /app/dist/PlataformaCafeteriaFront /app/dist/PlataformaCafeteriaFront
# Copiamos la carpeta compilada de Angular SSR

COPY --from=builder /app/node_modules /app/node_modules
# Copiamos los módulos de Node que ya instalamos en la etapa de compilación

COPY --from=builder /app/package.json /app/package.json
# Copiamos el package.json por si se necesita en ejecución (aunque en producción no se suele hacer `npm install` de nuevo)

EXPOSE 4000
# Expone el puerto 4000, que es donde el servidor de Angular SSR va a escuchar

CMD ["node", "dist/PlataformaCafeteriaFront/server/server.mjs"]
# Comando que ejecuta el servidor SSR generado por Angular (servidor Express.js por defecto)