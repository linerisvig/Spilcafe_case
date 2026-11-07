// Vores spil ligger i arrayet spil, som kommer fra spil.js.
// Et array er en liste. products bliver et andet navn for den samme liste.
// const opretter en variabel, som ikke kan tildeles en ny værdi senere.
// = giver variablen til venstre værdien fra højre side.
const products = spil;

// document er vores HTML-side. getElementById finder elementet med et bestemt id.
// liste henviser derfor til <ul id="game-list">, hvor spilkortene skal stå.
const liste = document.getElementById("game-list");

// Søgefeltet findes på samme måde. Navnet soegefelt bruges til at hente
// eller ændre feltets indhold senere i koden.
const soegefelt = document.getElementById("game-search-field");

// Disse variabler henviser til felterne for spillerantal, tid, kategori,
// sværhedsgrad, plads og sortering. Navnene gør dem lettere at bruge længere nede.
const spillerFilter = document.getElementById("player-filter");
const tidsFilter = document.getElementById("time-filter");
const kategoriValg = document.getElementById("category-options");
const niveauFilter = document.getElementById("level-filter");
const pladsFilter = document.getElementById("space-filter");
const sortering = document.getElementById("sort-order");

// let opretter en variabel, der kan få en ny værdi senere.
// aktivtHumoer kan fx blive "Hygge". Den tomme tekst "" betyder intet valgt.
let aktivtHumoer = "";

// for gentager koden i klammerne. antal starter på 2 og fortsætter til 18.
// <= betyder mindre end eller lig med. antal++ lægger 1 til efter hver omgang.
for (let antal = 2; antal <= 18; antal++) {

  // innerHTML er HTML-indholdet inde i elementet.
  // += tilføjer et nyt valg til de eksisterende. ${antal} indsætter det aktuelle tal.
  spillerFilter.innerHTML += `<option value="${antal}">${antal} spillere</option>`;
}

// [] er et tomt array. Det skal samle kategorierne fra vores spil.
const kategorier = [];

// forEach kører en funktion for hvert spil på listen. product er det aktuelle spil.
// product.kategorier er det spils kategorier, som også gennemgås én ad gangen.
// => er en kort måde at skrive en funktion på.
products.forEach(product => {
  product.kategorier.forEach(kategori => {

    // if kører kun koden i klammerne, når betingelsen er sand.
    // includes tjekker, om kategorien allerede findes i arrayet. ! vender svaret om.
    // push tilføjer kategorien, hvis den mangler. Så kommer den kun med én gang.
    if (!kategorier.includes(kategori)) {
      kategorier.push(kategori);
    }
  });
});

// sort sætter kategorinavnene i rækkefølge. forEach tilføjer en boks til hvert navn.
// Teksten mellem backticks (`) kan indeholde værdier med ${...}.
// ${kategori} bliver fx erstattet med Kortspil.
kategorier.sort().forEach(kategori => {
  kategoriValg.innerHTML += `
    <label>
      <input type="checkbox" name="kategori" value="${kategori}">
      ${kategori}
    </label>
  `;
});

