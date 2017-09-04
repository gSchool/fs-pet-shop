'use strict';

var http= require("http");
var url= require("url");
var fs= require("fs");
var path=require("path");
var petsPath=path.join("pets.json")
var port= process.env.PORT || 8000
var superReg=/\/pets\/[0-9]/
var superRegDeluxe=/[0-9]/
var ultraReg=/-/;
var server=http.createServer(function(req, res){

 if(req.method==="GET"&&req.url==="/pets")
 {
  fs.readFile(petsPath, "utf8", function(err, data) {

    if(err)
    {
      console.error(err.stack)

      res.writeHead(500, {"Content-Type": "text/html"})
      res.end("errrrrr")
    }
/*
    var petsArray = JSON.parse(data);
    petsArray.push("this works")
    console.log(petsArray)
    console.log(Array.isArray(petsArray));
*/

    /*
    var anton=JSON.parse(data);
    var beef=anton[0];

    console.log(anton);
    console.log(beef)
    */
    res.writeHead(200, {"Content-Type": "application/json"});


    res.end(data);

  });
}
/*
else if(req.method==="GET"&&req.url==="/pets/:id")
{
  //var idNum=Number.parseInt(req.params.idNum)

fs.readFile(petsPath, "utf8", function(err, data){
if(err)
{
console.error(err.stack);
res.writeHead(404, {"Content-Type": "text/html"})
res.end("errrrr")
}
//var id=Number.parseInt(req.params.id);
//console.log(id)
console.log("asdf")
res.writeHead(200, {"Content-Type": "application/json"});
res.end("this should be print");





});




}
*/
//else if(superReg.test(req.url)===true)
//else if(req.method==="GET"&&req.url==="/pets/:id")
else
{

fs.readFile(petsPath, "utf8", function(err, data){
  if(err)
  {
    console.error(err.stack)

    res.writeHead(500, {"Content-Type": "text/html"})
    res.end("errrrrr")
  }




var urlArr=req.url.split("");
for(var i =0; i<urlArr.length; i++)
{
  //console.log("benzo")
  if(ultraReg.test(urlArr[i])===true)
  {
    res.writeHead(404, {"Content-Type": "text/plain"})
    res.end("Not Found");
  }
}

for(var beef=0; beef<urlArr.length; beef++)
{
  if(superRegDeluxe.test(urlArr[beef])===true)
  {
    var antonin=urlArr[beef];
  }
}
var ultraPig=JSON.parse(data);
if(antonin>=0&&antonin<=ultraPig.length-1)
{

  var druganov=ultraPig[antonin];
  var cat=JSON.stringify(druganov);






res.writeHead(200, {"Content-Type": "application/json"});


res.end(cat);
}
else if(antonin<0||antonin>ultraPig.length-1)
{


  res.writeHead(404, {"Content-Type": "text/plain"})
  res.end("Not Found");

}

});
}

})


server.listen(port, function(){

console.log("this is port eight triple zero mother f****r")

});



module.exports=server;
