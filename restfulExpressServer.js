const express = require('express');
const app = express();
const fs = require('fs');
// const path = require('path');
// const petsPath = path.join(__dirname, 'pets.json');
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
    // fs.readFile(petsPath, (err,data)=>{                  ***Code from when the DB was in a JSON file***
    //     if (err){
    //         next(err);
    //     }
    //     const allPets=JSON.parse(data);
    //     res.status(200);
    //     res.send(allPets);
    // })
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
        if (pet){
            console.log(pet);
            res.status(200).send(pet);
        } else {
            console.log('Pet not found');
            res.status(404).send('Pet not found');
        }
    })

    // fs.readFile(petsPath, (err,data)=>{                  ***Code from when the DB was in a JSON file***
    //     const allPets=JSON.parse(data);
    //     if (!allPets[id]) {
    //         console.log('DELETE error, doesn\'t exist');
    //         return res.status(404).send('Not Found');
    //     } else {
    //         res.status(200);
    //         res.send(allPets[id]);
    //     }
    // })
})

// app.use((err,req,res,next)=>{                            ***Code from when the DB was in a JSON file***
//     console.log('GET error sent to middleware')
//     console.error(err.stack);
//     res.status(404).send('Not Found');
// })


// If POST request to /pets, takes the request in and adds the information to the pets.json file
app.post('/pets', (req,res, next)=>{
    console.log(req.method);
    const age = parseInt(req.body.age);
    const { kind, name } = req.body;
    if (!age || !kind || !name || Number.isNaN(age)) {
        console.log('Error: Input missing information');
        return res.status(400).send('Error: Input missing information');
    } else {
        pool.query('INSERT INTO pets (name, kind, age) VALUES ($1, $2, $3) RETURNING *;', [name, kind, age], (err, result)=>{
            if (err){
                return next(err);
            }
            let petInfo = result.rows;
            console.log('Added: ' + petInfo);
            res.status(200).send(petInfo);
        })
    }

    // fs.readFile(petsPath, (err,data)=>{                  ***Code from when the DB was in a JSON file***
    //     if (err){
    //         next(err);
    //     } else {
    //         if (!age || !kind || !name || Number.isNaN(age)) {
    //              console.log('Error: Input missing information');
    //              return res.status(400).send('Error: Input missing information');
    //         }
    //         let allPets = JSON.parse(data);
    //         let newPet = {age, kind, name};
    //         allPets.push(newPet);
    //         fs.writeFile(petsPath, JSON.stringify(allPets), (err)=>{
    //             if (err) {
    //                 next(err);
    //             } else {
    //                 res.status(200)
    //                 res.send(`New pet added: ${JSON.stringify(newPet)}`);
    //             }
    //         })
    //     }        
    // })   
})

// app.use((err,req,res,next)=>{                            ***Code from when the DB was in a JSON file***
//     console.log('POST error sent to middleware')
//     return res.status(500).send('Internal Error');
// })

// If PATCH request to pets/#, takes in the body and checks against
app.patch('/pets/:id', (req,res, next)=>{
    console.log(req.method);
    const id = parseInt(req.params.id);
    const { name, kind, age } = req.body;
    let petAge = parseInt(age);
    if (name){
        pool.query('UPDATE pets SET name = $1 WHERE id = $2;', [name, id], (err, result)=>{
            console.log('Pet updated');
        });
    };
    if (kind){
        pool.query('UPDATE pets SET kind = $1 WHERE id = $2;', [kind, id], (err, result)=>{

        });
    };
    if (age && !Number.isNaN(petAge)){
        pool.query('UPDATE pets SET age = $1 WHERE id = $2;', [age, id], (err, result)=>{

        });
    };
    

    // fs.readFile(petsPath, (err,data)=>{                  ***Code from when the DB was in a JSON file***    
    //     let allPets = JSON.parse(data);
    //     if (err || !allPets[petId] || Number.isNaN(parseInt(body.age))) {
    //         console.log('PATCH error')
    //         return res.status(400).send('Improper input from user');
    //     }
    //     if (body.hasOwnProperty('age' && !Number.isNaN(parseInt(body.age)))) {
    //         allPets[petId].age = body.age;
    //     }
    //     if (body.hasOwnProperty('kind')) {
    //         allPets[petId].kind = body.kind;
    //     }
    //     if (body.hasOwnProperty('name')) {
    //         allPets[petId].name = body.name;
    //     }
    //     fs.writeFile(petsPath, JSON.stringify(allPets), (err)=>{
    //         if (err) {
    //             next(err);
    //         } else {
    //             res.status(200)
    //             res.send(`Updated pet info`);
    //         }
    //      })        
    // })   
})

// app.use((err,req,res,next)=>{                            ***Code from when the DB was in a JSON file***
//     console.log('PATCH error sent to middleware')
//     console.error(err.stack);
//     res.status(500).send('Internal Error');
// })

app.delete('/pets/:id', (req, res, next)=>{
    console.log(req.method);
    const id = parseInt(req.params.id);
    if (Number.isNaN(id)) {
        console.log('Error Not Found');
        return res.status(404).send('Error Not Found');
    } else {
        pool.query('DELETE FROM pets WHERE id = $1 RETURNING *;', [id], (err, result)=>{
            if (err){
                return next(err);
            }
            let delPet = result.rows[0];
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