// function samler kode under et navn. Koden kører, når funktionen bliver kaldt.
// displayProducts modtager en liste med spil. Den liste hedder list herinde.
function displayProducts(list) {

  // Den tomme tekst erstatter det gamle indhold. Ellers ville nye søgeresultater
  // blive lagt neden under de gamle kort.
  liste.innerHTML = "";

  // forEach gennemgår den modtagne liste. Alt inde i funktionen gentages for hvert spil.
  // product.navn betyder fx navnet på det spil, der behandles lige nu.
  list.forEach(product => {

    // Forkortelsen bruges som udgangspunkt. Har spillet en billedsti,
    // ændres billede til et img-element med den sti.
    let billede = product.forkortelse;

    if (product.billede) {
      billede = `<img src="${product.billede}" alt="">`;
    }

    // + sætter her tal og tekst sammen, fx 15 + "–" + 30 bliver til "15–30".
    // === sammenligner både værdi og type. Hvis tiderne er ens, bruges kun ét tal.
    let tid = product.minTid + "–" + product.maxTid;

    if (product.minTid === product.maxTid) {
      tid = product.maxTid;
    }

    // note starter som tom tekst. if(product.note) tjekker, om spillet har en note.
    // I så fald kommer den med som et afsnit på kortet.
    let note = "";

    if (product.note) {
      note = `<p class="game-note">${product.note}</p>`;
    }

    // HTML til ét spilkort. ${product.navn} indsætter fx UNO.
    // join(", ") samler et array til tekst: ["kort", "terning"] bliver "kort, terning".
    // || "Ikke angivet" bruges, hvis teksten fra stemning eller udstyr er tom.
    // data-book-game indeholder spillets id, som booking.js bruger til bookingen.
    liste.innerHTML += `
      <li class="game-card">
        <details>
          <summary class="game-summary">
            <span class="game-monogram">${billede}</span>

            <div class="game-overview">
              <h3 class="game-name">${product.navn}</h3>

              <p class="game-meta">
                ${product.spillerTekst} · ca. ${tid} min.
              </p>

              <p class="game-category">
                ${product.kategorier.join(" · ")}
              </p>
            </div>

            <span class="game-expand">+</span>
          </summary>

          <div class="game-details">
            <p class="game-description">${product.spilform}</p>

            <dl>
              <dt>Regelniveau</dt>
              <dd>${product.regelniveauer.join("–")}</dd>

              <dt>Stemning</dt>
              <dd>${product.stemning.join(", ") || "Ikke angivet"}</dd>

              <dt>Udstyr</dt>
              <dd>${product.udstyr.join(", ") || "Ikke angivet"}</dd>

              <dt>Pladsbehov</dt>
              <dd>${product.pladsbehov}</dd>

              <dt>Anbefalet alder</dt>
              <dd>${product.alder}</dd>
            </dl>

            ${note}
          </div>
        </details>

        <button
          type="button"
          class="booking-button"
          data-book-game="${product.id}">
          Book spillet
        </button>
      </li>
    `;
  });
}

