
const http = require("http");
const fs = require("fs"); 
const port = process.env.PORT || 8000;



var requestHandler = (req, res) => {
    var url = req.url;
    const petRegExp = /^\/pets\/(.*)$/;
    console.log(petRegExp)
    console.log(petRegExp.test(url))
    console.log(url.match(petRegExp))


};

var server = http.createServer(requestHandler)

server.listen(port, () => {
    console.log(`Server is listening on port:${port}`)
})