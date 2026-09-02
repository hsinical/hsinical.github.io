// tiny theme switcher — no framework needed for two pages
(function () {
    const root = document.documentElement;
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored || (prefersDark ? "dark" : "light");
    root.setAttribute("data-theme", initial);
  
    window.addEventListener("DOMContentLoaded", () => {
      const btn = document.getElementById("theme-toggle");
      const label = btn.querySelector(".toggle-label");
  
      const setLabel = (theme) => {
        label.textContent = theme === "dark" ? "dark" : "light";
      };
      setLabel(initial);
  
      btn.addEventListener("click", () => {
        const current = root.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
        setLabel(next);
      });
    });
  })();