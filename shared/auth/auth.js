(function () {
  var DEMO_EMAIL = "demo@beyondegrees.ai";
  var DEMO_PASSWORD = "Demo@1234";

  var copy = {
    login: {
      leftTitle: "Discover your academic identity.",
      leftBody: "AI-powered guidance that matches you to the right discipline, major and university.",
      formTitle: "Welcome back",
      formBody: "Log in to continue your journey."
    },
    signup: {
      leftTitle: "Your future starts with one quiz.",
      leftBody: "Create an account to save your matches across disciplines, majors and universities.",
      formTitle: "Create your account",
      formBody: "Start discovering your perfect match."
    },
    reset: {
      leftTitle: "Locked out? It happens.",
      leftBody: "We'll email you a secure link so you can get back to your matches in seconds.",
      formTitle: "",
      formBody: ""
    }
  };

  var googleIcon = [
    '<svg width="19" height="19" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">',
    '<path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>',
    '<path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"></path>',
    '<path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path>',
    '<path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-0.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"></path>',
    '</svg>'
  ].join("");

  var params = new URLSearchParams(window.location.search);
  var device = document.body.getAttribute("data-device") || "mobile";
  var mode = normalizeMode(params.get("mode"));
  var theme = normalizeTheme(params.get("theme")) || normalizeTheme(readStorage("bd-theme")) || "dark";
  var cardRoot = document.getElementById("auth-card");
  var leftTitle = document.getElementById("auth-left-title");
  var leftBody = document.getElementById("auth-left-body");
  var formTitle = document.getElementById("auth-form-title");
  var formBody = document.getElementById("auth-form-body");
  var themeToggle = document.getElementById("auth-theme-toggle");

  applyShellState();
  bindThemeToggle();
  render();

  function normalizeMode(value) {
    if (value === "signup" || value === "reset") return value;
    return "login";
  }

  function normalizeTheme(value) {
    if (value === "light" || value === "dark") return value;
    return "";
  }

  function readStorage(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      return "";
    }
  }

  function writeStorage(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {}
  }

  function applyShellState() {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);
    document.body.setAttribute("data-device", device);
    document.body.setAttribute("data-mode", mode);
    writeStorage("bd-theme", theme);

    if (leftTitle && copy[mode]) leftTitle.textContent = copy[mode].leftTitle;
    if (leftBody && copy[mode]) leftBody.textContent = copy[mode].leftBody;
    if (formTitle && copy[mode]) formTitle.textContent = copy[mode].formTitle;
    if (formBody && copy[mode]) formBody.textContent = copy[mode].formBody;
    updateThemeToggle();
  }

  function updateThemeToggle() {
    if (!themeToggle) return;
    var text = themeToggle.querySelector(".auth-theme-text");
    if (text) text.textContent = theme === "light" ? "Dark mode" : "Light mode";
    themeToggle.setAttribute("aria-label", theme === "light" ? "Switch to dark mode" : "Switch to light mode");
  }

  function bindThemeToggle() {
    if (!themeToggle) return;
    themeToggle.addEventListener("click", function () {
      theme = theme === "light" ? "dark" : "light";
      applyShellState();
      var next = new URLSearchParams(window.location.search);
      next.set("mode", mode);
      next.set("theme", theme);
      var query = next.toString();
      window.history.replaceState(null, "", window.location.pathname + (query ? "?" + query : ""));
    });
  }

  function render() {
    if (!cardRoot) return;
    applyShellState();

    var html = [
      '<div class="auth-card-brand">',
      '<img src="/shared/beyondegrees-logo-mark.png" alt="BeyonDegrees">',
      '<strong>BeyonDegrees<span>.ai</span></strong>',
      '</div>'
    ];

    if (mode === "reset") {
      html.push(renderResetPanel());
      html.push('<a class="auth-link auth-back" href="' + urlFor("login") + '" data-mode-link="login">&larr; Back to log in</a>');
    } else {
      html.push(renderSocialPanel());
      html.push(mode === "login" ? renderLoginFooter() : renderSignupFooter());
    }

    cardRoot.innerHTML = html.join("");
    bindCard();
  }

  function renderSocialPanel() {
    return [
      '<form class="auth-panel" data-auth-form="' + mode + '">',
      '<button class="auth-google" type="button" data-google-auth>' + googleIcon + 'Continue with Google</button>',
      '<div class="auth-divider"><span>OR</span></div>',
      mode === "login" ? renderLoginFields() : renderSignupFields(),
      '<button class="auth-submit" type="submit">' + (mode === "login" ? "Log in" : "Create account") + '</button>',
      '</form>'
    ].join("");
  }

  function renderLoginFields() {
    return [
      field("Email", "email", "email", "you@example.com", "", "email", true),
      field("Password", "password", "password", "&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;", "auth-login-password", "current-password", true),
      '<div class="auth-forgot"><a class="auth-link" href="' + urlFor("reset") + '" data-mode-link="reset">Forgot password?</a></div>'
    ].join("");
  }

  function renderSignupFields() {
    return [
      '<div class="auth-field-row">',
      field("Name", "givenName", "text", "Jane", "", "given-name", true),
      field("Surname", "familyName", "text", "Doe", "", "family-name", true),
      '</div>',
      field("Email", "email", "email", "you@example.com", "", "email", true),
      field("Password", "password", "password", "At least 8 characters", "auth-signup-password", "new-password", true),
      field("Repeat password", "repeatPassword", "password", "&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;", "auth-signup-repeat", "new-password", true)
    ].join("");
  }

  function renderResetPanel() {
    return [
      '<form class="auth-panel" data-auth-form="reset">',
      '<h2 class="auth-card-title">Reset password</h2>',
      '<p class="auth-card-copy">Enter the email tied to your account and we\'ll send you a secure link to set a new password.</p>',
      field("Email", "email", "email", "you@example.com", "auth-reset-email", "email", true),
      '<button class="auth-submit" type="submit">Send reset link</button>',
      '</form>'
    ].join("");
  }

  function field(label, name, type, placeholder, className, autocomplete, required) {
    var requiredAttr = required ? " required" : "";
    return [
      '<div class="auth-field ' + (className || "") + '">',
      '<label for="auth-' + name + '">' + label + '</label>',
      '<input id="auth-' + name + '" name="' + name + '" type="' + type + '" placeholder="' + placeholder + '" autocomplete="' + autocomplete + '"' + requiredAttr + '>',
      '</div>'
    ].join("");
  }

  function renderLoginFooter() {
    return [
      '<p class="auth-footer">Don\'t have an account? ',
      '<a class="auth-link" href="' + urlFor("signup") + '" data-mode-link="signup">Sign up</a>',
      '</p>'
    ].join("");
  }

  function renderSignupFooter() {
    return [
      '<p class="auth-footer">Already have an account? ',
      '<a class="auth-link" href="' + urlFor("login") + '" data-mode-link="login">Log in</a>',
      '</p>'
    ].join("");
  }

  function urlFor(nextMode) {
    var next = new URLSearchParams(window.location.search);
    next.set("mode", nextMode);
    next.set("theme", theme);
    var query = next.toString();
    return window.location.pathname + (query ? "?" + query : "");
  }

  function bindCard() {
    cardRoot.querySelectorAll("[data-mode-link]").forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        mode = normalizeMode(link.getAttribute("data-mode-link"));
        window.history.pushState(null, "", urlFor(mode));
        render();
      });
    });

    var google = cardRoot.querySelector("[data-google-auth]");
    if (google) {
      google.addEventListener("click", function () {
        completeAuth({
          email: DEMO_EMAIL,
          givenName: "Demo",
          familyName: "Student",
          provider: "google"
        });
      });
    }

    var form = cardRoot.querySelector("[data-auth-form]");
    if (form) {
      form.addEventListener("submit", handleSubmit);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    var form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (mode === "login") {
      var email = form.elements.email.value.trim();
      var password = form.elements.password.value;
      if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
        form.elements.password.setCustomValidity("Use the demo password: " + DEMO_PASSWORD);
        form.reportValidity();
        window.setTimeout(function () {
          form.elements.password.setCustomValidity("");
        }, 100);
        return;
      }

      completeAuth({
        email: email,
        givenName: "Demo",
        familyName: "Student",
        provider: "password"
      });
      return;
    }

    if (mode === "signup") {
      var firstPassword = form.elements.password.value;
      var secondPassword = form.elements.repeatPassword.value;
      if (firstPassword !== secondPassword) {
        form.elements.repeatPassword.setCustomValidity("Passwords must match.");
        form.reportValidity();
        window.setTimeout(function () {
          form.elements.repeatPassword.setCustomValidity("");
        }, 100);
        return;
      }

      completeAuth({
        email: form.elements.email.value.trim() || DEMO_EMAIL,
        givenName: form.elements.givenName.value.trim() || "Demo",
        familyName: form.elements.familyName.value.trim() || "Student",
        provider: "signup"
      });
      return;
    }

    var button = form.querySelector(".auth-submit");
    if (button) button.textContent = "Reset link sent";
    window.setTimeout(function () {
      mode = "login";
      window.history.pushState(null, "", urlFor("login"));
      render();
    }, 650);
  }

  function completeAuth(profile) {
    writeStorage("bd-authenticated", "demo");
    writeStorage("bd-demo-email", DEMO_EMAIL);
    writeStorage("bd-profile", JSON.stringify({
      email: profile.email || DEMO_EMAIL,
      givenName: profile.givenName || "Demo",
      familyName: profile.familyName || "Student",
      provider: profile.provider || "password"
    }));

    var nextParam = new URLSearchParams(window.location.search).get("next");
    var dest;
    if (mode === "signup") {
      // New accounts complete their profile before entering the app.
      var base = device === "desktop"
        ? "/desktop/auth/complete-profile/"
        : "/mobile/auth/complete-profile/index.html";
      var cp = new URLSearchParams();
      cp.set("theme", theme);
      if (nextParam) cp.set("next", nextParam);
      dest = base + "?" + cp.toString();
    } else {
      dest = nextParam || (device === "desktop" ? "/desktop/onboarding/home/" : "/mobile/onboarding/home/index.html");
    }

    var button = cardRoot.querySelector(".auth-submit") || cardRoot.querySelector(".auth-google");
    if (button) button.textContent = mode === "signup" ? "Creating account" : "Logging in";
    window.setTimeout(function () {
      window.location.href = dest;
    }, 350);
  }

  window.addEventListener("popstate", function () {
    var nextParams = new URLSearchParams(window.location.search);
    mode = normalizeMode(nextParams.get("mode"));
    theme = normalizeTheme(nextParams.get("theme")) || theme;
    render();
  });
})();
