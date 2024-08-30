DIR="./portfolio"

if git diff --cached --quiet -- $DIR; then
    echo "No changes in $DIR, skipping pre-commit."
    exit 0
else
    echo "Changes detected in $DIR, running pre-commit script."
    cd portfolio && pnpm test && pnpm knip && pnpm exec lint-staged
fi
