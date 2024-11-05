async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email && password) {
        const response = await fetch('/login',{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email,password}),
        });
        const data = await response.json();
        if (data.success){
            alert("Login successful");
            sessionStorage.setItem("employee",JSON.stringify(data.employee));
            window.location.href = "directory.html";
        }
        else{
            alert("Invalid email or password given");
        }
    }
    else{
        alert("Please enter both username and password.");
    }
}

