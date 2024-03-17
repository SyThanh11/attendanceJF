# Sử dụng image golang với tag là một phiên bản cụ thể
FROM golang:1.21-alpine as build

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Copy toàn bộ mã nguồn Golang vào thư mục /app trong container
COPY . .

# Build ứng dụng Golang
RUN go build -o main .

# Sử dụng image scratch (image trống) làm base image để giảm kích thước
FROM scratch

# Copy file binary đã build từ stage trước vào container
COPY --from=build /app/main /

# CMD để chạy binary khi container được chạy
CMD ["/main"]

# # Cài đặt wait-for-it sử dụng apk
# RUN apk add --no-cache bash
# COPY wait-for-it.sh /usr/local/bin/wait-for-it
# RUN chmod +x /usr/local/bin/wait-for-it
