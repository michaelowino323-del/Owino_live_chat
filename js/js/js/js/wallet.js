let walletUser = null;

document.addEventListener("DOMContentLoaded", async function () {

    walletUser = await requireLogin();

    if (!walletUser) return;


    document.getElementById("balance")
        .textContent = "0";

    document.getElementById("tips")
        .textContent = "0";

    document.getElementById("withdrawals")
        .textContent = "0";

});


async function requestWithdrawal() {

    const message =
        document.getElementById("message");


    message.textContent =
        "Withdrawal system will be activated after the secure payment backend is connected.";

}
