//const logger = new Console;
if (!process.argv[2]) {
  console.error('Usage: node pets.js [read | create | update | destroy]');
  process.exit(1);
}
