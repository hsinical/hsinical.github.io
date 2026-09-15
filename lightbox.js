document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("lightbox-overlay");
  const overlayImg = document.getElementById("lightbox-overlay-img");
  if (!overlay || !overlayImg) return;

  document.querySelectorAll("img.lightbox-trigger").forEach(function (img) {
    img.addEventListener("click", function () {
      overlayImg.src = img.src;
      overlayImg.alt = img.alt || "";
      overlay.classList.add("is-open");
    });
  });

  function closeOverlay() {
    overlay.classList.remove("is-open");
    overlayImg.src = "";
  }

  overlay.addEventListener("click", closeOverlay);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeOverlay();
  });
});