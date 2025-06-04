document.addEventListener("DOMContentLoaded", function () {
  //  Покажи текущия брой в количката
  const cartCountElement = document.getElementById("cart-count");
  const cartCount = parseInt(localStorage.getItem("cartCount")) || 0;
  if (cartCountElement) {
    cartCountElement.innerText = cartCount;
  }

  //  Buy now бутон (само на product-details страница)
  const buyButton = document.querySelector(".buy-button");
  if (buyButton) {
    buyButton.addEventListener("click", function (event) {
      event.preventDefault();

      const quantityInput = document.getElementById("quantity");
      const quantity = parseInt(quantityInput.value) || 1;

      const productId = buyButton.getAttribute("data-id"); //  ВАЖНО: трябва да го има в HTML

      if (!productId) {
        return alert("Missing product ID");
      }

      // Съхраняваме в localStorage
      localStorage.setItem("lastProductId", productId);
      localStorage.setItem("lastQuantity", quantity);
      localStorage.setItem("cartCount", quantity);

      if (cartCountElement) {
        cartCountElement.innerText = quantity;
      }

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
      const productId = localStorage.getItem("lastProductId");
      const quantity = localStorage.getItem("lastQuantity");

      if (!productId || !quantity) {
        return alert("Няма продукт в количката");
      }

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          quantity,
          firstName,
          lastName,
          address,
        }),
      });

      if (res.ok) {
        alert(`${firstName}, благодарим за поръчката!`);
        localStorage.removeItem("cartCount");
        localStorage.removeItem("lastProductId");
        localStorage.removeItem("lastQuantity");
        orderForm.reset();
         window.location.href = "/"
        if (cartCountElement) cartCountElement.innerText = "0";
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
        localStorage.removeItem("cartCount");
        localStorage.removeItem("lastProductId");
        localStorage.removeItem("lastQuantity");
        if (cartCountElement) cartCountElement.innerText = "0";
        alert("Поръчката е отменена.");
        location.reload();
         window.location.href = "/";
      });
    }
  }

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





