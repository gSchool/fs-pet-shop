const fs = require('fs')


if (!process.argv[2]) {
  console.error('Usage: node pets.js [read | create | update | destroy]')
  process.exit(1)
}
exicuteCommands(process.argv[2], process.argv[3], process.argv[4], process.argv[5])

function exicuteCommands(command, indexOrAge, kind, name) {
  if (command === 'read') {
    read(indexOrAge)
  }else if (command === 'create') {
    create(indexOrAge, kind, name)
  }
}

function read(index) {
    var index = parseInt(index)
    fs.readFile('./pets.json', 'utf8', (err, data) => {
      if (err) throw err
      if (!index && index != 0) {
        console.log(JSON.parse(data))
      }else if (index > data.length-1) {
        console.error('Usage: node pets.js [read | create | update | destroy]');
        process.exit(1)
      }else {
        console.log(JSON.parse(data)[index])
      }
    })
}

function create(age, kind, name) {
  if (!age || !kind || !name) {
    console.error('Usage: node pets.js create AGE KIND NAME')
    process.exit(1)
  }
  var newPet = {}
  newPet.age = parseInt(age)
  newPet.kind = kind
  newPet.name = name

  fs.readFile('./pets.json', 'utf8', (err, data) => {
    var oldFile = JSON.parse(data)
    oldFile.push(newPet)
    var newFile = JSON.stringify(oldFile)
    fs.writeFile('./pets.json', newFile, err=>{
      if (err) throw err
    })
  })
  console.log(newPet);
}
