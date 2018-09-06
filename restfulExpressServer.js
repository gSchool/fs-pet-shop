const fs = require ('fs');
let path = require('path');
let petsPath = path.join(__dirname, 'pets.json');

let express = require ('express');
let app = express();
let port = process.env.PORT || 8000;

app.disable('x-powered-by');

app.get('/pets', function(req,res) {
  fs.readFile(petsPath, 'utf8', function (err, petsJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }
    let pets = JSON.parse(petsJSON);
    res.send(pets);
  })
})

app.use( function (req, res) {
  res.sendStatus(404)
});

app.listen(port, () => {
  console.log('Hey, I am a server. Welcome to port', port, '. How can I server you?');
})