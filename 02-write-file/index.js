const fs = require('fs');
const readline = require('readline');
// Create a writable stream to a text file
const writeStream = fs.createWriteStream('./02-write-file/output.txt', {
  flags: 'a',
});
// Display a welcome message in the console
console.log('Welcome! Enter text below. Type "exit" to quit.');
// Create a readline interface for reading user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.prompt();
rl.on('line', (input) => {
  if (input.toLowerCase() === 'exit') {
    console.log('Goodbye!');
    rl.close();
    process.exit();
  }
  writeStream.write(input + '\n');
  rl.prompt();
});
rl.on('SIGINT', () => {
  console.log('\nReceived SIGINT. Goodbye!');
  rl.close();
  process.exit();
});
rl.on('close', () => {
  console.log('Stream closed. Goodbye!');
  writeStream.end();
});
