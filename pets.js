'use strict'
var counter=0;
var commandArr=process.argv;
var fs= require('fs');
var regy=/read|create|update|destroy/;
var numberReg=/[0-9]/;
for(var i=0; i<commandArr.length; i++){
  if(regy.test(commandArr[i])===true){
    counter++
  }
}
if(counter===0){
  console.error("Usage: node pets.js [read | create | update | destroy]")
  process.exit(1);
}
for(var j=0; j<commandArr.length; j++){
  if(commandArr[j]==='read'&&commandArr.length===3){
    fs.readFile("pets.json", function(err, data){
      if(err){
        console.error("Usage: node pets.js [read | create | update | destroy]")
        process.exit(1);
      }
      console.log(JSON.parse(data))
    })
  }
}

for(var k=0; k<commandArr.length; k++){
  if(commandArr[k]==='read'&&numberReg.test(Number(commandArr[k+1]))===true){
    fs.readFile("pets.json", function(err, data){
      if(err){
        console.error("Usage: node pets.js [read | create | update | destroy]")
        process.exit(1);
      }
      console.log(JSON.parse(data)[Number(commandArr[commandArr.length-1])]);
    })
  }
}
for(var x=0; x<commandArr.length; x++){
  if(commandArr[x]==='create'&&commandArr.length<6){
    console.error("Usage: node pets.js create AGE KIND NAME")
    process.exit(1);
  }
}
for(var z=0; z<commandArr.length; z++){
  if(commandArr[z]==='create'&&commandArr.length===6){
    var petObj= new Object();
    petObj.age= Number(commandArr[z+1]);
    petObj.kind=commandArr[z+2];
    petObj.name=commandArr[z+3];
    console.log(petObj)

    fs.readFile("pets.json", function(err, data){
      if (err) {
        assert.fail('Command produced a nonzero status code',
          'Command should produce a zero status code');
      }
      var newPetsArr=[];
      var petsArr=JSON.parse(data);
      petsArr.push(petObj);
      newPetsArr.push(petObj);
      // newPetsArr.push("");
      // console.log(newPetsArr)
      //console.log(petObj)
      fs.writeFile("pets.json", petObj, function(err){
        if(err){
          console.error("Usage: node pets.js create AGE KIND NAME")
          process.exit(1);
        }

      })
      // console.log("")
      //console.log(petsArr)
    })

    // console.log('{ age: 3, kind: \'parakeet\', name: \'Cornflake\' }')

  }
}
