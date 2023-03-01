const express = require('express');
const app = express();
const fs = require('fs');
const port = 8000;
app.use(express.json());

app.get('/pets', (req,res,next)=>{
    console.log(req.method);
    console.log('Request for All Pets')
    fs.readFile('./pets.json', (err,data)=>{
        if (err){
            next(err);
        }
        const allPets=JSON.parse(data);
        res.send(allPets);
    })
})

app.get('/pets/:id/', (req,res,next)=>{
    console.log(req.method);
    const id = parseInt(req.params.id);
    console.log(`Request for pets at /${id}`)
    fs.readFile('./pets.json', (err,data)=>{
        const allPets=JSON.parse(data);
        if (!allPets[id]) {
            next({});
        } else {
            res.send(allPets[id]);
        }
    })
})

app.post('/pets', (req,res)=>{
    console.log(req.method);
    let newPet = req.body;
    console.log(newPet);
    fs.readFile('./pets.json', (err,data)=>{
        if (err){
            next(err);
        } else {
            let allPets = JSON.parse(data);
            allPets.push(newPet);
            fs.writeFile('./pets.json', JSON.stringify(allPets), (err)=>{
                if (err) {
                    next(err);
                } else {
                    res.send(`New pet added: ${JSON.stringify(newPet)}`);
                }
            })
        }        
    })   
})

app.get('/test/', (req,res,next)=>{
    res.send('Hello, my friend! You shouldn\'t be here, this is for testing and development. Now, shoo you, get out of here. Go back to looking at our pets!')
})

app.use((err,req,res,next)=>{
    console.log('Error sent to middleware')
    console.error(err.stack);
    res.status(404).send('Not Found');
})

app.listen(port, ()=>{
    console.log(`Server is listening on ${port}`);
})