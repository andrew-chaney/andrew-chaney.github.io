#!/usr/bin/env sh

# Abort if there is an error.
set -e

# Build.
npm run build

# Add '.nojekyll' file.
touch docs/.nojekyll

# Deploy to GitHub
git add /docs
git commit -m "Latest Site Update to /docs"
git push

echo "\nDeployed."