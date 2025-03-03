// Login Page
if (document.getElementById("loginForm")) {
    document.getElementById("loginForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        if (username === "admin" && password === "password") {
            localStorage.setItem("isLoggedIn", "true");
            window.location.href = "index.html";
        } else {
            alert("Invalid credentials");
        }
    });
}

// Main Page
if (document.getElementById("donorForm")) {
    // Check login status
    if (!localStorage.getItem("isLoggedIn")) {
        window.location.href = "login.html";
    }

    // Load donors
    async function loadDonors() {
        const donors = await getDonors();
        const donorList = document.getElementById("donorList");
        donorList.innerHTML = donors.length
            ? donors.map((donor, index) => `
                <div class="card" style="animation-delay: ${index * 0.1}s">
                    <p><span>Name:</span> ${donor.name}</p>
                    <p><span>Blood Type:</span> ${donor.bloodType}</p>
                    <p><span>Location:</span> ${donor.location}</p>
                    <button onclick="deleteDonorHandler(${donor.id})">Remove</button>
                </div>
            `).join("")
            : "<p>No donors yet—be the first!</p>";
    }

    // Add donor
    document.getElementById("donorForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const donor = {
            name: document.getElementById("name").value,
            bloodType: document.getElementById("bloodType").value,
            location: document.getElementById("location").value,
        };
        await addDonor(donor);
        document.getElementById("donorForm").reset();
        loadDonors();
    });

    // Delete donor
    window.deleteDonorHandler = async (id) => {
        await deleteDonor(id);
        loadDonors();
    };

    // Logout
    window.logout = () => {
        localStorage.removeItem("isLoggedIn");
        window.location.href = "login.html";
    };

    // Chatbot
    const chatbot = document.querySelector(".chatbot");
    const toggle = document.querySelector(".chatbot-toggle");
    toggle.addEventListener("click", () => chatbot.classList.toggle("active"));

    window.sendMessage = () => {
        const input = document.getElementById("chatInput");
        const messages = document.getElementById("chatMessages");
        if (input.value.trim()) {
            messages.innerHTML += `<p class="user"><strong>You:</strong> ${input.value}</p>`;
            messages.innerHTML += `<p class="bot"><strong>Bot:</strong> Ready to help—ask away!</p>`;
            input.value = "";
            messages.scrollTop = messages.scrollHeight;
        }
    };

    // Initial load
    loadDonors();
}