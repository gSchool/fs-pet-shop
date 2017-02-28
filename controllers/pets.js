const fs = require('fs');
const petsPath = path.join(__dirname, 'pets.json');

if (!process.argv[2]) {
  console.error('Usage: node pets.js [read | create | update | destroy]')
  process.exit(1)
} else if (process.argv[2] === 'read') {
  fs.readFile(petsPath, (err, data) => {
    if (err) throw err;
    let jDatty = JSON.parse(data);
    if (!jDatty[process.argv[3]]) {
      console.log(jDatty)
    } else if (jDatty[process.argv[3]]) {
      console.log(jDatty[process.argv[3]])
    }
  })
} else if (process.argv[2] === 'create') {
  fs.readFile(petsPath, (err, data) => {
    if (err) throw err;
    let jDatty = JSON.parse(data);
    if (!process.argv[5]) {
      console.error('Usage: node pets.js create AGE KIND NAME')
      process.exit(1)
    } else {
      let newObj = {age: Number(process.argv[3]), kind: process.argv[4], name: process.argv[5]};
      jDatty.push(newObj)
      console.log(newObj)
      fs.writeFileSync('pets.json', JSON.stringify(jDatty))
    }
  })
}
