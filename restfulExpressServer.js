const { response } = require('express');
const express = require('express');
const {Client} = require('pg');
const port = process.env.PORT || 3000;
const connectionString = 'postgresql://postgres:docker@127.0.0.1:5432/pets';
const client = new Client({
    connectionString:connectionString,
});
client.connect();
const app = express();
app.use(express.json());


app.get('/pets', auth, function (req, res, next){
    client.query('SELECT * FROM pets', 
    (error, results) => {
        if (error){
            next(error)
        } 
        res.send(results.rows)
    })
})

app.get('/pets/:id', function (req, res, next){
    let id = parseInt(req.params.id);
    Number.isNaN(id) ? res.status(500).send('Invalid input') :
    client.query('SELECT * FROM pets WHERE pet_id = $1', [id],
        (error, results) => {
           if (error){
               next(error)
           } else if (results.rows.length === 0){
               res.status(404).send('Not found')
           }
           res.send(results.rows)
       })
    }
)

app.post('/pets', function(req, res, next) {
    let {age, kind, pet_name} = req.body;
    age < 1 ? res.send('Enter a number equal to or greater than 1') : 
    client.query(`INSERT INTO pets (age, kind, pet_name) VALUES ($1, $2, $3)`, [age, kind, pet_name],
    (error, results) => {
        if (error) {
            return next(error)
        }
        res.status(201).send(`Added ${pet_name}`)
    })
})

app.patch('/pets/:id', function(req, res, next){
    let id = parseInt(req.params.id);
    let {age, kind, pet_name} = req.body
    client.query(`UPDATE pets SET pet_name = $1 WHERE pet_id = $4`, [pet_name, id],
    (error, results) => {
        if (error) {
            return next(error)
        }
        res.status(201).send(`Successfully updated ${pet_name}!`)
    })
})

app.delete('/pets/:id', function(req, res, next){
    let id = parseInt(req.params.id);
    let {age, kind, pet_name} = req.body
    client.query(`DELETE FROM pets WHERE pet_id = $1`, [id],
    (error, results) => {
        if (error) {
            return next(error)
        }
        res.status(201).send(`Sorry to see your pet leave!`)
    })
})


function auth(req, res, next){
    if (req.query.admin == 'meowmix'){
        next()
    } else {
        res.status(401).send('Not authroized')
    }
}

app.use((req, res, next) => {
res.status(404).send('Not found')
})

app.use((req, res, next, error) => {
console.error(error.stack)
res.status(500).send('Internal server error')    
})

app.listen(port, function() {
    console.log('Hi Shelton', port);
});