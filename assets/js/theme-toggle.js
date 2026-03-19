(function () {
  var storageKey = "theme";
  var root = document.documentElement;
  var themeStylesheets = {
    dark: "/assets/css/main.css",
    light: "/assets/css/light.css"
  };
  var mediaQuery = typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-color-scheme: light)")
    : null;

  function getStoredTheme() {
    try {
      return localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      return;
    }
  }

  function getPreferredTheme() {
    var storedTheme = getStoredTheme();

    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }

    return mediaQuery && mediaQuery.matches ? "light" : "dark";
  }

  function getThemeHref(theme) {
    return (root.getAttribute("data-baseurl") || "") + themeStylesheets[theme];
  }

  function syncToggleButton(theme) {
    var toggleButton = document.getElementById("theme-toggle");
    if (!toggleButton) return;

    var nextTheme = theme === "light" ? "dark" : "light";
    var icon = toggleButton.querySelector(".theme-toggle__icon");
    var label = "Activate " + nextTheme + " mode";

    toggleButton.setAttribute("aria-label", label);
    toggleButton.setAttribute("title", label);
    toggleButton.setAttribute("aria-pressed", String(theme === "light"));

    if (icon) {
      icon.textContent = theme === "light" ? "☀" : "☾";
    }
  }

  function applyTheme(theme, persistTheme) {
    var themeStylesheet = document.getElementById("theme-stylesheet");

    root.setAttribute("data-theme", theme);
    root.style.colorScheme = theme;

    if (themeStylesheet) {
      themeStylesheet.href = getThemeHref(theme);
    }

    if (persistTheme) {
      storeTheme(theme);
    }

    syncToggleButton(theme);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var toggleButton = document.getElementById("theme-toggle");
    var currentTheme = root.getAttribute("data-theme") || getPreferredTheme();

    applyTheme(currentTheme, false);

    if (!toggleButton) return;

    toggleButton.addEventListener("click", function () {
      var activeTheme = root.getAttribute("data-theme") || "light";
      var nextTheme = activeTheme === "light" ? "dark" : "light";
      applyTheme(nextTheme, true);
    });
  });

  if (mediaQuery) {
    mediaQuery.addEventListener("change", function (event) {
      if (getStoredTheme()) return;
      applyTheme(event.matches ? "light" : "dark", false);
    });
  }
})();
