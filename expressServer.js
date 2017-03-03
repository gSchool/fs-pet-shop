var express = require('express');
var app = express();
var bodyParser = require('body-parser')
const pets = require('./pets.json')
var PORT = 9000


app.use(bodyParser.json())

app.get('/pets', (req, res) => {
    res.status(200)
    res.set('Content-Type', 'application/json')
    res.send(JSON.stringify(pets))
});

app.get('/pets/:id', (req, res) => {
  const id = req.params.id
  if (id < 0 || id > pets.length -1){
    res.status(404)
    res.set('Content-Type', 'text/plain')
    res.send('Not Found')
  } else if (id >= 0 && id < pets.length){
    res.status(200)
    res.set('Content-Type', 'application/json')
    res.send(pets[id])
  }

})

app.listen(process.env.PORT || PORT, function() {
    console.log('listening on' + PORT + 'press command + C to quit')

});
