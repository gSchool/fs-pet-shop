
 var express = require('express');
 var app = express();
 var fs = require('fs');
 var path = require('path');
 var petsPath = path.join(__dirname, 'pets.json');



 const bodyParser = require('body-parser');
 app.use(bodyParser.json());

 const PORT = process.env.PORT || 8000;

 app.listen( PORT, () => {
   console.log('listening to PORT', PORT)
 })

 app.get('/pets', (req,res) => {
   fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
     if (err) {
       return next(err);
     }
     var pets = JSON.parse(petsJSON);
     res.send(JSON.parse(petsJSON));
   });
 });

 app.get('/pets/:id', (req, res) => {
   fs.readFile(petsPath, 'utf8', (err,petsJSON) =>{
     if (err) {
       return next(err);
   }

   var id = Number.parseInt(req.params.id);

   const pets = JSON.parse(petsJSON);

   if (Number.isNaN(id) || id < 0 || id > pets.length - 1) {
     console.error('Not Found');
     return res.sendStatus(404);
   }
   res.send(pets[id]);
   })
 })

 app.post('/pets', (req, res ) => {
   fs.readFile(petsPath, 'utf8', (err,petsJSON) =>{
     if (err) {
       return next(err);
   }

   var age = req.body.age;
   var kind = req.body.kind;
   var name = req.body.name;

   if (Number.isNaN(age) || kind  === '' || name === '') {

       return res.sendStatus(400);
   }
   var newPet = {};
   newPet.age = age;
   newPet.kind = kind;
   newPet.name = name;
   var petsArray = JSON.parse(petsJSON);
   petsArray.push(newPet);
   fs.writeFile(petsPath, JSON.stringify(petsArray), (err) => {
    if (err) throw err;
   });
   res.send(newPet);
   });
 })

 app.patch('/pets/:id', (req, res ) => {
   fs.readFile(petsPath, 'utf8', (err,petsJSON) =>{
       if (err) {
         return next(err);
     }
     var pets = JSON.parse(petsJSON);
     var id = Number.parseInt(req.params.id);

     if (Number.isNaN(id) || id < 0 || id >= pets.length) {
       return res.sendStatus(404);
     }

     var newAge = Number.parseInt(req.body.age);
     if (newAge) {
       pets[id]["age"] = newAge;
     }
     var newKind = req.body.kind;
     if (newKind) {
       pets[id]["kind"] = newKind;
     }
     var newName = req.body.name;
     if (newName) {
       pets[id]["name"] = newName;
     }
     var updatedPets = JSON.stringify(pets)

     fs.writeFile(petsPath, updatedPets, (err) => {
      if (err) throw err;
     });
     res.send(pets[id]);
   });
 })

 app.delete('/pets/:id', (req,res) => {
   fs.readFile(petsPath, 'utf8', (err,petsJSON) =>{
     if (err) {
       return next(err);
     };
     var pets = JSON.parse(petsJSON);
     var id = Number.parseInt(req.params.id);
     if (Number.isNaN(id) || id < 0 || id >= pets.length) {
       return res.sendStatus(404);
     }
     var removedPet = pets.splice(id, 1);
     var updatedPetsJSON = JSON.stringify(pets);
     var removedPetJSON = JSON.stringify(removedPet);

     fs.writeFile(petsPath, updatedPetsJSON, (err) => {
      if (err) throw err;
     })
     res.send(removedPet[0]);
   })

 })


 module.exports = app;
