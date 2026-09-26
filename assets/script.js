/* Product Portfolio — tiny bit of behavior. No dependencies. */
(function () {
  "use strict";

  var KEY = "portfolio-after-hours";
  var body = document.body;

  function store(value) {
    try { localStorage.setItem(KEY, value ? "1" : "0"); } catch (e) { /* private mode, etc. */ }
  }
  function stored() {
    try { return localStorage.getItem(KEY) === "1"; } catch (e) { return false; }
  }

  // ---------- Light / dark mode ----------
  var root = document.documentElement;
  var darkQuery = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  function currentTheme() {
    return root.getAttribute("data-theme") || (darkQuery && darkQuery.matches ? "dark" : "light");
  }
  function labelThemeToggle() {
    var next = currentTheme() === "dark" ? "light" : "dark";
    document.querySelectorAll(".theme-toggle").forEach(function (b) {
      b.setAttribute("aria-label", "Switch to " + next + " mode");
    });
  }
  document.querySelectorAll(".theme-toggle").forEach(function (b) {
    b.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) { /* private mode, etc. */ }
      labelThemeToggle();
    });
  });
  labelThemeToggle();

  // ---------- Toast ----------
  var toastEl;
  var toastTimer;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast";
      toastEl.setAttribute("role", "status");
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 3200);
  }

  // ---------- Confetti ----------
  function confetti() {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var colors = ["#ff3d8b", "#c6f432", "#7c3aed", "#cbb8f2", "#3b5bdb", "#6e50bd"];
    for (var i = 0; i < 80; i++) {
      var c = document.createElement("div");
      c.className = "confetti";
      c.style.left = Math.random() * 100 + "vw";
      c.style.background = colors[i % colors.length];
      c.style.animationDuration = 1.8 + Math.random() * 2 + "s";
      c.style.animationDelay = Math.random() * 0.4 + "s";
      if (i % 3 === 0) c.style.borderRadius = "50%";
      document.body.appendChild(c);
      setTimeout(c.remove.bind(c), 4500);
    }
  }

  // ---------- After-hours mode ----------
  var lines = [
    "Okay, you get to see the real me now.",
    "Welcome to after hours. Controllers are in the back.",
    "You found the fun part. Tell no one (tell everyone)."
  ];
  function setWeird(on, announce) {
    body.classList.toggle("weird", on);
    store(on);
    if (announce) {
      if (on) { toast(lines[Math.floor(Math.random() * lines.length)]); confetti(); }
      else { toast("Back to business. Blazer: on."); }
    }
  }
  if (stored()) setWeird(true, false);

  // Konami code also unlocks it: ↑ ↑ ↓ ↓ ← → ← → b a
  var code = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  var pos = 0;
  document.addEventListener("keydown", function (e) {
    pos = e.key === code[pos] ? pos + 1 : (e.key === code[0] ? 1 : 0);
    if (pos === code.length) {
      pos = 0;
      setWeird(true, false);
      confetti();
      toast("Cheat code accepted. +30 lives, +1 new favorite PM.");
    }
  });

  // Clicking the logo dot five times in a row does the same thing.
  // Clean addresses: /index.html -> /, /resume.html -> /resume
  function cleanPath() {
    if (!history.replaceState || location.protocol === "file:") return;
    var clean = location.pathname.replace(/index\.html$/, "").replace(/\.html$/, "");
    if (clean !== location.pathname) history.replaceState(null, "", clean + location.search + location.hash);
  }
  cleanPath();

  var logo = document.querySelector(".logo");
  var onHome = !!document.getElementById("about");
  var clicks = 0;
  var clickTimer;
  if (logo) {
    logo.addEventListener("click", function (e) {
      // Already home: scroll to the top instead of reloading
      if (onHome) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (location.hash && history.replaceState) history.replaceState(null, "", location.pathname + location.search);
      }
      clicks++;
      clearTimeout(clickTimer);
      clickTimer = setTimeout(function () { clicks = 0; }, 1200);
      if (clicks >= 5) {
        e.preventDefault();
        clicks = 0;
        setWeird(!body.classList.contains("weird"), true);
      }
    });
  }

  // ---------- Artifact filters ----------
  var filters = document.querySelectorAll(".filter");
  var artifacts = document.querySelectorAll(".artifact");
  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var type = btn.getAttribute("data-filter");
      filters.forEach(function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
      artifacts.forEach(function (a) {
        a.hidden = !(type === "all" || a.getAttribute("data-type") === type);
      });
    });
  });

  // Tags on each card filter the library too
  document.querySelectorAll(".type-tag").forEach(function (tag) {
    tag.addEventListener("click", function () {
      var btn = document.querySelector('.filter[data-filter="' + tag.getAttribute("data-filter") + '"]');
      if (!btn) return;
      btn.click();
      btn.parentNode.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

  // Artifacts that don't have a real file yet
  document.querySelectorAll('.artifact a[href="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      toast("This one's available on request — just ask!");
    });
  });

  // ---------- Resume PDF ----------
  // Browsers that can't show PDFs inline get the full-length page images instead
  if (document.querySelector(".resume-embed") && navigator.pdfViewerEnabled === false) {
    document.body.classList.add("no-pdf-viewer");
  }

  // ---------- Print resume ----------
  var printBtn = document.querySelector("[data-print]");
  if (printBtn) printBtn.addEventListener("click", function () { window.print(); });

  // ---------- Footer year ----------
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // ---------- Hello, fellow view-sourcer ----------
  try {
    console.log(
      "%cHi, you opened the console. We'd get along.%c\nTry the Konami code.",
      "font: 600 16px Georgia, serif; color: #6e50bd;",
      "font: 12px monospace; color: #7a7368;"
    );
  } catch (e) { /* noop */ }
})();
