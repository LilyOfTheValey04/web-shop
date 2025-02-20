// Buy now button code to add to cart
document.addEventListener("DOMContentLoaded", function() {
    let cartCountElement = document.getElementById("cart-count");
    let cartCount;
    
    if (localStorage.getItem("cartCount")) {
        cartCount = parseInt(localStorage.getItem("cartCount"));
    } else {
        cartCount = 0;
    }
    
    cartCountElement.innerText = cartCount;
    
    let buyButton = document.querySelector(".buy-button");
    if (buyButton) {
        buyButton.addEventListener("click", function(event) {
            event.preventDefault();

            let quantityInput = document.getElementById("quantity");
            let quantityValue = parseInt(quantityInput.value) || 1;
          
            cartCount += quantityValue;
            cartCountElement.innerText = cartCount;
            localStorage.setItem("cartCount", cartCount);
            alert("Product added to cart!");
        });
    }
});

// Buy form - button code
let orderForm = document.getElementById("orderForm");
if (orderForm) {
    orderForm.onsubmit = handleOrderSubmit;
    
    // Взимаме бутона "Cancel" по id
    let cancelOrderButton = document.getElementById("cancel-order");
    if (cancelOrderButton) {
        cancelOrderButton.addEventListener("click", handleCancelOrder);
    }
}

function handleOrderSubmit(event) {
    event.preventDefault(); // Спира презареждането

    let nameInput = document.getElementById("complete-order-name").value;
    alert(nameInput + ", thank you for your order! :) ");
    event.target.reset(); // Нулиране на формата
}

// Cancel order button code
function handleCancelOrder(event) {
    event.preventDefault();

    // Изтриваме брояча от localStorage
    localStorage.removeItem("cartCount");

    // Нулираме видимия брояч в сайта
    let cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        cartCountElement.innerText = 0;
    }

    alert("Order canceled!");
    location.reload(); // Презарежда страницата (по желание)
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





