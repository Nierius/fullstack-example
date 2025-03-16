FROM node:20 AS build

WORKDIR /usr/src/app

COPY package*.json .

RUN npm ci
COPY . .

RUN npm run build --omit=dev

FROM nginx:alpine

COPY --from=build usr/src/app/dist/fullstack-ui/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

