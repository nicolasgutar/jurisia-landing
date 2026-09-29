# Stage 1: build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: serve with nginx
FROM nginx:alpine
# Templates are rendered into /etc/nginx/conf.d/ at container start by the
# image's entrypoint (envsubst), filling in the variables below.
COPY nginx/default.conf.template nginx/app-proxy.inc.template /etc/nginx/templates/
# APP_UPSTREAM(_HOST): the App (chat-jurisprudencia) Cloud Run service that
#   serves /blog and /jurisprudencia. Override both to test against a local
#   App dev server.
# NGINX_ENTRYPOINT_LOCAL_RESOLVERS: exposes the container's DNS server as
#   ${NGINX_LOCAL_RESOLVERS} for the `resolver` directive.
# NGINX_ENVSUBST_FILTER: only substitute our variables, never nginx's own
#   ($host, $uri, ...).
ENV APP_UPSTREAM=https://ssjurisprudencia-kuoo3pwqtq-uc.a.run.app \
    APP_UPSTREAM_HOST=ssjurisprudencia-kuoo3pwqtq-uc.a.run.app \
    NGINX_ENTRYPOINT_LOCAL_RESOLVERS=1 \
    NGINX_ENVSUBST_FILTER="APP_UPSTREAM|NGINX_LOCAL_RESOLVERS"
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
