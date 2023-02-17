const express = require('express');
const app = express();
const fs = require('fs');
const port = 8000;

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
    fs.readFile('./pets.json', (err,data)=>{
        const allPets=JSON.parse(data);
        if (!allPets[id]) {
            next({});
        } else {
            res.send(allPets[id]);
        }
    })
})

app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(404).send('Not Found');
})

app.listen(port, ()=>{
    console.log(`Server is listening on ${port}`);
})