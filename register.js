document.getElementById("registerForm").addEventListener("submit", async function(e) {

    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch("http://localhost:5000/register", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })

    });

    const data = await res.json();

    if (data.success) {

        Swal.fire({
            icon: 'success',
            title: 'Registration Successful'
        }).then(() => {
            window.location.href = "login.html";
        });

    } else {

        Swal.fire({
            icon: 'error',
            title: 'User already exists'
        });

    }

});