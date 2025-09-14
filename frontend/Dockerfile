FROM node:20-alpine
RUN apk add --no-cache curl
WORKDIR /app
COPY . .
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL}
RUN npm install react-router-dom
RUN npm install --legacy-peer-deps && npm run build
EXPOSE 8080
CMD ["npx", "http-server", "build", "-p", "8080", "--spa", "--gzip", "--brotli"]
