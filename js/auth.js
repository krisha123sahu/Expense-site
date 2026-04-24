// Toggle Login/Signup
let isLogin = true;

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
    e.preventDefault(); // 🔥 IMPORTANT

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (isLogin) {
        // LOGIN
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (!storedUser || storedUser.email !== email || storedUser.password !== password) {
            alert("Invalid credentials ❌");
            return;
        }

        localStorage.setItem("currentUser", email);
        window.location.href = "dashboard.html";

    } else {
        // SIGNUP
        const user = { email, password };
        localStorage.setItem("user", JSON.stringify(user));

        alert("Signup successful ✅ Please login");
        toggleForm();
    }
});