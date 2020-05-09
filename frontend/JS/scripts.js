'use strict'
let userID;
let prodList;
function getProduits(){
// passe la réponse de la requête ajax demandant la ressource url
// à la fonction fct pour fabriquer le contenu de id
	var xhr = new XMLHttpRequest(); // instancier XMLHttpRequest

	xhr.open('get', "getProduits", true); // préparer

	xhr.onload = // callback : fonction anonyme
		function(){ makeSelect( JSON.parse(xhr.responseText), "produits");		 
	}
	xhr.send(); // envoyer
}

function randomStyle(){
	let num = Math.ceil(Math.random()*3);
	let string = "url(\"img/cube" + num + ".png\")";
	document.getElementsByTagName("html")[0].style.backgroundImage = string;
}


//s'occupe de lancer les eventListeners et fonctions a lancer lors du chargerment
window.onload = function(){
	let loginChange = document.getElementById("loginRegister");
	let userSub = document.getElementById("userIDSubmit");
	let prodSub = document.getElementById("prodSubmit");

	loginChange.addEventListener('click', changeLogin);
	userSub.addEventListener('click', userSubHandler)
	prodSub.addEventListener('click', ajouterFrigo)
	
	getProduits();
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
		if (form.sub.value == "Login"){
			console.log("test login");
			userListRequest(form.username.value, form.pswd.value);

		}else if(form.sub.value == "Register"){
			console.log("test Register");
			userRegister(form.username.value, form.pswd.value);
		}
	}
}

function userListRequest(name, password){
	let xhr = new XMLHttpRequest();
	let userList;

	xhr.open('get','listUsers',true);
	xhr.onload = function(){
		userList = JSON.parse(xhr.responseText); 
		console.log(userList)
		userLogin(userList, name, password)};
	xhr.send();
}

function userLogin(userList, name, password){
	let i = 0;
	let userIndex;
	let existant;

	for(i in userList){
		if(userList[i].username == name){
			existant = true;
			userIndex = i;
		}
	}

	if (existant){
		if(userList[userIndex].pswd == password){
			//loginnn
			console.log("Connection!");
			getUserID(name);

		}else{
			console.log("Mauvais mot de passe");
		}
	}else{
		console.log("compte introuvable")
	}
}

function getUserID(name){
	let xhr = new XMLHttpRequest();
	let url = 'getUserID?username=' + name;
	xhr.open('get', url, true);
	xhr.onload = function(){userID = xhr.responseText; console.log("votre id est = " + xhr.responseText) };
	xhr.send();
}


function makeSelect(prod, id){ // faire une liste déroulante
	prodList = prod;
	var liste = '<select>';
	for(var i in prod){
		liste += '<option value=' + prod[i].id + '>' + prod[i].lib + '</option>';
	}
	liste += '</select>';
	document.getElementById(id).innerHTML += liste;
}


function ajouterFrigo(){

	let form = document.getElementById("formProd");

	if (form.quant.value && form.produits.value){
		let url = "ajouterFrigo?produits=" + form.produits.value + "&quantite=" + form.quant.value + "&userID=" + userID;
		//console.log(url);
		let xhr = new XMLHttpRequest(); // instancier XMLHttpRequest
		xhr.open('get', url, true); // préparer
		xhr.onload = function(){};
		xhr.send(); // envoyer
	}
	let selection;
	for(let i in prodList){
		if (prodList[i].id == form.produits.value)
			selection = prodList[i].lib;
	}

	let ajout = "<tr><td>" + selection + "</td><td>" + form.quant.value + "</td></tr>";
	document.getElementById("frigo").innerHTML += ajout;
}
	


