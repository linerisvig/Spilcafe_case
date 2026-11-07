// Bookingerne er lokale øvelsesdata. Tiderne 09–17 er eksempler, som kan tilpasses.
let bookinger = hentData("spilcafe-boss-bookinger", []);
if (!Array.isArray(bookinger)) bookinger = [];
let bookingSpil = null;
let redigerId = null;
let aflysId = null;
let senesteBooking = null;
const datoFelt = document.getElementById("booking-date");
const tidFelt = document.getElementById("booking-time");
const aflysDialog = document.getElementById("cancel-dialog");

// Date er en dato. padStart sørger for to cifre: 7 bliver fx til 07.
function datoTekst(dato) {
  return (
    dato.getFullYear() +
    "-" +
    String(dato.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(dato.getDate()).padStart(2, "0")
  );
}
function klokkeslaet(minutter) {
  return (
    String(Math.floor(minutter / 60)).padStart(2, "0") +
    ":" +
    String(minutter % 60).padStart(2, "0")
  );
}
function bookingLaengde() {
  return Math.ceil(bookingSpil.maxTid / 30) * 30;
}
function laesbarDato(tekst) {
  return new Date(tekst + "T12:00:00").toLocaleDateString(
    sprog === "da" ? "da-DK" : "en-GB",
    { weekday: "long", day: "numeric", month: "long", year: "numeric" },
  );
}

// some giver true, hvis en eksisterende booking overlapper tidsrummet.
// Ved en ændring springes den booking over, som allerede er ved at blive redigeret.
function optaget(start) {
  const slut = start + bookingLaengde();
  return bookinger.some(
    (booking) =>
      booking.id !== redigerId &&
      booking.spilId === bookingSpil.id &&
      booking.dato === datoFelt.value &&
      start < booking.slut &&
      slut > booking.start,
  );
}
function fremtidig(start) {
  return (
    new Date(datoFelt.value + "T" + klokkeslaet(start)).getTime() > Date.now()
  );
}
function visBookingvalg() {
  const start = parseFloat(tidFelt.value);
  document.getElementById("booking-selection").textContent =
    Number.isNaN(start) || !datoFelt.value
      ? t("valgMangler")
      : laesbarDato(datoFelt.value) +
        " · " +
        klokkeslaet(start) +
        "–" +
        klokkeslaet(start + bookingLaengde());
}

// new Option tilføjer en mulighed i select. Kun ledige, fremtidige tider kommer med.
function visTider() {
  if (!bookingSpil) return;
  const tidligereValg = tidFelt.value;
  tidFelt.innerHTML = "";
  tidFelt.add(new Option(t("vaelgTid"), ""));
  for (let start = 9 * 60; start + bookingLaengde() <= 17 * 60; start += 30) {
    if (fremtidig(start) && !optaget(start))
      tidFelt.add(
        new Option(
          klokkeslaet(start) + "–" + klokkeslaet(start + bookingLaengde()),
          start,
        ),
      );
  }
  if (
    Array.from(tidFelt.options).some((option) => option.value === tidligereValg)
  )
    tidFelt.value = tidligereValg;
  document.getElementById("booking-save").disabled =
    tidFelt.options.length === 1;
  document.getElementById("booking-error").textContent =
    tidFelt.options.length === 1 ? t("ingenTid") : "";
  visBookingvalg();
}
function aabnBooking(spilId, bookingId) {
  bookingSpil = products.find((product) => product.id === spilId);
  if (!bookingSpil) return;
  redigerId = bookingId || null;
  const eksisterende = bookinger.find((booking) => booking.id === redigerId);
  const startDato = new Date();
  if (
    startDato.getHours() * 60 + startDato.getMinutes() + bookingLaengde() >=
    17 * 60
  )
    startDato.setDate(startDato.getDate() + 1);
  datoFelt.min = datoTekst(new Date());
  datoFelt.value = eksisterende ? eksisterende.dato : datoTekst(startDato);
  tidFelt.value = "";
  document.getElementById("booking-game-name").textContent =
    spilNavn(bookingSpil);
  document.getElementById("booking-duration").textContent =
    bookingLaengde() + (sprog === "da" ? " minutter" : " minutes");
  document.getElementById("booking-person").textContent =
    t("bookesAf") + ": " + (bruger && !bruger.gaest ? bruger.navn : t("gaest"));
  document.getElementById("booking-back").href = eksisterende
    ? "#mine-bookinger"
    : "#spil/" + spilId;
  visTider();
  if (eksisterende) {
    tidFelt.value = eksisterende.start;
    visBookingvalg();
  }
  window.location.hash = "booking";
}

function visBekraeftelse() {
  if (!senesteBooking) return;
  const product = products.find(
    (product) => product.id === senesteBooking.spilId,
  );
  document.getElementById("booking-confirmation").innerHTML =
    `<h2>${spilNavn(product)}</h2><p>${laesbarDato(senesteBooking.dato)}</p><p>${klokkeslaet(senesteBooking.start)}–${klokkeslaet(senesteBooking.slut)}</p><p class="small">${t("lokalBooking")}</p>`;
}
function visBookinger() {
  const liste = document.getElementById("booking-list");
  liste.innerHTML = "";
  const sorterede = [...bookinger].sort((a, b) =>
    (a.dato + klokkeslaet(a.start)).localeCompare(
      b.dato + klokkeslaet(b.start),
    ),
  );
  sorterede.forEach((booking) => {
    const product = products.find((product) => product.id === booking.spilId);
    if (!product) return;
    liste.innerHTML += `<article class="booking-card"><h2>${spilNavn(product)}</h2><p>${laesbarDato(booking.dato)}<br>${klokkeslaet(booking.start)}–${klokkeslaet(booking.slut)}</p><div class="two-buttons"><button type="button" class="button outline" data-edit-booking="${booking.id}">${t("aendre")}</button><button type="button" class="button outline" data-cancel-booking="${booking.id}">${t("aflys")}</button></div></article>`;
  });
  document.getElementById("booking-empty").hidden = bookinger.length > 0;
}

document
  .getElementById("booking-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    if (!bookingSpil) return;
    if (!bruger) {
      kraeverBruger(function () {
        aabnBooking(bookingSpil.id, redigerId);
      });
      return;
    }
    const start = parseFloat(tidFelt.value);
    // Samme kontrol gentages ved gem, så en gammel eller ændret tid ikke slipper igennem.
    if (
      !datoFelt.value ||
      !Number.isInteger(start) ||
      start < 540 ||
      start % 30 !== 0 ||
      start + bookingLaengde() > 1020 ||
      !fremtidig(start) ||
      optaget(start)
    ) {
      visTider();
      document.getElementById("booking-error").textContent = t("tidFejl");
      return;
    }
    const booking = {
      id: redigerId || Date.now().toString(),
      spilId: bookingSpil.id,
      dato: datoFelt.value,
      start: start,
      slut: start + bookingLaengde(),
    };
    const nyeBookinger = bookinger.filter((gemt) => gemt.id !== redigerId);
    nyeBookinger.push(booking);
    if (!gemData("spilcafe-boss-bookinger", nyeBookinger)) return;
    bookinger = nyeBookinger;
    senesteBooking = booking;
    redigerId = null;
    visBekraeftelse();
    visBookinger();
    window.location.hash = "bekraeftet";
  });
