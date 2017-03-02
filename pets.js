#!/usr/bin/env node

const fs = require('fs')
var args = process.argv
var method = args[2]
if (args.length < 3 || method != 'read' && method != 'create' && method != 'update' && method != 'destroy') {
  console.error('Usage: node pets.js [read | create | update | destroy]')
  process.exit(1)
} else {
switch(method){
  case 'read':
  fs.readFile('./pets.json', 'utf-8', function(err, data){
    if (!!err) {console.error(err); process.exit(1)}
    var arr = JSON.parse(data)
    if (!!args[3] && arr[args[3]] == undefined ){console.error('Usage: node pets.js read INDEX')
  process.exit(1)}
    if (!! args[3]){
    console.log(arr[args[3]])
  } else {console.log(arr)}
  })
  break;
  case 'create':
  fs.readFile('./pets.json', 'utf-8', function(err, data){
    if (!!err) {console.error(err); process.exit(1)}
    var arr = JSON.parse(data)
    if (args.length != 6){
      console.error('Usage: node pets.js create AGE KIND NAME'); process.exit(1)}
      var newobj = {'age': parseInt(args[3]), 'kind': args[4], 'name': args[5]}
    arr.push(newobj)
    fs.writeFile('./pets.json', JSON.stringify(arr), 'utf-8', function(err, data){if(!!err){console.error(err); process.exit(1)}
    console.log(newobj)
  })
  })
  break
  case 'update':
  fs.readFile('./pets.json', 'utf-8', function(err, data){
    if (!!err) {console.error(err); process.exit(1)}
    var arr = JSON.parse(data)
    if (args.length != 7 || !arr[args[3]]){
      console.error('Usage: node pets.js update INDEX AGE KIND NAME'); process.exit(1)}
      arr[args[3]] = {'age': parseInt(args[4]), 'kind': args[5], 'name': args[6]}
    fs.writeFile('./pets.json', JSON.stringify(arr), 'utf-8', function(err, data){if(!!err){console.error(err); process.exit(1)}
    console.log(newobj)
  })
  })
  break
  case 'destroy':
  fs.readFile('./pets.json', 'utf-8', function(err, data){
    if (!!err) {console.error(err); process.exit(1)}
    var arr = JSON.parse(data)
    if (args.length != 4 || !arr[args[3]]){
      console.error('Usage: node pets.js delete INDEX'); process.exit(1)}
      var deleted = arr.splice(args[3], 1)
    fs.writeFile('./pets.json', JSON.stringify(arr), 'utf-8', function(err, data){if(!!err){console.error(err); process.exit(1)}
  })
  console.log(deleted + "was destroyed")
  })
  break
}
}
