FROM node:20-alpine
WORKDIR /app
COPY . .
ARG VITE_BACKEND_URL
RUN echo "VITE_BACKEND_URL=${VITE_BACKEND_URL}" > .env
RUN npm install && npm run build
EXPOSE 8080
CMD ["npx", "http-server", "dist", "-p", "8080"]
