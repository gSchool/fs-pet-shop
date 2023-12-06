import fs from "node:fs";
import http from "node:http";

const server = http.createServer(function (req, res) {
  const method = req.method;
  const url = req.url;

  console.log(method, url);

  res.write("Hello World!");
  res.end();
});

server.listen(8080, () => {
  console.log("Server listening on port 8080");
});
