open_devcontainer := .devcontainer/scripts/open-devcontainer/open-devcontainer.sh

.PHONY: dev-infra dev-portfolio

dev-infra:
	$(open_devcontainer) infra

dev-portfolio:
	$(open_devcontainer) portfolio
