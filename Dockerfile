# ---- Build Stage ----
FROM node:alpine AS build
WORKDIR /app

COPY package.json .
COPY package-lock.json .

# Instala las dependencias de desarrollo para poder ejecutar Vite
RUN npm install

COPY . .
RUN npm run build

# ---- Runtime Stage ----
FROM node:alpine AS runtime
WORKDIR /app

# Instala serve para servir la aplicación
RUN npm install -g serve

# Copia los archivos construidos desde la etapa de construcción
COPY --from=build /app/dist /app/dist

EXPOSE 8082
CMD ["serve", "-s", "dist", "-l", "8082"]
