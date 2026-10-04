async function submitVerification() {

    const user = await requireLogin();

    if (!user) return;

    const message =
        document.getElementById("message");

    const fullName =
        document.getElementById("fullName").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const reason =
        document.getElementById("reason").value.trim();

    const documentUrl =
        document.getElementById("documentUrl").value.trim();

    const selfieUrl =
        document.getElementById("selfieUrl").value.trim();


    message.textContent =
        "Submitting application...";


    const { error } =
        await window.owinoSupabase
        .from("verification_requests")
        .insert({

            user_id: user.id,

            full_name: fullName,

            phone: phone,

            document_url:
                documentUrl || null,

            selfie_url:
                selfieUrl || null,

            reason: reason,

            status: "pending"

        });


    if (error) {

        message.textContent =
            "Error: " + error.message;

        return;
    }


    message.textContent =
        "Application submitted successfully. Our team will review it.";

    document
        .getElementById("verificationForm")
        .reset();
}
