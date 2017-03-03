const fs = require('fs');
const path = require('path');
const petsData = path.join(__dirname, 'pets.json');
const node = path.basename(process.argv[0]);
const file = path.basename(process.argv[1]);
const command = process.argv[2];
const index = Number.parseInt(process.argv[3]);
const buffer = fs.readFileSync(petsData);

const pets = JSON.parse(buffer)

// console.log('Hello', typeof index);


if (command === 'read'  && process.argv[3] !== undefined) {
  if (process.argv[3] < 0 || process.argv[3] > pets.length -1) {
    console.error('Usage: node pets.js [read] + [number]')
    process.exit(1)
  } else {
    console.log(pets[index]);
  }

} else if (command === undefined) {
  console.error('Usage: node pets.js [read | create | update | destroy]')
  process.exit(1)

} else if (command === 'read') {
  console.log(pets);
}



if (command === 'create') {
  if (process.argv[3] === null || process.argv[4] === undefined  || process.argv[5] === undefined) {
    console.error('Usage: node pets.js create AGE KIND NAME')
    process.exit(1)
  } else {
    const newPet = {}
    var agePet = Number.parseInt(process.argv[3])
    newPet.age = agePet
    newPet.kind = process.argv[4]
    newPet.name = process.argv[5]
    pets.push(newPet)
    var createPet = JSON.stringify(pets)
    fs.writeFile('./pets.json', createPet, (err) => {
      if (err) throw err;
      console.log(newPet);
      });
  }

}
