const { execSync } = require('node:child_process');

execSync('npm run build:clean', { stdio: 'inherit' });
execSync('tsc', { stdio: 'inherit' });
