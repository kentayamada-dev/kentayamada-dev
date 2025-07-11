FROM debian:trixie-slim AS base

FROM base AS dev

ARG USER_NAME
ARG USER_ID
ARG NODE_VERSION
ARG PNPM_VERSION
ARG HOME=/home/$USER_NAME
ARG WORKSPACE=$HOME/workspaces/email
ARG PNPM_HOME=$HOME/.local/share/pnpm

ENV PATH=$PNPM_HOME:${PATH}

COPY ../.misc/scripts/setup_user.sh ./setup_user.sh
COPY ../.misc/scripts/install_dev_packages.sh ./install_dev_packages.sh

RUN chmod +x ./install_dev_packages.sh && ./install_dev_packages.sh curl \
  && curl -fsSL https://get.pnpm.io/install.sh | env PNPM_VERSION=$PNPM_VERSION SHELL=/bin/zsh zsh - \
  && pnpm env use --global $NODE_VERSION && pnpm config set store-dir $HOME/.pnpm-store \
  && chmod +x ./setup_user.sh && ./setup_user.sh $USER_ID $USER_NAME $HOME \
  && chown --recursive $USER_NAME $HOME && install --directory --owner=$USER_NAME $WORKSPACE/node_modules

USER $USER_NAME

FROM base AS prod

ARG NODE_VERSION
ARG PNPM_VERSION
ARG CLOUDFLARE_API_TOKEN

WORKDIR /app

COPY ./email /app

RUN apt update && apt --yes install --no-install-recommends ca-certificates curl \
  && curl -fsSL https://get.pnpm.io/install.sh | env PNPM_VERSION=$PNPM_VERSION SHELL=/bin/bash bash - \
  && . /root/.bashrc \
  && pnpm env use --global $NODE_VERSION && pnpm config set store-dir /root/.pnpm-store \
  && pnpm install \
  && CLOUDFLARE_API_TOKEN=$CLOUDFLARE_API_TOKEN pnpm run deploy
