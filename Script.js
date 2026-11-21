const registerForm = document.getElementById("registerForm");
const registerMessage = document.getElementById("registerMessage");
const dashboard = document.getElementById("dashboard");

function showDashboard(user) {
  document.getElementById("welcome").textContent =
    "Welcome, " + user.name;

  dashboard.classList.remove("hidden");
  document.getElementById("register").classList.add("hidden");
}

registerForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const user = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    country: document.getElementById("country").value.trim()
  };

  if (!user.name || !user.email || !user.phone || !user.country) {
    registerMessage.textContent = "Please complete all fields.";
    return;
  }

  localStorage.setItem("demoUser", JSON.stringify(user));

  registerMessage.textContent =
    "Demo account created successfully.";

  showDashboard(user);
});

document.getElementById("logoutButton").addEventListener("click", function() {
  localStorage.removeItem("demoUser");
  dashboard.classList.add("hidden");
  document.getElementById("register").classList.remove("hidden");
});

document.getElementById("referralButton").addEventListener("click", function() {
  const code = "GS" + Math.random().toString(36).substring(2, 9).toUpperCase();

  const link = new URL(window.location.href);
  link.searchParams.set("ref", code);

  document.getElementById("referralLink").value = link.href;

  document.getElementById("referralMessage").textContent =
    "Demo referral link generated.";
});

document.getElementById("copyButton").addEventListener("click", async function() {
  const input = document.getElementById("referralLink");

  if (!input.value) {
    document.getElementById("referralMessage").textContent =
      "Generate a referral link first.";
    return;
  }

  try {
    await navigator.clipboard.writeText(input.value);

    document.getElementById("referralMessage").textContent =
      "Referral link copied.";
  } catch (error) {
    input.select();
    document.execCommand("copy");

    document.getElementById("referralMessage").textContent =
      "Referral link copied.";
  }
});

const savedUser = localStorage.getItem("demoUser");

if (savedUser) {
  try {
    showDashboard(JSON.parse(savedUser));
  } catch (error) {
    localStorage.removeItem("demoUser");
  }
                                                         }
