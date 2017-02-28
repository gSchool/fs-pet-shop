
const fs = require('fs')
const pets = require('./pets.json')

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
  case "write":
      //do something
      break;
  case "create":
      //do something
      break;
  case "delete":
      //do something
      break;
  default:
      console.error("node pets.js [read | create | update | destroy]")
}


// if (process.argv[2] =="read") {
//   console.log(pets[1]);
// }
// if (process.argv[2] == undefined) {
//   console.error("node pets.js [read | create | update | destroy]")
// }
// if (process.argv[2] =="write") {
//   console.log("node pets.js AGE KIND NAME");
// }
