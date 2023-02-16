const fs = require('fs');
const http = require('http');
const petRegExp = /^\/pets\/(.*)$/;
const port = 8000;
console.log(port);

const server = http.createServer((req, res) => {
    const URL = req.url
    console.log(URL);
    const method = req.method
    console.log(method);
    let urlArray = URL.split('/');
    let urlPetNumber = urlArray[2];
    let urlPetInt = parseInt(urlPetNumber);
    fs.readFile('pets.json', 'utf8', function(err, data){
        let allPets = JSON.parse(data);
        let allPetsJSON = JSON.stringify(allPets);
        if (err){
            errorFound();
        } else if (urlPetNumber) {
            singlePet(urlPetInt);
        } else if (URL == '/pets') {
            getAll();
        }

        
        function errorFound() {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain')
            res.end('Internal server error');
            return;
        }

        function getAll() {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(allPetsJSON);
            return;
        }
        
        function singlePet(num) {
            if (!allPets[num]){
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain')
            res.end('Not Found');
            return;
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 200;
                res.end(JSON.stringify(allPets[num]));
                //return;
            }
        }
    })
})

server.listen(port, ()=> {
    console.log(`Listening on port ${port}`);
})