(function () {
  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    var icon = document.querySelector(".theme-toggle__icon");
    if (icon) {
      icon.textContent = theme === "dark" ? "☀️" : "🌙";
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var toggleBtn = document.getElementById("theme-toggle");
    if (!toggleBtn) return;

    var currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    setTheme(currentTheme);

    toggleBtn.addEventListener("click", function () {
      var activeTheme = document.documentElement.getAttribute("data-theme") || "light";
      setTheme(activeTheme === "dark" ? "light" : "dark");
    });
  });
})();