// filtrerProdukter samler søgning, filtrering og sortering i én funktion.
function filtrerProdukter() {

  // [...products] kopierer arrayet. Hver søgning starter derfor med alle spil.
  // filteredProducts er listen, der bliver kortere under filtreringen.
  // Kopien gør også, at sort ikke ændrer rækkefølgen i vores oprindelige array.
  let filteredProducts = [...products];

  // value henter teksten fra søgefeltet. toLowerCase laver store bogstaver om til små.
  // trim fjerner mellemrum i begyndelsen og slutningen: "  UNO  " bliver til "uno".
  const searchText = soegefelt.value.toLowerCase().trim();

  // if(searchText) betyder her: kun hvis søgefeltet ikke er tomt.
  // filter laver et nyt array med de spil, der opfylder betingelsen efter =>.
  // includes(searchText) giver true, hvis feltet indeholder søgeteksten.
  // || betyder eller. Et match i ét af felterne er nok til at beholde spillet.
  // join(" ") samler kategorier og stemninger til tekst, der kan søges i.
  if (searchText) {
    filteredProducts = filteredProducts.filter(product =>
      product.navn.toLowerCase().includes(searchText) ||
      product.forkortelse.toLowerCase().includes(searchText) ||
      product.kategorier.join(" ").toLowerCase().includes(searchText) ||
      product.spilform.toLowerCase().includes(searchText) ||
      product.stemning.join(" ").toLowerCase().includes(searchText)
    );
  }

  // querySelectorAll finder alle felter, der passer til søgningen i parentesen.
  // :checked betyder, at kun afkrydsede kategorier kommer med.
  // Array.from gør resultatet til et array. map laver en ny liste med felternes value.
  // cb er ét felt. categories kan fx ende som ["Kortspil", "Strategispil"].
  const categories = Array.from(
    document.querySelectorAll('input[name="kategori"]:checked')
  ).map(cb => cb.value);

  // Feltværdier er tekst. parseFloat omdanner fx "4" til tallet 4.
  // Det gør det muligt at sammenligne valgene med tallene i vores spildata.
  const spillere = parseFloat(spillerFilter.value);
  const maxTid = parseFloat(tidsFilter.value);

  // value henter det valgte svar fra hver dropdown.
  // Et tomt svar "" betyder, at alle niveauer eller bordstørrelser er tilladt.
  const niveau = niveauFilter.value;
  const plads = pladsFilter.value;
  const sorterEfter = sortering.value;

  // length er antallet af ting i et array. > 0 betyder, at mindst én kategori er valgt.
  // Uden valgte kategorier springes dette filter over.
  if (categories.length > 0) {
    filteredProducts = filteredProducts.filter(product => {

      // true og false betyder sandt og falsk. passer starter på false for hvert spil.
      // Det bliver kun true, hvis mindst én af spillets kategorier passer.
      let passer = false;

      product.kategorier.forEach(kategori => {

        // includes på et array tjekker, om en hel værdi findes i listen.
        // Fx er ["Kortspil", "Strategispil"].includes("Kortspil") true.
        if (categories.includes(kategori)) {
          passer = true;
        }
      });

      // return sender svaret tilbage til filter.
      // true beholder spillet i resultatet. false lader det blive udenfor.
      return passer;
    });
  }

  // 0 er værdien for alle spillerantal. Et højere tal aktiverer filteret.
  // Ved fx 4 skal tallet 4 findes i spillets antalSpillere-array.
  // Derfor passer Partners til 2 eller 4 spillere, men ikke til 3.
  if (spillere > 0) {
    filteredProducts = filteredProducts.filter(product =>
      product.antalSpillere.includes(spillere)
    );
  }

  // isNaN tjekker, om en værdi er NaN, som betyder "ikke et tal".
  // !isNaN(maxTid) tillader kun filteret, hvis tallet kunne læses.
  // maxTid <= 30 er sandt ved højst 30 minutter. Et spil på 15–30 minutter kommer med.
  if (!isNaN(maxTid)) {
    filteredProducts = filteredProducts.filter(product =>
      product.maxTid <= maxTid
    );
  }

  // !== betyder ikke lig med. Filteret bruges kun, hvis niveau ikke er tomt.
  // includes tjekker fx, om "Let" findes blandt spillets regelniveauer.
  if (niveau !== "") {
    filteredProducts = filteredProducts.filter(product =>
      product.regelniveauer.includes(niveau)
    );
  }

  // === kræver, at pladsbehovet svarer til det valgte, fx "Lille".
  // Et tomt valg springer dette filter over.
  if (plads !== "") {
    filteredProducts = filteredProducts.filter(product =>
      product.pladsbehov === plads
    );
  }

  // Humørfilteret bruges, når aktivtHumoer har en værdi, fx "Hygge".
  // Hvert filter arbejder på resultatet fra det forrige. Derfor skal et spil
  // fx både passe til fire spillere OG den valgte tid OG det valgte humør.
  if (aktivtHumoer !== "") {
    filteredProducts = filteredProducts.filter(product =>
      product.humoer.includes(aktivtHumoer)
    );
  }

  // sort ændrer rækkefølgen ved at sammenligne to spil ad gangen: a og b.
  // localeCompare sammenligner navnene alfabetisk. "da" bruger dansk rækkefølge.
  // Et negativt resultat sætter a før b. Et positivt resultat sætter a efter b.
  if (sorterEfter === "titel-az") {
    filteredProducts.sort((a, b) => a.navn.localeCompare(b.navn, "da"));
  }

  // Sammenligningen er vendt om til b først. Det giver omvendt alfabetisk rækkefølge.
  if (sorterEfter === "titel-za") {
    filteredProducts.sort((a, b) => b.navn.localeCompare(a.navn, "da"));
  }

  // a.maxTid - b.maxTid sætter de korteste spil først, målt på maxTid.
  // Fx giver 30 - 60 et negativt tal, så spillet på 30 minutter står før det på 60.
  if (sorterEfter === "tid-kort") {
    filteredProducts.sort((a, b) => a.maxTid - b.maxTid);
  }

  // b.maxTid - a.maxTid vender rækkefølgen om, så den højeste maxTid står først.
  if (sorterEfter === "tid-lang") {
    filteredProducts.sort((a, b) => b.maxTid - a.maxTid);
  }

  // () kalder funktionen. filteredProducts sendes med som dens liste af spil.
  // displayProducts erstatter derefter kortene på siden med det færdige resultat.
  displayProducts(filteredProducts);

  // textContent skriver tekst inde i HTML-elementet.
  // De to længder giver fx "3 af 12 spil": tre fundne ud af tolv i alt.
  document.getElementById("results-count").textContent =
    filteredProducts.length + " af " + products.length + " spil";

  // hidden = true skjuler et element. hidden = false viser det.
  // Beskeden om ingen resultater er derfor kun synlig, når antallet er 0.
  document.getElementById("empty-state").hidden =
    filteredProducts.length !== 0;

  // Teksterne ved filtrene får de aktuelle værdier, fx "Højst 30 min."
  // og "2 kategorier valgt". Et valgt humør står i active-filters.
  document.getElementById("time-output").textContent =
    "Højst " + maxTid + " min.";

  document.getElementById("category-summary").textContent =
    categories.length + " kategorier valgt";

  document.getElementById("active-filters").textContent = aktivtHumoer;

  // setAttribute sætter en attribut på et HTML-element.
  // aria-pressed er true, når hurtigknappens filter er valgt, og ellers false.
  // Det bruges til knappens styling og fortæller en skærmlæser, om den er valgt.
  document.getElementById("quick-time").setAttribute(
    "aria-pressed", maxTid === 30
  );

  document.getElementById("quick-easy").setAttribute(
    "aria-pressed", niveau === "Let"
  );
}

