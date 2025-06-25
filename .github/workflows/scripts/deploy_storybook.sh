apt update && apt --yes install --no-install-recommends nodejs npm curl
npm install --global vercel
curl -fsSL https://get.pnpm.io/install.sh | env PNPM_VERSION=$2 SHELL=/bin/bash bash -
. /root/.bashrc
pnpm env use --global $1
cd ./app/portfolio
pnpm install && pnpm build-storybook
vercel --cwd ./.storybook/output
vercel deploy --prebuilt --prod --token=$3
