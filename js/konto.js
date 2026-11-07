// localStorage husker tekst i denne browser. JSON laver objekter om til tekst og tilbage.
// Et manglende eller ulæseligt felt får sin startværdi i stedet.
function hentData(noegle, startvaerdi) {
  try {
    return JSON.parse(localStorage.getItem(noegle)) || startvaerdi;
  } catch (fejl) {
    return startvaerdi;
  }
}
function gemData(noegle, vaerdi) {
  try {
    localStorage.setItem(noegle, JSON.stringify(vaerdi));
    return true;
  } catch (fejl) {
    besked(t("kanIkkeGemme"));
    return false;
  }
}
let bruger = hentData("spilcafe-boss-bruger", null);
let gemteSpil = hentData("spilcafe-boss-favoritter", []);
let efterLogin = null;
let beskedUr;
if (!Array.isArray(gemteSpil)) gemteSpil = [];

// setTimeout kører funktionen efter et antal millisekunder. 3000 er tre sekunder.
function besked(tekst) {
  const felt = document.getElementById("toast");
  felt.textContent = tekst;
  felt.hidden = false;
  clearTimeout(beskedUr);
  beskedUr = setTimeout(function () {
    felt.hidden = true;
  }, 3000);
}

// En handling kan vente, mens brugeren vælger login eller gæst.
// Når en bruger er valgt, kalder () den ventende funktion.
function kraeverBruger(handling) {
  if (bruger) handling();
  else {
    efterLogin = handling;
    window.location.hash = "velkommen";
  }
}
function fortsaet(nyBruger) {
  bruger = nyBruger;
  gemData("spilcafe-boss-bruger", bruger);
  opdaterKonto();
  const handling = efterLogin;
  efterLogin = null;
  window.location.hash = "opdag";
  if (handling) handling();
}

// includes tjekker, om spillet allerede er gemt. filter fjerner det ved næste klik.
function gemSpil(id) {
  kraeverBruger(function () {
    if (gemteSpil.includes(id)) {
      gemteSpil = gemteSpil.filter((gemtId) => gemtId !== id);
      besked(t("fjernet"));
    } else {
      gemteSpil.push(id);
      besked(t("gemt"));
    }
    gemData("spilcafe-boss-favoritter", gemteSpil);
    opdaterHjerter();
    opdaterGemte();
    // Et gemt spil fra humørsiden vises igen efter valget af login/gæst.
    if (
      window.location.hash === "#opdag" &&
      !document.getElementById("velkommen").hidden
    )
      window.location.hash = "gemte";
  });
}
function opdaterHjerter() {
  document.querySelectorAll("[data-save]").forEach((knap) => {
    knap.setAttribute("aria-pressed", gemteSpil.includes(knap.dataset.save));
  });
}
function opdaterGemte() {
  const liste = document.getElementById("saved-games");
  const favoritter = products.filter((product) =>
    gemteSpil.includes(product.id),
  );
  liste.innerHTML = "";
  favoritter.forEach((product) => {
    liste.innerHTML += spilRaekke(product);
  });
  document.getElementById("saved-empty").hidden = favoritter.length > 0;
}
function opdaterKonto() {
  const navn = bruger && !bruger.gaest ? bruger.navn : t("gaest");
  document.querySelector(".account-link").textContent = bruger
    ? t("minProfil")
    : t("adgang");
  document.querySelector(".account-link").href = bruger
    ? "#profil"
    : "#velkommen";
  document.getElementById("profile-title").textContent = t("hej") + navn;
  document.getElementById("profile-info").textContent =
    bruger && !bruger.gaest ? bruger.email : t("somGaest");
  document.getElementById("profile-avatar").textContent = navn
    .slice(0, 1)
    .toUpperCase();
  document.getElementById("profile-login").hidden = bruger && !bruger.gaest;
}
document.querySelectorAll(".guest-button").forEach((knap) => {
  knap.addEventListener("click", function () {
    fortsaet({ navn: "Gæst", gaest: true });
  });
});

// Dette er et lokalt øvelseslogin. Formularen kontrollerer e-mail og adgangskodens
// længde. Kun navn og e-mail gemmes; adgangskoden bruges ikke til en rigtig konto.
document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    fortsaet({ navn: email.split("@")[0], email: email, gaest: false });
    document.getElementById("login-password").value = "";
  });
document.getElementById("logout").addEventListener("click", function () {
  bruger = null;
  efterLogin = null;
  gemData("spilcafe-boss-bruger", null);
  opdaterKonto();
  window.location.hash = "velkommen";
});
