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

//adminPanel.ejs 
// Попълване на формата с данни за продукт
function fillForm(product){
    document.getElementById("productId").value = product._id;
    document.getElementById("name").value = product.name;
    document.getElementById("price").value = parseFloat(product.price?.$numberDecimal || product.price);
    document.getElementById("shortDescription").value = product.shortDescription;
    document.getElementById("fullDescription").value= product.fullDescription;
    document.getElementById("stock").value= product.stock; 

    document.getElementById("imagePreview").src = "/" + product.image;

}

// Зареждане на продукт по ID (въвежда се ръчно)
async function loadProduct() {
  const id = prompt("Enter product's id:");
  if (!id) return;

  const res = await fetch(`/api/products/${id}/json`);
  if (!res.ok) return alert(" Няма такъв продукт!");

  const product = await res.json();
  fillForm(product);
}

    // Изтриване на продукт
    async function deleteProduct(){
        const id = document.getElementById("productId").value;
        if(!id) return alert("The product isnt loaded");
        if (!confirm("Do you really want to delete this product?")) return;

        const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });

        if (res.ok) {
        alert ("Product deleted");
        location.reload();}
        else alert ("Error with deleting");
    }
    function submitForm(method) {
  const form = document.getElementById("adminForm");
  const id = document.getElementById("productId").value;
  const formData = new FormData(form);

  let url = '/api/products';
  if (method === 'PUT') {
    if (!id) return alert(" Няма ID – не може да се редактира");
    url = `/api/products/${id}`;
  }

  fetch(url, {
    method,
    body: formData
  }).then(async (res) => {
    if (res.ok) {
      alert(method === 'PUT' ? ' Продуктът е обновен' : '✅ Продуктът е създаден');
      location.reload();
    } else {
      const err = await res.json();
      alert(" Грешка: " + (err.error || 'Неуспешно записване'));
    }
  });
}

function clearForm() {
  document.getElementById("adminForm").reset(); // изчиства всички полета
  document.getElementById("productId").value = ""; // скритото ID поле също
  document.getElementById("imagePreview").src = ""; // маха снимката, ако има преглед
}


    // Създаване или редакция
    /*document.getElementById("createBtn").addEventListener("click",  function (e){
    e.preventDefault();
    submitForm('POST');
    });

    document.getElementById("updateBtn").addEventListener("click", function (e){
    e.preventDefault();
    submitForm('PUT');
    });

    function submitForm(method){

        const form = document.getElementById("adminForm");
        const id = document.getElementById("productId").value;
        const formData = new FormData(form);

        let url ='/api/products';
        if (method === 'PUT'){
            if(!id) return alert("Продуктът не е зареден!");
            url = `/api/products/${id}`;
        }

        fetch(url,{
            method,
            body:formData
        }).then(res => {
            if(res.ok){
                alert(method === 'PUT' ? "Продуктът е обновен." : "Продуктът е създаден.");
                location.reload();
            } else{
                res.json().then(err => {
                    alert("⚠️ Грешка: " + (err.error || "Неуспешно записване"));
                
                });
            }
        });
    }*/







