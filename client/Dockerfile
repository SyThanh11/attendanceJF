# Sử dụng image node với tag là một phiên bản cụ thể
FROM node:20-alpine as build

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Copy toàn bộ mã nguồn vào thư mục /app trong container
COPY . .

# Copy file package.json và package-lock.json nếu có, sau đó chạy yarn install để cài đặt dependencies
COPY package*.json ./
RUN apk add --no-cache bash
RUN apk add --no-cache curl
RUN curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version 1.22.5
RUN yarn install

# Build ứng dụng ReactJS
RUN npm run build

# Sử dụng image nginx để chạy ứng dụng đã build
FROM nginx:alpine

# Copy các file cần thiết từ build stage vào thư mục của nginx
COPY --from=build /app/dist /usr/share/nginx/html

# EXPOSE cổng 80 cho ứng dụng web
EXPOSE 80

# CMD để khởi động nginx khi container được chạy
CMD ["nginx", "-g", "daemon off;"]
