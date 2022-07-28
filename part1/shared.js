import fs from "fs/promises";

export const readPets = () => {
    fs.readFile("pets.json", "utf-8")
        .then((data) => JSON.parse(data));
}