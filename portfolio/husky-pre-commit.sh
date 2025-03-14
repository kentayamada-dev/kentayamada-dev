PORTFOLIO_DIR="./portfolio"
PORTFOLIO_SRC_DIR="./portfolio/src"

if git diff --cached --quiet -- $(find "$PORTFOLIO_DIR" -type f); then
  echo "No changes in $PORTFOLIO_DIR, skipping pre-commit."
else
  echo "Changes detected in $PORTFOLIO_DIR, running pre-commit script."
  pnpm --filter "$PORTFOLIO_DIR" exec lint-staged
fi

if git diff --cached --quiet -- $(find "$PORTFOLIO_SRC_DIR" -type f); then
  echo "No changes in $PORTFOLIO_SRC_DIR, skipping pre-commit."
else
  echo "Changes detected in $PORTFOLIO_SRC_DIR, running pre-commit script."
  pnpm --filter "$PORTFOLIO_DIR" test && pnpm --filter "$PORTFOLIO_DIR" knip && pnpm --filter "$PORTFOLIO_DIR" exec lint-staged
fi
