FROM golang:1.21-alpine as builder
WORKDIR /app
COPY . .
RUN go mod tidy && go build -o app .

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/app /app/app
RUN apk add --no-cache certbot
EXPOSE 8080
CMD ["/app/app"]
