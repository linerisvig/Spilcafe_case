// 1. SØG, FILTRÉR OG SORTÉR
// Funktionen får data og filtervalg ind og returnerer en ny liste.
// Den ændrer ikke det oprindelige spil-array.
function filtrerOgSorter(alleSpil, valg) {
  const soegeord = valg.soegning.toLowerCase().trim();

  const resultater = alleSpil.filter(function (etSpil) {
    const soegeTekst = (
      etSpil.navn + " " + etSpil.forkortelse + " " +
      etSpil.kategorier.join(" ") + " " +
      etSpil.spilform + " " + etSpil.stemning.join(" ")
    ).toLowerCase();

    const matcherSoegning = soegeTekst.includes(soegeord);

    // includes tjekker, om gruppens størrelse findes i spillets mængde
    // af tilladte spillerantal. Partners kan derfor ikke matche 3.
    const matcherSpillere = valg.spillere === 0 ||
      etSpil.antalSpillere.includes(valg.spillere);

    // Vi bruger intervallets højeste tid: 15–30 matcher højst 30,
    // mens 30–60 ikke matcher højst 30.
    const matcherTid = etSpil.maxTid <= valg.maxTid;

    // FORENING: Ved flere kategorier er det nok at matche én.
    // some spørger, om mindst én kategori opfylder betingelsen.
    const matcherKategori = valg.kategorier.length === 0 ||
      etSpil.kategorier.some(function (kategori) {
        return valg.kategorier.includes(kategori);
      });

    const matcherNiveau = valg.niveau === "" ||
      etSpil.regelniveauer.includes(valg.niveau);
    const matcherPlads = valg.plads === "" || etSpil.pladsbehov === valg.plads;
    const matcherHumoer = valg.humoer === "" || etSpil.humoer.includes(valg.humoer);

    // FÆLLESMÆNGDE: Spillet skal passe til ALLE aktive filtre.
    return matcherSoegning && matcherSpillere && matcherTid &&
      matcherKategori && matcherNiveau && matcherPlads && matcherHumoer;
  });

  // filter lavede en ny liste, så sort ændrer kun resultatlisten.
  resultater.sort(function (a, b) {
    if (valg.sortering === "titel-za") {
      return b.navn.localeCompare(a.navn, "da");
    }
    if (valg.sortering === "tid-kort") {
      return a.maxTid - b.maxTid || a.navn.localeCompare(b.navn, "da");
    }
    if (valg.sortering === "tid-lang") {
      return b.maxTid - a.maxTid || a.navn.localeCompare(b.navn, "da");
    }
    return a.navn.localeCompare(b.navn, "da");
  });

  return resultater;
}

