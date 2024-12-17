# Используем Node.js для сборки приложения
FROM node:20 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Используем Node.js для обслуживания собранного приложения
FROM node:20 as production-stage
WORKDIR /app

# Копируем собранное приложение из build-stage
COPY --from=build-stage /app/dist /app/dist

# Устанавливаем сервер для обслуживания статических файлов
RUN npm install -g serve

# Команда для запуска serve и обслуживания приложения
CMD ["serve", "-s", "dist", "-l", "80"]

EXPOSE 80
