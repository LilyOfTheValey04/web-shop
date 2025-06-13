document.addEventListener("DOMContentLoaded", function () {
  //  Обновяване на брояча на количката
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((count, item) => count + item.quantity, 0);
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) cartCountElement.innerText = totalItems;
  }

  //  Добавяне в количката
  function addToCart(productId, quantity) {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = existingCart.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      existingCart.push({ productId, quantity });
    }
    localStorage.setItem("cart", JSON.stringify(existingCart));
    updateCartCount();
  }

  updateCartCount(); // Показва текущия брой в количката

  //  Buy Now бутон (на product-details страница)
  const buyButton = document.querySelector(".buy-button");
  if (buyButton) {
    buyButton.addEventListener("click", function (event) {
      event.preventDefault();
      const quantity = parseInt(document.getElementById("quantity").value) || 1;
      const productId = buyButton.getAttribute("data-id");
      if (!productId) return alert("Missing product ID");
      addToCart(productId, quantity);
      alert("Product added to cart!");
    });
  }

  //  Submit на buyForm (buyForm.html)
  const orderForm = document.getElementById("orderForm");
  if (orderForm) {
    orderForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      const firstName = document.getElementById("complete-order-name").value;
      const lastName = document.getElementById("complete-order-surname").value;
      const address = document.getElementById("complete-order-address").value;

      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const items = cart.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }));

      if (!items.length) return alert("Няма продукти в количката");

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          address,
          items
        }),
      });

      if (res.ok) {
        alert(`${firstName}, благодарим за поръчката!`);
        localStorage.removeItem("cart");
        updateCartCount();
        orderForm.reset();
        window.location.href = "/";
      } else {
        const err = await res.json();
        alert("Грешка: " + (err.error || "Неуспешна поръчка"));
      }
    });

    //  Cancel бутона
    const cancelOrderButton = document.getElementById("cancel-order");
    if (cancelOrderButton) {
      cancelOrderButton.addEventListener("click", function (event) {
        event.preventDefault();
        localStorage.removeItem("cart");
        updateCartCount();
        alert("Поръчката е отменена.");
        location.reload();
      });
    }
  }

  //  Обработка на ревюта
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

  //  Typewriter ефект за началната страница
  const heading = document.getElementById("hero-heading");
  const paragraph = document.getElementById("hero-paragraph");

  function typeWrite(element, text, delay) {
    let i = 0;
    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, delay);
      }
    }
    type();
  }

  if (heading && paragraph) {
    const headingText = "Our new designs";
    const paragraphText = "Sweet and stylish way to show your\nunique love";
    heading.innerHTML = "";
    paragraph.innerHTML = "";
    typeWrite(heading, headingText, 100);
    setTimeout(() => {
      typeWrite(paragraph, paragraphText, 50);
    }, headingText.length * 100 + 500);
  }
});

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
      alert(method === 'PUT' ? ' Продуктът е обновен' : ' Продуктът е създаден');
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

/*document.getElementById("login-form").addEventListener("submit", async function(event){
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });

        const data = await res.json(); // Винаги извличай JSON независимо от res.ok

        if (res.ok && data.token) {
            alert("Login successful!");
            window.location.href = "/"; // Пренасочване
        } else {
            alert(data.message || "Invalid username or password");
        }

    } catch (err) {
       console.error("Error:", err);
       alert("Server error. Please try again later.");
    }
});*/

