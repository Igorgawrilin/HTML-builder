const fs = require('fs');
const path = require('path');
const readline = require('readline');
const filePath = path.join(__dirname, 'text.txt');
const output = fs.createWriteStream(filePath, { flags: 'a' });
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const promptUser = () => {
  rl.question('Enter text (or type "exit" to exit):', (input) => {
    if (input.toLowerCase() === 'exit') {
      console.log('Goodbye!');
      rl.close();
      return;
    }

    output.write(input + '\n');

    promptUser();
  });
};

console.log('The output.txt file has been created. Start typing:');
promptUser();
