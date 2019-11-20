# Lighthouse Feature policy plugin

## Contents
- `audits/sync-xhr.js` - new audit catching sync xhr in the webpage.
- `audits/unoptimized-images.js` - new audit catching unoptimized images and recommend appropriate feature policy headers to catch them.
 
## To run

1. Install `lighthouse` v5 or later.
2. Git clone the code locally and run `npm i` to install dev dependencies
2. Run `npm link` in the repo, making it available in global node_modules
3. Run `lighthouse https://example.com --plugins=lighthouse-plugin-feature-policy`

## Example commands
1. To see actual image audits generated, use
```
lighthouse https://feature-policy-demos.appspot.com/demos/unoptimized-lossy-images.html?on --plugins=lighthouse-plugin-feature-policy --view
```