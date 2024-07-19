# ---- Build Stage ----
    FROM node:alpine AS build
    WORKDIR /app
    
    COPY package*.json ./
    RUN npm install
    
    COPY . .
    RUN npm run build
    
    # ---- Runtime Stage ----
    FROM nginx:alpine AS runtime
    COPY --from=build /app/dist /usr/share/nginx/html
    
    # Opcional: Copia una configuración personalizada de Nginx si es necesario
    # COPY nginx.conf /etc/nginx/nginx.conf
    
    EXPOSE 8080
    CMD ["nginx", "-g", "daemon off;"]
