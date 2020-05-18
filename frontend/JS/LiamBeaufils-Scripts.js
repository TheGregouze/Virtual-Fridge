function recupererRecettes(){
	let xhr = new XMLHttpRequest();
    xhr.open('get','recupererRecette',true);
    xhr.onload = analyseRecettes;
    xhr.send();
}
-----------------

function compteProduit() {
    let xhrCompteur= new XMLHttpRequest();

    xhrCompteur.open('get', "NombreProduit", true);
    xhrCompteur.onload = traitementCompteur;
    xhrCompteur.send();
}

function traitementCompteur() {
    console.log(JSON.parse(this.responseText));
    let nombre = JSON.parse(this.responseText)[0].nbr;
    console.log(nombre + typeof(nombre));
    document.getElementById('compteProduit').innerHTML = nombre + " produits";
}
