const path = require("path");
const fs = require("fs");
const http = require("http");

const petsPath = path.join(__dirname, "pets.json");

function handleError(err) {
  throw err;
}

function respond404(res) {
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/plain");
  res.end("Not Found");
}

function respond400(res) {
  res.statusCode = 400;
  res.setHeader("Content-Type", "text/plain");
  res.end("Bad Request");
}

function respondJSON(res, resValue) {
  res.setHeader("Content-Type", "application/json");
  res.end(resValue);
}

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    const reqURL = req.url.split("/");

    if (reqURL[1] === "pets") {
      fs.readFile(petsPath, "utf8", (err, data) => {
        if (err) { handleError(err); }
        
        const petsJSON = JSON.parse(data);
        const recordNum = reqURL[2];

        if (recordNum) {
          if (petsJSON[recordNum]) {
            respondJSON(res, JSON.stringify(petsJSON[recordNum]));
          }
          else {
            respond404(res);
          }
        }
        else {
          respondJSON(res, JSON.stringify(petsJSON));
        }
      });
    }
    else {
      respond404(res);
    }
  }
  else if (req.method === "POST") {
    let body = "";

    req.on("data", function (data) {
      body += data;
    });
    req.on("end", function () {
      body = JSON.parse(body);
    
      if (!body.age || !body.kind || !body.name || isNaN(parseInt(body.age))) {
        respond400(res);
        return;
      }

      fs.readFile(petsPath, "utf8", (err, data) => {
        if (err) { handleError(err); }

        let petsJSON = JSON.parse(data);
        
        petsJSON.push({age: parseInt(body.age), kind: body.kind, name: body.name});

        petsJSON = JSON.stringify(petsJSON);

        fs.writeFile(petsPath, petsJSON, function(err) {
          if (err) { handleError(err); }
        });
  
        respondJSON(res, JSON.stringify(body));
      });
    });
  }
});

server.listen(8000, () => {
  console.log("Listening on port 8000");
});

module.exports = server;