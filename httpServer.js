const fs = require ('fs');
const http = require ('http');

//create a server --> there is a command for this in node.js
const server = http.createServer((request, response) => {
  // if command is GET and the file path is ok, read me the file
    fs.readFile('pets.json', 'utf8', (err, data) => {
      let dataArr = JSON.parse(data);
      if (request.method === 'GET') {
        if (request.url === '/pets'){
          response.end(data)
        } else if (request.url.split('/')[1] === 'pets' && request.url.split('/')[2] === undefined ) {
          response.end('Not Found')
        } else if (request.url.split('/')[1] === 'pets' && request.url.split('/')[2] ) {
          response.end(JSON.stringify(JSON.parse(data)[request.url.split('/')[2]]))
        }
      } else if (request.method === 'POST' && request.url === '/pets') {
        let body = '';
        request.on('data', chunk => {
         body += chunk;
        });
        request.on('end', function () {
          newRecord = JSON.parse(body);
          newRecord.age = parseInt(newRecord.age);
          dataArr.push(newRecord);
          write(dataArr);
          response.end();
       });
      } else if (request.method === 'PUT' && request.url.split('/')[2]) {
        let body = '';
        request.on('data', chunk => {
         body += chunk;
        });
        request.on('end', function () {
          newRecord = JSON.parse(body);
          newRecord.age = parseInt(newRecord.age);
          dataArr.splice(request.url.split('/')[2], 1, newRecord);
          write(dataArr);
          response.end();
       });
      } else if (request.method === 'DELETE' && request.url.split('/')[2]) {
        dataArr.splice(request.url.split('/')[2], 1);
        write(dataArr);
        response.end();
      }
    })
})

function write (array){ fs.writeFile('pets.json',JSON.stringify(array),(err) => { 
  if (err) { 
    throw err;
  }
})}

server.listen(8000,() => {
  console.log('hey, I am a server!');
})








module.exports = server;
