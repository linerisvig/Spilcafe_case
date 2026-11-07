# Brætspilscafé 

En side med vores 12 spil, bygget med HTML, CSS og JavaScript. Udseendet følger [Prototype i Figma](https://www.figma.com/design/m8k4Oqegmx5s0POZymU8CT/Spilcaf%C3%A9-case--IXD----Maiken--Sara--Klaudia---Line?node-id=281-2). Logo, humørfigurer, spilbilleder, ikoner og hjul er hentet fra filen.


## Filerne

 Fil - Indhold 
 
 `index.html`  Sidernes tekst, felter, knapper og bundmenu 
 `css/style.css`  Farver, størrelser og placeringer fra Figma 
 `js/spil.js`  Arrayet med de 12 spil og deres attributter 
 `js/script.js`  Søgning, filtre, sortering, spilvisning og skift mellem sider 
 `js/sprog.js`  Danske og engelske tekster 
 `js/konto.js`  Gæst, øvelseslogin og gemte spil 
 `js/lykkehjul.js`  Tilfældigt spil og hjulets rotation 
 `js/booking.js`  Valg af tid, lokale bookinger, ændring og aflysning 
 `billeder/`  Billeder og ikoner, som siden bruger 
 `.gitignore`  Holder `.vscode`, `.DS_Store` og midlertidige build-filer ude af Git 


## Funktionerne i script.js

`filtrerProdukter()` Den kalder de mindre funktioner i rækkefølge:

 Funktion - Hvad der sker 

 `hentFelter()`  Læser søgeordet og filtervalgene fra HTML 
 `filtrerSpil(alleSpil, valg)`  Laver en kopi og beholder de spil, der passer 
 `sorterSpil(filteredProducts, sorterEfter)`  Sætter resultatet i den valgte rækkefølge 
 `displayProducts(list)`  Tilføjer én spilrække ad gangen med `forEach` 
 `visFilterstatus(list, valg)`  Opdaterer antal resultater og teksten ved filtrene 

Kategorierne findes både i en dropdown og som checkbokse i **Vælg filtre**. Checkboksene tillader flere kategorier på samme tid. Filtrene opdaterer resultatet, når de ændres. **Vis spil** lukker panelet.

**Alle spilletider** betyder, at tidsfilteret er slået fra. Der er ingen skjult grænse på 180 minutter. Når tidsfilteret er slået til, bruges spillets længste angivne tid. Et spil på 15–30 minutter passer derfor til højst 30 minutter, men ikke til højst 25. Skyderens maksimum hentes fra data.

## Opgavens krav


 Array af objekter  `const spil` i `spil.js` 
Alle spil med `forEach` , `displayProducts()`
Tekstfelt og Søg-knap , Formularerne på forsiden og søgesiden; Enter virker også
`toLowerCase`, `trim`, `includes` , `hentFelter()` og søgedelen i `filtrerSpil()` 
 Kategori og range-input med `filter` .  Checkboksene og tidsskyderen i filterpanelet 
|Select og `sort` | **Sortér efter**: titel eller spilletid, begge retninger 
Mængdeoperation , `some` og `includes`: Kortspil ELLER Strategispil; derefter spillerantal OG tid OG de øvrige aktive filtre 
 Søgning kan filtreres = Filterændringer arbejder videre med søgeordet i feltet 
Ingen database eller redigering af spil - Spildata ligger kun i `spil.js`; siden har ingen funktion til at ændre spil 

Spillets detaljer åbnes som en side. `<dialog>` bruges til filtre og bekræftelse af aflysning; en detaljedialog er valgfri i opgaven.

## Gæst, hjerter og booking

Dette er en lokal simulation. Der er ingen server eller rigtig brugerkonto. Et opdigtet login med en gyldig e-mailform og mindst fire tegn i adgangskodefeltet kan bruges til at afprøve forløbet. **Adgangskoden gemmes ikke**.

Gæstebruger eller navn/e-mail, gemte spil og bookinger gemmes i browserens `localStorage`. De bliver der efter genindlæsning. De deles af alle øvelsesprofiler i samme browser, bliver ikke slettet ved logout og følger ikke med til en anden browser eller enhed. Sletning af browserens sidedata fjerner dem.

**Book** findes i søgeresultater, gemte spil, spildetaljer og efter et hjulspin. Tiderne 09–17 er eksempeltider, ikke caféens bekræftede åbningstider. Bookingen reserverer spillets maksimale varighed, rundet op til en halv time. Fortid og overlappende reservationer af samme spil i denne browser udelukkes. Under **Mine bookinger** kan tidspunktet ændres eller reservationen aflyses. Ingen reservation sendes til caféen.

Hjulets 12 felter følger rækkefølgen i `spil.js`. Søgning sorterer en kopi, så den rækkefølge bevares. Ved ændringer i antallet eller rækkefølgen af spillene skal selve hjulbilledet også opdateres.

## Spildata fra kortlægningen

Alder, stemning, udstyr, spillere, tid, regler, kategori og pladsbehov vises på detaljesiden. Tomme oplysninger vises som Ikke angivet**. Kortlægningen mangler udstyr til Skak og Flip 7 samt stemning til Ludo; der er ikke indsat gæt i de felter.

Nogle felter afhænger af udgaven: Monopoly filtreres som 2–6 spillere, selv om kortlægningen nævner udgaver til 8. Partners følger kortlægningens 2 eller 4, ikke intervallet 2–4. Data for Hvem er jeg? beskriver legen med sedler; billedet viser en købt æske. Alder og udstyr bør kontrolleres på de konkrete æsker, når kortlægningen færdiggøres.

Humørsiderne følger Figma med tre spil i hver gruppe. Humøret **Svær** er en udvalgt gruppe, mens **Regelniveau** er en separat attribut. Stjernerne på kortene er beholdt som i Figma og bruges ikke som filter eller anmeldelsesdata.

## Kontrol af løsningen

Siden er afprøvet i browseren ved 320, 375 og 440 px bredde: søgning med store bogstaver og mellemrum, flere kategorier, spillerantal, tidsskyder, tomme resultater, sortering, engelske tekster, gæst, gemte spil efter genindlæsning, booking, ændring, optagede tider, aflysning og lykkehjul. Alle 12 spilbilleder blev indlæst.

Derudover er JavaScript-filerne syntakskontrolleret. Isolerede funktionstjek dækkede blandt andet en spilletid over 180 minutter, at originalarrayet ikke ændres, Partners ved 2/3/4 spillere, tidsmæssige overlap og alle 12 hjulfelter ved gentagne drej.
