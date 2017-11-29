const fs = require('fs');
let petObj = {};

//const logger = new Console;
if (!process.argv[2]) {
  console.error('Usage: node pets.js [read | create | update | destroy]');
  process.exit(1);
}

switch (process.argv[2].toUpperCase()) {
  case 'READ' :
    fs.readFile('./pets.json', 'utf8', (err, data) => {
      if (err) throw err;
      petArr = JSON.parse(data);
      if (!process.argv[3]) {
        console.log(petArr);
      } else {
        if ((!isNaN(process.argv[3])) && (process.argv[3] >= 0) && (process.argv[3] < petArr.length)) {
          console.log(petArr[(process.argv[3])]);
        } else {
          console.error('Usage: node pets.js read INDEX');
          process.exit(1);
        }
      }
    })
    break;

  case "CREATE" :
}
