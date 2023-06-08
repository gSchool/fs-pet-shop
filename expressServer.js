import express, { json } from "express";
const app = express();
const port = 8000;
app.use(json());
import pets from "./pets.json" assert { type: "json" };
let nextId = pets.length - 1;

const Token = "abcd1234";
app.use((req, res, next) => {
  const auth = req.get("authorization") || "";
  if (auth === Token) {
    next();
  } else {
    res.status(401).end();
  }
});

app.get("/pets" || "/", (req, res) => {
  res.status(200).json(pets);
  console.log("getting everything");
});

app.get("/pets/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log("Received request for pet with id:", id);
  const pet = pets[id];
  console.log("what is pets:", pets);
  console.log("Found pet:", pet);
  if (!pet) {
    res.status(404).send("Not Found");
    console.log("Pet not found!");
  } else {
    res.status(200).json(pet);
    console.log("Returning pet:", pet);
  }
});
app.post("/pets", (req, res) => {
  const { name, age, kind } = req.body;
  if (!name || !age || !kind || isNaN(parseInt(age))) {
    res.status(400).send("Bad Request");
    return;
  }
  const newPet = { id: nextId++, name, age: parseInt(age), kind };
  pets.push(newPet);
  res.status(200).json(newPet);
});

app.patch("/pets/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pet = pets[id];
  if (!pet) {
    res.status(404).send("Not Found");
    return;
  }
  const { name, age, kind } = req.body;
  if (age && isNaN(parseInt(age)) && kind === undefined && name === undefined) {
    res.status(400).send("Bad Request");
    return;
  }
  if (name !== undefined) pet.name = name;
  if (age !== undefined) pet.age = parseInt(age);
  if (kind !== undefined) pet.kind = kind;
  res.status(200).json(pet);
});

app.delete("/pets/:id", (req, res) => {
  const id = parseInt(req.params.id);
  // const index = pets.findIndex(p => p.id === id);
  if (id === -1) {
    res.status(404).send("Not Found");
  } else {
    const pet = pets[id];
    pets.splice(id, 1);
    res.status(200).json(pet);
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
