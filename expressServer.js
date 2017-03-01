const express = require('express')
const pets = require('./pets.json')
const server = express()
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 8000

server.use(bodyParser.json())

server.listen(PORT, function () {
  console.log('Server listening on port 8000')
})

server.get('/pets', (req, res) => {
  res.status(200).json(pets)
})

server.get('/pets/:id', (req, res) => {
  const id = req.params.id
  if (id >= 0 && id < pets.length) {
    res.status(200).json(pets[id])
  }
  else {
    res.setHeader("Content-Type", "text/plain")
    res.status(404).send('Not Found')
  }
})

// server.ajax({
//   type: "GET",
//   beforeSend: function(req,res) {
//     const id = req.params.id
//     if (id < 0 || id >= pets.length) {
//       req.setRequestHeader("Content-Type",'text/plain')
//     }
//     else {
//       req.setRequestHeader("Content-Type",'application/json')
//     }
//   },
//   url: "/pets/:id",
//   dataType: "json"
//   // success: function () {
//   //   res.status(200).json(pets[id])
//   // }
// })


//
// server.ajax(
//   const id = req.params.id
//   if (0 <= id && id < pets.length) {
//     {
//       type: "GET",
//       contentType: "application/json",
//       url: "/pets/:id",
//       dataType: "json"
//     }
//   }
//   else {
//     {
//       type: "GET",
//       contentType: "text/plain",
//       url: "/pets/:id",
//       dataType: "json"
//     }
//   }
// ).done(function () {
//   if (0 <= req.params.id && req.params.id < pets.length) {
//     res.status(200).json(pets[id])
//   }
//   else {
//     res.status(404).json()
//   }
// })



module.exports = server
