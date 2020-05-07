function randomStyle(){
	let num = Math.ceil(Math.random()*3);
	let string = "url(\"img/cube" + num + ".png\")";
	document.getElementsByTagName("html")[0].style.backgroundImage = string;
}


function xhrReqJson(url, fct, id){
// passe la réponse de la requête ajax demandant la ressource url
// à la fonction fct pour fabriquer le contenu de id
	var xhr = new XMLHttpRequest(); // instancier XMLHttpRequest

	xhr.open('get', url, true); // préparer

	xhr.onload = // callback : fonction anonyme
		function(){ fct( JSON.parse(xhr.responseText), id);		 
	}
	xhr.send(); // envoyer
}

function getProduits(){
	xhrReqJson("getProduits", makeSelect, "ingredients");
}


function setElem(id, content){
	document.getElementById(id).innerHTML += content;
}

function makeSelect(prod, id){ // faire une liste déroulante
	var liste = '<select>';
	for(var i in prod){
		liste += '<option value=' + prod[i].id + '>' + prod[i].lib + '</option>';
	}
	liste += '</select>';
	document.getElementById(id).innerHTML += liste;
}

function ajouterDansFrigo(bouton){
	let form = bouton.form;
	if (form.quant.value != false){
		let url = "localhost/ajouterDansFrigo?ingredient=" + form.ingredients.value + "&quantite=" + form.quant.value;
		console.log(url);
		let xhr = new XMLHttpRequest(); // instancier XMLHttpRequest
		// call proc_ajouterDansFrigo('oeuf', 3, '01-01-2020') ((SQL))
		// localhost/ajouterDansFrigo?ingredient=oeuf&quantite=3&dateAjout=01-01-2020 ((Browser)) construit en JS
		//let url = "ajouterDansFrigo?" + "quantite=" + formulaire.quant.value + 
		xhr.open('get', url, true); // préparer
		xhr.onload = confirmerEnregistrement;
		xhr.send() // envoyer
	}
}

function confirmerEnregistrement(){
	console.log( JSON.parse(this.responseText));
}


function userVerification(bouton){
	let form = bouton.form;
	let username = form.username.value;
	let password = form.pswd.value;

	if (username != 0 & password != 0){
		let url = "localhost/verifierUser?username=" + username + "&password=" + password;
		let xhr = new XMLHttpRequest();

		xhr.open('get', url, true);
		xhr.send();

		console.log(xhr.responseText);
	}

}
