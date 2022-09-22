const fs = require("fs");
let command = process.argv[2];
let index = process.argv[3];
//console.log(process.argv);
if (command == "read" && typeof index == "string") {
  fs.readFile("./pets.json", "utf8", function (error, data) {
    if (JSON.parse(data)[index] === undefined) {
      console.log("Usage: node pets.js read INDEX");
      process.exit(1);
    } else {
      console.log(JSON.parse(data)[index]);
    }
  });
} else if (command == "read") {
  fs.readFile("./pets.json", "utf8", function (error, data) {
    if (error) {
      console.error(error);
    } else {
      console.log(JSON.parse(data));
    }
  });
} else {
  console.log("Usage: node pets.js [read | create | update | destroy]");
  process.exit(1);
}
white_check_mark;
eyes;
raised_hands;
