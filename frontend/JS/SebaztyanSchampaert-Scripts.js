function ajouterFrigo(){
	let form = document.getElementById("formProd");

	if (form.quant.value && form.produits.value){
		let url = "ajouterFrigo?produits=" + form.produits.value + "&quantite=" + form.quant.value + "&userID=" + userID;
		//formation de l'url a partir du produit, sa quantite, et le user ID
		let xhr = new XMLHttpRequest(); // instancier XMLHttpRequest
		xhr.open('get', url, true); // préparer
		xhr.onload = recupererFrigo;
	
		xhr.send(); // envoyer
    }
}

function recupererFrigo(){//va chercher le contenu d'un frigo associé a l'id de l'utilisateur connecté
	let xhr = new XMLHttpRequest();
	let url = 'recupererFrigo?userID=' + userID;

	xhr.open("get", url, true);
	xhr.onload = construireTableFrigo;
	xhr.send();
}

function construireTableFrigo(){//construir la table des produits dans le frigo associé a l'ID de l'utilisateur, et l'affiche sur la page dynamiquement
	//console.log(this.responseText);
	frigoList = JSON.parse(this.responseText);
	let tableFrigo = "";
	//console.log(frigoList);
	for(let i in frigoList){
		tableFrigo += "<tr><td>" + frigoList[i].lib + "</td><td>" + frigoList[i].quant + "</td><td>" + frigoList[i].libUnit + "</td></tr>";
	}//construction du corp de la table

	document.getElementById('frigo').innerHTML = "<tr><thead><strong>Votre frigo :</strong></thead></tr><tr><th>Produit</th><th>Quantité</th><th></th></tr>"
	document.getElementById('frigo').innerHTML += tableFrigo;
	analyseRecettes();
	recupererRecettes();//permet de rafraichir la table des recettes en allant 
}

//-------------------

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
		userListRequest()	
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

//--------------------------


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
