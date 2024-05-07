useradd --uid $1 --create-home --shell /bin/zsh $2
ln --symbolic --force $3/workspaces/.devcontainer/.misc/scripts/.zshrc $3/.zshrc
