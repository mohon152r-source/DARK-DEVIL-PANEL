const API_URL =
  "https://dark-devil-control-api.mohon153r.workers.dev";

const loginForm =
  document.getElementById("loginForm");

const loginButton =
  document.getElementById("loginButton");

const loginMessage =
  document.getElementById("loginMessage");

const passwordInput =
  document.getElementById("password");

const togglePassword =
  document.getElementById("togglePassword");


togglePassword.addEventListener(
  "click",
  () => {

    const isPassword =
      passwordInput.type === "password";

    passwordInput.type =
      isPassword ? "text" : "password";

    togglePassword.textContent =
      isPassword ? "🙈" : "👁";
  }
);


function showMessage(message, type) {

  loginMessage.textContent = message;

  loginMessage.className =
    `message ${type}`;
}


loginForm.addEventListener(
  "submit",
  async (event) => {

    event.preventDefault();

    const username =
      document
        .getElementById("username")
        .value
        .trim();

    const password =
      passwordInput.value;

    if (!username || !password) {

      showMessage(
        "Username and password are required.",
        "error"
      );

      return;
    }

    loginButton.disabled = true;

    loginButton.textContent =
      "Logging in...";

    showMessage("", "");

    try {

      const response =
        await fetch(
          `${API_URL}/api/auth/login`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
              username,
              password
            })
          }
        );

      const data =
        await response.json();

      if (!response.ok || !data.success) {

        showMessage(
          data.message ||
          "Login failed.",
          "error"
        );

        return;
      }

      localStorage.setItem(
        "dark_devil_token",
        data.token
      );

      localStorage.setItem(
        "dark_devil_user",
        JSON.stringify(data.user)
      );

      showMessage(
        "Login successful!",
        "success"
      );

      /*
       * Dashboard page will be added
       * in the next step.
       */

      setTimeout(() => {

        window.location.href =
          "./dashboard.html";

      }, 700);

    } catch (error) {

      console.error(error);

      showMessage(
        "Unable to connect to API.",
        "error"
      );

    } finally {

      loginButton.disabled = false;

      loginButton.textContent =
        "🔒 LOGIN";
    }

  }
);
