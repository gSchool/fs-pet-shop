const fs = require('fs')
const pets = require('./pets.json')
const id = 0

switch(process.argv[2]) {
  case "read":
    if (!process.argv[3]) {
      console.log(pets)
    }
    else if (0 <= process.argv[3] && process.argv[3] < pets.length) {
      console.log(pets[process.argv[3]])
    }
    else {
      console.log("Usage: node pets.js read INDEX")
    }
    break

  case "create":
    if (!process.argv[3] || !process.argv[4] || !process.argv[5]) {
      console.log("Usage: node pets.js create AGE KIND NAME")
    }
    else {
      var newPet = {
        age: parseInt(process.argv[3]),
        kind: process.argv[4],
        name: process.argv[5]
      }
      pets.push(newPet)

      var petArray = JSON.stringify(pets)
      fs.writeFileSync('./pets.json', petArray)
      console.log(petArray)
    }
    break

  case "update":
    console.log(pets)
    break

  case "destroy":
    console.log(pets)
    break

  default:
    console.error('Usage: node pets.js [read | create | update | destroy]')
}
