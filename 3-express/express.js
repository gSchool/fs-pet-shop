import express from "express";
import fs from "fs";

const PORT = 8001;

const app = express();

// Enable middleware for receiving JSON request body
app.use(express.json());

app.get("/pets", (_, res) => {
  fs.readFile("../pets.json", "utf-8", (err, text) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }

    const pets = JSON.parse(text);
    res.send(pets);
  });
});

app.get("/pets/:index", (req, res, next) => {
  const index = Number(req.params.index);

  fs.readFile("../pets.json", "utf-8", (err, text) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }

    const pets = JSON.parse(text);
    if (Number.isNaN(index) || index < 0 || index >= pets.length) {
      res.sendStatus(404);
      return;
    }

    res.send(pets[index]);
  });
});

// Catch-all for unknown routes.
app.use((_, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
