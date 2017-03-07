const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.use(bodyParser.json());

app.get('/pets', function(req, res) {
    fs.readFile(petsPath, function(err, data) {
        if (err) {
            console.log('err');
        }

        var pets = JSON.parse(data);

        res.send(pets);
    });
});

app.get('/pets/:id', function(req, res) {
    fs.readFile(petsPath, function(err, data) {
        if (err) {
            console.log('err');
        }

        const id = Number.parseInt(req.params.id);
        const pets = JSON.parse(data);

        if (id < 0 || id >= pets.length || Number.isNaN(id)) {
            return res.sendStatus(404);
        }

        res.send(pets[id]);
    });
});

app.post('/pets', function(req, res) {
    fs.readFile(petsPath, function(err, data) {
        if (err) {
            console.log('err');
        }

        const pets = JSON.parse(data);
        const age = Number.parseInt(req.body.age);
        const kind = req.body.kind;
        const name = req.body.name;

        if (Number.isNaN(age) || !kind || !name) {
            return res.sendStatus(400);
        }

        const pet = {
            age,
            kind,
            name
        };

        pets.push(pet);

        const stringPets = JSON.stringify(pets);

        fs.writeFile(petsPath, stringPets, function(err) {
            if (err) {
                console.log('err');
            }
            res.send(pet);
        });
    });
});

app.patch('/pets/:id', function(req, res) {
    fs.readFile(petsPath, function(err, data) {
        if (err) {
            console.log('err');
        }

        const id = Number.parseInt(req.params.id);
        const pets = JSON.parse(data);

        if (id < 0 || id >= pets.length || Number.isNaN(id)) {
            return res.sendStatus(404);
        }

        const age = Number.parseInt(req.body.age);
        const {
            kind,
            name
        } = req.body;

        if (!Number.isNaN(age) || kind || name) {
            pets[id].age = age;
        }
        if (kind) {
            pets[id].kind = kind;
        }
        if (name) {
            pets[id].name = name;
        }

        const stringPets = JSON.stringify(pets);

        fs.writeFile(petsPath, stringPets, function(err) {
            if (err) {
                console.log('err');
            }
            res.send(pets[id]);
        });
    });
});

app.patch('/pets/:id', function(req, res) {
    fs.readFile(petsPath, function(err, data) {
        if (err) {
          console.log(err);
        }

        const id = Number.parseInt(req.params.id);
        const pets = JSON.parse(data);

        if (id < 0 || id >= pets.length || Number.isNaN(id)) {
            return res.sendStatus(404);
        }

        const pet = pets[id];
        const age = Number.parseInt(req.body.age);
        const kind = req.body.kind;
        const name = req.body.name;

        if (!Number.isNaN(age) || kind || name) {
            pet.age = age;
            pet.kind = kind;
            pet.name = name;
        }


        const stringPets = JSON.stringify(pets);

        fs.writeFile(petsPath, stringPets, (err) => {
            if (err) {
                rconsole.log('err');
            }
            res.send(pet);
        });
    });
});

app.delete('/pets/:id', function(req, res) {
    fs.readFile(petsPath, function(err, data) {
        if (err) {
            console.log('err');
        }

        const id = Number.parseInt(req.params.id);
        const pets = JSON.parse(data);

        if (id < 0 || id >= pets.length || Number.isNaN(id)) {
            return res.sendStatus(404);
        }

        const pet = pets.splice(id, 1)[0];
        const stringPets = JSON.stringify(pets);

        fs.writeFile(petsPath, stringPets, function(err) {
            if (err) {
                console.log('err');
            }
            res.send(pet);
        });
    });
});


module.exports = app;
