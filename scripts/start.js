const { execSync } = require('node:child_process');
const { main } = require('../package.json');

const mainPath = `./dist/${main}`;
// const args = process.argv.slice(2).join(' ');

execSync(`node ${mainPath}`, { stdio: 'inherit' });
