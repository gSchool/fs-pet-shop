
const fs = require('fs')
var pets = require('./pets.json')

var actionArg = process.argv[2]

switch (actionArg) {
  case "read":
      if (process.argv[3] == undefined) {
        console.log(pets);
        break;
      } else if (!isNaN(process.argv[3])) {
        if (process.argv[3]>=0 && process.argv[3]<pets.length) {
          console.log(pets[process.argv[3]]);
          break;
        } else {
          console.error("node pets.js read INDEX")
          break;
        }
      } else {
        console.log(console.error("node pets.js read INDEX"))
        break;
      }
      break;
  case "create":
      if (process.argv[2]== 'create' && process.argv[5] == undefined){
        console.error("Usage: node pets.js create AGE KIND NAME")
        process.exit(1)
        break;
      } else {
      var addingPet = {age:parseInt(process.argv[3]), kind:process.argv[4], name:process.argv[5]}
      pets.push(addingPet)
      var stringPet = JSON.stringify(pets)
      fs.writeFileSync('./pets.json', stringPet)
      console.log(addingPet);
      break;
      }
  case "update":
      //do something
      break;
  case "delete":
      //do something
      break;
  default:
      console.error("Usage: node pets.js [read | create | update | destroy]")
      process.exit(1)
}
