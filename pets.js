#!/usr/bin/env node
const fs = require('fs');
//Read and parse 
fs.readFile('pets.json', 'utf8', (err, data) => {
  if(err) throw err;
  let dataArr = JSON.parse(data)
      //check for subcommand
  if (!process.argv[2]) {
    console.error('Usage: node pets.js [read | create | update | destroy]')
    //handle a read and/or read index commands
  } else if (process.argv[2] === 'read') {
    if (process.argv[3]) {
      console.log(dataArr[process.argv[3]])
    } else {
      console.log(dataArr)
    } 
    //handle create command to write a new record
  } else if (process.argv[2] === 'create' && process.argv[3] && process.argv[4] && process.argv[5]) {
        let newRecord = {"age":parseInt(process.argv[3]),"kind":process.argv[4],"name":process.argv[5]};
        if(err) throw err;
        dataArr.push(newRecord);
        write(dataArr);
    //handle update command to revise records  
  } else if (process.argv[2] === 'update' && process.argv[3] && process.argv[4] && process.argv[5] && process.argv[6]) {
      let updatedRecord = {"age":parseInt(process.argv[4]),"kind":process.argv[5],"name":process.argv[6]}
      if(err) throw err;
      dataArr.splice(process.argv[3], 1 , updatedRecord);
      write(dataArr);
    //handle destroy command to remove a record at said index      
  } else if (process.argv[2] === 'destroy' && process.argv[3]) {
      dataArr.splice(process.argv[3], 1);
      write(dataArr);
  }
})

//This is the write function
function write (array){ fs.writeFile('pets.json',JSON.stringify(array),(err) => { 
  if (err) { 
    throw err;
  }
})}