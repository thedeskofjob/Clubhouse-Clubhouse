/**
 * ---------------------------------------------------------------
 * MARQUEE CONFIG — edit this section to change images or speed.
 * ---------------------------------------------------------------
 *
 * speedSeconds:
 *   How many seconds it takes the strip to complete one full loop.
 *   BIGGER number = SLOWER scroll. SMALLER number = FASTER scroll.
 *
 * images:
 *   The photos that float over the background and scroll left to
 *   right. Add, remove, or reorder entries freely — the strip is
 *   duplicated automatically so the loop stays seamless no matter
 *   how many images are listed.
 *
 *   src      — path to the image file (put new files in /assets)
 *   alt      — alt text for accessibility
 *   width    — display width in px at the largest (desktop) size
 *   ratio    — aspect ratio "width / height", used to size the image
 *              proportionally at every screen size
 *   offsetY  — vertical offset in px from the strip's centerline,
 *              negative = up, positive = down (creates the
 *              staggered collage look)
 *   radius   — corner radius in px
 */
const MARQUEE_CONFIG = {
  speedSeconds: 42,

  images: [
    {
      src: "assets/boots.jpg",
      alt: "Hand-quilted patchwork boots standing in tall grass",
      width: 300,
      ratio: "1 / 1",
      offsetY: -24,
      radius: 2,
    },
    {
      src: "assets/venue.jpg",
      alt: "Moody red-lit interior at a live event",
      width: 220,
      ratio: "264 / 295",
      offsetY: 64,
      radius: 2,
    },
    {
      src: "assets/cookies.jpg",
      alt: "Joy Supply salted peanut cookies packaging",
      width: 260,
      ratio: "317 / 471",
      offsetY: -40,
      radius: 2,
    },
    {
      src: "assets/poodle.jpg",
      alt: "White poodle wearing a red outfit",
      width: 250,
      ratio: "300 / 464",
      offsetY: 0,
      radius: 2,
    },
  ],
};

/**
 * ---------------------------------------------------------------
 * Rendering — no need to edit below this line.
 * ---------------------------------------------------------------
 */
(function renderMarquee(config) {
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

  // Render the image list twice back-to-back so the CSS animation
  // (translateX -50% -> 0%) loops without a visible seam.
  const fragment = document.createDocumentFragment();
  for (let copy = 0; copy < 2; copy++) {
    config.images.forEach((item) => fragment.appendChild(buildItem(item)));
  }
  track.appendChild(fragment);
})(MARQUEE_CONFIG);
