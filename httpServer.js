'use strict';
let fs = require('fs');
var path = require('path');
var petPath = path.join('pets.json')
// const petRegExp = /^\/pets\/(.*)$/

const http = require('http');
const port = process.env.PORT || 8000;

const server = http.createServer(function(req, res) {
    if (req.method === 'GET' && req.url.startsWith(`/pets`)){
        fs.readFile(petPath, 'utf8', function(error, data){
        if(error){
            console.error(new Error('Whoops, something bad happened'))
        } else if (req.url === '/pets'){
            res.setHeader('Content-Type', 'text/plain');
            res.write(data)
            res.end()
        } else if (req.url.charAt(5) == '/'){
            let index = req.url.substring(6)
            let petData = JSON.parse(data)
            if(petData[iexnd] === undefined){
                res.statusCode = 404
                res.setHeader('Content-Type', 'text/plain');
                res.end('Not found');
            } else{
                res.write(JSON.stringify(petData[index]))
                res.end()
            }
        }
        })
    } 
});
  
  server.listen(port, function() {
    console.log('Hey Noah', port);
  });