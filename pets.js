'use strict'

console.log("Usage: node pets.js [read | create | update | destroy]")
//console.log(process.argv)
var juno=process.argv;
var fs = require("fs");
var pink= /-|[0-9]/
var standardError= require("standard-error");
//throw new standardError("asdf")
for(var i=0; i<juno.length; i++)
{
  if(juno[i]==="read")
  {
  //  if(juno[i+1]==="0"||juno[i+1]==="1"||juno[i+1]==="2"||juno[i+1]==="3" || juno[i+1]==="4" ||juno[i+1]==="5"||juno[i+1]==="6" || juno[i+1]==="7")
    //{
    if(pink.test(Number(juno[i+1]))===true)
    {
      if(Number(juno[i+1])<0||Number(juno[i+1])>=juno.length)
      {
      console.log("Exiting App")
      process.exit(1);

      }
      var index=juno[i+1];

    fs.readFile("pets.json", function(err, data){
      if(err)
      {
        console.log("you are wrong");
      }
      console.log(JSON.parse(data)[index]);


    });
  }

    else
      {
        fs.readFile("pets.json", function(err, data){
          if(err)
          {
            console.log("you are wrong");
          }
          console.log(JSON.parse(data));

        });
      }

  }
}
