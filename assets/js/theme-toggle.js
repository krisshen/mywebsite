(function () {
  var themeStorageKey = "theme";
  var alternateThemeStorageKey = "theme-alternate";
  var root = document.documentElement;
  var config = window.themeToggleConfig || {};
  var themeHrefTemplate = config.themeHrefTemplate || "";
  var defaultTheme = config.defaultTheme || "default";
  var lightTheme = config.lightTheme || "air";
  var themes = config.themes || [];
  var validThemes = {};
  var themeMeta = {};
  var mediaQuery = typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-color-scheme: light)")
    : null;
  var longPressDelay = 420;
  var longPressTimer = null;
  var longPressTriggered = false;
  var alternateTheme = null;

  themes.forEach(function (theme) {
    validThemes[theme.id] = true;
    themeMeta[theme.id] = theme;
  });

  function normalizeTheme(theme) {
    if (theme === "light") return lightTheme;
    return validThemes[theme] ? theme : null;
  }

  function getThemeLabel(theme) {
    return themeMeta[theme] ? themeMeta[theme].label : theme;
  }

  function getThemeTone(theme) {
    return themeMeta[theme] ? themeMeta[theme].tone || "light" : "light";
  }

  function getStoredValue(key) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function storeValue(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      return;
    }
  }

  function getStoredTheme() {
    return normalizeTheme(getStoredValue(themeStorageKey));
  }

  function getStoredAlternateTheme() {
    return normalizeTheme(getStoredValue(alternateThemeStorageKey));
  }

  function getSystemTheme() {
    return mediaQuery && mediaQuery.matches ? lightTheme : defaultTheme;
  }

  function inferAlternateTheme(theme) {
    if (theme === lightTheme) {
      return defaultTheme !== lightTheme ? defaultTheme : "dark";
    }

    return lightTheme;
  }

  function getPreferredTheme() {
    return getStoredTheme() || getSystemTheme();
  }

  function getThemeHref(theme) {
    return themeHrefTemplate.replace("THEME", theme);
  }

  function getActiveTheme() {
    return normalizeTheme(root.getAttribute("data-theme")) || getPreferredTheme();
  }

  function syncThemeMenu(theme) {
    var themeOptions = document.querySelectorAll(".theme-menu__option");

    Array.prototype.forEach.call(themeOptions, function (themeOption) {
      var isActive = themeOption.getAttribute("data-theme") === theme;

      themeOption.classList.toggle("is-active", isActive);
      themeOption.setAttribute("aria-pressed", String(isActive));
    });
  }

  function syncToggleButton(theme, menuOpen) {
    var toggleButton = document.getElementById("theme-toggle");
    if (!toggleButton) return;

    var nextTheme = normalizeTheme(alternateTheme) || inferAlternateTheme(theme);
    var icon = toggleButton.querySelector(".theme-toggle__icon");
    var label = "Click to switch to " + getThemeLabel(nextTheme) + ". Hold or press down arrow to pick a theme.";

    toggleButton.setAttribute("aria-label", label);
    toggleButton.setAttribute("title", label);
    toggleButton.setAttribute("aria-expanded", String(Boolean(menuOpen)));

    if (icon) {
      icon.textContent = getThemeTone(theme) === "dark" ? "☾" : "☀";
    }
  }

  function persistThemeSelection(theme) {
    storeValue(themeStorageKey, theme);
    storeValue(alternateThemeStorageKey, alternateTheme);
  }

  function applyTheme(theme, options) {
    var settings = options || {};
    var themeStylesheet = document.getElementById("theme-stylesheet");
    var nextTheme = normalizeTheme(theme) || getPreferredTheme();

    root.setAttribute("data-theme", nextTheme);
    root.style.colorScheme = getThemeTone(nextTheme);

    if (themeStylesheet) {
      themeStylesheet.href = getThemeHref(nextTheme);
    }

    if (settings.persistTheme) {
      persistThemeSelection(nextTheme);
    }

    syncThemeMenu(nextTheme);
    syncToggleButton(nextTheme, settings.menuOpen);
  }

  function openThemeMenu(shouldFocusActiveTheme) {
    var themeMenu = document.getElementById("theme-menu");
    var activeThemeButton;

    if (!themeMenu || !themeMenu.hidden) return;

    themeMenu.hidden = false;
    syncToggleButton(getActiveTheme(), true);

    if (shouldFocusActiveTheme !== false) {
      activeThemeButton = themeMenu.querySelector(".theme-menu__option.is-active") || themeMenu.querySelector(".theme-menu__option");
      if (activeThemeButton) activeThemeButton.focus();
    }
  }

  function closeThemeMenu(shouldFocusToggle) {
    var themeMenu = document.getElementById("theme-menu");
    var toggleButton = document.getElementById("theme-toggle");

    if (!themeMenu || themeMenu.hidden) return;

    themeMenu.hidden = true;
    syncToggleButton(getActiveTheme(), false);

    if (shouldFocusToggle && toggleButton) {
      toggleButton.focus();
    }
  }

  function toggleQuickTheme() {
    var currentTheme = getActiveTheme();
    var nextTheme = normalizeTheme(alternateTheme) || inferAlternateTheme(currentTheme);

    alternateTheme = currentTheme;
    applyTheme(nextTheme, { persistTheme: true, menuOpen: false });
  }

  function selectTheme(theme) {
    var currentTheme = getActiveTheme();
    var nextTheme = normalizeTheme(theme);

    if (!nextTheme) return;

    if (nextTheme !== currentTheme) {
      alternateTheme = currentTheme;
    } else if (!alternateTheme) {
      alternateTheme = inferAlternateTheme(nextTheme);
    }

    applyTheme(nextTheme, { persistTheme: true, menuOpen: true });
    closeThemeMenu(true);
  }

  function clearLongPressTimer() {
    if (!longPressTimer) return;
    window.clearTimeout(longPressTimer);
    longPressTimer = null;
  }

  function startLongPress(event) {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    clearLongPressTimer();
    longPressTriggered = false;
    longPressTimer = window.setTimeout(function () {
      longPressTriggered = true;
      openThemeMenu(false);
    }, longPressDelay);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var toggleButton = document.getElementById("theme-toggle");
    var themeMenu = document.getElementById("theme-menu");
    var currentTheme = normalizeTheme(root.getAttribute("data-theme")) || getPreferredTheme();

    alternateTheme = getStoredAlternateTheme() || inferAlternateTheme(currentTheme);
    applyTheme(currentTheme, { persistTheme: false, menuOpen: false });

    if (!toggleButton) return;

    toggleButton.addEventListener("pointerdown", startLongPress);

    ["pointerup", "pointerleave", "pointercancel"].forEach(function (eventName) {
      toggleButton.addEventListener(eventName, clearLongPressTimer);
    });

    toggleButton.addEventListener("contextmenu", function (event) {
      event.preventDefault();
      clearLongPressTimer();
      openThemeMenu();
    });

    toggleButton.addEventListener("keydown", function (event) {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        openThemeMenu();
      }

      if (event.key === "Escape") {
        closeThemeMenu(false);
      }
    });

    toggleButton.addEventListener("click", function (event) {
      if (longPressTriggered) {
        longPressTriggered = false;
        event.preventDefault();
        return;
      }

      toggleQuickTheme();
    });

    if (themeMenu) {
      themeMenu.addEventListener("click", function (event) {
        var themeOption = event.target.closest(".theme-menu__option");
        if (!themeOption) return;
        selectTheme(themeOption.getAttribute("data-theme"));
      });

      themeMenu.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
          event.preventDefault();
          closeThemeMenu(true);
        }
      });
    }

    document.addEventListener("click", function (event) {
      var insideMenu = themeMenu && themeMenu.contains(event.target);
      var onToggle = toggleButton.contains(event.target);

      if (!insideMenu && !onToggle) {
        closeThemeMenu(false);
      }
    });
  });

  if (mediaQuery) {
    mediaQuery.addEventListener("change", function (event) {
      if (getStoredTheme()) return;

      alternateTheme = inferAlternateTheme(event.matches ? lightTheme : defaultTheme);
      applyTheme(event.matches ? lightTheme : defaultTheme, { persistTheme: false, menuOpen: false });
    });
  }
})();
