const db = window.owinoSupabase;

async function getCurrentUser() {
  const { data, error } = await db.auth.getUser();

  if (error || !data.user) {
    return null;
  }

  return data.user;
}

async function getCurrentProfile() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const { data, error } = await db
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

async function requireLogin() {
  const user = await getCurrentUser();

  if (!user) {
    window.location.href = "login.html";
    return null;
  }

  return user;
}

async function logout() {
  await db.auth.signOut();
  window.location.href = "index.html";
}

async function loadNavigation() {
  const user = await getCurrentUser();

  const authArea = document.getElementById("authArea");

  if (!authArea) return;

  if (user) {
    authArea.innerHTML = `
      <a class="nav-btn" href="dashboard.html">Dashboard</a>
      <button class="nav-btn danger" onclick="logout()">Logout</button>
    `;
  } else {
    authArea.innerHTML = `
      <a class="nav-btn" href="login.html">Login</a>
      <a class="nav-btn primary" href="signup.html">Sign Up</a>
    `;
  }
}

document.addEventListener("DOMContentLoaded", loadNavigation);
