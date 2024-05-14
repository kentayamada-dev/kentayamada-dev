FROM debian:bookworm-slim

ARG USER_NAME
ARG UID
ARG NODE_VERSION
ARG PNPM_VERSION
ARG HOME=/home/$USER_NAME
ARG WORKSPACE=$HOME/workspaces/portfolio
ARG PNPM_HOME=$HOME/.local/share/pnpm

ENV PATH=$PNPM_HOME:${PATH}

COPY ../.misc/scripts/setup_user.sh ./setup_user.sh
COPY ../.misc/scripts/install_dev_packages.sh ./install_dev_packages.sh

RUN chmod +x ./install_dev_packages.sh && ./install_dev_packages.sh curl \
  && curl -fsSL https://get.pnpm.io/install.sh | env PNPM_VERSION=$PNPM_VERSION SHELL=/bin/zsh zsh - \
  && pnpm env use --global $NODE_VERSION && pnpm config set store-dir $HOME/.pnpm-store \
  && chmod +x ./setup_user.sh && ./setup_user.sh $UID $USER_NAME $HOME \
  && chown --recursive $USER_NAME $HOME && install --directory --owner=$USER_NAME $WORKSPACE/node_modules

USER $USER_NAME
