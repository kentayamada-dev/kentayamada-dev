.PHONY: install-chrome
install-chrome:
	wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | sudo apt-key add - \
	&& echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" | sudo tee /etc/apt/sources.list.d/chrome.list \
	&& sudo apt-get update && export DEBIAN_FRONTEND=noninteractive \
	&& sudo apt-get -y install --no-install-recommends google-chrome-stable

.PHONY: install-packages
install-packages:
	pip3 --disable-pip-version-check --no-cache-dir install -r requirements.txt

.PHONY: generate
generate:
	python3 main.py

# https://docs.cypress.io/guides/getting-started/installing-cypress#Ubuntu-Debian
.PHONY: install-dependencies
install-dependencies:
	sudo apt-get update && export DEBIAN_FRONTEND=noninteractive \
	&& sudo apt-get -y install --no-install-recommends libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
