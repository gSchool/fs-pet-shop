
const http = require('http')
const bodyParser = require('body-parser')
const fs = require('fs')
var allPets = require('./pets.json')

var PORT = 8000


const server = http.createServer(function (req, res) {
  var inputSent = req.url.split("/")

  if (inputSent[1] == 'pets' && (inputSent[2] == undefined || inputSent[2] == '')) {
    res.writeHead(200, {"Content-Type": "application/json"})
    res.end(JSON.stringify(allPets))
  } else if (inputSent[2] == 1 || inputSent[2] == 0) {
    res.writeHead(200, {"Content-Type": "application/json"})
    res.end(JSON.stringify(allPets[inputSent[2]]))
  } else {
    res.writeHead(404, {"Content-Type": "/text\/plain/"})
    res.end('Not Found')
  }


})


server.listen(PORT, function (err) {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${PORT}`)

})



module.exports = server
