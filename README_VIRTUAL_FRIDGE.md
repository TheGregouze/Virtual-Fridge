<h1>Virtual Fridge</h1>
<br>
<h2>Objectif:</h2>
<br>
Répertorier et faire l’inventaire des aliments et les stocker dans un espace virtuel.
<h2>Fonctionnalités principales:</h2>
<br>
<ol>
<li>Ajotuer et retirer des aliments au frigo.</li>
<li>Vérifier les quantités.</li>
<li>Montrer une liste de recette qui pourraient être réalisées avec des ingrédients se trouvant dans le frigo.</li>
</ol>
<h2>Fonctionnalités secondaires:</h2>
<br>
Le site propose un systeme de login/register simpliste qui permet de sauvegarder les contenus d'un "frigo"
<h2>Membres</h2>
<br>
<ul>
<li>Delannoit Grégoire</li>
<li>Beaufils Liam</li>
<li>Wets Florian</li>
<li>Schampaert Sebaztyan</li>
</ul>
<br>
<h2>Tables</h2>
<img src="frontend/IMG/tables.png">
<ul>
	<li><strong>tbRecettes: </strong>Contient un identifiant et un libellé pour les recettes</li>
	<li><strong>tbProduits: </strong>Contient une liste des produits, avec un lien vers la table des unitées</li>
	<li><strong>tbRecettesProduits: </strong>Lien entre les recettes et les produits, ainsi que la quantité, en fonction de leur unité, necessaire</li>
	<li><strong>tbUsers: </strong>Contient les identifiant, noms et mots de passe</li>
	<li><strong>tbFrigo: </strong>Met en lien le User avec les produits qu'il possède, ainsi que leur quantité</li>
	<li><strong>tbUnites: </strong>Table des unitées, necessaire pour clairement donner les informations necessaire</li>
</ul>
<br>
<h2>Webservices</h2>
<br>

