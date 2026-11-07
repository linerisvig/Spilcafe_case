// Hver nøgle har en dansk og en engelsk tekst. Spildata og filterværdier bliver på dansk.
let sprog = "da";
const tekster = {
  Sjov: ["Sjov", "Fun"],
  Hygge: ["Hygge", "Hygge"],
  Svær: ["Svær", "Hard"],
  Battle: ["Battle", "Battle"],
  loginEmail: ["Din e-mail", "Your email"],
  loginKode: ["Din adgangskode", "Your password"],
  hovedmenu: ["Hovedmenu", "Main menu"],
  adgang: ["Log ind / gæst", "Log in / guest"],
  dinCafe: ["DIN SPILCAFÉ", "YOUR GAME CAFÉ"],
  pause: [
    "EN PAUSE MED PLADS TIL FÆLLESSKAB",
    "A BREAK WITH ROOM FOR EVERYONE",
  ],
  pauseTitel: ["Tid til en pause?", "Time for a break?"],
  naesteSpil: ["Find jeres næste spil her.", "Find your next game here."],
  soegEfter: ["Søg efter spil", "Search for games"],
  homePlaceholder: [
    "Søg efter dit yndlingsspil…",
    "Search for your favourite game…",
  ],
  searchPlaceholder: ["Søg efter spil…", "Search for games…"],
  soeg: ["Søg", "Search"],
  humoerSporgsmaal: ["Hvad er I i humør til?", "What are you in the mood for?"],
  tilbage: ["Tilbage", "Back"],
  seAlle: ["Se alle spil", "See all games"],
  findSpil: ["Find jeres spil.", "Find your game."],
  lystTil: ["Hvad har I lyst til at spille?", "What would you like to play?"],
  alle: ["Alle", "All"],
  kortTid: ["Højst 30 min.", "Up to 30 min."],
  vaelgFiltre: ["Vælg filtre", "Choose filters"],
  spillere: ["Antal spillere", "Players"],
  alleGrupper: ["Alle gruppestørrelser", "All group sizes"],
  spiltype: ["Spiltype", "Game type"],
  alleTyper: ["Alle spiltyper", "All game types"],
  ingenResultater: ["Ingen spil matcher lige nu", "No matching games"],
  proevIgen: [
    "Prøv et andet søgeord eller fjern et filter.",
    "Try another search or remove a filter.",
  ],
  visAlle: ["Vis alle spil", "Show all games"],
  tilfaeldighed: ["LAD TILFÆLDIGHEDEN BESTEMME", "LET CHANCE DECIDE"],
  lykkeTitel: ["Prøv lykken.", "Spin the wheel."],
  lykkeIntro: [
    "Lad hjulet vælge jeres næste spil.",
    "Let the wheel choose your next game.",
  ],
  drej: ["Drej hjulet", "Spin the wheel"],
  drejIgen: ["Drej igen", "Spin again"],
  drejer: ["Hjulet drejer…", "Spinning…"],
  sammeChance: [
    "Alle 12 spil har samme chance.",
    "All 12 games have the same chance.",
  ],
  monSpil: ["Hvilket spil mon det bliver?", "Which game will it be?"],
  bookSpil: ["Book spillet", "Book game"],
  laesMere: ["Læs om spillet", "Game details"],
  mineBookinger: ["Mine bookinger", "My bookings"],
  minProfil: ["Min profil", "My profile"],
  gemteSpil: ["Gemte spil", "Favourite games"],
  gemIntro: [
    "Tryk på hjertet ved et spil for at gemme det her.",
    "Tap a game's heart to save it here.",
  ],
  favoritPlads: ["Plads til jeres favoritter", "Room for your favourites"],
  favoritIntro: [
    "Tryk på hjertet ved et spil. Så ligger det klar her, når I får lyst til at spille.",
    "Tap a game's heart to keep it here for your next break.",
  ],
  findFlere: ["Find flere spil", "Find more games"],
  velkommen: ["Velkommen i spilcaféen.", "Welcome to the game café."],
  kontoIntro: [
    "Log ind eller fortsæt som gæst for at gemme dine favoritter og booke et spil.",
    "Log in or continue as a guest to save favourites and book a game.",
  ],
  logInd: ["Log ind", "Log in"],
  fortsaetGaest: ["Fortsæt som gæst", "Continue as a guest"],
  gaestInfo: [
    "Du kan også gemme og booke som gæst.",
    "Guests can also save and book games.",
  ],
  tilbageSpil: ["Tilbage til spillene", "Back to the games"],
  velkommenTilbage: ["Velkommen tilbage", "Welcome back"],
  loginIntro: [
    "Log ind for at samle dine favoritter og bookinger ét sted.",
    "Log in to keep favourites and bookings in one place.",
  ],
  adgangskode: ["Adgangskode", "Password"],
  lokaltLogin: [
    "Øvelseslogin: Brug et opdigtet login. Adgangskoden bliver ikke gemt.",
    "Practice login: use made-up details. Your password is not saved.",
  ],
  spillepause: ["Klar til en spillepause?", "Ready for a game break?"],
  profilIntro: [
    "Find dine gemte spil og hold styr på, hvornår I skal spille.",
    "Find your saved games and keep track of your next game break.",
  ],
  harKonto: ["Har du allerede en konto?", "Already have an account?"],
  kontoFortsaet: [
    "Log ind og fortsæt med dine valgte spil.",
    "Log in and continue with your chosen games.",
  ],
  logUd: ["Log ud", "Log out"],
  bookTitel: ["Book jeres spil", "Book your game"],
  bookIntro: ["Vælg, hvornår I vil spille.", "Choose when you want to play."],
  valgtSpil: ["JERES SPIL", "YOUR GAME"],
  vaelgDato: ["Vælg dato", "Choose a date"],
  vaelgTid: ["Vælg tidspunkt", "Choose a time"],
  ditValg: ["Dit valg", "Your choice"],
  bekraeft: ["Bekræft booking", "Confirm booking"],
  bookingInfo: [
    "Du kan ændre eller aflyse under Mine bookinger.",
    "You can change or cancel under My bookings.",
  ],
  lokalBooking: [
    "Bookingen gemmes på denne enhed. Caféens reservationssystem er ikke tilsluttet.",
    "Bookings are saved on this device. The café's reservation system is not connected.",
  ],
  bookingGemt: ["Dit spil er booket", "Your game is booked"],
  bookingOversigt: [
    "Her finder du jeres næste spillepauser.",
    "Your next game breaks are listed here.",
  ],
  ingenBookinger: ["Ingen bookinger endnu", "No bookings yet"],
  bookFind: [
    "Find et spil, vælg et tidspunkt, og saml vennerne til en pause.",
    "Find a game, choose a time and get your friends together.",
  ],
  findEtSpil: ["Find et spil", "Find a game"],
  luk: ["Luk", "Close"],
  filterIntro: [
    "Vælg de krav, spillet skal opfylde.",
    "Choose what your game should match.",
  ],
  begraensTid: ["Begræns spilletiden", "Limit playing time"],
  alleTider: ["Alle spilletider", "All playing times"],
  tidForklaring: [
    "Filteret bruger den længste tid i spillets tidsinterval.",
    "The filter uses the upper end of each game's time range.",
  ],
  regelniveau: ["Regelniveau", "Difficulty"],
  plads: ["Pladsbehov", "Table space"],
  alleNiveauer: ["Alle niveauer", "All levels"],
  alleBorde: ["Alle bordstørrelser", "All table sizes"],
  sorter: ["Sortér efter", "Sort by"],
  titelAz: ["Titel A–Å", "Title A–Z"],
  titelZa: ["Titel Å–A", "Title Z–A"],
  tidKort: ["Korteste spilletid", "Shortest playing time"],
  tidLang: ["Længste spilletid", "Longest playing time"],
  visSpil: ["Vis spil", "Show games"],
  nulstil: ["Nulstil filtre", "Reset filters"],
  aflysTitel: ["Aflys booking?", "Cancel booking?"],
  aflysIntro: [
    "Bookingen fjernes fra denne enhed.",
    "This booking will be removed from this device.",
  ],
  behold: ["Behold booking", "Keep booking"],
  aflys: ["Aflys booking", "Cancel booking"],
  opdag: ["Opdag", "Discover"],
  gemSpil: ["Gem eller fjern", "Save or remove"],
  book: ["Book", "Book"],
  spil: ["spil", "games"],
  af: ["af", "of"],
  hoejst: ["Højst", "Up to"],
  sorteret: ["Sorteret efter", "Sorted by"],
  typerValgt: ["spiltyper valgt", "game types selected"],
  spilletid: ["Spilletid", "Playing time"],
  alder: ["Alder", "Age"],
  stemning: ["Stemning", "Mood"],
  udstyr: ["Udstyr", "Equipment"],
  ikkeAngivet: ["Ikke angivet", "Not specified"],
  kortlaegning: [
    "Oplysningerne er fra vores kortlægning og kan afhænge af udgaven.",
    "Details come from our game mapping and may vary by edition.",
  ],
  gaest: ["gæst", "guest"],
  hej: ["Hej, ", "Hi, "],
  somGaest: ["Du fortsætter som gæst", "You are continuing as a guest"],
  gemt: ["Spillet er gemt", "Game saved"],
  fjernet: ["Spillet er fjernet fra Gemte", "Game removed from favourites"],
  kanIkkeGemme: [
    "Browseren kunne ikke gemme ændringen.",
    "The browser could not save this change.",
  ],
  ingenTid: [
    "Ingen ledige tider på denne dato. Vælg en anden dag.",
    "No available times on this date. Choose another day.",
  ],
  tidFejl: [
    "Vælg en ledig tid i fremtiden.",
    "Choose an available time in the future.",
  ],
  aendre: ["Ændr tidspunkt", "Change time"],
  bookesAf: ["Bookes af", "Booked by"],
  slut: ["til", "to"],
  valgMangler: ["Vælg dato og tidspunkt", "Choose a date and time"],
  skalSpille: ["I skal spille ", "You're playing "],
};

