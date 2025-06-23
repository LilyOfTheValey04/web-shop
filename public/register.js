document.getElementById("registerForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    const username= document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if(password !== confirmPassword){
        alert("The passwords do not match!");
        return;
    }
 try{
    const res = await fetch("api/auth/register", {
        method: "POST",
        headers:{ "Content-type": "application/json"},
        body: JSON.stringify({
            username,
            email,
            password
        })
    });

    const data = await res.json();
    if(res.ok){
        alert("User created successfully!");
        window.location.href = "/login"; // Redirect to login page
}
else{
    alert(data.message || "An error occurred during registration.");
}
 }catch(err){
    console.error("Error:", err);
    alert("Server error. Please try again later.");
 }
});
