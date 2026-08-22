const API_URL =
  "https://dark-devil-control-api.mohon153r.workers.dev";

const token =
  localStorage.getItem("dark_devil_token");

const savedUser =
  JSON.parse(
    localStorage.getItem("dark_devil_user") || "null"
  );

if (!token || !savedUser) {
  window.location.href = "./index.html";
}

const adminInfo =
  document.getElementById("adminInfo");

const balance =
  document.getElementById("balance");

adminInfo.textContent =
  `${savedUser.name || "Admin"} (@${savedUser.username})`;

balance.textContent =
  `৳${Number(savedUser.balance || 0).toLocaleString("en-BD")}`;

document
  .getElementById("logoutButton")
  .addEventListener("click", () => {

    localStorage.removeItem("dark_devil_token");
    localStorage.removeItem("dark_devil_user");

    window.location.href = "./index.html";
  });


const content =
  document.getElementById("content");


document
  .querySelectorAll("[data-section]")
  .forEach(button => {

    button.addEventListener("click", () => {

      const section =
        button.dataset.section;

      openSection(section);
    });
  });


function openSection(section) {

  const titles = {
    keys: "🔑 Keys",
    generate: "⚡ Generate Key",
    resellers: "👥 Resellers",
    apps: "📱 Apps",
    settings: "⚙️ Settings",
    profile: "👤 Admin Profile"
  };

  content.innerHTML = `
    <h2>${titles[section] || "Dashboard"}</h2>

    <div class="panel">

      <p>
        ${titles[section] || "Dashboard"} module
        is ready for API integration.
      </p>

      <p class="notice">
        This module will use the DARK DEVIL CONTROL API
        and D1 database.
      </p>

    </div>
  `;
}
