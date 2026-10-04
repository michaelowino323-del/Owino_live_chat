document.addEventListener(
  "DOMContentLoaded",
  async function () {

    const user =
      await requireLogin();

    if (!user) return;

    const profile =
      await getCurrentProfile();

    if (!profile) {

      document.getElementById(
        "welcome"
      ).textContent =
        "Account profile is being prepared.";

      return;
    }


    document.getElementById(
      "welcome"
    ).textContent =
      "Welcome, " +
      (
        profile.display_name ||
        profile.username ||
        user.email
      );


    document.getElementById(
      "verificationStatus"
    ).textContent =
      profile.verification_status ||
      "pending";


    document.getElementById(
      "livePermission"
    ).textContent =
      profile.can_go_live
        ? "Approved"
        : "Not approved";


    document.getElementById(
      "role"
    ).textContent =
      profile.role || "user";


    const liveButton =
      document.getElementById(
        "goLiveButton"
      );


    if (!profile.can_go_live) {

      liveButton.textContent =
        "Verification Required";

      liveButton.href =
        "verification.html";

    }

  }
);
