const authDb = window.owinoSupabase;

async function signupUser() {

  const name =
    document.getElementById("fullName").value.trim();

  const email =
    document.getElementById("email").value.trim();

  const password =
    document.getElementById("password").value;

  const message =
    document.getElementById("message");

  if (!name || !email || !password) {
    message.textContent =
      "Please complete all fields.";
    return;
  }

  if (password.length < 6) {
    message.textContent =
      "Password must contain at least 6 characters.";
    return;
  }

  message.textContent =
    "Creating your account...";

  const { data, error } =
    await authDb.auth.signUp({

      email,

      password,

      options: {
        data: {
          full_name: name
        }
      }

    });

  if (error) {
    message.textContent =
      error.message;
    return;
  }

  message.textContent =
    "Account created. Check your email to confirm your account.";

  document.getElementById("signupForm").reset();
}


async function loginUser() {

  const email =
    document.getElementById("email").value.trim();

  const password =
    document.getElementById("password").value;

  const message =
    document.getElementById("message");

  message.textContent =
    "Signing in...";

  const { data, error } =
    await authDb.auth.signInWithPassword({

      email,

      password

    });

  if (error) {
    message.textContent =
      error.message;
    return;
  }

  window.location.href =
    "dashboard.html";
}
