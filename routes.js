const path = require("path");
const fs = require('fs');
const FILEPATH = path.join('./pets.json');

let petDataText = fs.readFileSync(FILEPATH, 'utf8');
let petDataObj = JSON.parse(petDataText);

let routes = {
    '/pets/': function(req, res) {

        let splitURL = req.url.split("/");
        let lastElement = parseInt(splitURL[splitURL.length - 1]);
        if (petDataObj[lastElement] !== undefined) {
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(petDataObj[lastElement]));
        } else if(req.url === '/pets/' || req.url === '/pets'){
            res.setHeader("Content-Type", "application/json");
            res.end(petDataText);
        } else {
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/plain");
            res.end('Not Found');
        }
    },


};


module.exports = routes;
