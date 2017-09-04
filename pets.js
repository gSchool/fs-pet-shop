'use strict'

var counter=0;
var juno=process.argv;
var regy=/read|create|update|destroy/;

/*
if(juno.length===2)
{
  console.error("Usage: node pets.js create AGE KIND NAME")
  process.exit(1);
}
*/



for(var moon=0; moon<juno.length; moon++)
{
  if(regy.test(juno[moon])===true)
  {
    counter++;
  }
}
if(counter===0)
{
  console.error("Usage: node pets.js [read | create | update | destroy]")
  process.exit(1);
}

var fs = require("fs");
var pink= /-|[0-9]/
for(var i=0 ;i<juno.length; i++)
{
  if(juno[i]==="read")
  {

    if(pink.test(Number(juno[i+1]))===true)
    {
      if(Number(juno[i+1])<0||Number(juno[i+1])>=juno.length)
      {

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
            //console.log("you are wrong");
          }
          console.log(JSON.parse(data));

        });
      }

  }
  else if(juno[i]==="create"&&juno.length<6)
  {
    console.error("Usage: node pets.js create AGE KIND NAME")
    process.exit(1);
  }
  else if(juno[i]==="create"&&juno.length===6&&isNaN(juno[i+1])===false)
  {
        var animalObj= new Object();
        animalObj.age=Number(juno[i+1]);
        animalObj.kind=juno[i+2];
        animalObj.name=juno[i+3];
        //console.log(JSON.stringify(animalObj));
        var JSONAnimalObj = JSON.stringify(animalObj);
        console.log(animalObj);

        fs.readFile("pets.json", "utf8", function(err, data){
          if(err)
          {
            console.error("Usage: node pets.js create AGE KIND NAME")
            process.exit(1);
          }
          //console.log(data)
          //var javaData=JSON.parse(data);
          //javaData.push(animalObj);
          //console.log(javaData)
          var animalArr=[];
          animalArr.push(animalObj);
          var JSONAnimalArr=JSON.stringify(animalArr);
          console.log(JSONAnimalArr)
          //var JSONd=JSON.stringify(javaData)
          //console.log(JSONd)
          //fs.writeFile("pets.json", JSONd)
          fs.writeFile("pets.json", JSONAnimalArr);



        });


/*

      fs.writeFile("pets.json", JSONAnimalObj, function(err){
        if(err)
        {
          console.log("something went wrong");
        }
      });
*/
  }
}