const engelskeVaerdier = {
  Sjov: "Fun",
  Hygge: "Hygge",
  Svær: "Hard",
  Battle: "Battle",
  Let: "Easy",
  Middel: "Medium",
  Lille: "Small",
  Mellem: "Medium",
  Stor: "Large",
  Familiespil: "Family games",
  Selskabsspil: "Party games",
  Kortspil: "Card games",
  Strategispil: "Strategy",
  Kapløbsspil: "Race games",
  "Quiz og viden": "Quiz and trivia",
  Ordkort: "Word cards",
  Gættespil: "Guessing games",
  Musik: "Music",
  Klassikere: "Classics",
  Mysterium: "Mystery",
  Kort: "Cards",
  Svarkort: "Answer cards",
  Terning: "Die",
  Bræt: "Board",
  Ostestykker: "Wedges",
  Telefon: "Phone",
  Brikker: "Playing pieces",
  Bord: "Table",
  Spillepenge: "Play money",
  Ejendomskort: "Property cards",
  Chancekort: "Chance cards",
  Fællesskabskort: "Community Chest cards",
  Huse: "Houses",
  Hoteller: "Hotels",
  Personbrikker: "Character pieces",
  Våbenbrikker: "Weapon pieces",
  Løsningskuvert: "Solution envelope",
  Detektivark: "Detective sheets",
  "Terning(er)": "Dice",
  Blyanter: "Pencils",
  "Post-its eller papirlapper": "Sticky notes or paper",
  Hyggeligt: "Cosy",
  Hyggelig: "Cosy",
  "Intens overlevelseskamp": "Intense survival battle",
  "Intens fordybelse": "Deep concentration",
  "Mental duel": "Mental duel",
  Koncentration: "Concentration",
  Konkurrence: "Competition",
  Fjollet: "Silly",
  Festlig: "Festive",
  Humoristisk: "Humorous",
  Afslappet: "Relaxed",
  Social: "Social",
  Konkurrencepræget: "Competitive",
  Intens: "Intense",
  Spændingsfuld: "Suspenseful",
  Koncentreret: "Focused",
  Venskabelig: "Friendly",
  "Sjovt med nye mennesker": "Fun with new people",
  "Ingen fast aldersanbefaling": "No fixed recommended age",
};
const engelskeSpil = {
  uno: ["UNO", "Be the first player to get rid of all your cards."],
  skak: ["Chess", "Checkmate your opponent's king."],
  ludo: ["Ludo", "Be the first to bring all your pieces home."],
  "trivial-pursuit": [
    "Trivial Pursuit",
    "Collect every wedge and reach the centre by answering questions correctly.",
  ],
  "det-daarlige-selskab": [
    "Det dårlige selskab",
    "Fill in the missing words to create the funniest sentence.",
  ],
  hitster: [
    "Hitster",
    "Scan the QR codes and place the songs in the right order on your timeline.",
  ],
  "hvem-er-jeg": [
    "Who am I?",
    "Ask yes/no questions to guess the person on your note.",
  ],
  monopoly: [
    "Monopoly",
    "Buy properties, collect rent and bankrupt your opponents.",
  ],
  cluedo: [
    "Cluedo",
    "Use clues to identify the murderer, weapon and location.",
  ],
  hint: ["HINT", "Help your team guess without saying the forbidden word."],
  partners: [
    "Partners",
    "Swap cards and plan together to outsmart your opponents.",
  ],
  "flip-seven": [
    "Flip 7",
    "Keep flipping cards without revealing the same number twice. Special cards add points and surprises.",
  ],
};

