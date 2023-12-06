import express from "express";
import pg from "pg";

let client = new pg.Client({
  database: "petshop",
});

await client.connect();

const PORT = 8001;

const app = express();

app.use(express.json());

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

app.post("/pets", (req, res, next) => {
  const age = Number.parseInt(req.body.age);
  const { kind, name } = req.body;

  if (!kind || !name || Number.isNaN(age)) {
    return res.sendStatus(400);
  }

  client
    .query(
      `INSERT INTO pets (name, kind, age) VALUES ($1, $2, $3) RETURNING *`,
      [name, kind, age]
    )
    .then((data) => {
      res.send(data.rows[0]);
    })
    .catch(next);
});

app.patch("/pets/:id", (req, res, next) => {
  const petId = Number(req.params.id) || null;
  const age = Number(req.body.age);
  const { kind, name } = req.body;

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

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
