async function loadBirthdays() {

    const res = await fetch("http://localhost:5000/birthdays");
    const data = await res.json();

    let html = "";

    data.forEach(item => {

        const date = new Date(item.birthdate);
        const formattedDate = date.toLocaleDateString("en-GB");

        html += `
            <div class="birthday-row">
                <span class="birthday-icon">🎂</span>
                <span class="birthday-name">${item.name}</span>
                <span class="birthday-date">${formattedDate}</span>
            </div>
        `;
    });

    document.getElementById("birthdays-section").innerHTML = html;
}

loadBirthdays();