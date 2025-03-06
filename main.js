if (document.getElementById("loginForm")) {
    document.getElementById("loginForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        if (username === "admin" && password === "password") {
            localStorage.setItem("isLoggedIn", "true");
            window.location.href = "index.html";
        } else {
            alert("Invalid credentials");
        }
    });
}

if (document.getElementById("donorForm")) {
    if (!localStorage.getItem("isLoggedIn")) {
        window.location.href = "login.html";
    }

    const validateDonor = (name, bloodType, location) => {
        const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
        if (!name.trim()) return "Name is required";
        if (!bloodTypes.includes(bloodType.toUpperCase())) return "Invalid blood type";
        if (!location.trim()) return "Location is required";
        return null;
    };

    const validateUser = (username, password) => {
        if (!username.trim()) return "Username is required";
        if (password.length < 6) return "Password must be at least 6 characters";
        return null;
    };

    async function loadDonors() {
        try {
            const donors = await getDonors();
            const donorList = document.getElementById("donorList");
            donorList.innerHTML = donors.length
                ? donors.map((donor, index) => `
                    <div class="card" style="animation-delay: ${index * 0.1}s">
                        <p><span>Name:</span> ${donor.name}</p>
                        <p><span>Blood Type:</span> ${donor.bloodType}</p>
                        <p><span>Location:</span> ${donor.location}</p>
                        <button onclick="editDonor(${donor.userId})">Edit</button>
                        <button onclick="deleteDonorHandler(${donor.userId})">Remove</button>
                    </div>
                `).join("")
                : "<p>No donors yet—be the first!</p>";
        } catch (error) {
            alert("Failed to load donors: " + error.message);
        }
    }

    document.getElementById("donorForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const bloodType = document.getElementById("bloodType").value;
        const location = document.getElementById("location").value;

        const error = validateDonor(name, bloodType, location);
        if (error) return alert(error);

        try {
            await addDonor({ name, bloodType, location });
            document.getElementById("donorForm").reset();
            loadDonors();
            alert("Donor added successfully!");
        } catch (error) {
            alert("Error adding donor: " + error.message);
        }
    });

    window.editDonor = async (userId) => {
        try {
            const donor = await getDonorById(userId);
            const name = prompt("Enter new name:", donor.name);
            const bloodType = prompt("Enter new blood type:", donor.bloodType);
            const location = prompt("Enter new location:", donor.location);

            const error = validateDonor(name, bloodType, location);
            if (error) return alert(error);

            await updateDonor(userId, { name, bloodType, location });
            loadDonors();
            alert("Donor updated successfully!");
        } catch (error) {
            alert("Error updating donor: " + error.message);
        }
    };

    window.deleteDonorHandler = async (userId) => {
        if (confirm("Are you sure you want to remove this donor?")) {
            try {
                await deleteDonor(userId);
                loadDonors();
                alert("Donor removed successfully!");
            } catch (error) {
                alert("Error removing donor: " + error.message);
            }
        }
    };

    async function loadUsers() {
        try {
            const users = await getUsers();
            console.log("Users:", users);
        } catch (error) {
            alert("Failed to load users: " + error.message);
        }
    }

    async function addNewUser() {
        const username = prompt("Enter username:");
        const password = prompt("Enter password:");
        const error = validateUser(username, password);
        if (error) return alert(error);

        try {
            await addUser({ username, password });
            loadUsers();
            alert("User added successfully!");
        } catch (error) {
            alert("Error adding user: " + error.message);
        }
    }

    window.logout = () => {
        localStorage.removeItem("isLoggedIn");
        window.location.href = "login.html";
    };

    loadDonors();
    loadUsers();
}