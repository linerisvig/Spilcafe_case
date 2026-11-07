document.addEventListener("DOMContentLoaded", function () {
  const dialog = document.getElementById("booking-dialog");
  const form = document.getElementById("booking-form");
  const dato = document.getElementById("booking-date");
  const tid = document.getElementById("booking-time");
  const gemKnap = document.getElementById("booking-save");
  const fejl = document.getElementById("booking-error");
  const succes = document.getElementById("booking-success");

  // Eksempeltider. Tallene er minutter siden midnat.
  const AABNER = 9 * 60;
  const LUKKER = 17 * 60;
  const INTERVAL = 30;

  // Navnet på vores gemte data i browseren.
  const LAGER = "spilcafe-bookinger-v1";

  let valgtSpil = null;

  // Lav en lokal dato i formatet YYYY-MM-DD.
  function datoTekst(dag) {
    return dag.getFullYear() + "-" +
      String(dag.getMonth() + 1).padStart(2, "0") + "-" +
      String(dag.getDate()).padStart(2, "0");
  }

  // Omregn fx 570 minutter til 09:30.
  function klokkeslaet(minutter) {
    return String(Math.floor(minutter / 60)).padStart(2, "0") +
      ":" +
      String(minutter % 60).padStart(2, "0");
  }

  // Brug spillets længste spilletid.
  // Rund op til nærmeste halve time.
  function varighed() {
    return Math.ceil(valgtSpil.maxTid / INTERVAL) * INTERVAL;
  }

  // Hent tidligere demobookinger fra browseren.
  function hentBookinger() {
    const bookinger = JSON.parse(
      localStorage.getItem(LAGER) || "[]"
    );

    // Kontrollér data, så ødelagte data ikke overskrives.
    if (
      !Array.isArray(bookinger) ||
      !bookinger.every(function (b) {
        return b &&
          typeof b.spilId === "string" &&
          /^\d{4}-\d{2}-\d{2}$/.test(b.dato) &&
          Number.isInteger(b.start) &&
          Number.isInteger(b.slut) &&
          b.start >= 0 &&
          b.slut > b.start &&
          b.slut <= 1440;
      })
    ) {
      throw new Error("Ugyldige bookingdata");
    }

    return bookinger;
  }

  // Tjek, om samme spil allerede er booket i tidsrummet.
  function erOptaget(bookinger, start, slut) {
    return bookinger.some(function (b) {
      return b.spilId === valgtSpil.id &&
        b.dato === dato.value &&
        start < b.slut &&
        slut > b.start;
    });
  }

  // Tjek, at tidspunktet endnu ikke er passeret.
  function erFremtidig(start) {
    const tidspunkt = new Date(
      dato.value + "T" + klokkeslaet(start)
    );

    return dato.value >= datoTekst(new Date()) &&
      tidspunkt.getTime() > Date.now();
  }

  // VIS TIDSPUNKTER, DER KAN VÆLGES
  function visTider() {
    const tidligereValg = tid.value;

    tid.replaceChildren(new Option("Vælg tidspunkt", ""));
    gemKnap.disabled = true;
    fejl.textContent = "";
    dato.min = datoTekst(new Date());

    try {
      const bookinger = hentBookinger();

      for (
        let start = AABNER;
        start + varighed() <= LUKKER;
        start += INTERVAL
      ) {
        const slut = start + varighed();

        if (
          erFremtidig(start) &&
          !erOptaget(bookinger, start, slut)
        ) {
          tid.add(
            new Option(
              klokkeslaet(start) + "–" + klokkeslaet(slut),
              start
            )
          );
        }
      }

      // Behold det valgte tidspunkt, hvis det stadig kan bruges.
      if (
        Array.from(tid.options).some(function (option) {
          return option.value === tidligereValg;
        })
      ) {
        tid.value = tidligereValg;
      }

      gemKnap.disabled = tid.options.length === 1;

      if (gemKnap.disabled) {
        fejl.textContent =
          "Ingen tider kan vælges på denne dato. Prøv en anden dag.";
      }
    } catch (error) {
      fejl.textContent =
        "Bookingerne kunne ikke læses fra denne browser.";
    }
  }

  // ÅBN BOOKING FRA EN HVILKEN SOM HELST BOOKINGKNAP
  document.addEventListener("click", function (event) {
    const knap = event.target.closest("[data-book-game]");

    if (!knap) return;

    // Find spillet ud fra id'et på den knap, der blev trykket.
    valgtSpil = spil.find(function (etSpil) {
      return etSpil.id === knap.dataset.bookGame;
    });

    if (!valgtSpil) return;

    form.reset();
    form.hidden = false;
    succes.hidden = true;
    dato.value = datoTekst(new Date());

    document.getElementById("booking-game-name").textContent =
      valgtSpil.navn;

    document.getElementById("booking-duration").textContent =
      "Der reserveres " + varighed() + " minutter i demoen.";

    document.getElementById("booking-hours").textContent =
      "Eksempeltider: kl. " +
      klokkeslaet(AABNER) + "–" + klokkeslaet(LUKKER) +
      ". Der regnes med ét eksemplar af hvert spil.";

    visTider();
    dialog.showModal();
    dato.focus();
  });

  // En ny dato giver en ny liste med tidspunkter.
  dato.addEventListener("change", visTider);

  document.getElementById("booking-close")
    .addEventListener("click", function () {
      dialog.close();
    });

  // Opdatér ved ændringer i en anden fane på samme hjemmeside.
  window.addEventListener("storage", function (event) {
    if (
      dialog.open &&
      !form.hidden &&
      (event.key === LAGER || event.key === null)
    ) {
      visTider();
    }
  });

  // GEM BOOKINGEN
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Forhindrer, at samme formular gemmes flere gange.
    if (form.hidden) return;

    dato.min = datoTekst(new Date());

    if (!form.reportValidity()) return;

    const start = Number(tid.value);
    const slut = start + varighed();

    // Kontrollér igen, fordi tiden kan være gået,
    // siden brugeren åbnede formularen.
    if (
      tid.value === "" ||
      !Number.isInteger(start) ||
      start < AABNER ||
      slut > LUKKER ||
      (start - AABNER) % INTERVAL !== 0 ||
      !erFremtidig(start)
    ) {
      visTider();

      fejl.textContent =
        "Tidspunktet kan ikke bruges længere. Vælg et nyt.";

      return;
    }

    try {
      // Hent de seneste data, før der gemmes.
      const bookinger = hentBookinger();

      if (erOptaget(bookinger, start, slut)) {
        visTider();

        fejl.textContent =
          "Spillet er allerede booket i det tidsrum i denne browser.";

        return;
      }

      bookinger.push({
        spilId: valgtSpil.id,
        dato: dato.value,
        start: start,
        slut: slut
      });

      localStorage.setItem(
        LAGER,
        JSON.stringify(bookinger)
      );

      const visDato = new Date(
        dato.value + "T12:00"
      ).toLocaleDateString("da-DK");

      document.getElementById("booking-confirmation").textContent =
        valgtSpil.navn + " · " +
        visDato + " · kl. " +
        klokkeslaet(start) + "–" + klokkeslaet(slut);

      form.hidden = true;
      succes.hidden = false;

      document.getElementById("booking-close").focus();
    } catch (error) {
      fejl.textContent =
        "Bookingen blev ikke gemt. Browserens lager kunne ikke bruges.";
    }
  });
});