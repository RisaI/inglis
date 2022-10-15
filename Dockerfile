FROM node:18-alpine as build
WORKDIR /app
RUN apk update && apk add yarn git curl build-base
COPY static/ ./static/
COPY [ "cmudict.txt", "package.json", "svelte.config.js", "tsconfig.json", "vite.config.ts", "yarn.lock", "./" ]
COPY src/ ./src/
RUN yarn && yarn build

FROM node:18-alpine as run
WORKDIR /app
COPY [ "cmudict.txt", "package.json", "./" ]
COPY --from=build /app/build/ .
CMD [ "node", "index.js" ]
