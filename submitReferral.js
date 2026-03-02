document.getElementById("referralForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    const yourName = document.getElementById("yourName").value;
    const yourEmail = document.getElementById("yourEmail").value;
    const friendName = document.getElementById("friendName").value;
    const friendEmail = document.getElementById("friendEmail").value;
    const jobTitle = document.getElementById("jobTitle").value;
    const resumeLink = document.getElementById("resumeLink").value;

    try {

        const res = await fetch("http://localhost:5000/submitReferral", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                yourName,
                yourEmail,
                friendName,
                friendEmail,
                jobTitle,
                resumeLink
            })
        });

        const data = await res.json();

        if (data.success) {

            Swal.fire({
                icon: "success",
                title: "Referral Submitted!",
                confirmButtonColor: "#3085d6"
            });

            document.getElementById("referralForm").reset();

        } else {

            Swal.fire({
                icon: "error",
                title: "Something went wrong"
            });

        }

    } catch (error) {

        Swal.fire({
            icon: "error",
            title: "Server Error"
        });

    }

});