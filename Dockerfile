# ---- Build Stage ----
FROM node:alpine AS build
WORKDIR /app

# Define los argumentos de construcción
ARG VITE_APP_API_URL
ARG VITE_FILE_API_URL
ARG VITE_COOPTECH_URL

# Establece las variables de entorno usando los argumentos de construcción
ENV VITE_APP_API_URL=$VITE_APP_API_URL
ENV VITE_FILE_API_URL=$VITE_FILE_API_URL
ENV VITE_COOPTECH_URL=$VITE_COOPTECH_URL


COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ---- Runtime Stage ----
FROM nginx:alpine AS runtime
COPY --from=build /app/dist /usr/share/nginx/html

# Opcional: Copia una configuración personalizada de Nginx si es necesario
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
