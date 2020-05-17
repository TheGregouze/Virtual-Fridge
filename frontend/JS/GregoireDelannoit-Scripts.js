function ajouterProduit(){ 
	let produit = document.getElementById('ajoutProdForm').nouveauProduit.value.toString().toLowerCase();
	let uniteLib = document.getElementById('ajoutProdForm').unite.value;
	let uniteID; //id de l'unité pertinente
	let existeDeja = false;

	for (let i in unitList) {//trouve l'ID de l'unité
		if(unitList[i].unitLib == uniteLib){
			uniteID = unitList[i].unitID;
		}
	}

	for (let i in prodList){//verifie si le produit existe deja, dans quelle cas il notifie l'utilisateur
		if (prodList[i].lib== produit) {
			existeDeja = true;
		}
	}

	if (produit && !existeDeja){//s'assure que le champ n'est pas vide et que un tel produit n'exist pas deja
		let url = "ajouterProduit?produit=" + produit+ "&unite=" + uniteID;
    	let xhr = new XMLHttpRequest();
   		
   	 	xhr.open('get', url, true);
    	xhr.onload = function(){
        	getProduits();//reinitialise la liste des produits en accord avec les données du serveur
        	makeSelect();//reconstruit le select pour l'avoir a jour
        	displayErreure('ok');//se débarasse des potentiels messages d'erreures.
        };
    	xhr.send();
    }else{
    	displayErreure('produit deja existant');//message d'erreure
    }
}
