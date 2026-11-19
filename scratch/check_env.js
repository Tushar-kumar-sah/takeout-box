const fs = require('fs');
const path = require('path');

function checkEnv(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(filePath, 'does NOT exist');
    return;
  }
  console.log(filePath, 'exists:');
  const lines = fs.readFileSync(filePath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      if (key.startsWith('UPS_') || key.includes('ENV') || key.includes('PORT')) {
        const isSecret = key.includes('SECRET') || key.includes('PASS') || key.includes('TOKEN');
        console.log(`  ${key}: configured=${Boolean(val && val.length > 0)} (length: ${val.length}) [env_type: ${isSecret ? '***SECRET***' : val}]`);
      }
    }
  }
}

console.log('--- Workspace Root .env ---');
checkEnv(path.resolve('.env'));
console.log('--- Workspace Root .env.local ---');
checkEnv(path.resolve('.env.local'));
console.log('--- Server .env ---');
checkEnv(path.resolve('server', '.env'));
