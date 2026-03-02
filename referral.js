document.getElementById("referralForm").addEventListener("submit", async function (e) {

    e.preventDefault();


    const data = {
        referrerName: document.getElementById("referrerName").value,
        referrerEmail: document.getElementById("referrerEmail").value,
        friendName: document.getElementById("friendName").value,
        friendEmail: document.getElementById("friendEmail").value,
        jobTitle: document.getElementById("jobTitle").value,
        resumeLink: document.getElementById("resumeLink").value,
        message: document.getElementById("message").value
    };

    try {

        const res = await fetch("http://localhost:5000/addReferral", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (result.success) {

            Swal.fire({
                icon: 'success',
                title: 'Thank You!',
                text: 'Your referral has been submitted!'
            }).then(() => {
                window.location.href = "dashboard.html";
            });

        } else {

            Swal.fire({
                icon: 'error',
                title: 'Failed to submit'
            });

        }

    } catch (error) {

        Swal.fire({
            icon: 'error',
            title: 'Server Error'
        });

    }

});