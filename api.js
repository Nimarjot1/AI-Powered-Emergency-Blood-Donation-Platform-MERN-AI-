const API_URL = "http://localhost:5002/api/donors";

async function getDonors() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch donors");
        return await response.json();
    } catch (error) {
        console.error("Error fetching donors:", error);
        return [];
    }
}

async function addDonor(donor) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donor),
    });
    return await response.json();
}

async function deleteDonor(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}