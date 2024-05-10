FROM debian:bookworm-slim

ARG USER_NAME
ARG UID
ARG HOME=/home/$USER_NAME
ARG WORKSPACE=$HOME/workspaces/github-profile

COPY ../.misc/scripts/setup_user.sh ./setup_user.sh
COPY ../.misc/scripts/install_software_packages.sh ./install_software_packages.sh

RUN chmod +x ./setup_user.sh && ./setup_user.sh $UID $USER_NAME $HOME \
  && chmod +x ./install_software_packages.sh && ./install_software_packages.sh git ca-certificates zsh \
  && install --directory --owner=$USER_NAME $WORKSPACE/.venv

USER $USER_NAME
