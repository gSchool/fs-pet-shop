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
    if(id<0||id>JSON.parse(data).length-1||isNaN(id)===true)
    {
      res.sendStatus(404)
    }
    res.send(JSON.parse(data)[id])
  })
})

app.post("/pets", function(req, res){
var petObj=req.body;

fs.readFile("pets.json", "utf8", function(err, data){
  if(err){
    console.error(err.stack)
    res.sendStatus(500);
  }
  if(typeof petObj.age!=="number")
  {
    res.sendStatus(400)

  }
  if(typeof petObj.age==="number"){
  var petsArr=JSON.parse(data);
  petsArr.push(petObj);
  var petsArrJSON=JSON.stringify(petsArr);

  fs.writeFile("pets.json", petsArrJSON, function(err){
    if(err){
      console.error(err.stack);
      res.sendStatus(500);
    }
  })
  res.send(petObj)

}
})
})
app.patch("/pets/:id", function(req, res){
  var animalObj=req.body;
  var id=Number.parseInt(req.params.id);

  fs.readFile("pets.json","utf8", function(err, data){
    if(err){
      console.error(err.stack)
      res.sendStatus(500)
    }
    var animalArr=JSON.parse(data);
    var focusAnimal=animalArr[id];
    for(var i in animalObj)
    {
      for(var j in focusAnimal)
      {
        if(j===i)
        {
          focusAnimal[j]=animalObj[i];
        }
      }
    }
    var JSONAnimalArr=JSON.stringify(animalArr);
    fs.writeFile("pets.json", JSONAnimalArr, function(err){
      if(err){
        console.error(err.stack)
        res.sendStatus(500);
      }
    })
res.send(focusAnimal)
  })
});
app.delete("/pets/:id", function(req, res){
  var id=Number.parseInt(req.params.id);
  //console.log(id);
  fs.readFile("pets.json", "utf8", function(err, data){
    if(err){
      console.error(err.stack)
      res.sendStatus(500);
    }
    var petsArr=JSON.parse(data);
    res.send(petsArr[id])
    petsArr[id]="";
    var newPetsArr=[];
    //console.log(petsArr)
    for(var i=0; i<petsArr.length; i++){
      if(petsArr[i]!==""){
        newPetsArr.push(petsArr[i]);
      }
    }
    var JSONnewPetsArr=JSON.stringify(newPetsArr);
    fs.writeFile("pets.json", JSONnewPetsArr, function(err){
      if(err){
        console.error(err.stack);
        res.sendStatus(500);
      }
    })


  })
})
app.listen(port, function(){
  console.log("port eight triple zero")
})
module.exports = app;
