FROM node:26.12.1-trixie@sha256:97fa0f1b59035c6072721a88d55be1371c7cb1cc942b521e1cc5c72ec87655f4

LABEL org.opencontainers.image.title="portfolio" \
  org.opencontainers.image.description="portfolio の Dev Container" \
  org.opencontainers.image.source="https://github.com/kentayamada-dev/kentayamada-dev" \
  org.opencontainers.image.licenses="MIT"

# pnpm の版はここだけで管理する
# Renovate の customManagers:dockerfileVersions は、renovate: のコメントのすぐ次の行の ARG しか読まないため、間に行を入れない
# renovate: datasource=npm depName=pnpm
ARG PNPM_VERSION=12.18.0
# Takumi Guard のレジストリから取得する
RUN npm install --global --registry=https://npm.flatt.tech/ "pnpm@${PNPM_VERSION}"

# 次の ARG を足すときは、compose.yaml の portfolio の build.args にも値を足す
ARG USER_NAME
ARG HISTORY_DIR
ARG NODE_MODULES_DIR

# compose.yaml でマウントする空のボリュームには、Docker がこのディレクトリを所有者ごとコピーするため、sudo なしでもこのユーザーが書き込める
# https://github.com/moby/moby/blob/3f38b15147b14ce0ce7b11558a1aa9e9f14db103/daemon/container/container_unix.go#L386-L400
# bash は exit や SIGHUP では履歴を書くが、端末を開いたままコンテナを止めると書かずに終わるため、コマンドごとに書き出す
RUN useradd --create-home --user-group --shell /bin/bash "$USER_NAME" \
  && mkdir -p "$HISTORY_DIR" "$NODE_MODULES_DIR" \
  && chown "$USER_NAME:$USER_NAME" "$HISTORY_DIR" "$NODE_MODULES_DIR" \
  && echo "export PROMPT_COMMAND='history -a' HISTFILE=$HISTORY_DIR/.bash_history" >>"/home/$USER_NAME/.bashrc"
USER $USER_NAME
