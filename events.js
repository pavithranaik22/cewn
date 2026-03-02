document.addEventListener("DOMContentLoaded", loadEvents);

async function loadEvents() {

    const res = await fetch("http://localhost:5000/events");
    const data = await res.json();

    let html = "";

    data.forEach(event => {

        const date = new Date(event.event_date).toLocaleString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
        });

        html += `
            <div class="event-card">

        <h3>${event.event_name}</h3>

        <p><strong>Organizer:</strong> ${event.organizer}</p>

        <p><strong>Date & Time:</strong> ${date}</p>

        <p><strong>Location:</strong> ${event.location}</p>

        <hr>

    </div>
        `;
    });

    document.getElementById("events-section").innerHTML = html;
}