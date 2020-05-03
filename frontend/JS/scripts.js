
function xhrReqJson(url, fct, id){
// passe la réponse de la requête ajax demandant la ressource url
// à la fonction fct pour fabriquer le contenu de id
	var xhr = new XMLHttpRequest(); // instancier XMLHttpRequest
	xhr.open('get', url, true); // préparer
	xhr.onload = // callback : fonction anonyme
		function(){ console.log(xhr.responseText + xhr.responseText.length);
			fct( JSON.parse(xhr.responseText), id); 
		}
	xhr.send() // envoyer
}

function getProduits(){
	xhrReqJson(getProduits, makeSelect, ingredients);
}

function makeSelect(lng, id){ // faire une liste déroulante
	var liste = '<select onChange="setLang(this);">';
	for(var i in lng){
		liste += '<option value=' + lng[i].id + '>' + lng[i].lib + '</option>';
	}
	liste += '</select>';
	setElem(id, liste);
}