// ================= LOGIN CHECK =================
const user = localStorage.getItem("currentUser");

if (!user) {
    window.location.href = "index.html";
}

document.getElementById("userEmail").innerText = user;


// ================= LOGOUT =================
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}


// ================= BUDGET SYSTEM =================
let budget = Number(localStorage.getItem("budget")) || 0;
document.getElementById("budget").innerText = "₹" + budget;

function setBudget() {
    const input = document.getElementById("budgetInput");
    const value = Number(input.value);

    if (!value || value <= 0) {
        showToast("Enter valid budget ❌", "error");
        return;
    }

    budget = value;
    localStorage.setItem("budget", budget);

    document.getElementById("budget").innerText = "₹" + budget;

    input.value = "";

    showToast("Budget set successfully ✅", "success");

    updateUI();
}


// ================= EXPENSE SYSTEM =================
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function getTotalExpense() {
    return expenses.reduce((total, item) => total + item.amount, 0);
}

function updateUI() {
    const totalExpense = getTotalExpense();
    const balance = budget - totalExpense;

    document.getElementById("expense").innerText = "₹" + totalExpense;
    document.getElementById("balance").innerText = "₹" + balance;
}


// ================= ALERT =================
function checkBudgetStatus() {
    const totalExpense = getTotalExpense();

    if (totalExpense > budget) {
        showToast("Budget exceeded ❌", "error");
    } else if (totalExpense > budget * 0.8) {
        showToast("Warning: Near budget ⚠️", "error");
    } else {
        showToast("You are under budget ✅", "success");
    }
}


// ================= ADD EXPENSE =================
function addExpense() {
    const name = document.getElementById("expenseName").value;
    const amount = Number(document.getElementById("expenseAmount").value);
    const category = document.getElementById("expenseCategory").value;

    if (name === "" || amount <= 0) {
        showToast("Enter valid expense ❌", "error");
        return;
    }

    expenses.push({ name, amount, category });
    localStorage.setItem("expenses", JSON.stringify(expenses));

    updateUI();
    checkBudgetStatus();
    renderExpenses();
    renderChart();
    generateInsight();

    document.getElementById("expenseName").value = "";
    document.getElementById("expenseAmount").value = "";

    showToast("Expense added ✅", "success");
}


// ================= EXPENSE LIST =================
function renderExpenses() {
    const list = document.getElementById("expenseList");
    if (!list) return;

    list.innerHTML = "";

    expenses.forEach((item, index) => {
        const category = item.category || "Other";

        const li = document.createElement("li");

        li.innerHTML = `
            ${item.name} (${category}) - ₹${item.amount}
            <button onclick="deleteExpense(${index})">Delete</button>
        `;

        list.appendChild(li);
    });
}


// ================= DELETE =================
function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    updateUI();
    renderExpenses();
    renderChart();
    generateInsight();

    showToast("Expense deleted 🗑️", "success");
}


// ================= CHART =================
let chart;

function getCategoryData() {
    const categoryMap = {};

    expenses.forEach(item => {
        const category = item.category || "Other";

        if (!categoryMap[category]) {
            categoryMap[category] = 0;
        }

        categoryMap[category] += item.amount;
    });

    return categoryMap;
}

function renderChart() {
    const ctx = document.getElementById("expenseChart");
    if (!ctx) return;

    const dataMap = getCategoryData();

    const labels = Object.keys(dataMap);
    const data = Object.values(dataMap);

    const colors = ["#6366F1", "#22C55E", "#F59E0B", "#EF4444"];

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "pie",
        data: {
            labels,
            datasets: [{ data, backgroundColor: colors }]
        }
    });
}


// ================= INSIGHT =================
function generateInsight() {
    const dataMap = getCategoryData();
    const categories = Object.keys(dataMap);

    if (categories.length === 0) {
        document.getElementById("insightText").innerText = "No expenses added yet";
        return;
    }

    let maxCategory = categories[0];

    categories.forEach(cat => {
        if (dataMap[cat] > dataMap[maxCategory]) {
            maxCategory = cat;
        }
    });

    document.getElementById("insightText").innerText =
        `You spend most on ${maxCategory}`;
}


// ================= INITIAL LOAD =================
updateUI();
renderExpenses();
renderChart();
generateInsight();