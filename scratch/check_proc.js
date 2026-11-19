const { execSync } = require('child_process');
try {
  const out = execSync('tasklist', { encoding: 'utf8' });
  const lines = out.split('\n').filter(l => /sql|maria|xampp|wamp/i.test(l));
  console.log('SQL processes found:', lines.length ? lines.join('\n') : 'NONE');
} catch (e) {
  console.log('Error:', e.message);
}

