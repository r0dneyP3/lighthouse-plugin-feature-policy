# Lighthouse Feature policy plugin

## Contents
- `audits/sync-xhr.js` - new audit catching sync xhr in the webpage.
 
## To run

1. Install `lighthouse` v5 or later.
2. Git clone the code locally and run `npm i` to install dev dependencies
2. Run `npm link` in the repo, making it available in global node_modules
3. Run `lighthouse https://example.com --plugins=lighthouse-plugin-feature-policy --view`