function t(noegle) {
  if (!tekster[noegle]) return noegle;
  if (sprog === "en") return tekster[noegle][1];
  return tekster[noegle][0];
}
function oversaetVaerdi(vaerdi) {
  if (sprog === "da") return vaerdi;
  return (
    engelskeVaerdier[vaerdi] ||
    vaerdi
      .replace("år", "years")
      .replace("Fra ca.", "From approx.")
      .replace("Fra ", "From ")
      .replace("(afhænger af udgaven)", "(varies by edition)")
  );
}
function spilNavn(product) {
  if (sprog === "en") return engelskeSpil[product.id][0];
  return product.navn;
}
function spilBeskrivelse(product) {
  if (sprog === "en") return engelskeSpil[product.id][1];
  return product.spilform;
}
function spilleTid(product) {
  if (product.minTid === product.maxTid) return product.maxTid;
  return product.minTid + "–" + product.maxTid;
}
function spillerTekst(product) {
  if (sprog === "da") return product.spillerTekst;
  return product.spillerTekst
    .replace("spillere", "players")
    .replace("eller", "or")
    .replace("anbefalet", "recommended")
    .replace("hold", "teams")
    .replace("nogle udgaver", "some editions");
}

// data-tekst angiver, hvilken tekst et element skal have. textContent indsætter den.
function opdaterSprog() {
  document.documentElement.lang = sprog;
  document.querySelectorAll("[data-tekst]").forEach((element) => {
    element.textContent = t(element.dataset.tekst);
  });
  document.querySelectorAll("[data-placeholder]").forEach((element) => {
    element.placeholder = t(element.dataset.placeholder);
  });
  document.querySelectorAll("[data-label]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.label));
  });
  document.querySelectorAll(".language-button").forEach((knap) => {
    knap.textContent = sprog === "da" ? "ENG" : "DA";
  });
  document
    .querySelectorAll("#level-filter option, #space-filter option")
    .forEach((option) => {
      if (option.value) option.textContent = oversaetVaerdi(option.value);
    });
}
document.querySelectorAll(".language-button").forEach((knap) => {
  knap.addEventListener("click", function () {
    if (sprog === "da") sprog = "en";
    else sprog = "da";
    opdaterSprog();
    document.dispatchEvent(new Event("sprogskift"));
  });
});
opdaterSprog();
