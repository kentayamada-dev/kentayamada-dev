apt update && apt --yes install --no-install-recommends nodejs npm curl
npm install --global vercel
curl -fsSL https://get.pnpm.io/install.sh | env PNPM_VERSION=$2 SHELL=/bin/bash bash -
. /root/.bashrc
pnpm env use --global $1
cd ./app/portfolio
vercel pull --yes --environment=production --token=$3

while true; do
  echo "Attempting vercel build..."
  vercel build --prod --token="$3"
  exit 1

  if [ $? -eq 0 ]; then
    echo "Vercel build succeeded!"
    break
  else
    echo "Vercel build failed. Retrying in 10 seconds..."
    sleep 10
  fi
done

vercel deploy --prebuilt --prod --token=$3