// 2. FORBIND DATA MED HTML
// Vi venter, indtil hele HTML-dokumentet er indlæst.
document.addEventListener("DOMContentLoaded", function () {
  const liste = document.getElementById("game-list");
  const soegefelt = document.getElementById("game-search-field");
  const forsideSoegning = document.getElementById("search-field");
  const spillerFilter = document.getElementById("player-filter");
  const tidsFilter = document.getElementById("time-filter");
  const tidsOutput = document.getElementById("time-output");
  const kategoriValg = document.getElementById("category-options");
  const kategoriMenu = document.getElementById("category-picker");
  const niveauFilter = document.getElementById("level-filter");
  const pladsFilter = document.getElementById("space-filter");
  const sortering = document.getElementById("sort-order");
  const hurtigTid = document.getElementById("quick-time");
  const hurtigLet = document.getElementById("quick-easy");
  const aktiveFiltre = document.getElementById("active-filters");

  // Søgeordet ændres først, når brugeren trykker Søg eller Enter.
  let aktivSoegning = "";
  let aktivtHumoer = "";

  document.getElementById("collection-info").textContent =
    spil.length + " spil. Hvad har I lyst til at spille?";

  // Opret spillerantal ud fra det højeste tal i vores spildata.
  let hoejesteAntal = 0;
  spil.forEach(function (etSpil) {
    etSpil.antalSpillere.forEach(function (antal) {
      if (antal > hoejesteAntal) hoejesteAntal = antal;
    });
  });
  for (let antal = 1; antal <= hoejesteAntal; antal++) {
    const option = document.createElement("option");
    option.value = antal;
    option.textContent = antal + (antal === 1 ? " spiller" : " spillere");
    spillerFilter.appendChild(option);
  }

  // Opret én checkbox pr. kategori. includes undgår dubletter.
  const kategorier = [];
  spil.forEach(function (etSpil) {
    etSpil.kategorier.forEach(function (kategori) {
      if (!kategorier.includes(kategori)) kategorier.push(kategori);
    });
  });
  kategorier.sort(function (a, b) { return a.localeCompare(b, "da"); });
  kategorier.forEach(function (kategori) {
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "kategori";
    checkbox.value = kategori;
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(kategori));
    kategoriValg.appendChild(label);
  });

  function hentFiltervalg() {
    const valgteKategorier = [];
    kategoriValg.querySelectorAll("input:checked").forEach(function (checkbox) {
      valgteKategorier.push(checkbox.value);
    });
    return {
      soegning: aktivSoegning,
      spillere: Number(spillerFilter.value),
      maxTid: Number(tidsFilter.value),
      kategorier: valgteKategorier,
      niveau: niveauFilter.value,
      plads: pladsFilter.value,
      humoer: aktivtHumoer,
      sortering: sortering.value
    };
  }

  // Lille hjælpefunktion til tekst. textContent behandler input som tekst,
  // så et søgeord aldrig bliver fortolket som HTML eller JavaScript.
  function tekstElement(tag, klasse, tekst) {
    const element = document.createElement(tag);
    element.className = klasse;
    element.textContent = tekst;
    return element;
  }

  // 3. VIS SPIL MED forEach
  function visSpil(resultater) {
    liste.replaceChildren();

    resultater.forEach(function (etSpil) {
      const li = document.createElement("li");
      li.className = "game-card";
      const detaljer = document.createElement("details");
      const oversigt = document.createElement("summary");
      oversigt.className = "game-summary";

      const monogram = tekstElement("span", "game-monogram", etSpil.forkortelse);
      monogram.setAttribute("aria-hidden", "true");
      // Har I et produktbillede, vises det oven på monogrammet.
      if (etSpil.billede) {
        const img = document.createElement("img");
        img.alt = "";
        img.addEventListener("error", function () { img.remove(); });
        img.src = etSpil.billede;
        monogram.appendChild(img);
      }

      const tekst = document.createElement("div");
      tekst.className = "game-overview";
      tekst.appendChild(tekstElement("h3", "game-name", etSpil.navn));
      const tid = etSpil.minTid === etSpil.maxTid
        ? etSpil.maxTid : etSpil.minTid + "–" + etSpil.maxTid;
      tekst.appendChild(tekstElement("p", "game-meta", etSpil.spillerTekst + " · ca. " + tid + " min."));
      tekst.appendChild(tekstElement("p", "game-category", etSpil.kategorier.join(" · ")));

      const plus = tekstElement("span", "game-expand", "+");
      plus.setAttribute("aria-hidden", "true");
      oversigt.append(monogram, tekst, plus);
      detaljer.appendChild(oversigt);

      const indhold = document.createElement("div");
      indhold.className = "game-details";
      indhold.appendChild(tekstElement("p", "game-description", etSpil.spilform));
      const fakta = document.createElement("dl");
      const felter = [
        ["Regelniveau", etSpil.regelniveauer.join("–")],
        ["Stemning", etSpil.stemning.join(", ") || "Ikke angivet"],
        ["Udstyr", etSpil.udstyr.join(", ") || "Ikke angivet"],
        ["Pladsbehov", etSpil.pladsbehov],
        ["Anbefalet alder", etSpil.alder]
      ];
      felter.forEach(function (felt) {
        fakta.appendChild(tekstElement("dt", "", felt[0]));
        fakta.appendChild(tekstElement("dd", "", felt[1]));
      });
      indhold.appendChild(fakta);
      if (etSpil.note) indhold.appendChild(tekstElement("p", "game-note", etSpil.note));
      detaljer.appendChild(indhold);
      li.appendChild(detaljer);
      liste.appendChild(li);
    });
  }

  // En aktiv filterknap kan fjernes enkeltvis.
  function tilfoejFilterknap(tekst, fjernFilter) {
    const knap = tekstElement("button", "active-chip", tekst + " ×");
    knap.type = "button";
    knap.setAttribute("aria-label", "Fjern filter: " + tekst);
    knap.addEventListener("click", function () {
      fjernFilter();
      opdaterSpil();
      document.getElementById("results-count").setAttribute("tabindex", "-1");
      document.getElementById("results-count").focus({ preventScroll: true });
    });
    aktiveFiltre.appendChild(knap);
  }

  function visAktiveFiltre(valg) {
    aktiveFiltre.replaceChildren();
    if (valg.soegning) tilfoejFilterknap("Søgning: " + valg.soegning, function () {
      aktivSoegning = "";
      soegefelt.value = "";
      forsideSoegning.value = "";
    });
    if (valg.spillere) tilfoejFilterknap(valg.spillere + " spillere", function () { spillerFilter.value = "0"; });
    if (valg.maxTid < 180) tilfoejFilterknap("Højst " + valg.maxTid + " min.", function () { tidsFilter.value = "180"; });
    if (valg.niveau) tilfoejFilterknap("Niveau: " + valg.niveau, function () { niveauFilter.value = ""; });
    if (valg.plads) tilfoejFilterknap("Plads: " + valg.plads, function () { pladsFilter.value = ""; });
    if (valg.humoer) tilfoejFilterknap("Humør: " + valg.humoer, function () { aktivtHumoer = ""; });
    valg.kategorier.forEach(function (kategori) {
      tilfoejFilterknap(kategori, function () {
        kategoriValg.querySelectorAll("input").forEach(function (checkbox) {
          if (checkbox.value === kategori) checkbox.checked = false;
        });
      });
    });
  }

  // 4. DEN FÆLLES OPDATERING – alle søgninger og filtre bruger denne.
  function opdaterSpil() {
    const valg = hentFiltervalg();
    const resultater = filtrerOgSorter(spil, valg);
    visSpil(resultater);
    visAktiveFiltre(valg);

    tidsOutput.textContent = valg.maxTid === 180 ? "Alle spilletider" : "Højst " + valg.maxTid + " min.";
    tidsFilter.setAttribute("aria-valuetext", tidsOutput.textContent);
    document.getElementById("category-summary").textContent = valg.kategorier.length === 0
      ? "Alle spiltyper" : valg.kategorier.length + " valgt";
    hurtigTid.setAttribute("aria-pressed", String(valg.maxTid === 30));
    hurtigLet.setAttribute("aria-pressed", String(valg.niveau === "Let"));

    const harFiltre = aktiveFiltre.childElementCount > 0;
    document.getElementById("reset-all").setAttribute("aria-pressed", String(!harFiltre));
    document.getElementById("results-count").textContent = harFiltre
      ? resultater.length + " af " + spil.length + " spil"
      : "Alle " + spil.length + " spil";
    document.getElementById("empty-state").hidden = resultater.length !== 0;
  }

  function nulstil() {
    aktivSoegning = "";
    aktivtHumoer = "";
    soegefelt.value = "";
    forsideSoegning.value = "";
    spillerFilter.value = "0";
    tidsFilter.value = "180";
    niveauFilter.value = "";
    pladsFilter.value = "";
    sortering.value = "titel-az";
    kategoriValg.querySelectorAll("input").forEach(function (checkbox) { checkbox.checked = false; });
    kategoriMenu.open = false;
    opdaterSpil();
  }

  // 5. BRUGERENS HANDLINGER
  document.getElementById("game-search").addEventListener("submit", function (event) {
    event.preventDefault();
    aktivSoegning = soegefelt.value.trim();
    opdaterSpil();
  });
  document.getElementById("home-search").addEventListener("submit", function (event) {
    event.preventDefault();
    const tekst = forsideSoegning.value.trim();
    nulstil();
    aktivSoegning = tekst;
    soegefelt.value = tekst;
    forsideSoegning.value = tekst;
    opdaterSpil();
    window.location.hash = "alle-spil";
  });

  [spillerFilter, niveauFilter, pladsFilter, sortering].forEach(function (felt) {
    felt.addEventListener("change", opdaterSpil);
  });
  tidsFilter.addEventListener("input", opdaterSpil);
  kategoriValg.addEventListener("change", opdaterSpil);
  hurtigTid.addEventListener("click", function () {
    tidsFilter.value = tidsFilter.value === "30" ? "180" : "30";
    opdaterSpil();
  });
  hurtigLet.addEventListener("click", function () {
    niveauFilter.value = niveauFilter.value === "Let" ? "" : "Let";
    opdaterSpil();
  });
  ["reset-all", "clear-filters", "empty-reset"].forEach(function (id) {
    document.getElementById(id).addEventListener("click", nulstil);
  });

  document.querySelectorAll(".mood").forEach(function (knap) {
    knap.addEventListener("click", function () {
      nulstil();
      if (knap.dataset.mood === "Svær") {
        niveauFilter.value = "Svær";
      } else {
        aktivtHumoer = knap.dataset.mood;
      }
      opdaterSpil();
      window.location.hash = "alle-spil";
    });
  });

  // Luk kategori-menuen ved klik udenfor eller Escape.
  document.addEventListener("click", function (event) {
    if (!kategoriMenu.contains(event.target)) kategoriMenu.open = false;
  });
  kategoriMenu.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      kategoriMenu.open = false;
      kategoriMenu.querySelector("summary").focus();
    }
  });

  // 6. SKIFT MELLEM FORSIDEN OG ALLE SPIL
  // Hash-links gør også browserens Tilbage/Frem-knapper brugbare.
  function visSide(flytFokus) {
    const side = window.location.hash === "#alle-spil" ? "alle-spil" : "opdag";
    document.getElementById("opdag").hidden = side !== "opdag";
    document.getElementById("alle-spil").hidden = side !== "alle-spil";
    document.querySelectorAll(".bottom-nav a").forEach(function (link) {
      if (link.dataset.page === side) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    if (flytFokus) {
      window.scrollTo({ top: 0, behavior: "instant" });
      const overskrift = document.querySelector("#" + side + " h1");
      overskrift.setAttribute("tabindex", "-1");
      overskrift.focus({ preventScroll: true });
    }
  }
  window.addEventListener("hashchange", function () { visSide(true); });

  // De originale billeder følger ikke med kodeeksemplet.
  // Fallback vises kun, hvis jeres eksisterende billeder ikke findes.
  document.querySelectorAll("img[data-fallback]").forEach(function (img) {
    function visFallback() {
      img.hidden = true;
      img.nextElementSibling.hidden = false;
    }
    img.addEventListener("error", visFallback);
    if (img.complete && img.naturalWidth === 0) visFallback();
  });

  opdaterSpil();
  visSide(false);
});
