'use strict'
let userID; //sert a verifier si l'utilisateur est connecté, et permet de stocker les produits dans le "frigo" correct
let prodList; //liste des denrees reconnues par le systeme
let userList; //stock de manière globale les ID, pseudos et mots de passes des users
let unitList;//liste des unitees
let recetteList;//
let frigoList;

//masque la selection des produit avant connexion, et le formulaire du login après connexion
function displayFormProd(){
	document.getElementById("main").style.display = "inline-block";
	document.getElementById("userID").style.display = "none";
}

function getProduits(){
	let xhr = new XMLHttpRequest(); // instancier XMLHttpRequest

	xhr.open('get', "getProduits", true); // préparer
	xhr.onload = // callback : fonction anonyme

		function(){ prodList = JSON.parse(xhr.responseText);makeSelect();		 
	}
	xhr.send(); // envoyer
}

function makeSelect(){ // faire une liste déroulante des produits
	let liste = '<select>';
	for(let i in prodList){
		liste += '<option value=' + prodList[i].id + '>' + prodList[i].lib + '</option>';
	}
	liste += '</select>';
	document.getElementById("produits").innerHTML += liste;
}


//s'occupe de lancer les eventListeners et fonctions a lancer lors du chargerment
window.onload = function(){
	let loginChange = document.getElementById("loginRegister");
	let userSub = document.getElementById("userIDSubmit");
	let prodSub = document.getElementById("prodSubmit");
	let reset = document.getElementById("reset");
	let ajoutProd = document.getElementById("ajoutProduitBouton");

	loginChange.addEventListener('click', changeLogin);
	userSub.addEventListener('click', userSubHandler);
	prodSub.addEventListener('click', ajouterFrigo);
	reset.addEventListener('click', resetFrigo);
	ajoutProd.addEventListener('click', ajouterProduit);
	
	userListRequest();
	getProduits();
	recupererUnite();
	
}

function suppressionLigne(){
	document.getElementById("frigo").deleteRow(-1);
}

function resetFrigo(){
	document.getElementById("frigo").innerHTML = "<tr><th>Produit</th><th>Quantité</th></tr>";
	let url = 'resetFrigo?userID=' + userID;
	let xhr = new XMLHttpRequest();
	xhr.open('get', url, true);
	xhr.send();
	recupererRecettes();
}

//permet d'avoir une distinction entre une tentative de création de compte et d'une connexion a un compte
function changeLogin(){
	let sub = document.getElementById('userIDSubmit');
	if (sub.value == "Login"){
		sub.value = "Register";
	}else{
		sub.value = "Login";
	}
}

//dirige les infos vers la fonction adéquate
function userSubHandler(){

	let form = document.getElementById("userID");

	if(form.username.value && form.pswd.value){//si les deux champs ne sont pas remplis, rien ne se passe du coté JS, la page affiche que les champs sont requis
		userListRequest();
		if (form.sub.value == "Login"){
			//console.log("test login");
			setTimeout(function(){userLogin(form.username.value, form.pswd.value);}, 100);//necessaire car sinon la requete est plus lente que la tentative de recuperation des donnes
		}else if(form.sub.value == "Register"){
			//console.log("test Register");
			userRegister(form.username.value, form.pswd.value);
		}
	}
}

function userListRequest(){ //recuperation de la liste des IDS , psuedos et mot de passes
	let xhr = new XMLHttpRequest();
	xhr.open('get','listUsers',true);
	xhr.onload = function(){
		userList = JSON.parse(xhr.responseText); 
		//console.log(userList)
		};
	xhr.send();
}

function userExiste(name){//retourne faux si l'utilisateur n'existe pas, vrai sinon

	for(let i in userList){
		//console.log(userList[i].username);
		if(userList[i].username == name){
			return true;
		}
	}
	return false;
}

function userLogin(name, password){
	if (userExiste(name)){
		let uIndex;
		for (let i in userList){
			if(userList[i].username == name){
				uIndex = i;
			}
		}
		if(userList[uIndex].pswd == password){//test si le mot de passe est valide	
			console.log("Connection!");
			getUserID(name);
			displayFormProd();
			setTimeout(function(){recupererFrigo();recupererRecettes();},100);//idem que le precedent
		}else{
			console.log("Mauvais mot de passe");
		}
	}else{
		console.log("compte introuvable");
	}
}

function getUserID(name){
	let xhr = new XMLHttpRequest();
	let url = 'getUserID?username=' + name;
	xhr.open('get', url, true);
	xhr.onload = function(){userID = xhr.responseText; console.log("votre id est = " + xhr.responseText) };
	xhr.send();
}

function userRegister(name, password){
	if (!userExiste(name)){//si le nom est libre
		let xhr = new XMLHttpRequest();
		let url = 'register?username=' + name + '&password=' + password;

		xhr.open('get', url, true);
		xhr.onload = function(){
			userID = xhr.responseText;
			displayFormProd();
		}
		xhr.send();
	}else{
		console.log('non disponible');
	}
	userListRequest();
}

function recupererFrigo(){
	let xhr = new XMLHttpRequest();
	let url = 'recupererFrigo?userID=' + userID;

	xhr.open("get", url, true);
	xhr.onload = function(){construireTableFrigo(xhr)};
	xhr.send();
}

