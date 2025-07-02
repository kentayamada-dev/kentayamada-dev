include .devcontainer/.env

.PHONY: email og clean ghp playground portfolio
email og:
	docker rm $@ 2>/dev/null || true && docker volume rm $@-node_modules 2>/dev/null || true && USER_NAME=${USER_NAME} USER_ID=${USER_ID} NODE_VERSION=${NODE_VERSION} PNPM_VERSION=${PNPM_VERSION} devcontainer up --config .devcontainer/$@-container/devcontainer.json

ghp:
	docker rm $@ 2>/dev/null || true && docker volume rm $@-pycache 2>/dev/null || true && USER_NAME=${USER_NAME} USER_ID=${USER_ID} devcontainer up --config .devcontainer/$@-container/devcontainer.json

playground portfolio:
	docker rm $@ 2>/dev/null || true && devcontainer up --config .devcontainer/$@-container/devcontainer.json

clean:
	docker ps -aq | xargs -r docker stop | xargs -r docker rm; DOCKER_API_VERSION=1.40 docker system prune -a -f --volumes
