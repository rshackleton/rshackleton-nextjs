const { execSync } = require('child_process');
const { renameSync } = require('fs');
const storyblokToTypescript = require('storyblok-generate-ts');

// Load .env file for dev
require('dotenv').config();

// Update component/present schema json
execSync(
  `storyblok pull-components --space ${process.env.STORYBLOK_SPACE_ID}`,
  { stdio: 'inherit' },
);

// Move files to more convenient location
renameSync(
  `./components.${process.env.STORYBLOK_SPACE_ID}.json`,
  `./src/storyblok/components.json`,
);

renameSync(
  `./presets.${process.env.STORYBLOK_SPACE_ID}.json`,
  `./src/storyblok/presets.json`,
);

// Generate types from components json
storyblokToTypescript({
  componentsJson: require(`./src/storyblok/components.json`),
  path: __dirname + '/src/storyblok/storyblok.d.ts',
});
