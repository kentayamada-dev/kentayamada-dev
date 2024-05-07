FROM debian:bookworm-slim

ARG USER_NAME
ARG UID
ARG HOME=/home/$USER_NAME
ARG WORKSPACE=$HOME/workspaces/github-profile

COPY ../.misc/scripts/setup_user.sh ./setup_user.sh

RUN apt update && apt --yes install --no-install-recommends git ca-certificates zsh python3-venv make chromium chromium-browser \
  && chmod +x ./setup_user.sh && ./setup_user.sh $UID $USER_NAME $HOME \
  && install --directory --owner=$USER_NAME $WORKSPACE/.venv

USER $USER_NAME
