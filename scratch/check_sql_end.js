const fs = require('fs');
const content = fs.readFileSync('server/src/database/init_database.sql', 'utf8');
const lines = content.split('\n');
console.log('Total lines in init_database.sql:', lines.length);
console.log('Last 20 lines:\n', lines.slice(-20).join('\n'));

