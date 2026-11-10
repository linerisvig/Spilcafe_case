
function opdaterSpil() {

/*
Kilder - W3Schools

getElementById():
https://www.w3schools.com/jsref/met_document_getelementbyid.asp

querySelector():
https://www.w3schools.com/jsref/met_document_queryselector.asp

filter():
https://www.w3schools.com/jsref/jsref_filter.asp

forEach():
https://www.w3schools.com/jsref/jsref_foreach.asp

sort():
https://www.w3schools.com/js/js_array_sort.asp

toLowerCase():
https://www.w3schools.com/jsref/jsref_tolowercase.asp

trim():
https://www.w3schools.com/jsref/jsref_trim_string.asp

String includes():
https://www.w3schools.com/jsref/jsref_includes.asp

Array includes():
https://www.w3schools.com/jsref/jsref_includes_array.asp

join():
https://www.w3schools.com/jsref/jsref_join.asp

innerHTML:
https://www.w3schools.com/jsref/prop_html_innerhtml.asp
*/

  //  værdier fra HTML
  let soegning = document.getElementById("soeg").value;
  soegning = soegning.toLowerCase().trim();

  let kategori = document.querySelector('input[name="kategori"]:checked').value;
  let tid = Number(document.getElementById("tid").value);
  let sortering = document.getElementById("sortering").value;

  document.getElementById("tidtekst").innerHTML = tid;


  // Søg ---spilnavn
  function tjekNavn(etSpil) {
    return etSpil.navn.toLowerCase().includes(soegning);
  }

  let resultat = spil.filter(tjekNavn);




  // kategori
  function tjekKategori(etSpil) {
    if (kategori == "") {
      return true;
    }

    return etSpil.kategorier.includes(kategori);
  }

     resultat = resultat.filter(tjekKategori);




  // spilletid
  function tjekTid(etSpil) {
    return etSpil.maxTid <= tid;
  }

  resultat = resultat.filter(tjekTid);


  // Sorter spil
  if (sortering == "titel") {
    resultat.sort(function(a, b) {
      let x = a.navn.toLowerCase();
      let y = b.navn.toLowerCase();

      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      } 
      return 0;
    });;
  }



  
  if (sortering == "tid") {
        resultat.sort(function(a, b) {
      return a.maxTid - b.maxTid;
    });
  }


if (sortering == "flest-spillere") {
       resultat.sort(function(a, b) {
    let flestA = a.antalSpillere[a.antalSpillere.length - 1];
    let flestB = b.antalSpillere[b.antalSpillere.length - 1];

    return flestB - flestA;
  });;
}



  // spillkortene
  let tekst = "";

  function visSpil(etSpil) {

    tekst += "<div class='spilkort'>";

    if (etSpil.billede != "") {
      tekst += "<img src='" + etSpil.billede + "' alt='" + etSpil.navn + "'>";
    }

         tekst += "<div>";
         tekst += "<h3>" + etSpil.navn + "</h3>";
         tekst += "<p>" + etSpil.kategorier.join(", ") + "</p>";
          tekst += "<p>" + etSpil.spillerTekst + "</p>";
         tekst += "<p>" + etSpil.minTid + "-" + etSpil.maxTid + " min.</p>";
         tekst += "</div>";
         tekst += "</div>";
       }

      resultat.forEach(visSpil);

      document.getElementById("resultater").innerHTML = tekst;
     }

opdaterSpil();;