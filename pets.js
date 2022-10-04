let fs = require('fs')
let command = process.argv[2]
// let pets = require('./pets.json')

if (command == 'read'){
    fs.readFile('pets.JSON', 'utf8', function(error, data){
        let pets = JSON.parse(data)
        var index = process.argv[3]
        if(error){
            console.error(new Error('Whoops, something bad happened'))
        } else {
            if (pets[index] === undefined){
                console.error(new Error('Whoops, you entered an invalid number'))
                console.log('Usage: node pets.js read INDEX')
                process.exit(1)
            } else{
                console.log(pets[index])
            }
        }
    })
} else if (command == 'create') {
    let petAge = process.argv[3]
    let petKind = process.argv[4]
    let petName = process.argv[5]
    let newPet = {age: parseInt(petAge), kind: petKind, name: petName}
    fs.readFile('pets.JSON', 'utf8', function(error, data){
        let pets = JSON.parse(data)
        pets.push(newPet)
        let jsonString = JSON.stringify(pets)
    fs.writeFile('pets.json', jsonString, error => {
        if(error) {
            console.log('Error writing file', error)
        } else {
            console.log(`Successfully added ${petName}!`)
        }
    })
})
}

// console.log('Usage: node pets.js [read | create | update | destroy]')

fs.readFile('./dogs,txt', 'utf8', function(error, data){
    if (error){
        console.log(error)
    } else {
    newString = data + addString
    fs.writeFile('./dogs,txt', newString, function(error) {
        if(error) {
            console.log(error)
        } else {
            console.log(`Successfully added string!`)
    }
})
}
})