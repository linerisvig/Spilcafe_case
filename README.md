## Sådan opfylder koden opgaven

| Krav | Hvor og hvordan |
| --- | --- |
| Array af objekter | `const spil = [...]` i `spil.js`. Alle objekter har de samme felter. |
| Vis spil med `forEach` | Funktionen `visSpil()` i `script.js` bygger listen med `resultater.forEach(...)`. |
| Tekstfelt og Søg-knap | Begge søgefelter ligger i en `<form>`. Enter virker også. |
| `toLowerCase`, `trim`, `includes` | `filtrerOgSorter()` gør søgeteksten ensartet og finder tekstmatch. |
| Filtrering med `filter` | `alleSpil.filter(...)` undersøger hvert spil. |
| Checkbokse | Spiltype-menuen tillader én eller flere valgte kategorier. |
| Range-input | Spilletid er en skyder fra 15 til 180 minutter. |
| Sortering med `sort` | Select-boksen vælger titel A–Å, titel Å–A, korteste eller længste spilletid. |
| Mængdeoperation | Flere kategorier kombineres med ELLER; forskellige filtre kombineres med OG. |

Et eksempel: Vælger brugeren **Kortspil** og **Strategispil**, vises spil, der er i mindst én af de kategorier. Vælger brugeren samtidig **9 spillere** og **højst 30 minutter**, skal spillene også opfylde begge betingelser. Med de aktuelle data er resultatet **UNO**.

`some()` betyder her: opfylder mindst én af spillets kategorier betingelsen? `includes()` undersøger, om kategorien er blandt brugerens valgte kategorier.

## Filtervalg

- **Søgning:** navn, forkortelse, kategori, spilbeskrivelse og stemning. Søgeordet aktiveres ved Søg/Enter, og alle efterfølgende filtre arbejder videre på den søgning.
- **Antal spillere:** et præcist antal fra 1 til 18 eller alle gruppestørrelser. Partners indeholder `[2, 4]`, så 3 ikke matcher.
- **Spilletid:** bruger den øvre grænse i tidsintervallet. Et spil på 15–30 minutter matcher højst 30; et spil på 30–60 matcher ikke. Spilletiderne er stadig skøn, ikke en garanti.
- **Regelniveau:** `Let–Middel` matcher både Let og Middel. `Middel–Svær` matcher både Middel og Svær, som kortlægningen angiver.
- **Pladsbehov:** præcis match på Lille, Mellem eller Stor.
- **Sortering:** ændrer rækkefølgen af de aktuelle søgeresultater. Den oprindelige dataliste ændres ikke.
- **Aktive filtre:** vises som små knapper, der kan fjernes enkeltvis. **Alle**, **Nulstil** og **Vis alle spil** fjerner både søgning og filtre og gendanner sortering efter titel.

## Sammenhæng med Figma og kortlægningen

- Den nye side bruger de samme farver, to kolonner med filtre og kompakte spilrækker som Figma-eksemplet. Et plus åbner et spils detaljer. Hjerter/favoritter, engelsk oversættelse og spinnehjul er ikke en del af denne filtreringsleverance.
- Figma-billedet indeholder 13 spil, herunder Matador. Kortlægningen indeholder 12 og har ikke Matador. Denne version bruger de 12 kortlagte spil, og antallet beregnes automatisk.
- Sprog og læsemængde er ikke angivet i kortlægningen. Derfor er der ikke et sprogfilter eller et filter for ingen læsning. **Let at lære** er koblet til regelniveauet Let. Tilføj først sprogfiltre, når I har data om de konkrete udgaver.
- Kategorienavne er ensrettet: eksempelvis `Strategi`/`Strategi spil` bliver `Strategispil`. Hitsters `Gættespil med musik` er opdelt i `Gættespil` og `Musik`. Brug de samme betegnelser i Figma.
- Tabellen bruger overskriften `Spilform` til en beskrivelse af, hvad man gør i spillet. Feltet hedder stadig `spilform` i data, men vises som beskrivelsestekst.
- De nye `humoer`-tags er forslag til koblingen til Sjov, Hygge og Battle på forsiden. Tilpas dem efter jeres vurdering og brugertest. Svær-knappen bruger regelniveauet Svær. Ludos stemning er tom i tabellen og er derfor ikke gættet.

## Data, som gruppen bør afklare

1. **Monopoly:** tabellen siger 2–6 eller 2–8 spillere. Filteret bruger foreløbigt 2–6, det fælles interval. Hvis jeres konkrete udgave tillader 8, ændres `antalSpillere` til `[2, 3, 4, 5, 6, 7, 8]` og spillerteksten og noten opdateres.
2. **Partners:** 2 eller 4 er overført fra jeres tabel; kontrollér at det passer til den konkrete udgave.
3. **Hvem er jeg?:** teksten beskriver den hjemmelavede leg med sedler, mens tabellens billede viser en købt æske. Denne version følger teksten. Vælg én udgave, og tilpas alle dens data samlet.
4. **Udstyr og stemning:** tomme felter er tomme arrays og vises som “Ikke angivet”. De øvrige udstyrslister er fra jeres tabel og er ikke nødvendigvis komplette lister over æskernes indhold.
5. **Alder:** tabellens intervaller er bevaret som tekst, fx “Fra ca. 5–7 år”. Alder vises i detaljerne og bruges ikke som filter, da flere værdier endnu er tvetydige. Brug æskens konkrete aldersanbefaling, hvis I senere vil filtrere med `minAlder` som et tal.

## Tilføj produktbilleder

Spillene har monogrammer som i Figma-eksemplet. Sæt en rigtig billedsti på det relevante objekt, når filen findes:

```js
billede: "billeder/uno.png"
```

Billedet vises automatisk i stedet for monogrammet. Filnavnets store/små bogstaver skal passe, også når I udgiver på GitHub Pages.

## Afprøvning

Filtreringslogikken er kontrolleret med 18 automatiske kontroller: alle 12 spil, søgning og mellemrum, kategorier, særlige spillerantal, tidsgrænser, kombinerede filtre, regelniveauer, plads/humør, numerisk sortering, tomme resultater og bevarelse af originaldata.

I browseren er søgning fra begge sider, kombinerede filtre, kategori-menuen, slider med tastatur, nulstilling, sortering, humørknapper og detaljer afprøvet.

Prøv selv:

1. Søg efter `  uNo  ` → UNO.
2. Vælg derefter 18 spillere → ingen resultater.
3. Tryk **Vis alle spil** → 12 spil.
4. Vælg Kortspil og Strategispil → 5 spil.
5. Vælg også 9 spillere og Højst 30 min. → UNO.
6. Nulstil og vælg 3 spillere → Partners er ikke med.
7. Sortér efter længste spilletid → Monopoly øverst.
8. Åbn et spil med plusset → se også alder, udstyr, pladsbehov og stemning.
