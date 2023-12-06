import express from "express";
import pg from "pg";

let client = new pg.Client({
  database: "petshop",
});

try {
  await client.connect();
} catch (err) {
  console.error(err);
}

const port = 8001;

const app = express();

// Enable middleware for receiving JSON request body
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Goodbye");
});

// Logging middleware
app.use((req, res, next) => {
  console.log("Request received", req.method, req.url);
  next();
});

app.get("/pets", (_, res, next) => {
  client
    .query(`SELECT * FROM pets`)
    .then((data) => {
      res.json(data.rows);
    })
    .catch(next);
});

app.get("/pets/:id", (req, res, next) => {
  const petId = Number.parseInt(req.params.id);
  client
    .query(`SELECT name, age, kind FROM pets WHERE id = $1`, [petId])
    .then((data) => {
      if (data.rows.length == 0) {
        return res.sendStatus(404);
      }

      res.send(data.rows[0]);
    })
    .catch(next);
});

// endpoint to create a new pet
app.post("/pets", (req, res, next) => {
  // console.log("req.body", req.body);
  const age = Number.parseInt(req.body.age); // make sure its a number
  const { kind, name } = req.body;
  // validate data from request body
  if (!kind || !name || Number.isNaN(age)) {
    return res.sendStatus(400);
  }
  // create a new pet object
  const newPet = { age, name, kind };
  // insert new row to pets table in DB
  client
    .query(
      `INSERT INTO pets (name, kind, age) VALUES ($1, $2, $3) RETURNING *`,
      [name, kind, age]
    )
    .then((data) => {
      console.log(data.rows);
      res.send(data.rows[0]);
    })
    .catch(next);
});

// endpoint to update a pet
app.patch("/pets/:id", (req, res, next) => {
  const petId = Number.parseInt(req.params.id) || null;
  const age = Number.parseInt(req.body.age); // make sure its a number
  const { kind, name } = req.body;

  // execute UPDATE SQL
  client
    .query(
      `UPDATE pets SET
        name = COALESCE($1, name),
        kind = COALESCE($2, kind),
        age = COALESCE($3, age)
      WHERE id=$4 RETURNING *`,
      [name, kind, age, petId]
    )
    .then((data) => {
      if (data.rows.length == 0) {
        res.sendStatus(404);
      }
      console.log("updated pet: ", data.rows[0]);
      res.send(data.rows[0]);
    })
    .catch(next);
});

app.delete("/pets/:id", (req, res, next) => {
  const id = Number(req.params.id);

  client
    .query("DELETE FROM pets WHERE id = $1 RETURNING *", [id])
    .then((result) => {
      if (result.rows.length === 0) {
        res.sendStatus(404);
      } else {
        res.send(result.rows[0]);
      }
    })
    .catch(next);
});

// Catch-all error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.sendStatus(500);
});

// Catch-all for unkown routes.
app.use((_, res) => {
  res.sendStatus(404);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
