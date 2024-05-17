NODE_VERSION=$(grep NODE_VERSION ./app/.devcontainer/.env | cut -d = -f2)
PNPM_VERSION=$(grep PNPM_VERSION ./app/.devcontainer/.env | cut -d = -f2)

apt update && apt --yes install --no-install-recommends nodejs npm curl
npm install --global vercel
curl -fsSL https://get.pnpm.io/install.sh | env PNPM_VERSION=$PNPM_VERSION SHELL=/bin/bash bash -
. /root/.bashrc
pnpm env use --global $NODE_VERSION
cd ./app/portfolio
vercel pull --yes --environment=production --token=$1
vercel build --prod --token=$1
vercel deploy --prebuilt --prod --token=$1
