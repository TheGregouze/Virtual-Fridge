'use strict'
let userID; //sert a verifier si l'utilisateur est connecté, et permet de stocker les produits dans le "frigo" correct
let prodList; //liste des denrees reconnues par le systeme
let userList; //stock de manière globale les ID, pseudos et mots de passes des users

//masque la selection des produit avant connexion, et le formulaire du login après connexion
function displayFormProd(){
	document.getElementById("formProd").style.display = "flex";
	document.getElementById("userID").style.display = "none";
}

function getProduits(){
	let xhr = new XMLHttpRequest(); // instancier XMLHttpRequest

	xhr.open('get', "getProduits", true); // préparer
	xhr.onload = // callback : fonction anonyme
		function(){ makeSelect( JSON.parse(xhr.responseText), "produits");		 
	}
	xhr.send(); // envoyer
}

function makeSelect(prod, id){ // faire une liste déroulante des produits
	prodList = prod; //permet d'acceder globalement a la liste 
	let liste = '<select>';
	for(let i in prod){
		liste += '<option value=' + prod[i].id + '>' + prod[i].lib + '</option>';
	}
	liste += '</select>';
	document.getElementById(id).innerHTML += liste;
}


//s'occupe de lancer les eventListeners et fonctions a lancer lors du chargerment
window.onload = function(){
	let loginChange = document.getElementById("loginRegister");
	let userSub = document.getElementById("userIDSubmit");
	let prodSub = document.getElementById("prodSubmit");
	let reset = document.getElementById("reset");

	loginChange.addEventListener('click', changeLogin);
	userSub.addEventListener('click', userSubHandler);
	prodSub.addEventListener('click', ajouterFrigo);
	reset.addEventListener('click', resetFrigo);
	
	getProduits();
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
			setTimeout(function(){userLogin(form.username.value, form.pswd.value);}, 500);//necessaire car sinon la requete est plus lente que la tentative de recuperation des donnes
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
		console.log(userList)
		};
	xhr.send();
}

function userIndex(name){//retourne -1 si l'utilisateur n'existe pas, et le position dans le tableau userList si oui
	let i = 0;
	let userIndex = -1; 
	for(i in userList){
		if(userList[i].username == name){
			userIndex = i;
		}
	}
	return userIndex; 
}

function userLogin(name, password){
	
	let uIndex = userIndex(name);

	if (uIndex >= 0){
		if(userList[uIndex].pswd == password){//test si le mot de passe est valide	
			console.log("Connection!");
			getUserID(name);
			displayFormProd();
			setTimeout(function(){recupererFrigo();},500);//idem que le precedent
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
	let uIndex = userIndex(name);

	if (uIndex == -1){//si le nom est libre
		console.log('nouv ercreat');
		let xhr = new XMLHttpRequest();
		let url = 'register?username=' + name + '&password=' + password;

		xhr.open('get', url, true);
		xhr.onload = function(){
			userID = xhr.responseText;
			displayFormProd();
		}
		xhr.send();
	}else{
		console.log('not available');
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
	let frigo;
	frigo = JSON.parse(xhr.responseText);
	let tableFrigo;
	console.log(frigo);
	for(let i in frigo){
		tableFrigo = "<tr><td>" + frigo[i].lib + "</td><td>" + frigo[i].quant + "</td><td>" + frigo[i].libUnit + "</td></tr>";
	}
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
	
	let selection;
	for(let i in prodList){
		if (prodList[i].id == form.produits.value)
			selection = prodList[i];
	}

	let ajout = "<tr><td>" + selection.lib + "</td><td>" + form.quant.value + "</td><td>" + selection.libUnit + "</td></tr>";
	document.getElementById("frigo").innerHTML += ajout;

    }
}
	


