console.log("toast loaded");

window.showToast = function(message, type = "success") {
    let container = document.querySelector(".toast-container");

    if (!container) {
        container = document.createElement("div");
        container.classList.add("toast-container");
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.classList.add("toast", type);
    toast.innerText = message;

    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
};