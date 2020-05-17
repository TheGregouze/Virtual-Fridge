'use strict'

//VARIABLES GLOBALES

let userID; //sert a verifier si l'utilisateur est connecté, et permet de stocker les produits dans le "frigo" correct
let prodList; //liste des denrées reconnues par le systeme
let userList; //stocke de manière globale les ID, pseudos et mots de passes des users
let unitList;//liste des unitees
let recetteList;//liste des recettes et produit associé.
let frigoList;//liste des produits et leur quantité dan sle frigo actuel

let recettesValidesList;
//INITIALISATION ET AFFICHAGES

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

//masque la selection des produit avant connexion, et le formulaire du login après connexion
function displayFormProd(){
	document.getElementById("main").style.display = "inline-block";
	document.getElementById("userID").style.display = "none";
}

//permet l'affichage des messages d'erreures ainsi que le effacement
function displayErreure(erreure){
	let erreureDiv = document.getElementById('erreure');
	if (erreure == 'ok'){
		erreureDiv.style.display = 'none';
	}else{
		erreureDiv.style.display = 'inline-block';
		erreureDiv.innerHTML = "Erreure : " + erreure;
	}
}




//SYSTEMES DE LOGIN ET UTILISATEURS


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
		if (form.sub.value == "Login"){
			//console.log("test login");
			userLogin(form.username.value, form.pswd.value);
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
			//console.log("Connection!");
			getUserID(name);
			displayErreure('ok');
		}else{
			displayErreure("Mauvais mot de passe");
		}
	}else{
		displayErreure("Compte introuvable");
	}
}

function getUserID(name){
	let xhr = new XMLHttpRequest();
	let url = 'getUserID?username=' + name;
	xhr.open('get', url, true);
	xhr.onload = function(){
			userID = xhr.responseText; 
			//console.log("votre id est = " + xhr.responseText); 
			displayFormProd();
			recupererFrigo();
			};
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
			userListRequest();
		}
		xhr.send();
		displayErreure('ok');
	}else{
		displayErreure('Pseudo non disponible');
	}	
}



//SYSTEMES POUR GERER LE FRIGO ET RECETTES


function recupererFrigo(){
	let xhr = new XMLHttpRequest();
	let url = 'recupererFrigo?userID=' + userID;

	xhr.open("get", url, true);
	xhr.onload = construireTableFrigo;
	xhr.send();
}

function construireTableFrigo(){
	//console.log(this.responseText);
	frigoList = JSON.parse(this.responseText);
	let tableFrigo = "";
	//console.log(frigoList);
	for(let i in frigoList){
		tableFrigo += "<tr><td>" + frigoList[i].lib + "</td><td>" + frigoList[i].quant + "</td><td>" + frigoList[i].libUnit + "</td></tr>";
	}

	document.getElementById('frigo').innerHTML = "<tr><thead><strong>Votre frigo :</strong></thead></tr><tr><th>Produit</th><th>Quantité</th><th></th></tr>"
	document.getElementById('frigo').innerHTML += tableFrigo;
	recupererRecettes();
}

function ajouterFrigo(){
	let form = document.getElementById("formProd");

	if (form.quant.value >= 1 && form.produits.value){
		let url = "ajouterFrigo?produits=" + form.produits.value + "&quantite=" + form.quant.value + "&userID=" + userID;
		//formation de l'url a partir du produit, sa quantite, et le user ID
		let xhr = new XMLHttpRequest(); // instancier XMLHttpRequest
		xhr.open('get', url, true); // préparer
		xhr.onload = recupererFrigo;
			
		xhr.send(); // envoyer
    }
}

