# terraform init がプロバイダーとモジュールの取得に使う CA 証明書と git が入っており、apt で入れずに済むため（apt で入れると hadolint が版の固定を求める）
# https://github.com/docker-library/buildpack-deps/blob/1f4fe499c668d9a2e1578aa8db4f0b2d14482cf5/debian/trixie/scm/Dockerfile
FROM buildpack-deps:trixie-scm@sha256:4f34e1d673fdb65371de9f88bdd32c4e30152fe692b35604aef5c0b3c0e6da10

LABEL org.opencontainers.image.title="infra" \
  org.opencontainers.image.description="infra の Dev Container" \
  org.opencontainers.image.source="https://github.com/kentayamada-dev/kentayamada-dev" \
  org.opencontainers.image.licenses="MIT"

# Terraform の版はここだけで管理する。Renovate がタグとダイジェストを更新できるよう、公式イメージから取り出す
# https://github.com/renovatebot/renovate/blob/44.151.1/lib/modules/manager/dockerfile/readme.md
COPY --from=hashicorp/terraform:1.17.1@sha256:a5d5a5a892c98f60fcbfa81eac2a40fc19e7b3fa7719bccae10ff6111d22524a /bin/terraform /usr/local/bin/terraform

# 次の ARG を足すときは、compose.yaml の infra の build.args にも値を足す
ARG USER_NAME
ARG HISTORY_DIR

# compose.yaml でマウントする空のボリュームには、Docker がこのディレクトリを所有者ごとコピーするため、sudo なしでもこのユーザーが書き込める
# https://github.com/moby/moby/blob/3f38b15147b14ce0ce7b11558a1aa9e9f14db103/daemon/container/container_unix.go#L386-L400
# bash は exit や SIGHUP では履歴を書くが、端末を開いたままコンテナを止めると書かずに終わるため、コマンドごとに書き出す
RUN useradd --create-home --user-group --shell /bin/bash "$USER_NAME" \
  && mkdir -p "$HISTORY_DIR" \
  && chown "$USER_NAME:$USER_NAME" "$HISTORY_DIR" \
  && echo "export PROMPT_COMMAND='history -a' HISTFILE=$HISTORY_DIR/.bash_history" >>"/home/$USER_NAME/.bashrc"
USER $USER_NAME
