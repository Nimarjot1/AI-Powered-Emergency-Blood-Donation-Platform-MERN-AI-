const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5002;
const DONORS_FILE = path.join(__dirname, "donors.json");

app.use(cors());
app.use(express.json());

const initializeFile = async () => {
    try {
        await fs.access(DONORS_FILE);
    } catch (error) {
        await fs.writeFile(DONORS_FILE, JSON.stringify([]));
    }
};
initializeFile();

app.get("/api/donors", async (req, res) => {
    const data = await fs.readFile(DONORS_FILE);
    res.json(JSON.parse(data));
});

app.post("/api/donors", async (req, res) => {
    const data = await fs.readFile(DONORS_FILE);
    const donors = JSON.parse(data);
    const newDonor = { id: Date.now(), ...req.body };
    donors.push(newDonor);
    await fs.writeFile(DONORS_FILE, JSON.stringify(donors, null, 2));
    res.json(newDonor);
});

app.delete("/api/donors/:id", async (req, res) => {
    const data = await fs.readFile(DONORS_FILE);
    let donors = JSON.parse(data);
    donors = donors.filter((donor) => donor.id !== Number(req.params.id));
    await fs.writeFile(DONORS_FILE, JSON.stringify(donors, null, 2));
    res.sendStatus(204);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});