// nulstil sætter felterne tilbage til start. felt.value = "" tømmer et felt.
// "0", "180" og "titel-az" er startværdierne for spillerantal, tid og sortering.
function nulstil() {
  soegefelt.value = "";
  document.getElementById("search-field").value = "";
  spillerFilter.value = "0";
  tidsFilter.value = "180";
  niveauFilter.value = "";
  pladsFilter.value = "";
  sortering.value = "titel-az";
  aktivtHumoer = "";

  // checked er feltets kryds. false fjerner krydset fra hver kategori.
  document.querySelectorAll('input[name="kategori"]').forEach(cb => {
    cb.checked = false;
  });

  // open bestemmer, om details-boksen er åben. false lukker kategorilisten.
  document.getElementById("category-picker").open = false;

  filtrerProdukter();
}

// addEventListener knytter kode til en handling på et element.
// submit sker, når søgeformularen sendes med Søg-knappen eller Enter.
// function(event) er den funktion, der kører til den tid. event beskriver handlingen.
document.getElementById("game-search").addEventListener("submit", function (event) {

  // preventDefault stopper formularens normale afsendelse, som ville genindlæse siden.
  event.preventDefault();

  filtrerProdukter();
});

// Forsidens søgeformular har sin egen submit-hændelse.
// Den flytter søgeordet over til spiloversigten og fjerner tidligere filtre.
document.getElementById("home-search").addEventListener("submit", function (event) {

  // preventDefault stopper formularens normale afsendelse, som ville genindlæse siden.
  event.preventDefault();

  // Søgeordet gemmes i tekst, før nulstil tømmer begge søgefelter.
  const tekst = document.getElementById("search-field").value;

  nulstil();

  // = tekst lægger det gemte søgeord tilbage i søgefelterne.
  soegefelt.value = tekst;
  document.getElementById("search-field").value = tekst;

  filtrerProdukter();

  // hash er delen efter # i adressen. Ændringen til #alle-spil udløser sideskiftet.
  window.location.hash = "alle-spil";
});

