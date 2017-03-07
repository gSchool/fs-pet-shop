const http = require('http')
var PORT = process.env.PORT || 3007
const fs = require('fs')
const petRegExp = /^\/pets\/(.*)$/
const url = require('url')

var server = http.createServer(function(req, res){
  var method = req.method
    switch (method){
      case 'GET':
      fs.readFile('./pets.json', 'utf-8', function(err, data){
        if (!!err) {console.error(err); res.send(err)}
        var arr = JSON.parse(data)
        if (req.url == '/pets'){res.writeHead(200, {'Content-Type': 'application/json', 'Transfer-Encoding': ''}); res.end(JSON.stringify(arr))}
        else {
          var url1 = (req.url.match(petRegExp)[1])
          var index = (parseInt(url1))
          if(! arr[index]){res.writeHead(404, {'Content-Type': 'text/plain'}); res.end('Not Found')} else {
          res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(arr[index]))
      }
        }
      })
      break;
      case 'POST':
      fs.readFile('./pets.json', 'utf-8', function(err, data){
        var arr = JSON.parse(data)
        var body =[]
        req.on('data', function(chunk) {
  body.push(chunk);
}).on('end', function() {
  body = Buffer.concat(body).toString();
  // at this point, `body` has the entire request body stored in it as a string
  arr.push(JSON.parse(body))
  if (!!err) {console.error(err); res.end(err)}
  else {
  fs.writeFile('./pets.json', JSON.stringify(arr), 'utf-8', function(err, data){if(!!err){res.end(err)}
  res.writeHead(200, {'Content-Type': 'application/json'})
  res.end(JSON.stringify(body))
})
}
});
})
break;
case 'PUT':
var url1 = (req.url.match(petRegExp)[1] || null)
var index = parseInt(url1) || null
fs.readFile('./pets.json', 'utf-8', function(err, data){
  var arr = JSON.parse(data)
  var body =[]
  req.on('data', function(chunk) {
body.push(chunk);
}).on('end', function() {
body = Buffer.concat(body).toString();
// at this point, `body` has the entire request body stored in it as a string
arr[index] = JSON.parse(body)
if (!!err) {console.error(err); res.end(err)}
else {
fs.writeFile('./pets.json', JSON.stringify(arr), 'utf-8', function(err, data){if(!!err){res.end(err)}
res.writeHead(200, {'Content-Type': 'application/json'})
res.end(body)
})
}
});
})
break;
case 'DELETE':
var url1 = (req.url.match(petRegExp)[1] || null)
var index = parseInt(url1) || null
fs.readFile('./pets.json', 'utf-8', function(err, data){
  var arr = JSON.parse(data)
  arr.splice(index, 1)
if (!!err) {console.error(err); res.end(err)}
else {
fs.writeFile('./pets.json', JSON.stringify(arr), 'utf-8', function(err, data){if(!!err){res.send(err)}
res.writeHead(200, {'Content-Type': 'application/json'})
res.send(JSON.stringify(arr))
res.end()
})
}
});
break;


}
})
.listen(PORT)
console.log('listening on: ' + PORT)

module.exports = server
