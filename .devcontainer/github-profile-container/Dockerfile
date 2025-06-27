FROM debian:bookworm-slim AS dev

ARG USER_NAME
ARG UID
ARG HOME=/home/$USER_NAME
ARG WORKSPACE=$HOME/workspaces/github-profile

COPY ../.misc/scripts/setup_user.sh ./setup_user.sh
COPY ../.misc/scripts/install_dev_packages.sh ./install_dev_packages.sh

RUN chmod +x ./setup_user.sh && ./setup_user.sh $UID $USER_NAME $HOME \
  && chmod +x ./install_dev_packages.sh && ./install_dev_packages.sh python3-venv make chromium \
  && install --directory --owner=$USER_NAME $WORKSPACE/.venv

USER $USER_NAME

FROM debian:bookworm-slim AS prod

ARG CURRENT_DATETIME
ARG DEBUG
ARG GYAZO_ACCESS_TOKEN

WORKDIR /app

COPY ./github-profile /app

RUN apt update && apt --yes install --no-install-recommends python3-venv make chromium \
  && python3 -m venv ./.venv && . ./.venv/bin/activate \
  && make install && make run
