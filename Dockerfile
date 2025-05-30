FROM node:18 as build

WORKDIR /app

# Копируем зависимости из deep_fr/fediary
COPY ./fediary/package.json .
COPY ./fediary/package-lock.json .

RUN npm install --include=dev

# Копируем исходный код
COPY ./fediary/ .

# Собираем проект 
RUN npm run build

# Финальный образ с Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]