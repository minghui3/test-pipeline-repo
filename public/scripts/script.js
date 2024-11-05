function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username && password) {
        alert("Login successful");
        // Add further login functionality here
        console.log(window.location.href)
        window.location.href = "directory.html";
        console.log(window.location.href)
    } else {
        alert("Please enter both username and password.");
    }
}

