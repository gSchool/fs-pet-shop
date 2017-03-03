const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var PORT = process.env.PORT || 3001
const router = express.Router();
const fs = require('fs')
var morgan = require('morgan')
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

app.use('/pets', router)
router.get('/', function(req, res){
  fs.readFile('./pets.json', 'utf-8', function(err, data){
    if (!!err) {
      console.error(err);
      res.send(err)
    }
    var arr = JSON.parse(data)
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(arr))
  })
})
router.get('/:id', function(req, res){
  const id = parseInt(req.params.id)
  fs.readFile('./pets.json', 'utf-8', function(err, data){
    if (!!err) {
      console.error(err);
      res.send(err)
    }
    var arr = JSON.parse(data)
    if(! arr[id]){
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Not Found')
    } else{
      res.writeHead(200, {'Content-Type':
      'application/json'});
      res.end(JSON.stringify(arr[id]))
    }
  })
})




router.patch('/:id', function(req, res){
  var index = parseInt(req.params.id)
  fs.readFile('./pets.json', 'utf-8', function(err, data){
    var arr = JSON.parse(data)
    var body = req.body
// at this point, `body` has the entire request body stored in it as a string
    if ( !body["type"] && !body["name"] && !body["age"] || !Number.isInteger(parseInt(body["age"])) || !arr[index]) {
      res.writeHead(404, {'Content-Type': 'text/plain'}); res.end('Not Found')
    } else {
      arr[index]["kind"] = body["kind"] || arr[index]["kind"]
      arr[index]["name"] = body["name"] || arr[index]["name"]
      arr[index]["age"] = body["age"] || arr[index]["age"]
      fs.writeFile('./pets.json', JSON.stringify(arr), 'utf-8', function(err, data){
        if(!!err){res.end(err)
        } else {
          res.writeHead(200, {'Content-Type': 'application/json'})
          res.end(JSON.stringify(arr[index]))
        }
      })
    }
  })
});

router.post('/', function(req, res){
  fs.readFile('./pets.json', 'utf-8', function(err, data){
    var arr = JSON.parse(data)
    var body = req.body
    console.log(body)
    if (Object.keys(body).length != 3 || !Number.isInteger(parseInt(body["age"]))|| !body["name"] || !body["kind"]){
      res.writeHead(400, {'Content-Type': 'text/plain'}); res.end('Bad Request')
    } else{
// at this point, `body` has the entire request body stored in it as a string
    arr.push(body)
    fs.writeFile('./pets.json', JSON.stringify(arr), 'utf-8', function(err, data){
      if(!!err){res.end(err)}
      res.writeHead(200, {'Content-Type': 'application/json'})
      res.end(JSON.stringify(body))

    })
  }
  });
})

router.put('/:id', function(req, res){
  var index = parseInt(req.params.id)
  fs.readFile('./pets.json', 'utf-8', function(err, data){
    var arr = JSON.parse(data)
    var body = req.body
// at this point, `body` has the entire request body stored in it as a string
    if(! arr[index]){
      res.writeHead(404, {'Content-Type': 'text/plain'}); res.end('Not Found')
    } else {
      arr[index] = body
      fs.writeFile('./pets.json', JSON.stringify(arr), 'utf-8', function(err, data){
        if(!!err){res.end(err)
        } else {
          res.writeHead(200, {'Content-Type': 'application/json'})
          res.end(JSON.stringify(arr[index]))
        }
      })
    }
  })
});

router.delete('/:id', function(req, res){
  var index = parseInt(req.params.id)
  fs.readFile('./pets.json', 'utf-8', function(err, data){
    var arr = JSON.parse(data)
    if(! arr[index]){res.writeHead(404, {'Content-Type': 'text/plain'}); res.end('Not Found')} else {
      var thing =   arr.splice(index, 1)
      if (!!err) {
        console.error(err);
        res.end(err)
      } else {
        fs.writeFile('./pets.json', JSON.stringify(arr), 'utf-8', function(err, data){if(!!err){res.end(err)}
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(thing[0]))
        })
      }
    }
  });
})


app.listen(PORT, function () {
    console.log('Server listening on port 3001');
});
module.exports = app
