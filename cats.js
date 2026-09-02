// scatters the cat cutouts in the left/right margins whenever the
// viewport is wide enough to actually have margins to put them in.
// re-rolls the layout on every page load and on resize.
(function () {
    // Subject.png, "Subject 1.png" ... "Subject 16.png" — 17 images total,
    // space before the number, no underscore
    const CAT_FILES = ["Subject.png"].concat(
      Array.from({ length: 16 }, (_, i) => `Subject ${i + 1}.png`)
    );
  
    const CONTENT_WIDTH = 944; // matches .container/.portfolio-container max-width + its padding
    const MIN_GUTTER = 190;    // don't bother placing cats in a margin this narrow
    const IMG_MIN = 100;
    const IMG_MAX = 200;
    const BAND_HEIGHT = 340;   // more room between bands = cats spaced further apart
    const MAX_PER_SIDE = 10;
    const SKIP_CHANCE = 0.12;  // low skip rate so the margins don't read as half-empty
  
    const base = window.CAT_BASE || "./catssets/";
    let resizeTimer = null;
  
    function shuffledFiles() {
      const arr = CAT_FILES.slice();
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }
  
    function clearCats() {
      const old = document.querySelector(".cat-decor-layer");
      if (old) old.remove();
    }
  
    function scatterCats() {
      clearCats();
  
      const gutter = (window.innerWidth - CONTENT_WIDTH) / 2;
      if (gutter < MIN_GUTTER) return;
  
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
      const bandsPerSide = Math.min(
        MAX_PER_SIDE,
        Math.max(1, Math.floor(docHeight / BAND_HEIGHT))
      );
  
      const files = shuffledFiles();
      let fileIndex = 0;
  
      const layer = document.createElement("div");
      layer.className = "cat-decor-layer";
      layer.setAttribute("aria-hidden", "true");
  
      ["left", "right"].forEach((side) => {
        for (let b = 0; b < bandsPerSide; b++) {
          if (Math.random() < SKIP_CHANCE) continue;
  
          const file = files[fileIndex % files.length];
          fileIndex++;
  
          const img = document.createElement("img");
          img.src = base + file;
          img.alt = "";
          img.className = "cat-decor";
  
          const size = IMG_MIN + Math.random() * (IMG_MAX - IMG_MIN);
          img.style.width = size + "px";
  
          const rot = (Math.random() * 50 - 25).toFixed(1);
          const flip = Math.random() < 0.5 ? -1 : 1;
          img.style.transform = `rotate(${rot}deg) scaleX(${flip})`;
  
          const bandTop = b * BAND_HEIGHT;
          const jitter = Math.random() * Math.max(0, BAND_HEIGHT - size);
          img.style.top = bandTop + jitter + "px";
  
          const maxInset = Math.max(0, gutter - size - 16);
          const inset = 12 + Math.random() * maxInset;
          if (side === "left") {
            img.style.left = inset + "px";
          } else {
            img.style.right = inset + "px";
          }
  
          layer.appendChild(img);
        }
      });
  
      document.body.appendChild(layer);
    }
  
    window.addEventListener("load", scatterCats);
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(scatterCats, 200);
    });
  })();