# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json pnpm-workspace.yaml ./
COPY apps ./apps
COPY packages ./packages
RUN npm install -g pnpm && pnpm install
ARG SUPABASE_URL
ARG SUPABASE_ANON_KEY
ENV SUPABASE_URL=$SUPABASE_URL
ENV SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY
RUN pnpm --filter profile build

# Production stage
FROM nginx:alpine
COPY --from=build /app/apps/profile/dist/ /usr/share/nginx/html
