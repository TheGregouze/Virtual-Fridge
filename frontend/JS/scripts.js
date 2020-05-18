'use strict'

//VARIABLES GLOBALES

let userID; //sert a verifier si l'utilisateur est connecté, et permet de stocker les produits dans le "frigo" correct
let prodList; //liste des denrées reconnues par le systeme
let userList; //stocke de manière globale les ID, pseudos et mots de passes des users
let unitList;//liste des unitees
let recetteList;//liste des recettes et produit associé.
let frigoList;//liste des produits et leur quantité dan sle frigo actuel



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
	compteProduit();
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
