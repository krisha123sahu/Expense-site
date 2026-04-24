<<<<<<< HEAD
let isLogin = true;

// Toggle Login ↔ Signup
function toggleForm() {
    const title = document.getElementById("formTitle");
    const button = document.querySelector("button");
    const toggleText = document.getElementById("toggleText");

    if (isLogin) {
        title.innerText = "Sign Up";
        button.innerText = "Sign Up";
        toggleText.innerHTML = `Already have an account? <span onclick="toggleForm()">Login</span>`;
    } else {
        title.innerText = "Login";
        button.innerText = "Login";
        toggleText.innerHTML = `Don't have an account? <span onclick="toggleForm()">Sign Up</span>`;
    }

    isLogin = !isLogin;
}

// Handle form submit
document.getElementById("authForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validation
    if (!validateEmail(email)) {
        showToast("Invalid email format ❌", "error");
        return;
    }

    if (password.length < 6) {
        showToast("Password must be at least 6 characters ❌", "error");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (isLogin) {
        // LOGIN
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            showToast("Invalid credentials ❌", "error");
            return;
        }

        localStorage.setItem("currentUser", email);
        showToast("Login successful ✅", "success");

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1000);

    } else {
        // SIGNUP
        const exists = users.find(u => u.email === email);

        if (exists) {
            showToast("User already exists ❌", "error");
            return;
        }

        users.push({ email, password });
        localStorage.setItem("users", JSON.stringify(users));

        showToast("Signup successful 🎉", "success");

        toggleForm();
    }
});

// Email validation
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
=======
let isLogin = true;

// Toggle Login ↔ Signup
function toggleForm() {
    const title = document.getElementById("formTitle");
    const button = document.querySelector("button");
    const toggleText = document.getElementById("toggleText");

    if (isLogin) {
        title.innerText = "Sign Up";
        button.innerText = "Sign Up";
        toggleText.innerHTML = `Already have an account? <span onclick="toggleForm()">Login</span>`;
    } else {
        title.innerText = "Login";
        button.innerText = "Login";
        toggleText.innerHTML = `Don't have an account? <span onclick="toggleForm()">Sign Up</span>`;
    }

    isLogin = !isLogin;
}

// Handle form submit
document.getElementById("authForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validation
    if (!validateEmail(email)) {
        showToast("Invalid email format ❌", "error");
        return;
    }

    if (password.length < 6) {
        showToast("Password must be at least 6 characters ❌", "error");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (isLogin) {
        // LOGIN
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            showToast("Invalid credentials ❌", "error");
            return;
        }

        localStorage.setItem("currentUser", email);
        showToast("Login successful ✅", "success");

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1000);

    } else {
        // SIGNUP
        const exists = users.find(u => u.email === email);

        if (exists) {
            showToast("User already exists ❌", "error");
            return;
        }

        users.push({ email, password });
        localStorage.setItem("users", JSON.stringify(users));

        showToast("Signup successful 🎉", "success");

        toggleForm();
    }
});

// Email validation
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
>>>>>>> 22d39fb7b870bb40c3041a3fe89d75edcee9fbe6
