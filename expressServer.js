//*****GLOBAL VAR AND MODULES**** */
let express = require('express')
let server = express()
let fs = require('fs')
let path = require('path')
let PORT = 8002
//*****GLOBAL VAR AND MODULES**** */

server.get('/pets', function (req, res) {
    const petsPath = path.join(__dirname, 'pets.json')
    fs.readFile(petsPath, 'utf-8', function(error, data){
        if(error){
            console.error(error.message)
        } 
            const parsedData = JSON.parse(data)
            res.statusCode = 200
            res.send(parsedData)
        })
})
  
server.get('/pets/:id', function (req, res) {
    const id = req.params.id
    const petsPath = path.join(__dirname, 'pets.json')
    fs.readFile(petsPath, 'utf-8', function(error, data) {
     let parsedData = JSON.parse(data)
     if(error){
         console.error(error.message)
     } else if (id >= 0 && id <= parsedData.length -1) {
         res.statusCode = 200
         res.send(parsedData[id])
     } else {
         res.statusCode = 404
         res.send('Not Found')
     }

    }) 
 
})

server.listen(PORT, function () {
console.log('Listening on port', PORT)
})

server.use(express.json())

server.post('/pets', (req, res)  => { 
    const newPet = {
        age: parseInt(age), 
        kind: kind, 
        name: name
    }
    console.log(req.body)
    res.statusCode = 200
    res.send('workings')
})