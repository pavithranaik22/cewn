document.getElementById("ideaForm").addEventListener("submit", async function(e) {

    e.preventDefault();

    const idea = document.getElementById("ideaText").value;

    try {

        await fetch("http://localhost:5000/addIdea", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ idea })
        });

        Swal.fire({
            icon: 'success',
            title: 'Thank You!',
            text: 'Your idea has been successfully submitted.'
        });

        document.getElementById("ideaText").value = "";

        loadIdeas();

    } catch (error) {

        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Something went wrong!'
        });

    }

});