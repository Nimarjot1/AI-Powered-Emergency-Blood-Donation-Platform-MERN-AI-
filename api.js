const API_URL = "http://localhost:5002/api";
const TOKEN = "bloodsync-secret-token";

async function getDonors() {
    try {
        const response = await fetch(`${API_URL}/donors`, {
            headers: { "Authorization": `Bearer ${TOKEN}` },
        });
        if (!response.ok) throw new Error((await response.json()).error || "Failed to fetch donors");
        return await response.json();
    } catch (error) {
        console.error("Error fetching donors:", error);
        throw error;
    }
}

async function getDonorById(userId) {
    try {
        const response = await fetch(`${API_URL}/donors/${userId}`, {
            headers: { "Authorization": `Bearer ${TOKEN}` },
        });
        if (!response.ok) throw new Error((await response.json()).error || "Failed to fetch donor");
        return await response.json();
    } catch (error) {
        console.error("Error fetching donor:", error);
        throw error;
    }
}

async function addDonor(donor) {
    try {
        const response = await fetch(`${API_URL}/donors`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${TOKEN}`,
            },
            body: JSON.stringify(donor),
        });
        if (!response.ok) throw new Error((await response.json()).error || "Failed to add donor");
        return await response.json();
    } catch (error) {
        console.error("Error adding donor:", error);
        throw error;
    }
}

async function updateDonor(userId, donor) {
    try {
        const response = await fetch(`${API_URL}/donors/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${TOKEN}`,
            },
            body: JSON.stringify(donor),
        });
        if (!response.ok) throw new Error((await response.json()).error || "Failed to update donor");
        return await response.json();
    } catch (error) {
        console.error("Error updating donor:", error);
        throw error;
    }
}

async function deleteDonor(userId) {
    try {
        const response = await fetch(`${API_URL}/donors/${userId}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${TOKEN}` },
        });
        if (!response.ok) throw new Error((await response.json()).error || "Failed to delete donor");
        return await response.json();
    } catch (error) {
        console.error("Error deleting donor:", error);
        throw error;
    }
}

async function getUsers() {
    try {
        const response = await fetch(`${API_URL}/users`, {
            headers: { "Authorization": `Bearer ${TOKEN}` },
        });
        if (!response.ok) throw new Error((await response.json()).error || "Failed to fetch users");
        return await response.json();
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}

async function getUserById(userId) {
    try {
        const response = await fetch(`${API_URL}/users/${userId}`, {
            headers: { "Authorization": `Bearer ${TOKEN}` },
        });
        if (!response.ok) throw new Error((await response.json()).error || "Failed to fetch user");
        return await response.json();
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
}

async function addUser(user) {
    try {
        const response = await fetch(`${API_URL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${TOKEN}`,
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) throw new Error((await response.json()).error || "Failed to add user");
        return await response.json();
    } catch (error) {
        console.error("Error adding user:", error);
        throw error;
    }
}

async function updateUser(userId, user) {
    try {
        const response = await fetch(`${API_URL}/users/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${TOKEN}`,
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) throw new Error((await response.json()).error || "Failed to update user");
        return await response.json();
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
}

async function deleteUser(userId) {
    try {
        const response = await fetch(`${API_URL}/users/${userId}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${TOKEN}` },
        });
        if (!response.ok) throw new Error((await response.json()).error || "Failed to delete user");
        return await response.json();
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
}