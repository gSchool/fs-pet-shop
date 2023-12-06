import fs from "fs";

const command = process.argv[2];

function read() {
  fs.readFile("../pets.json", "utf-8", (err, text) => {
    if (err) {
      throw err;
    }

    const pets = JSON.parse(text);

    if (process.argv[3]) {
      const index = Number(process.argv[3]);

      if (Number.isNaN(index) || index < 0 || index >= pets.length) {
        console.error("Usage: node fs.js read INDEX");
        process.exit(1);
      }

      console.log(pets[index]);
    } else {
      console.log(pets);
    }
  });
}

function create() {
  const age = Number(process.argv[3]);
  const kind = process.argv[4];
  const name = process.argv[5];

  if (!age || !kind || !name) {
    console.error("Usage: node fs.js create AGE KIND NAME");
    process.exit(1);
  }

  fs.readFile("../pets.json", "utf-8", (err, text) => {
    if (err) {
      throw err;
    }

    const pets = JSON.parse(text);
    const newPet = { age, name, kind };
    pets.push(newPet);

    fs.writeFile("../pets.json", JSON.stringify(pets), (err) => {
      if (err) {
        throw err;
      }

      console.log(newPet);
    });
  });
}

switch (command) {
  case "read":
    read();
    break;
  case "create":
    create();
    break;
  default:
    console.error("Usage: node fs.js [read | create | update | destroy]");
    process.exit(1);
}
