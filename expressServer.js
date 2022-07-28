import express from 'express';
import fs from "fs/promises";

const app = express();
app.use(express.json());

app.get('/pets', (req, res) => {
    fs.readFile("pets.json", "utf-8").then((data) => {
        const pets = JSON.parse(data)
        res.send(pets);
    });
});

app.get('/pets/:id', (req, res) => {
    fs.readFile("pets.json", "utf-8").then((data) => {
        const pets = JSON.parse(data)
        if (pets[req.params.id] === undefined) {
            res.status(404);
            res.header("Content-Type", "text/plain");
            res.send(new Error("Index Does Not Exist") + "");
        } else {
            res.send(pets[req.params.id])
        }
    });
})

app.listen(4000, () => {
    console.log('listening on 4000')
})