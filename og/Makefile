include .env

.PHONY: prod auth dev
prod:
	pnpm vercel deploy --prod --force --token=${VERCEL_TOKEN}

auth:
	pnpm vercel link --yes --project og --token=${VERCEL_TOKEN}

dev:
	pnpm vercel dev --token=${VERCEL_TOKEN}