datoFelt.addEventListener("change", visTider);
tidFelt.addEventListener("change", visBookingvalg);
document.addEventListener("click", function (event) {
  const rediger = event.target.closest("[data-edit-booking]");
  const aflys = event.target.closest("[data-cancel-booking]");
  if (rediger) {
    const booking = bookinger.find(
      (booking) => booking.id === rediger.dataset.editBooking,
    );
    kraeverBruger(function () {
      aabnBooking(booking.spilId, booking.id);
    });
  }
  if (aflys) {
    aflysId = aflys.dataset.cancelBooking;
    const booking = bookinger.find((booking) => booking.id === aflysId);
    document.getElementById("cancel-game").textContent = spilNavn(
      products.find((product) => product.id === booking.spilId),
    );
    aflysDialog.showModal();
  }
});
document.getElementById("keep-booking").addEventListener("click", function () {
  aflysDialog.close();
  aflysId = null;
});
document
  .getElementById("confirm-cancel")
  .addEventListener("click", function () {
    const nyeBookinger = bookinger.filter((booking) => booking.id !== aflysId);
    if (!gemData("spilcafe-boss-bookinger", nyeBookinger)) return;
    bookinger = nyeBookinger;
    aflysId = null;
    aflysDialog.close();
    visBookinger();
  });
document.addEventListener("sprogskift", function () {
  visBookinger();
  visBekraeftelse();
  if (bookingSpil) {
    document.getElementById("booking-game-name").textContent =
      spilNavn(bookingSpil);
    document.getElementById("booking-duration").textContent =
      bookingLaengde() + (sprog === "da" ? " minutter" : " minutes");
    document.getElementById("booking-person").textContent =
      t("bookesAf") +
      ": " +
      (bruger && !bruger.gaest ? bruger.navn : t("gaest"));
    visTider();
  }
});
// En genindlæst booking-side har endnu ikke et valgt spil.
if (["#booking", "#bekraeftet"].includes(window.location.hash))
  window.location.hash = "mine-bookinger";
visBookinger();
