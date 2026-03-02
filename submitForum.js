document.getElementById("forumForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    const postText = document.getElementById("forumText").value;

    try {

        await fetch("http://localhost:5000/addForum", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ postText })
        });

        document.getElementById("forumText").value = "";

        Swal.fire({
            icon: 'success',
            title: 'Posted Successfully'
        });

        loadForumPosts();

    } catch (error) {

        Swal.fire({
            icon: 'error',
            title: 'Error'
        });

    }

});