function ajouterProduit(){ 
	let produit = document.getElementById('ajoutProdForm').nouveauProduit.value.toString().toLowerCase();
	let uniteLib = document.getElementById('ajoutProdForm').unite.value;
	let unite;
	let existeDeja = false;

	if (produit.length < 30 ) {

		for (let i in unitList) {//trouve l'ID de l'unité
			if(unitList[i].unitLib == uniteLib){
				unite = unitList[i].unitID;
			}
		}

		for (let i in prodList){//verifie si le produit existe deja
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
	        	makeSelect();
	        	displayErreure('ok');
	        };
	    	xhr.send();
	    }else{
	    	displayErreure('Produit deja existant');
	    }
	}else{
		displayErreure('Le nom dépasse la limite de 30 caractères');
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
    xhr.onload = function(){
    	recetteList = JSON.parse(xhr.responseText);
    	comparaisonRecettesFrigo();
    }
    xhr.send();
}

function comparaisonRecettesFrigo(){
	let xhr = new XMLHttpRequest();

	xhr.open('get', 'comparaisonRecettesFrigo?userID=' + userID, true)
	xhr.onload = analyseRecettes;
	xhr.send();
}

function analyseRecettes(){ //permet de genere la table des recettes dont des ingrédients son disponible
	let recettesValides = "<thead><tr><th>Recettes</th><th>Produits</th><th>Quantité</th></tr></thead><tbody></tbody>";
	recettesValidesList = JSON.parse(this.responseText);
	//console.log(recettesValidesList);

	for (let i in recettesValidesList){
		recettesValides += "<tr><td>" +  recettesValidesList[i].recetteLib + "</td><td>" + elementsDeRecetteValide(recettesValidesList[i].recetteLib, "prodLib") + "</td><td>" + elementsDeRecetteValide(recettesValidesList[i].recetteLib, "prodQuant") + "</td></tr>"
	}
	//console.log(recettesValides);
	document.getElementById('tableRecettes').innerHTML = recettesValides;
}

function elementsDeRecetteValide(recette, colonne){//permet de generer une string pour remplir la table des recettes, les mets en gras si l'élément est possédé par l'utilisateur
	let liste = "";
	let strong = false;

	for (let i in recetteList){
		if(recette == recetteList[i].rctLib){

			for (let x in frigoList){
				if(recetteList[i].prodLib == frigoList[x].lib){
					liste += '<strong>' + recetteList[i][colonne] + '</strong>, ';
					strong = true;
				}
			}

			if (!strong){
				liste += recetteList[i][colonne] + ', ';
			}
		}strong = false;
	}
	return liste;
}

//recuperer la liste des produits sur le serveur
function getProduits(){
	let xhr = new XMLHttpRequest(); // instancier XMLHttpRequest

	xhr.open('get', "getProduits", true); // préparer
	xhr.onload = // callback : fonction anonyme
			function(){ prodList = JSON.parse(xhr.responseText);
			makeSelect();		 
	}
	xhr.send(); // envoyer
}

function trierListe(attribut) {//permet de trier une liste donnée en format JSON selon un certain attribut
    return function(a, b) {    //algorithme pour le sort qui se trouve dans le makeselect
        if (a[attribut] > b[attribut]) {    
            return 1;    
        } else if (a[attribut] < b[attribut]) {    
            return -1;
        }    
        return 0;    
    }    
}    

function makeSelect(){ // faire une liste déroulante alphabétiquement triée des produits
	let liste;
	prodList.sort(trierListe('lib'));
	for(let i in prodList){
		liste += '<option value=' + prodList[i].id + '>' + prodList[i].lib + '</option>';
	}

	document.getElementById("produits").innerHTML = liste;
}

function resetFrigo(){
	//document.getElementById("frigo").innerHTML = "<tr><th>Produit</th><th>Quantité</th></tr>";

	let url = 'resetFrigo?userID=' + userID;//efface le frigo
	let xhr = new XMLHttpRequest();
	xhr.open('get', url, true);
	xhr.onload = function(){
		recupererRecettes();//rafraichir la liste des recettes
		recupererFrigo();//rafraichir le frigo
	}
	xhr.send();
	frigoList = [];//vide le frigo coté client
	displayErreure('ok');
}