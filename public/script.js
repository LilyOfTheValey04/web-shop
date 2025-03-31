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

// Typewriter effect for HERO section ONLY

// Function to simulate a typewriter effect
function typeWrite(element, text, delay) {
    let i = 0; // Initialize the character index
    function type() {
        // If there are still characters left to display
        if (i < text.length) {
            // Append the next character to the element's content
            element.innerHTML += text.charAt(i);
            i++; // Increment the index
            // Call this function again after the specified delay
            setTimeout(type, delay);
        }
    }
    // Start the typewriter effect
    type();
}

// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Get references to the heading and paragraph elements in the hero section
    const heading = document.getElementById("hero-heading");
    const paragraph = document.getElementById("hero-paragraph");

    // Define the text to be typed out
    const headingText = "Our new designs";
    const paragraphText = "Sweet and stylish way to show your\nunique love";;

    // Clear any existing content in the elements
    heading.innerHTML = "";
    paragraph.innerHTML = "";

    // Start typing the heading text with a delay of 100ms between characters
    typeWrite(heading, headingText, 100);

    // Wait until the heading is finished, plus an extra 500ms delay, then start typing the paragraph text
    setTimeout(() => {
        typeWrite(paragraph, paragraphText, 50);
    }, headingText.length * 100 + 500);
});





