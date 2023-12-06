
const http = require("http");
const fs = require("fs"); 
const port = process.env.PORT || 8000;



var requestHandler = (req, res) => {
    var url = req.url;
    const petRegExp = /^\/pets\/(.*)$/;
    console.log(petRegExp)
    console.log(petRegExp.test(url))
    console.log(url.match(petRegExp))
    
    if(req.method === 'GET' && req.url === "/pets" ) {
       fs.readFile('../pets.json', (err, data) => {
        if (err) throw err;
        res.setHeader("Content-Type", "application/json")
        res.statusCode = 200
        res.end(data)
       })
    } else if(req.method === 'GET') {
      let urlSplit = req.url.split("/")
      //console.log(urlSplit[2])
      fs.readFile(`../pets.json`, (err, data) => {
        if (err) throw err;
        //console.log(JSON.parse(data[urlSplit]))
        let dataSet = JSON.parse(data)
        if (urlSplit[2] >= dataSet.length || urlSplit[2] < 0){
            res.statusCode = 404
            res.setHeader("Content-Type", "text/plain")
            res.end('Not Found')
        } else {
            res.setHeader("Content-Type", "application/json")
            res.statusCode = 200
            res.end(JSON.stringify(dataSet[urlSplit[2]]))
        }
        
       });
    }
};

var server = http.createServer(requestHandler)

server.listen(port, () => {
    console.log(`Server is listening on port:${port}`)
})