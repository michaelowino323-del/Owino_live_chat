let profileUser = null;

document.addEventListener("DOMContentLoaded", async function () {

    profileUser = await requireLogin();

    if (!profileUser) return;

    const profile = await getCurrentProfile();

    if (!profile) return;

    document.getElementById("username").value =
        profile.username || "";

    document.getElementById("displayName").value =
        profile.display_name || "";

    document.getElementById("avatarUrl").value =
        profile.avatar_url || "";
});


async function saveProfile() {

    if (!profileUser) return;

    const message =
        document.getElementById("message");

    const username =
        document.getElementById("username").value.trim();

    const displayName =
        document.getElementById("displayName").value.trim();

    const avatarUrl =
        document.getElementById("avatarUrl").value.trim();

    message.textContent = "Saving...";

    const { error } =
        await window.owinoSupabase
        .from("profiles")
        .update({
            username: username,
            display_name: displayName,
            avatar_url: avatarUrl
        })
        .eq("user_id", profileUser.id);

    if (error) {

        message.textContent =
            "Error: " + error.message;

        return;
    }

    message.textContent =
        "Profile saved successfully.";
}
