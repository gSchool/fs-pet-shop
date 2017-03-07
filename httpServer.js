const pets = require('./pets2.json');
const http = require('http');
const PORT = process.env.PORT || 8080;

const requestHandler = (request, response) => {
  if (request.url === '/pets') {
    response.writeHead(200, {
      "Content-Type": "application/json"
    })
    response.end(JSON.stringify(pets));
  } else if (request.url === '/pets/1') {
    response.writeHead(200, {
      "Content-Type": "application/json"
    })
    response.end(JSON.stringify(pets[1]))
  } else if (request.url === '/pets/0') {
    response.writeHead(200, {
      "Content-Type": "application/json"
    })
    response.end(JSON.stringify(pets[0]))
  } else {
    response.writeHead(404, {
      "Content-Type": "text/plain"
    })
    response.end('Not Found');
  }
}

const server = http.createServer(requestHandler);

server.listen(PORT, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${PORT}`)
})

module.exports = server
