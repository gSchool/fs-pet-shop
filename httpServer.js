const pets = require('./pets.json')
const http = require('http')
const bodyParser = require('body-parser');
const PORT = 3500;
const fs = require('fs')
var database = require('./pets.json')


const server = http.createServer(
    (req, res) => {
        var myInfo = req.url.split('/').pop();
        if (myInfo === "pets") {
            res.writeHead(200, {
                "Content-Type": "application/json"
            })
            res.end(JSON.stringify(pets))
        } else if (myInfo < 0 || myInfo >= pets.length) {
            res.writeHead(404, {
                "Content-Type": "text/plain"
            })
            res.end('Not Found')
        } else if (myInfo >= 0 && myInfo - 1 <= pets.length) {
            res.writeHead(200, {
                "Content-Type": "application/json"
            })
            res.end(JSON.stringify(pets[myInfo]))
        }
    })

server.listen(process.env.PORT || PORT, function() {
    console.log("PetShop running on port " + PORT + "!  Press ^C to quit");
});

module.exports = server;
