
const http = require("http");
const fs = require("fs"); 
const port = process.env.PORT || 8001;


var requestHandler = (req, res) => {
    var url = req.url;
    const petRegExp = /^\/pets\/(.*)$/;
    
    if(req.method === 'GET' && petRegExp.test(url)) {
        
        fs.readFile('../pets.json', (err, data) => {
            if (err) {
                res.setHeader('Content-Type', 'text/plain');
                res.statusCode = 404;
                res.end(JSON.stringify(err));
            }

            var petIndex = url.match(petRegExp)[1];
            var dataObj = JSON.parse(data);

            if(petIndex == '') {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 200;
                res.end(JSON.stringify(dataObj));
            } else if(dataObj[petIndex] === undefined) {
                res.setHeader('Content-Type', 'text/plain');
                res.statusCode = 404;
                res.end('Not found');
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 200;
                res.end(JSON.stringify(dataObj[petIndex]));
            }
        })

    } else {
        res.setHeader('Content-Type', 'text/plain');
        res.statusCode = 404;
        res.end('Not found');
    }


};


var server = http.createServer(requestHandler)

server.listen(port, () => {
    console.log(`Server is listening on port:${port}`)
})