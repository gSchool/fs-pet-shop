import fs from "node:fs";
import http from "node:http";

const singlePetRegExp = /^\/pets\/(.*)$/;

const server = http.createServer((req, res) => {
  const method = req.method;
  const url = req.url;

  console.log(method, url);

  if (method === "GET" && url === "/pets") {
    fs.readFile("../pets.json", "utf-8", (err, text) => {
      if (err) {
        res.statusCode = 500;
        res.end();
        return;
      }

      res.setHeader("Content-Type", "application/json");
      res.end(text);
    });
  } else if (method === "GET" && url.match(singlePetRegExp)) {
    fs.readFile("../pets.json", "utf-8", (err, text) => {
      if (err) {
        res.statusCode = 500;
        res.end();
        return;
      }

      const pets = JSON.parse(text);
      const index = Number(url.match(singlePetRegExp)[1]);
      if (Number.isNaN(index) || index < 0 || index >= pets.length) {
        res.statusCode = 404;
        res.end();
        return;
      }

      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(pets[index]));
    });
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(8080, () => {
  console.log("Server listening on port 8080");
});
