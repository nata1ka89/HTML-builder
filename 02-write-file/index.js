const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

stdout.write('Hello! Please, write your text.\n');
fs.writeFile(path.join(__dirname, 'text.txt'), '', (err) => {
  if (err) throw err;
});

stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    stdout.write('Bye bye!');
    process.exit();
  } else {
    fs.appendFile(path.join(__dirname, 'text.txt'), data, (err) => {
      if (err) throw err;
      stdout.write('Write more text.\n');
    });
  }
});

process.on('SIGINT', () => {
  stdout.write('Bye bye!');
  process.exit();
});
