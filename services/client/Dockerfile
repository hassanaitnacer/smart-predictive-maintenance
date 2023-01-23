# syntax=docker/dockerfile:1.4

FROM --platform=$BUILDPLATFORM node:lts AS development

WORKDIR /app
COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install
COPY . .

ENV CI=true

CMD [ "yarn", "run", "dev" ]

FROM development AS dev-envs
RUN <<EOF
apt-get update
apt-get install -y git
EOF

RUN <<EOF
useradd -s /bin/bash -m vscode
groupadd docker
usermod -aG docker vscode
EOF
# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /
CMD [ "yarn", "run", "dev" ]

FROM development AS build

RUN yarn run build

FROM nginx:1.13-alpine

COPY --from=build /app/dist /usr/share/nginx/html