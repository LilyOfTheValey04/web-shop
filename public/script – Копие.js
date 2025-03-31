// Buy form submit code
let orderForm = document.getElementById("orderForm");
if (orderForm) {
    orderForm.onsubmit = handleOrderSubmit;
}

function handleOrderSubmit(event) {
    event.preventDefault(); // Спира презареждането

    let nameInput = document.getElementById("complete-order-name").value;
    alert(nameInput + ", thank you for your order! :) ");

    event.target.reset(); // Нулиране на формата
}

// Reviews code
let reviewForm = document.getElementById("reviewForm");
if (reviewForm) {
    reviewForm.onsubmit = submitReview;
}

function submitReview(event) {
    event.preventDefault();

    let reviewText = document.getElementById("review-text").value;
    let reviewName = document.getElementById("review-name").value;
    let reviewContainer = document.getElementById("reviews");

    if (reviewText.trim() === "" || reviewName.trim() === "") {
        alert("Please fill in all fields!");
        return;
    }

    let newReview = document.createElement("p");
    newReview.innerHTML = `<strong>${reviewName}</strong>: ${reviewText}`;
    newReview.classList.add("review-item");

    reviewContainer.prepend(newReview);

    reviewForm.reset();
}
