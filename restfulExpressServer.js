'use strict'

var express=require("express");
var app= express();
var fs= require("fs");
var morgan= require("morgan");
var bodyParser = require('body-parser')
var port= process.env.PORT || 8000

app.disable('x-powered-by');
app.use(morgan('short'));
app.use(bodyParser.json());

app.get("/pets", function(req, res){
fs.readFile("pets.json", "utf8", function(err,data){
if(err){
  res.sendStatus(500);
}
  res.send(JSON.parse(data))
})
})

app.get("/pets/:id", function(req, res){
  fs.readFile("pets.json", "utf8", function(err, data){
    if(err){
      console.error(err.stack);
      res.sendStatus(500);
    }
    var id=Number.parseInt(req.params.id);
    //console.log(JSON.parse(data).length)
    if(id<0||id>JSON.parse(data).length-1||isNaN(id)===true)
    {
      res.sendStatus(404)
    }
    res.send(JSON.parse(data)[id])
  })
})

app.post("/pets", function(req, res){
var petObj=req.body;
// if(typeof petObj.age!=="number")
// {
//   res.sendStatus(400)
// }
fs.readFile("pets.json", "utf8", function(err, data){
  if(err){
    console.error(err.stack)
    res.sendStatus(500);
  }
  if(typeof petObj.age!=="number")
  {
    res.sendStatus(400)
  }
  var petsArr=JSON.parse(data);
  petsArr.push(petObj);
  console.log(petsArr)


})

})











//app.patch()
//app.delete()
app.listen(port, function(){
  console.log("port eight triple zero")
})




module.exports = app;
