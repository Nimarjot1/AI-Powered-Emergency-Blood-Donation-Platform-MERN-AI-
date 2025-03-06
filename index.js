const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5002;
const DONORS_FILE = path.join(__dirname, "donors.json");
const USERS_FILE = path.join(__dirname, "users.json");
const SECRET_TOKEN = "bloodsync-secret-token";

app.use(cors());
app.use(express.json());

const requestLogger = (req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
};
app.use(requestLogger);

const authenticate = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token || token !== `Bearer ${SECRET_TOKEN}`) {
        return res.status(401).json({ error: "Unauthorized: Invalid or missing token" });
    }
    next();
};

const validateDonorData = (req, res, next) => {
    const { name, bloodType, location } = req.body;
    const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

    if (!name || typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({ error: "Name is required and must be a non-empty string" });
    }
    if (!bloodType || !bloodTypes.includes(bloodType.toUpperCase())) {
        return res.status(400).json({ error: "Valid blood type is required (e.g., A+, B-, O+)" });
    }
    if (!location || typeof location !== "string" || location.trim() === "") {
        return res.status(400).json({ error: "Location is required and must be a non-empty string" });
    }

    req.body.bloodType = bloodType.toUpperCase();
    next();
};

const validateUserData = (req, res, next) => {
    const { username, password } = req.body;
    if (!username || typeof username !== "string" || username.trim() === "") {
        return res.status(400).json({ error: "Username is required and must be a non-empty string" });
    }
    if (!password || typeof password !== "string" || password.length < 6) {
        return res.status(400).json({ error: "Password is required and must be at least 6 characters" });
    }
    next();
};

const initializeFile = async (file, defaultData) => {
    try {
        await fs.access(file);
    } catch (error) {
        await fs.writeFile(file, JSON.stringify(defaultData));
    }
};
Promise.all([
    initializeFile(DONORS_FILE, []),
    initializeFile(USERS_FILE, []),
]);

const getNextUserId = async (file) => {
    try {
        const data = await fs.readFile(file);
        const items = JSON.parse(data);
        if (!items.length) return 1;
        return Math.max(...items.map(item => item.userId || 0)) + 1;
    } catch (error) {
        return 1;
    }
};

const resequenceUserIds = (items) => {
    return items.map((item, index) => ({
        ...item,
        userId: index + 1
    }));
};

app.get("/api/donors", authenticate, async (req, res) => {
    try {
        const data = await fs.readFile(DONORS_FILE);
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch donors" });
    }
});

app.get("/api/donors/:userId", authenticate, async (req, res) => {
    try {
        const data = await fs.readFile(DONORS_FILE);
        const donors = JSON.parse(data);
        const donor = donors.find(d => d.userId === Number(req.params.userId));
        if (!donor) {
            return res.status(404).json({ error: "Donor not found" });
        }
        res.json(donor);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch donor" });
    }
});

app.post("/api/donors", authenticate, validateDonorData, async (req, res) => {
    try {
        const data = await fs.readFile(DONORS_FILE);
        const donors = JSON.parse(data);
        const nextUserId = await getNextUserId(DONORS_FILE);
        const newDonor = { userId: nextUserId, ...req.body };
        donors.push(newDonor);
        await fs.writeFile(DONORS_FILE, JSON.stringify(donors, null, 2));
        res.status(201).json(newDonor);
    } catch (error) {
        res.status(500).json({ error: "Failed to add donor" });
    }
});

app.put("/api/donors/:userId", authenticate, validateDonorData, async (req, res) => {
    try {
        const data = await fs.readFile(DONORS_FILE);
        let donors = JSON.parse(data);
        const donorIndex = donors.findIndex(d => d.userId === Number(req.params.userId));
        if (donorIndex === -1) {
            return res.status(404).json({ error: "Donor not found" });
        }
        donors[donorIndex] = { ...donors[donorIndex], ...req.body, userId: donors[donorIndex].userId };
        await fs.writeFile(DONORS_FILE, JSON.stringify(donors, null, 2));
        res.json(donors[donorIndex]);
    } catch (error) {
        res.status(500).json({ error: "Failed to update donor" });
    }
});

app.delete("/api/donors/:userId", authenticate, async (req, res) => {
    try {
        const data = await fs.readFile(DONORS_FILE);
        let donors = JSON.parse(data);
        const initialLength = donors.length;
        donors = donors.filter(d => d.userId !== Number(req.params.userId));
        if (donors.length === initialLength) {
            return res.status(404).json({ error: "Donor not found" });
        }
        // Resequence userIds after deletion
        donors = resequenceUserIds(donors);
        await fs.writeFile(DONORS_FILE, JSON.stringify(donors, null, 2));
        res.status(200).json({ message: "Donor deleted successfully", updatedDonors: donors });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete donor" });
    }
});

app.get("/api/users", authenticate, async (req, res) => {
    try {
        const data = await fs.readFile(USERS_FILE);
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

app.get("/api/users/:userId", authenticate, async (req, res) => {
    try {
        const data = await fs.readFile(USERS_FILE);
        const users = JSON.parse(data);
        const user = users.find(u => u.userId === Number(req.params.userId));
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user" });
    }
});

app.post("/api/users", authenticate, validateUserData, async (req, res) => {
    try {
        const data = await fs.readFile(USERS_FILE);
        const users = JSON.parse(data);
        const nextUserId = await getNextUserId(USERS_FILE);
        const newUser = { userId: nextUserId, ...req.body };
        users.push(newUser);
        await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Failed to add user" });
    }
});

app.put("/api/users/:userId", authenticate, validateUserData, async (req, res) => {
    try {
        const data = await fs.readFile(USERS_FILE);
        let users = JSON.parse(data);
        const userIndex = users.findIndex(u => u.userId === Number(req.params.userId));
        if (userIndex === -1) {
            return res.status(404).json({ error: "User not found" });
        }
        users[userIndex] = { ...users[userIndex], ...req.body, userId: users[userIndex].userId };
        await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
        res.json(users[userIndex]);
    } catch (error) {
        res.status(500).json({ error: "Failed to update user" });
    }
});

app.delete("/api/users/:userId", authenticate, async (req, res) => {
    try {
        const data = await fs.readFile(USERS_FILE);
        let users = JSON.parse(data);
        const initialLength = users.length;
        users = users.filter(u => u.userId !== Number(req.params.userId));
        if (users.length === initialLength) {
            return res.status(404).json({ error: "User not found" });
        }
        // Resequence userIds after deletion
        users = resequenceUserIds(users);
        await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
        res.status(200).json({ message: "User deleted successfully", updatedUsers: users });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete user" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});