const { execSync } = require('node:child_process');
const { main } = require('../package.json');

const mainPath = `./dist/${main}`;
// const args = process.argv.slice(2).join(' ');

require('./db');

execSync('npm run build:clean', { stdio: 'inherit' });
execSync(`tsc-watch --onSuccess "node ${mainPath} " --onFailure "echo Compilation Failed!"`, { stdio: 'inherit' });