// change reagerer på et ændret valg. input reagerer, mens tidsskyderen flyttes.
// filtrerProdukter står uden (), så funktionen først kaldes ved handlingen.
// Med filtrerProdukter() her ville den blive kaldt, mens linjen blev læst.
spillerFilter.addEventListener("change", filtrerProdukter);
tidsFilter.addEventListener("input", filtrerProdukter);
kategoriValg.addEventListener("change", filtrerProdukter);
niveauFilter.addEventListener("change", filtrerProdukter);
pladsFilter.addEventListener("change", filtrerProdukter);
sortering.addEventListener("change", filtrerProdukter);

// click er et klik på knappen. Alle tre knapper kalder den samme funktion: nulstil.
document.getElementById("reset-all").addEventListener("click", nulstil);
document.getElementById("clear-filters").addEventListener("click", nulstil);
document.getElementById("empty-reset").addEventListener("click", nulstil);

// Et klik på hurtigknappen skifter mellem 30 og 180 minutter.
// if vælger det første stykke, når tiden allerede er 30. else kører ellers.
document.getElementById("quick-time").addEventListener("click", function () {
  if (tidsFilter.value === "30") {
    tidsFilter.value = "180";
  } else {
    tidsFilter.value = "30";
  }

  filtrerProdukter();
});

// Samme skift bruges til Let-knappen: Let bliver slået til eller erstattet med "".
// Derefter beregner filtrerProdukter, hvilke spil der passer til valget.
document.getElementById("quick-easy").addEventListener("click", function () {
  if (niveauFilter.value === "Let") {
    niveauFilter.value = "";
  } else {
    niveauFilter.value = "Let";
  }

  filtrerProdukter();
});

// .mood finder alle elementer med klassen mood. Hver knap får en klikfunktion.
// dataset.mood læser værdien fra knappens data-mood i HTML, fx "Hygge".
// Svær bruger regelniveauet; de andre knapper bruger spillets humør.
document.querySelectorAll(".mood").forEach(knap => {
  knap.addEventListener("click", function () {
    nulstil();

    if (knap.dataset.mood === "Svær") {
      niveauFilter.value = "Svær";
    } else {
      aktivtHumoer = knap.dataset.mood;
    }

    filtrerProdukter();

    // hash er delen efter # i adressen. Ændringen til #alle-spil udløser sideskiftet.
    window.location.hash = "alle-spil";
  });
});

// visSide bestemmer, hvilken sektion af vores HTML der er synlig.
function visSide() {

  // window.location.hash henter fx "#alle-spil" fra adressen.
  // slice(1) fjerner første tegn, så side bliver "alle-spil".
  let side = window.location.hash.slice(1);

  // En tom værdi betyder, at adressen ikke har valgt en side. Så bruges opdag.
  if (side === "") {
    side = "opdag";
  }

  // Søgningen finder section-elementer med klassen page direkte inde i main.
  // Alle skjules undtagen den sektion, hvis id svarer til side.
  document.querySelectorAll("main > section.page").forEach(sektion => {
    sektion.hidden = sektion.id !== side;
  });

  // dataset.page læser linkets data-page. Linket til den aktuelle side får
  // attributten aria-current="page". removeAttribute fjerner den fra de andre.
  document.querySelectorAll(".bottom-nav [data-page]").forEach(link => {
    if (link.dataset.page === side) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  // scrollTo flytter sidens rulning. Tallene er vandret og lodret position.
  // 0, 0 betyder helt til venstre og helt op til toppen.
  window.scrollTo(0, 0);
}

// hashchange sker, når delen efter # ændres. Det kalder visSide.
window.addEventListener("hashchange", visSide);

// products.length er antallet af spil i hele samlingen. Tallet sættes ind i teksten.
document.getElementById("collection-info").textContent =
  products.length + " spil. Hvad har I lyst til at spille?";

// Disse kald starter funktionerne, når scriptet bliver indlæst.
// Ellers ville funktionerne kun være defineret, og de første spilkort ville mangle.
filtrerProdukter();
visSide();