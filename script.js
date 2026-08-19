/**
 * Marquee images and scroll speed live in config.json — edit it by
 * hand, or open edit.html for a visual editor (swap images, drag to
 * reorder, adjust speed with a live preview, saves back to disk).
 */
const CONFIG_URL = "config.json";

// Used only if config.json can't be loaded (e.g. opened as a raw
// file:// page instead of through a server).
const FALLBACK_CONFIG = {
  speedSeconds: 42,
  images: [
    { src: "assets/boots.jpg", alt: "Hand-quilted patchwork boots standing in tall grass", width: 300, ratio: "1 / 1", offsetY: -24, radius: 2 },
    { src: "assets/venue.jpg", alt: "Moody red-lit interior at a live event", width: 220, ratio: "264 / 295", offsetY: 64, radius: 2 },
    { src: "assets/cookies.jpg", alt: "Joy Supply salted peanut cookies packaging", width: 260, ratio: "317 / 471", offsetY: -40, radius: 2 },
    { src: "assets/poodle.jpg", alt: "White poodle wearing a red outfit", width: 250, ratio: "300 / 464", offsetY: 0, radius: 2 },
  ],
};

function renderMarquee(config) {
  const track = document.getElementById("marqueeTrack");
  if (!track) return;

  document.documentElement.style.setProperty(
    "--marquee-duration",
    `${config.speedSeconds}s`
  );

  function buildItem(item) {
    const el = document.createElement("span");
    el.className = "marquee__item";
    el.style.width = `${item.width}px`;
    el.style.aspectRatio = item.ratio;
    el.style.borderRadius = `${item.radius ?? 2}px`;
    el.style.transform = `translateY(${item.offsetY ?? 0}px)`;

    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.alt || "";
    img.loading = "lazy";
    el.appendChild(img);

    return el;
  }

  track.innerHTML = "";
  const fragment = document.createDocumentFragment();
  // Render the image list twice back-to-back so the CSS animation
  // (translateX -50% -> 0%) loops without a visible seam.
  for (let copy = 0; copy < 2; copy++) {
    config.images.forEach((item) => fragment.appendChild(buildItem(item)));
  }
  track.appendChild(fragment);
}

fetch(CONFIG_URL, { cache: "no-store" })
  .then((res) => (res.ok ? res.json() : Promise.reject()))
  .then(renderMarquee)
  .catch(() => renderMarquee(FALLBACK_CONFIG));
