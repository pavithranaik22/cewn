async function loadForumPosts() {

    const res = await fetch("http://localhost:5000/fetchForum");
    const data = await res.json();

    let html = "";

    data.forEach(post => {

        html += `
            <div class="forum-card">
                <p>${post.post_text}</p>
                <hr>
            </div>
        `;

    });

    document.getElementById("forum-posts").innerHTML = html;
}

// Load when page opens
loadForumPosts();