document.addEventListener("DOMContentLoaded", async function () {

    const user = await requireLogin();

    if (!user) return;


    const profile =
        await getCurrentProfile();


    const message =
        document.getElementById("adminMessage");


    if (!profile || profile.role !== "admin") {

        message.textContent =
            "Access denied. Administrator account required.";

        return;
    }


    message.textContent =
        "Administrator access confirmed.";


    loadVerificationRequests();

    loadReports();

});


async function loadVerificationRequests() {

    const list =
        document.getElementById("verificationList");


    const { data, error } =
        await window.owinoSupabase
        .from("verification_requests")
        .select("*")
        .order(
            "submitted_at",
            {
                ascending: false
            }
        );


    if (error) {

        list.innerHTML = `
        
            <div class="card">

                Error loading applications:
                ${escapeHtml(error.message)}

            </div>
        
        `;

        return;
    }


    if (!data || data.length === 0) {

        list.innerHTML = `
        
            <div class="card">

                No verification applications.

            </div>
        
        `;

        return;
    }


    list.innerHTML =
        data.map(function (item) {

            return `

                <div class="card">

                    <h3>
                    ${escapeHtml(
                        item.full_name || "Applicant"
                    )}
                    </h3>

                    <br>

                    <p>
                    Status:
                    ${escapeHtml(
                        item.status || "pending"
                    )}
                    </p>

                    <br>

                    <p>
                    ${escapeHtml(
                        item.reason || ""
                    )}
                    </p>

                </div>

            `;

        }).join("");
}


async function loadReports() {

    const list =
        document.getElementById("reportsList");


    const { data, error } =
        await window.owinoSupabase
        .from("reports")
        .select("*")
        .limit(50);


    if (error) {

        list.innerHTML = `
        
            <div class="card">

                Error loading reports:
                ${escapeHtml(error.message)}

            </div>
        
        `;

        return;
    }


    if (!data || data.length === 0) {

        list.innerHTML = `
        
            <div class="card">

                No reports found.

            </div>
        
        `;

        return;
    }


    list.innerHTML =
        data.map(function (item) {

            return `

                <div class="card">

                    <h3>Report</h3>

                    <br>

                    <p>
                    ${escapeHtml(
                        JSON.stringify(item)
                    )}
                    </p>

                </div>

            `;

        }).join("");
}


function escapeHtml(value) {

    return String(value)

        .replaceAll("&", "&amp;")

        .replaceAll("<", "&lt;")

        .replaceAll(">", "&gt;")

        .replaceAll('"', "&quot;")

        .replaceAll("'", "&#039;");
}
