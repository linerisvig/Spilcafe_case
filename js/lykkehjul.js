// Figma-hjulets felter følger rækkefølgen i spil.js: UNO først, derefter Skak osv.
// Kun fladen drejer. Kanten, midten og pilen er de originale, faste Figma-billeder.
const hjul = document.getElementById("luck-disc");
const drejKnap = document.getElementById("luck-spin");
let rotation = 0;
let lykkeSpil = null;
let drejer = false;

function visLykkeResultat() {
  if (!lykkeSpil) return;
  document.getElementById("luck-title").textContent =
    t("skalSpille") + spilNavn(lykkeSpil) + "!";
  document.getElementById("luck-info").textContent =
    spillerTekst(lykkeSpil) +
    " · " +
    spilleTid(lykkeSpil) +
    " min. · " +
    oversaetVaerdi(lykkeSpil.alder);
  document.getElementById("luck-info").hidden = false;
  document.getElementById("luck-actions").hidden = false;
  document.getElementById("luck-book").dataset.book = lykkeSpil.id;
  document.getElementById("luck-detail").href = "#spil/" + lykkeSpil.id;
  drejKnap.textContent = t("drejIgen");
}

drejKnap.addEventListener("click", function () {
  if (drejer) return;
  drejer = true;
  drejKnap.disabled = true;
  drejKnap.textContent = t("drejer");
  document.getElementById("luck-actions").hidden = true;
  document.getElementById("luck-info").hidden = true;
  document.getElementById("luck-title").textContent = t("monSpil");

  // Math.random giver et tilfældigt tal fra 0 til lige under 1. Gange 12 og
  // Math.floor giver et helt indeks fra 0 til 11. Hvert spil har samme chance.
  const indeks = Math.floor(Math.random() * products.length);
  lykkeSpil = products[indeks];
  const feltVinkel = 360 / products.length;
  const slutVinkel = (360 - indeks * feltVinkel) % 360;
  rotation += 5 * 360 + ((slutVinkel - (rotation % 360) + 360) % 360);

  // rotate drejer billedet. Beregningen stopper det valgte felts midte under pilen.
  const varighed = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? 0
    : 3200;
  hjul.style.transition =
    "transform " + varighed + "ms cubic-bezier(.12,.8,.2,1)";
  hjul.style.transform = "rotate(" + rotation + "deg)";
  setTimeout(function () {
    drejer = false;
    drejKnap.disabled = false;
    visLykkeResultat();
  }, varighed);
});
document.addEventListener("sprogskift", function () {
  if (!drejer) visLykkeResultat();
});
