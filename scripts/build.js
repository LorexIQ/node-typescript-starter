const { execSync } = require('node:child_process');

execSync('tsc', { stdio: 'inherit' });
