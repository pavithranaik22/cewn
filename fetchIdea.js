async function loadIdeas() {

    const res = await fetch("http://localhost:5000/ideas");
    const data = await res.json();

    let html = "";

    data.forEach(item => {

        html += `
            <div class="idea-card">
                <p>${item.idea_text}</p>
                <hr>
            </div>
        `;
    });

    document.getElementById("ideas-section").innerHTML = html;
}

loadIdeas();