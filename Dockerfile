FROM node:22-alpine AS build
RUN corepack enable
WORKDIR /app
COPY static/ ./static/
COPY [ "cmudict.txt", "package.json", "svelte.config.js", "tsconfig.json", "vite.config.ts", "pnpm-lock.yaml", "./" ]
COPY src/ ./src/
RUN pnpm i && pnpm build

FROM node:22-alpine AS run
WORKDIR /app
COPY [ "cmudict.txt", "package.json", "./" ]
COPY --from=build /app/build/ .
CMD [ "node", "index.js" ]
