let liveUser = null;

document.addEventListener("DOMContentLoaded", async function () {

    liveUser = await requireLogin();

    if (!liveUser) return;

    const profile = await getCurrentProfile();

    const videoArea =
        document.getElementById("videoArea");


    if (!profile) {

        videoArea.innerHTML =
            "<p>Profile not found.</p>";

        return;
    }


    if (!profile.can_go_live) {

        videoArea.innerHTML = `
        
            <div>

                <h3>Live Streaming Not Enabled</h3>

                <p>
                You must complete creator
                verification before going live.
                </p>

                <br>

                <a
                class="btn btn-primary"
                href="verification.html">

                Apply for Verification

                </a>

            </div>
        
        `;

        return;
    }


    videoArea.innerHTML = `

        <div>

            <h3>You are approved to go live.</h3>

            <p>
            Live video infrastructure will be
            connected here.
            </p>

        </div>

    `;
});


async function sendChatMessage() {

    if (!liveUser) return;


    const input =
        document.getElementById("chatInput");

    const text =
        input.value.trim();


    if (!text) return;


    const messages =
        document.getElementById("chatMessages");


    const message =
        document.createElement("div");


    message.style.marginBottom = "10px";


    message.textContent = text;


    messages.appendChild(message);


    input.value = "";
}
