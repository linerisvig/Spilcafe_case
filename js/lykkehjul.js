document.addEventListener("DOMContentLoaded", function () {
  // Find de HTML-elementer, vi skal bruge.
  const hjul = document.getElementById("luck-disc");
  const knap = document.getElementById("luck-spin");
  const titel = document.getElementById("luck-title");
  const info = document.getElementById("luck-info");
  const antal = document.getElementById("luck-count");

  const farver = [
    "#F4EBC0",
    "#80B4BF",
    "#BED4DB",
    "#3A646D"
  ];

  let rotation = 0;
  let drejer = false;

  // Håndter også et tomt spil-array.
  if (spil.length === 0) {
    knap.disabled = true;
    titel.textContent = "Der er ingen spil at vælge imellem.";
    return;
  }

  // En cirkel er 360 grader.
  const feltVinkel = 360 / spil.length;

  antal.textContent =
    "Alle " + spil.length + " spil har samme chance.";

  // Hjælpefunktion: opret en figur eller tekst i SVG-hjulet.
  function lavSvg(type, attributter, foraelder) {
    const element = document.createElementNS(
      "http://www.w3.org/2000/svg",
      type
    );

    Object.entries(attributter).forEach(function ([navn, vaerdi]) {
      element.setAttribute(navn, vaerdi);
    });

    foraelder.appendChild(element);
    return element;
  }

  // Omregn en vinkel til et punkt på cirklen.
  function punkt(vinkel, radius) {
    const radianer = vinkel * Math.PI / 180;

    return [
      300 + Math.cos(radianer) * radius,
      300 + Math.sin(radianer) * radius
    ];
  }

  // 1. TEGN HJULET
  // Vi bruger det samme spil-array som på søgesiden.
  spil.forEach(function (etSpil, indeks) {
    const vinkel = -90 + indeks * feltVinkel;

    const start = punkt(vinkel - feltVinkel / 2, 276);
    const slut = punkt(vinkel + feltVinkel / 2, 276);

    const farve = farver[indeks % farver.length];

    if (spil.length === 1) {
      lavSvg("circle", {
        cx: 300,
        cy: 300,
        r: 276,
        fill: farve
      }, hjul);
    } else {
      lavSvg("path", {
        d: "M300,300 L" + start.join(",") +
           " A276,276 0 0,1 " + slut.join(",") + " Z",
        fill: farve,
        stroke: "#F3F4F7",
        "stroke-width": 2
      }, hjul);
    }

    // Placér spillets navn inde i feltet.
    const position = punkt(vinkel, 180);
    const tekstVinkel = vinkel > 90 ? vinkel + 180 : vinkel;

    const tekst = lavSvg("text", {
      transform:
        "translate(" + position.join(",") + ") " +
        "rotate(" + tekstVinkel + ")",
      "text-anchor": "middle",
      "dominant-baseline": "central",
      "font-size": 20,
      "font-weight": 700,
      fill: farve === "#3A646D" ? "white" : "#294951"
    }, hjul);

    // Lange navne deles over flere linjer.
    const linjer = [""];

    etSpil.navn.split(" ").forEach(function (ord) {
      const sidste = linjer.length - 1;
      const nyLinje = (linjer[sidste] + " " + ord).trim();

      if (nyLinje.length > 12 && linjer[sidste] !== "") {
        linjer.push(ord);
      } else {
        linjer[sidste] = nyLinje;
      }
    });

    linjer.forEach(function (linje, nummer) {
      const span = lavSvg("tspan", {
        x: 0,
        y: (nummer - (linjer.length - 1) / 2) * 22
      }, tekst);

      span.textContent = linje;
    });
  });

  // 2. DREJ HJULET VED KLIK
  knap.addEventListener("click", function () {
    // Stop, hvis hjulet allerede drejer.
    if (drejer) return;

    drejer = true;
    knap.disabled = true;
    knap.textContent = "Hjulet drejer…";

    titel.textContent = "Hvilket spil lander pilen på?";
    info.textContent = "";

    // Vælg et tilfældigt spil fra arrayet.
    const indeks = Math.floor(Math.random() * spil.length);
    const valgtSpil = spil[indeks];

    // Beregn rotationen, så det valgte felt ender under pilen.
    const maalVinkel = (360 - indeks * feltVinkel) % 360;
    const ekstraVinkel = (maalVinkel - rotation + 360) % 360;

    // Fem hele omgange plus vinklen frem til det valgte felt.
    const slutRotation = rotation + 5 * 360 + ekstraVinkel;

    const animation = hjul.animate([
      {
        transform: "rotate(" + rotation + "deg)"
      },
      {
        transform: "rotate(" + slutRotation + "deg)"
      }
    ], {
      duration: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches ? 0 : 4200,
      easing: "cubic-bezier(0.12, 0.8, 0.2, 1)",
      fill: "forwards"
    });

    // 3. VIS RESULTATET, NÅR HJULET ER STOPPET
    animation.finished.then(function () {
      rotation = maalVinkel;

      // Behold hjulet i den position, det landede på.
      hjul.style.transform = "rotate(" + rotation + "deg)";
      animation.cancel();

      titel.textContent = "I skal spille " + valgtSpil.navn + "!";

      const tid = valgtSpil.minTid === valgtSpil.maxTid
        ? valgtSpil.maxTid
        : valgtSpil.minTid + "–" + valgtSpil.maxTid;

      info.textContent =
        valgtSpil.spillerTekst +
        " · Ca. " + tid + " min." +
        " · " + valgtSpil.alder;

      // Nu kan brugeren dreje igen.
      drejer = false;
      knap.disabled = false;
      knap.textContent = "Drej igen";
    });
  });
});