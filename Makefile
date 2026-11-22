devcontainer_dir := .devcontainer
open_devcontainer := $(devcontainer_dir)/scripts/open-devcontainer/open-devcontainer.sh

# ステージ名（FROM ... AS や COPY --from= の名前）を拾わないよう、ダイジェストで固定したイメージの参照だけを取り出す
base_images = $(shell grep -ohE '[^[:space:]=]+@sha256:[0-9a-f]{64}' $(devcontainer_dir)/*/Dockerfile)

.PHONY: dev-infra dev-portfolio rebuild-infra rebuild-portfolio clean-docker

dev-infra:
	$(open_devcontainer) infra

dev-portfolio:
	$(open_devcontainer) portfolio

# Dev Containers は動いているコンテナがあればそのまま使い、止まっているコンテナがあれば build を飛ばすため、消しておいて次に開くときに build と作成をやり直させる
# https://github.com/devcontainers/cli/blob/v0.90.0/src/spec-node/dockerCompose.ts#L63
# https://github.com/devcontainers/cli/blob/v0.90.0/src/spec-node/dockerCompose.ts#L395
rebuild-infra rebuild-portfolio:
	docker compose rm --stop --force $(patsubst rebuild-%,%,$@)

clean-docker:
	docker compose down --rmi local --volumes --remove-orphans
# まだ取得していないイメージで No such image のエラーを出さないよう、あるものだけを消す
	for image in $(base_images); do \
		if docker image inspect "$$image" >/dev/null 2>&1; then docker image rm "$$image" || exit; fi; \
	done
# 1 回の問い合わせで 50 件までしか返さないため、それより多いと 1 回では消しきれない
# https://github.com/docker/buildx/blob/v0.37.2/commands/history/utils.go#L26
	refs=$$(docker buildx history ls --local --format '{{.Ref}}') && \
		if [ -n "$$refs" ]; then docker buildx history rm $$refs; fi
