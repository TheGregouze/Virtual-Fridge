function recupererRecettes(){
	let xhr = new XMLHttpRequest();
    xhr.open('get','recupererRecette',true);
    xhr.onload = analyseRecettes;
    xhr.send();
}
-----------------
	
	
function recupProduit() {
	let xhr = new XMLHttpRequest();

	xhr.open('get', "NombreProduit", true);
	xhr.onload = traitement;
	xhr.send();
}

function traitement() {
	let reponse = JSON.parse(this.response)
	let nombre = reponse[0].nbr;
	document.getElementById('nombreP').innerHTML = "un des "+ nombre + " produits";
}
