<<<<<<< HEAD
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
=======
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
>>>>>>> 22d39fb7b870bb40c3041a3fe89d75edcee9fbe6
