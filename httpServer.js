const http = require('http')
const server = http.createServer()
const fs = require('fs')

// server.listen(3001)

server.on('request', (req, res)=>{
  if(req.method === 'GET'){
    var route = req.url.slice(0,6)
    var petIndex = parseInt(req.url.slice(6))

    if (route === '/pets') {
      fs.readFile('./pets.json', 'utf8', (err, data) => {
        if (err) throw err
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(data);
      })
    }else if (route === '/pets/') {
      fs.readFile('./pets.json', 'utf8', (err, data) => {
        if (err) throw err
        var dataObj = JSON.parse(data)
        var pet = JSON.stringify(dataObj[petIndex])
        if (petIndex >= 0 && petIndex <= dataObj.length-1) {
          res.writeHead(200, {'Content-Type': 'application/json'})
          res.end(pet)
        }else {
          res.writeHead(404, {'Content-Type': 'text/plain'})
          res.end('Not Found')
        }
      })
    }
  }
})

module.exports = server
