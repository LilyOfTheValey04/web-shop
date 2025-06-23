document.getElementById("login-form").addEventListener("submit", async function(event){
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
});
