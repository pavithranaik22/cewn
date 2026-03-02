async function loadReferrals() {

    try {

        const res = await fetch("http://localhost:5000/referrals");
        const data = await res.json();

        let html = "";

        data.forEach(ref => {

            html += `
                <div class="referral-card">
                    <h4>${ref.job_title}</h4>
                    <p><strong>Referrer:</strong> ${ref.referrer_name} (${ref.referrer_email})</p>
                    <p><strong>Friend:</strong> ${ref.friend_name} (${ref.friend_email})</p>
                    <p><strong>Resume:</strong> <a href="${ref.resume_link}" target="_blank">View</a></p>
                    <p>${ref.message || ""}</p>
                    <hr>
                </div>
            `;

        });

        document.getElementById("referrals-section").innerHTML = html;

    } catch (error) {

        console.error(error);

    }

}

// Load when page opens
loadReferrals();