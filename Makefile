open_devcontainer := .devcontainer/scripts/open-devcontainer/open-devcontainer.sh

.PHONY: dev-portfolio

dev-portfolio:
	$(open_devcontainer) portfolio
