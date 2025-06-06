document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();
 

  // показва броя н апродуктите в количкта
  function updateCartCount(){
    const cart =JSON.parse(localStorage.getItem("cart")) || [];
    //съберем количествата на всички продукти в количката.
    const totalItems = cart.reduce((totalItems, item) => totalItems + item.quantity, 0);
    //Намираме HTML елемента, в който се показва брояча. 
    const cartCountElement = document.getElementById("cart-count");
    //Ако елементът е намерен, сменяме текста му с общия брой продукти
    if (cartCountElement) cartCountElement.innerText = totalItems;

  }

  //запазваме продукт в количката чрез localStorage
function addToCart(productId, quantity){
  const existingCart = JSON.parse(localStorage.getItem("cart")) || [] ;

  const existingItem = existingCart.find(item=>item.productId === productId);
//проверяваме дали този продукт вече същ в количката
  if(existingItem){
    existingItem.quantity += quantity;
  }else{
    existingCart.push({ productId, quantity});
  }

  localStorage.setItem("cart", JSON.stringify(existingCart));
  updateCartCount();
}


// Buy now бутон (само на product-details страница)
const buyButton = document.querySelector(".buy-button");

if (buyButton) {
  buyButton.addEventListener("click", function (event) {
    event.preventDefault();

    const quantity = parseInt(document.getElementById("quantity").value) || 1;
    const productId = buyButton.getAttribute("data-id");

    if (!productId) {
      return alert("Missing product ID");
    }

    addToCart(productId, quantity);
    alert("Product added to cart!");
  });
}

  //  Обработка на buyForm (buyForm.html)
  const orderForm = document.getElementById("orderForm");
  if (orderForm) {
    orderForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const firstName = document.getElementById("complete-order-name").value;
      const lastName = document.getElementById("complete-order-surname").value;
      const address = document.getElementById("complete-order-address").value;
  

      const cart =JSON.parse(localStorage.getItem("cart")) ||  [] ;
      const items = cart.map(item =>({
  productId: item.productId,
  quantity:item.quantity
}));

    /*  if (!productId || !quantity) {
        return alert("Няма продукт в количката");
      }*/
     

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
         
          firstName,
          lastName,
          address,
          items 
        }),
      });

      if (res.ok) {
        alert(`${firstName}, thank you!`);
        localStorage.removeItem("cart");
       /* localStorage.removeItem("cartCount");
        localStorage.removeItem("lastProductId");
        localStorage.removeItem("lastQuantity");*/
        orderForm.reset();
         window.location.href = "/"
       // if (cartCountElement) cartCountElement.innerText = "0";
      } else {
        const err = await res.json();
        alert("Error: " + (err.error || "Order failed"));
      }
    });

    //  Cancel бутона
    const cancelOrderButton = document.getElementById("cancel-order");
if (cancelOrderButton) {
  cancelOrderButton.addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.removeItem("cart");
    updateCartCount(); //  тук обновяваш брояча
    alert("Поръчката е отменена.");
    location.reload();
  });
}

    /*const cancelOrderButton = document.getElementById("cancel-order");
    if (cancelOrderButton) {
      cancelOrderButton.addEventListener("click", function (event) {
        event.preventDefault();
        localStorage.removeItem("cartCount");
        localStorage.removeItem("lastProductId");
        localStorage.removeItem("lastQuantity");
        if (cartCountElement) cartCountElement.innerText = "0";
        alert("Поръчката е отменена.");
        location.reload();
         window.location.href = "/";
      });
    }
  }*/

  //  Reviews (ако има reviewForm)
  const reviewForm = document.getElementById("reviewForm");
  if (reviewForm) {
    reviewForm.onsubmit = function (event) {
      event.preventDefault();
      const reviewText = document.getElementById("review-text").value;
      const reviewName = document.getElementById("review-name").value;
      const reviewContainer = document.getElementById("reviews");

      if (!reviewText.trim() || !reviewName.trim()) {
        return alert("Please fill in all fields!");
      }

      const newReview = document.createElement("p");
      newReview.innerHTML = `<strong>${reviewName}</strong>: ${reviewText}`;
      newReview.classList.add("review-item");

      reviewContainer.prepend(newReview);
      reviewForm.reset();
    };
  }

  //  Typewriter ефект
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





