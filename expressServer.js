'use strict'

var express=require("express");
var http= require("http");
var fs= require("fs");
var app=express();
var path=require("path");
var petsPath=path.join("pets.json")
//var superReg=/\/pets\/[0-9]/
//var superReg=/[0-9]/
var regDeluxe=/-/
var superReg=/(^| )\d+\b/
var port= process.env.PORT || 8000;

app.get("/pets", function(req, res){
  //console.log(req.)
/*
var celticPride=["Uncle Drew", "Hayward"];
res.send(celticPride);
*/
fs.readFile(petsPath, "utf8", function(err, data){
if(err)
{
  console.error(err.stack)
  res.sendStatus(500);
}
res.send(JSON.parse(data));
//res.send(data)


});

});

app.get("/pets/:id", function(req, res){

//console.log(req.url)
fs.readFile(petsPath, "utf8", function(err, data){
if(err)
{
  console.error(err.stack)
  res.sendStatus(500);
}



var urlArr=req.url.split("");
for(var j=0; j<urlArr.length; j++)
{
  if(regDeluxe.test(urlArr[j])===true)
  {
    res.sendStatus(404)
  }
}


for(var i=0; i<urlArr.length; i++)
{

  if(superReg.test(urlArr[i])===true)
  {
    var index=urlArr[i];

  }
}

var dreamShake=JSON.parse(data);
if(index>=0&&index<dreamShake.length)
{
  res.send(JSON.parse(data)[index])

}
console.log(req.url)
/*
res.writeHead(404, {"Content-Type": "text/plain"})
res.write("Not found");
res.end();
*/
//res.status(404).send("Not found")

res.sendStatus(404)
//res.send(JSON.parse(data)[index])


});
});

app.listen(port, function(){

console.log("this is eight triple zero mother fucker")

});


module.exports=app;
