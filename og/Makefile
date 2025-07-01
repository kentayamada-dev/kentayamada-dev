include .env

.PHONY: prod
prod:
	pnpm vercel deploy --prod --force --token=${VERCEL_TOKEN}

.PHONY: auth
auth:
	pnpm vercel link --yes --project og --token=${VERCEL_TOKEN}

.PHONY: dev
dev:
	pnpm vercel dev --token=${VERCEL_TOKEN}
