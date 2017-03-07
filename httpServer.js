const pets = require('./pets.json');
const http = require('http');
const PORT = process.env.PORT || 8000;
const server = http.createServer(reqHandler);

const reqHandler = (req, res) => {
    if (req.url === '/pets') {
        res.writeHead(200, {
            "Content-Type": "application/json"
        })
        res.end(JSON.stringify(pets));
    } else if (req.url === '/pets/1') {
        res.writeHead(200, {
            "Content-Type": "application/json"
        })
        res.end(JSON.stringify(pets[1]))
    } else if (req.url === '/pets/0') {
        res.writeHead(200, {
            "Content-Type": "application/json"
        })
        res.end(JSON.stringify(pets[0]))
    } else {
        res.writeHead(404, {
            "Content-Type": "text/plain"
        })
        res.end('Not Found');
    }
}

module.exports = server
