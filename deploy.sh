#!/usr/bin/env sh

# Abort if there is an error.
set -e

# Build.
echo "Building...."
npm run build
echo -e "\n"

# Add '.nojekyll' file.
echo "Adding .nojekyll to ./docs...."
touch ./docs/.nojekyll
echo -e "\n"

# Deploy to GitHub
echo "Deploying to GitHub...."
git add ./docs
git commit -m "Latest Site Update to ./docs"
git push

echo -e "\nDeployed."