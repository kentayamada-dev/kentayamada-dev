PORTFOLIO_DIR="./portfolio"
PORTFOLIO_SRC_DIR="./portfolio/src"

if git diff --cached --quiet -- "$PORTFOLIO_DIR"; then
  echo "No changes in $PORTFOLIO_DIR, skipping pre-commit."
else
  echo "Changes detected in $PORTFOLIO_DIR, running pre-commit script."
  cd "$PORTFOLIO_DIR" && pnpm exec lint-staged
fi

if git diff --cached --quiet -- "$PORTFOLIO_SRC_DIR"; then
  echo "No changes in $PORTFOLIO_SRC_DIR, skipping pre-commit."
else
  echo "Changes detected in $PORTFOLIO_SRC_DIR, running pre-commit script."
  cd "$PORTFOLIO_DIR" && pnpm test && pnpm knip && pnpm exec lint-staged
fi
