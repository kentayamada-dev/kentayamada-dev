FROM debian:trixie-slim AS base

FROM base AS init

ARG SYSTEM
ARG MKCERT_VERSION

WORKDIR /mkcert

RUN apt update && apt --yes install --no-install-recommends curl ca-certificates \
  && curl -fsSLo ./mkcert https://github.com/FiloSottile/mkcert/releases/download/v$MKCERT_VERSION/mkcert-v$MKCERT_VERSION-$SYSTEM \
  && chmod +x ./mkcert && ./mkcert -install && ./mkcert localhost

FROM base AS dev

ARG USER_NAME
ARG USER_ID
ARG NODE_VERSION
ARG PNPM_VERSION
ARG HOME=/home/$USER_NAME
ARG WORKSPACE=$HOME/workspaces/portfolio
ARG PNPM_HOME=$HOME/.local/share/pnpm

ENV PATH=$PNPM_HOME:${PATH}

COPY ../.misc/scripts/setup_user.sh ./setup_user.sh
COPY ../.misc/scripts/install_dev_packages.sh ./install_dev_packages.sh
COPY --from=init /mkcert $HOME/mkcert

RUN chmod +x ./install_dev_packages.sh && ./install_dev_packages.sh curl \
  && curl -fsSL https://get.pnpm.io/install.sh | env PNPM_VERSION=$PNPM_VERSION SHELL=/bin/zsh zsh - \
  && pnpm env use --global $NODE_VERSION && pnpm config set store-dir $HOME/.pnpm-store \
  && chmod +x ./setup_user.sh && ./setup_user.sh $USER_ID $USER_NAME $HOME \
  && chown --recursive $USER_NAME $HOME && install --directory --owner=$USER_NAME $WORKSPACE/node_modules

USER $USER_NAME

FROM base AS prod

ARG NODE_VERSION
ARG PNPM_VERSION
ARG VERCEL_TOKEN
ARG PROJECT_NAME
ARG CLEAN_VERCEL_CACHE

WORKDIR /app

COPY ./portfolio /app

RUN apt update && apt --yes install --no-install-recommends ca-certificates curl \
  && curl -fsSL https://get.pnpm.io/install.sh | env PNPM_VERSION=$PNPM_VERSION SHELL=/bin/bash bash - \
  && . /root/.bashrc \
  && pnpm env use --global $NODE_VERSION && pnpm config set store-dir /root/.pnpm-store \
  && if [ "$CLEAN_VERCEL_CACHE" = "true" ]; then pnpm dlx vercel cache purge --yes --token=$VERCEL_TOKEN; fi \
  && pnpm dlx vercel link --yes --project $PROJECT_NAME --token=$VERCEL_TOKEN \
  && pnpm dlx vercel pull --yes --environment=production --token=$VERCEL_TOKEN \
  && pnpm dlx vercel build --prod --token=$VERCEL_TOKEN \
  && pnpm dlx vercel deploy --prebuilt --prod --force --token=$VERCEL_TOKEN
