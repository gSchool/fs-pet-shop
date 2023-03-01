const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');
const port = 8000;
app.use(express.json());

app.all('/', (req,res,next)=>{
    return next(err);
})
// app.all('/:any/', (req,res,next)=>{
//     let wrongPath = req.params.any;
//     if (any !== 'pets') {
//         console.log('Error, incorrect path');
//         res.status(404).send('Not Found');
//     }
// })

// If GET request to /pets, returns all info to client
app.get('/pets', (req,res,next)=>{
    console.log(req.method);
    console.log('Request for All Pets')
    fs.readFile(petsPath, (err,data)=>{
        if (err){
            next(err);
        }
        const allPets=JSON.parse(data);
        res.status(200);
        res.send(allPets);
    })
})

// If GET request to specific pet id at that path, returns info about that pet
app.get('/pets/:id/', (req,res,next)=>{
    console.log(req.method);
    const id = parseInt(req.params.id);
    console.log(`Request for pets at /${id}`)
    fs.readFile(petsPath, (err,data)=>{
        const allPets=JSON.parse(data);
        if (!allPets[id]) {
            console.log('DELETE error, doesn\'t exist');
            return res.status(404).send('Not Found');
        } else {
            res.status(200);
            res.send(allPets[id]);
        }
    })
})

app.use((err,req,res,next)=>{
    console.log('GET error sent to middleware')
    console.error(err.stack);
    res.status(404).send('Not Found');
})

// If POST request, takes the request in and adds the information to the pets.json file
app.post('/pets', (req,res, next)=>{
    console.log(req.method);
    const age = parseInt(req.body.age);
    const { kind, name } = req.body;
    console.log(`${age}, ${kind}, ${name}`);
    fs.readFile(petsPath, (err,data)=>{
        if (err){
            next(err);
        } else {
            if (!age || !kind || !name || Number.isNaN(age)) {
                console.log('Error: Input missing information');
                return res.status(400).send('Error: Input missing information');
            }
            let allPets = JSON.parse(data);
            let newPet = {age, kind, name};
            allPets.push(newPet);
            fs.writeFile(petsPath, JSON.stringify(allPets), (err)=>{
                if (err) {
                    next(err);
                } else {
                    res.status(200)
                    res.send(`New pet added: ${JSON.stringify(newPet)}`);
                }
            })
        }        
    })   
})

app.use((err,req,res,next)=>{
    console.log('POST error sent to middleware')
    return res.status(500).send('Internal Error');
})

// If PATCH request, takes in the body and checks against
app.patch('/pets/:pet_id', (req,res, next)=>{
    console.log(req.method);
    const petId = parseInt(req.params.pet_id);
    const body = req.body;
    fs.readFile(petsPath, (err,data)=>{
        let allPets = JSON.parse(data);
        if (err || !allPets[petId] || Number.isNaN(parseInt(body.age))) {
            console.log('PATCH error')
            return res.status(400).send('Improper input from user');
        }
        if (body.hasOwnProperty('age' && !Number.isNaN(parseInt(body.age)))) {
            allPets[petId].age = body.age;
        }
        if (body.hasOwnProperty('kind')) {
            allPets[petId].kind = body.kind;
        }
        if (body.hasOwnProperty('name')) {
            allPets[petId].name = body.name;
        }
        fs.writeFile(petsPath, JSON.stringify(allPets), (err)=>{
            if (err) {
                next(err);
            } else {
                res.status(200)
                res.send(`Updated pet info`);
            }
         })        
    })   
})

app.use((err,req,res,next)=>{
    console.log('PATCH error sent to middleware')
    console.error(err.stack);
    res.status(500).send('Internal Error');
})

app.delete('/pets/:pet_id', (req, res, next)=>{
    console.log(req.method);
    const petId = parseInt(req.params.pet_id);
    fs.readFile(petsPath, (err,data)=>{
        if (err){
            return next(err);
        } else {
            let allPets = JSON.parse(data);
            if (!allPets[petId]) {
                console.log('DELETE error, doesn\'t exist');
                return res.status(404).send('Not Found');
            }
            // let deletedPet = allPets[petId];
            allPets.splice(petId, 1);
            fs.writeFile(petsPath, JSON.stringify(allPets), (err)=>{
                if (err) {
                    return next(err);
                } else {
                    res.status(200)
                    res.send(`Pet deleted`);
                }
            })
        }        
    })
})

app.use((err,req,res,next)=>{
    console.log('DELETE error sent to middleware')
    console.error(err.stack);
    res.status(500).send('Internal Error');
})

app.listen(port, ()=>{
    console.log(`Server is listening on ${port}`);
})