console.log("toast loaded");

// Global Toast Function
window.showToast = function(message, type = "success") {
let container = document.querySelector(".toast-container");


// Create container if not exists
if (!container) {
    container = document.createElement("div");
    container.classList.add("toast-container");
    document.body.appendChild(container);
}

// Create toast
const toast = document.createElement("div");
toast.classList.add("toast", type);
toast.innerText = message;

container.appendChild(toast);

// Show animation
setTimeout(() => {
    toast.classList.add("show");
}, 100);

// Remove after 3 sec
setTimeout(() => {
    toast.classList.remove("show");

    setTimeout(() => {
        toast.remove();
    }, 300);
}, 3000);


};
