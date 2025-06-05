FROM golang:1.21-alpine AS builder
WORKDIR /app

# Install dependencies
COPY apps/payments/go.mod apps/payments/go.sum ./
RUN go mod download

# Copy source code and build
COPY apps/payments/ .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

# Final stage
FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/

COPY --from=builder /app/main .

EXPOSE 3003

CMD ["./main"]
