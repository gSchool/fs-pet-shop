const action = process.argv[2]
const args = process.argv.slice(3, process.argv.length)
const fs = require('fs')

if (!action) {
  console.error('Usage: node pets.js [read | create | update | destroy]')
  process.exit(1)
} else {
  // console.log(args)
  switch (action.toUpperCase()) {
    case 'READ':
      // console.log('read')
      if (!args[0]) {
        fs.readFile('./pets.json', read);
      } else {
        fs.readFile('./pets.json', readWithArgs);
      }
      break;
    case 'CREATE':
      if (!args[0] || !args[1] || !args[2]) {
        console.error("Usage: node pets.js create AGE KIND NAME")
        process.exit(1)
      } else {
        // console.log(typeof parseInt(args[0]))
        fs.readFile('./pets.json', writeFile)
      }
    default:
      console.error('Usage: node pets.js [read | create | update | destroy]')

  }
}

function read(err, data) {
  var jsonData = JSON.parse(data)
  console.log(jsonData);
}

function readWithArgs(err, data) {
  var jsonData = JSON.parse(data)
  console.log(jsonData[parseInt(args[0])])
}

function writeFile(err, data) {
  var jsonData = JSON.parse(data)
  jsonData.push({ age: parseInt(args[0]), kind: args[1], name: args[2] })
  fs.writeFile("./pets.json", JSON.stringify(jsonData), function(err){
    if (err) {
      return err
    }
    console.log({ age: parseInt(args[0]), kind: args[1], name: args[2] })
  })
}
