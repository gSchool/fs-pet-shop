const express = require('express');
const app = express();
const fs = require('fs');
const port = 8000;
app.use(express.json());

// If GET request to /pets, returns all info to client
app.get('/pets', (req,res,next)=>{
    console.log(req.method);
    console.log('Request for All Pets')
    fs.readFile('./pets.json', (err,data)=>{
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
    fs.readFile('./pets.json', (err,data)=>{
        const allPets=JSON.parse(data);
        if (!allPets[id]) {
            next({});
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
    if (!age || !kind || !name || Number.isNaN(age)){
        next(err);
    }
    fs.readFile('./pets.json', (err,data)=>{
        if (err){
            next(err);
        } else {
            let allPets = JSON.parse(data);
            let newPet = {age, kind, name};
            allPets.push(newPet);
            fs.writeFile('./pets.json', JSON.stringify(allPets), (err)=>{
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
    console.error(err.stack);
    res.status(500).send('Internal Error');
})


app.listen(port, ()=>{
    console.log(`Server is listening on ${port}`);
})