const fs = require('fs');
const http = require('http');

// create a server
const server = http.createServer((request, response) => {
    let requestMethod = request.method;
    let requestUrl = request.url;
    let requestIndex = undefined;
    let lengthIndex = (requestUrl.length - 6);
    let body = "";

    // READING RECORDS
    if (requestMethod === 'GET') {
        // check and prepare the url section
        if (requestUrl.length > 5) {
            requestIndex = requestUrl.slice(-lengthIndex);
        };
        // get a specific record
        if (requestIndex !== undefined && requestUrl.slice(0, 5) === '/pets') {
            fs.readFile('./pets.json', 'utf8', (err, data) => {
                const recordData = JSON.parse(data);
                // if the specified index returns no record
                if (recordData[requestIndex] === undefined) {
                    response.writeHead(404, { 'Content-Type': 'text/plain' });
                    response.end('Not Found');
                } else {
                    // get the specified record
                    stringData = JSON.stringify(recordData[requestIndex]);
                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    response.end(stringData);
                };
            });
        // get all records
        } else if (requestIndex === undefined && requestUrl === '/pets') {
            fs.readFile('./pets.json', 'utf8', (err, data) => { 
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end(data);
            });
        } else {
            // handle errors
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.end('Not Found');
        };
    } else if (requestMethod === 'POST') {
        // check and prepare the url section

        if (requestUrl.slice(0, 5) === '/pets') {
            fs.readFile('./pets.json', 'utf8', (err, data) => {
                const recordData = JSON.parse(data);

                request.on('data', function (chunk) {
                    body += chunk;
                });
                request.on('end', function () {
                    let parsedBody = JSON.parse(body);
                    let recordNew = new Object();
                        recordNew.age = Number(parsedBody.age);
                        recordNew.kind = parsedBody.kind;
                        recordNew.name = parsedBody.name;
                    recordData.push(recordNew);
                    
                    fs.writeFile('pets.json', JSON.stringify(recordData), (err) => {
                        // print the created data
                        response.writeHead(200, { 'Content-Type': 'application/json' });
                        response.end(JSON.stringify(parsedBody));
                    });
                });
            });
        } else {
            // handle errors
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.end('Not Found');
        };
    } else if (requestMethod === 'PUT') {
        // check and prepare the url section
        if (requestUrl.length > 5) {
            requestIndex = requestUrl.slice(-lengthIndex);
        };
        if (requestUrl.slice(0, 6) === '/pets/') {
            fs.readFile('./pets.json', 'utf8', (err, data) => {
                const recordData = JSON.parse(data);

                request.on('data', function (chunk) {
                    body += chunk;
                });
                request.on('end', function () {
                    let parsedBody = JSON.parse(body);
                    let recordNew = new Object();
                        recordNew.age = Number(parsedBody.age);
                        recordNew.kind = parsedBody.kind;
                        recordNew.name = parsedBody.name;
                        recordData.splice(requestIndex, 1, recordNew);
                        
                        fs.writeFile('pets.json', JSON.stringify(recordData), (err) => {
                        // print the created data
                        response.writeHead(200, { 'Content-Type': 'application/json' });
                        response.end(JSON.stringify(parsedBody));
                    });
                });
            });
        };
    } else if (requestMethod === 'DELETE') {
        // check and prepare the url section
        if (requestUrl.length > 5) {
            requestIndex = requestUrl.slice(-lengthIndex);
        };
        console.log(requestIndex);
        if (requestUrl.slice(0, 5) === '/pets') {
            fs.readFile('./pets.json', 'utf8', (err, data) => {
                const recordData = JSON.parse(data);
                recordData.splice(requestIndex, 1);
                fs.writeFile('pets.json', JSON.stringify(recordData), (err) => {
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end('File Deleted');
                });
            });
        } else {
        // handle errors
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('Not Found');
        };
    } else {
        // handle errors
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('Not Found');
    };
});

server.listen(8000, () => {
    console.log('server is on')
});

module.exports = server;