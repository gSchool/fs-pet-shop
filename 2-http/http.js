
const http = require("http");
const fs = require("fs"); 
const port = process.env.PORT || 8008;



var requestHandler = (req, res) => {
    var url = req.url;
    const petRegExp = /^\/pets\/(.*)$/;
    //console.log(petRegExp)
    //console.log(petRegExp.test(url))
    //console.log(url.match(petRegExp))
    
    if(req.method === 'GET' && petRegExp.test(url)) {
        //console.log(url.match(petRegExp))
        //console.log(url.match(petRegExp)[1])
        fs.readFile('../pets.json', (err, data) => {
            if (err) throw err;

            var petIndex = url.match(petRegExp)[1];
            var dataObj = JSON.parse(data);

            if(dataObj[petIndex] === undefined) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Not found');
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(dataObj[petIndex]));
            }

        })
    
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not found');
    }

};

var server = http.createServer(requestHandler)

server.listen(port, () => {
    console.log(`Server is listening on port:${port}`)
})