function construireTableFrigo(xhr){
	frigoList = JSON.parse(xhr.responseText);
	let tableFrigo = "";
	//console.log(frigoList);
	for(let i in frigoList){
		tableFrigo += "<tr><td>" + frigoList[i].lib + "</td><td>" + frigoList[i].quant + "</td><td>" + frigoList[i].libUnit + "</td></tr>";
	}

	document.getElementById('frigo').innerHTML = "<tr><thead><strong>Votre frigo :</strong></thead></tr><tr><th>Produit</th><th>Quantité</th><th></th></tr>"
	document.getElementById('frigo').innerHTML += tableFrigo;
}

function ajouterFrigo(){
	let form = document.getElementById("formProd");

	if (form.quant.value && form.produits.value){
		let url = "ajouterFrigo?produits=" + form.produits.value + "&quantite=" + form.quant.value + "&userID=" + userID;
		//formation de l'url a partir du produit, sa quantite, et le user ID
		let xhr = new XMLHttpRequest(); // instancier XMLHttpRequest
		xhr.open('get', url, true); // préparer
		xhr.onload = function(){};
		xhr.send(); // envoyer
		setTimeout(function(){recupererFrigo();recupererRecettes();},100);

    }
}

function ajouterProduit(){ 
	let produit = document.getElementById('ajoutProdForm').nouveauProduit.value;
	let uniteLib = document.getElementById('ajoutProdForm').unite.value;
	let unite;
	let existeDeja = false;

	for (let i in unitList) {
		if(unitList[i].unitLib == uniteLib){
			unite = unitList[i].unitID;
		}
	}
	for (let i in prodList){
		if (prodList[i].lib== produit) {
			existeDeja = true;
		}
	}

	if (produit && !existeDeja){//s'assure que le champ n'est pas vide et que un tel produit n'exist pas deja
		let url = "ajouterProduit?produit=" + produit+ "&unite=" + unite;
    	let xhr = new XMLHttpRequest();
   		
   	 	xhr.open('get', url, true);
    	xhr.onload = function(){
        	getProduits();
        	makeSelect()
        };
    	xhr.send();
    }else{
    	console.log('produit deja existant');
    }


}

function recupererUnite(){
	let xhr = new XMLHttpRequest();

    xhr.open('get','recupererUnite',true);
    xhr.onload = construireSelectUnite;
    xhr.send();
}

function construireSelectUnite(){
	unitList = JSON.parse(this.responseText);
	let liste='';
	for (let i of unitList) {
         liste += "<option value='"+i.unitLib+"'>"+ i.unitLib +"</option>";
    }
	document.getElementById('unite').innerHTML = liste;
}
	

function recupererRecettes(){
	let xhr = new XMLHttpRequest();
    xhr.open('get','recupererRecette',true);
    xhr.onload = function(){recetteList = JSON.parse(this.responseText);};
    xhr.send();

    setTimeout(function(){analyseRecettes();}, 100);
}

function analyseRecettes(){ //permet de genere la table des recettes dont des ingrédients son disponible
	//je suis au courrant que ceci est fort mal implémenté mais ça foncitonne
	let recetteArrayCount = [];
	let recetteArray = []
	let changeRec = "";
	let recettesValides = "<thead><tr><th>Recettes</th><th>Produits</th><th>Quantité</th></tr></thead><tbody></tbody>";

	for (let i in recetteList){
		if(recetteList[i].rctLib != changeRec){
			changeRec = recetteList[i].rctLib;
			recetteArray.push(changeRec);
			recetteArrayCount.push(0);
		}
	}

	for (let i in recetteList){
		for (let j in frigoList){
			if(frigoList[j].lib == recetteList[i].prodLib){
				for (let k in recetteArray){
					if(recetteList[i].rctLib == recetteArray[k]){
						recetteArrayCount[k]++;
					}
				}
			}
		}
	}
	//console.log(recetteArray + recetteArrayCount);
	for (let l = 0; l < recetteArrayCount.length; l++){
		if (recetteArrayCount[l] > 0){
			//console.log(recetteArray[l]);

			recettesValides += "<tr><td>" +  recetteArray[l] + "</td><td>" + elementsDeRecetteValide(recetteArray[l], "prodLib") + "</td><td>" + elementsDeRecetteValide(recetteArray[l], "prodQuant") + "</td></tr>"//
		}
	}
	//console.log(recettesValides);
	document.getElementById('tableRecettes').innerHTML = recettesValides;
}


function elementsDeRecetteValide(recette, colonne){//permet de generer une string pour remplir la table des recettes, les mets en gras si l'élément est possédé par l'utilisateur
	let produits = "";
	let strong = false;

	for (let i in recetteList){
		if(recette == recetteList[i].rctLib){

			for (let x in frigoList){
				if(recetteList[i].prodLib == frigoList[x].lib){
					produits += '<strong>' + recetteList[i][colonne] + '</strong>, ';
					strong = true;
				}
			}
			if (!strong){
				produits += recetteList[i][colonne] + ', ';
			}
		}strong = false;
	}
	return produits;
}