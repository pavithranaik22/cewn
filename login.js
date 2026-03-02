document.getElementById("loginForm").addEventListener("submit", async function(e) {

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

        const res = await fetch("http://localhost:5000/login", {

            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })

        });

        const data = await res.json();

        if (data.success) {

            // ✅ Store username for future use (forum, ideas, etc.)
            localStorage.setItem("username", email);

            Swal.fire({
                icon: 'success',
                title: 'Login Successful!',
                confirmButtonColor: '#4CAF50'
            }).then(() => {

                window.location.href = "http://localhost:5000/dashboard.html";

            });

        } else {

            Swal.fire({
                icon: 'error',
                title: 'Invalid Email or Password'
            });

        }

    } catch (error) {

        console.error(error);

        Swal.fire({
            icon: 'error',
            title: 'Server Error'
        });

    }

});