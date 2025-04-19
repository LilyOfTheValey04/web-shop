document.getElementById("login-fprm").addEventListener("submit",async function(event){
    event.preventDefault();

    const username= document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });

        const data = await res.json();
        if (res.ok &&data.token){
            localStorage.setItem("token", data.token); // Store the token in local storage
            alert("Login successful!");
            window.location.href = "/"; // Redirect to home page
        }
        else {
            alert(data.message || "not correct username or password");
        }
    }catch(err){
       console.error("Error:", err);
       alert("Server error. Please try again later.");
    }
    
});