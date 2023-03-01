const express = require('express');
const app = express();
const fs = require('fs');
const { Pool } = require('pg')
const port = 8000;
app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'petshop',
    password: 'mcsp19',
    port: 5432,
})


// If GET request to /pets, returns all info to client
app.get('/pets', (req,res,next)=>{
    console.log(req.method);
    console.log('Request for All Pets')
    pool.query('SELECT * FROM pets;', (err, result)=>{
        if (err){
            return next(err);
        }
        let rows = result.rows;
        res.status(200).send(rows);
    })
})

// If GET request to specific pet id at that path, returns info about that pet
app.get('/pets/:id/', (req,res,next)=>{
    console.log(req.method);
    const id = parseInt(req.params.id);
    console.log(`Request for pets at /${id}`);
    pool.query('SELECT * FROM pets WHERE id = $1;', [id], (err, result)=>{
        if (err){
            return next(err);
        }
        let pet = result.rows[0];
        // checks if pet is in the DB before sending response
        if (pet){
            console.log(pet);
            res.status(200).send(pet);
        } else {
            console.log('Pet not found');
            res.status(404).send('Pet not found');
        }
    })
})



// If POST request to /pets, takes the request in and adds the information to the DB
app.post('/pets', (req,res, next)=>{
    console.log(req.method);
    const age = parseInt(req.body.age);
    const { kind, name } = req.body;
    // checks for missing information in request and if the age is a number
    if (!age || !kind || !name || Number.isNaN(age)) {
        console.log('Error: Input missing information');
        return res.status(400).send('Error: Input missing information');
    } else {
        pool.query('INSERT INTO pets (name, kind, age) VALUES ($1, $2, $3) RETURNING *;', [name, kind, age], (err, result)=>{
            if (err){
                return next(err);
            }
            let petInfo = result.rows[0];
            console.log('Added: ' + petInfo);
            res.status(200).send(petInfo);
        })
    } 
})

// If PATCH request to pets/#, takes in the body and checks against the DB to see if exists and then updates the given fields
app.patch('/pets/:id', (req,res, next)=>{
    console.log(req.method);
    const id = parseInt(req.params.id);
    const { name, kind, age } = req.body;
    let petAge = parseInt(age);
    // checks if path is a number
    if (Number.isNaN(id)){
        console.log('Not Found')
        return res.status(404).send('Error Not Found');
    }
    // checks if the pet exists in the DB
    pool.query('SELECT * FROM pets WHERE id = $1', [id], (err, result)=>{
        let info = result.rows[0];
        if (err){
            next(err);
        }
        if (Number.isNaN(petAge)){
            console.log('Incorrect input from user');
            return res.status(400).send('Incorrect input from user. Age must be an integer.')
        }
        if (info){
            if (name){
                pool.query('UPDATE pets SET name = $1 WHERE id = $2;', [name, id], (err, result)=>{
                    console.log(`Pet updated: ${name}`);
                });
            }
            if (kind){
                pool.query('UPDATE pets SET kind = $1 WHERE id = $2;', [kind, id], (err, result)=>{
                    console.log(`Pet updated: ${kind}`);
                });
            }
            if (age){
                pool.query('UPDATE pets SET age = $1 WHERE id = $2;', [age, id], (err, result)=>{
                    console.log(`Pet updated: ${age}`);
                });
            }
            return res.status(200).send('Pet updated');
        } else {
            return res.status(404).send('Pet not found');
        }
    });  
})

app.delete('/pets/:id', (req, res, next)=>{
    console.log(req.method);
    const id = parseInt(req.params.id);
    // checks if the path is a number
    if (Number.isNaN(id)) {
        console.log('Error Not Found');
        return res.status(404).send('Error Not Found');
    } else {
        pool.query('DELETE FROM pets WHERE id = $1 RETURNING *;', [id], (err, result)=>{
            if (err){
                return next(err);
            }
            let delPet = result.rows[0];
            // checks if pet is in the database
            if (delPet){
                console.log(delPet);
                res.status(200).send(delPet);
            } else {
                console.log('Pet not found');
                res.status(404).send('Pet not found');
            }
        })
    }

    // fs.readFile(petsPath, (err,data)=>{                  ***Code from when the DB was in a JSON file***
    //     if (err){
    //         return next(err);
    //     } else {
    //         let allPets = JSON.parse(data);
    //         if (!allPets[petId]) {
    //             console.log('DELETE error, doesn\'t exist');
    //             return res.status(404).send('Not Found');
    //         }
    //         // let deletedPet = allPets[petId];
    //         allPets.splice(petId, 1);
    //         fs.writeFile(petsPath, JSON.stringify(allPets), (err)=>{
    //             if (err) {
    //                 return next(err);
    //             } else {
    //                 res.status(200)
    //                 res.send(`Pet deleted`);
    //             }
    //         })
    //     }        
    // })
})

app.use((err,req,res,next)=>{
    console.log('DELETE error sent to middleware')
    console.error(err.stack);
    res.status(500).send('Internal Error');
})

app.listen(port, ()=>{
    console.log(`Server is listening on ${port}`);
})