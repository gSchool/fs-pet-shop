// import http from "http";
// import fs from "fs";

// const server = http.createServer((req, res) => {
//     if (req.url === "/pets" && req.method === "GET") {
//         fs.readFile("./pets.json", "utf-8", (err, data) => {
//             if (err) {
//                 console.error('ERROR');
//                 res.end()
//             } else {
//                 res.statusCode = 200;
//                 res.writeHead(200, { "Content-Type": "application/json" });
//                 res.end(data);
//             }
//         })
//     } else if (req.url === "/pets/0" && req.method === "GET") {
//         fs.readFile("./pets.json", "utf-8", (err, data) => {
//             let parsed = JSON.parse(data)
//             res.statusCode = 200;
//             res.writeHead(200, { "Content-Type": "application/json" });
//             res.end(JSON.stringify(parsed[0]));
//         })
//     } else if (req.url === "/pets/1" && req.method === "GET") {
//         fs.readFile("./pets.json", "utf-8", (err, data) => {
//             let parsed = JSON.parse(data)
//             res.statusCode = 200;
//             res.writeHead(200, { "Content-Type": "application/json" });
//             res.end(JSON.stringify(parsed[0]));
//         })
//     } else if (req.url === "/pets/2" && req.method === "GET") {
//         res.statusCode = 404;
//         res.writeHead(404, { "Content-Type": "text/plain" })
//         res.end("PAGE NOT FOUND")
//     } else if (req.url === "/pets/-1" && req.method === "GET") {
//         res.statusCode = 404;
//         res.writeHead(404, { "Content-Type": "text/plain" })
//         res.end("PAGE NOT FOUND")
//     }
// });

// server.listen(4000, () => {
//     console.log('listening on port 4000');
// });