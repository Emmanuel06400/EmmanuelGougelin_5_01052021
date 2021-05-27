function $_GET(param) {// Fonction pour récupérer les paramètre dans l'URL
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}

fetch("http://localhost:3000/api/teddies/" + $_GET('id')) // J'affiche les informations du teddy selon la key id de l'URL
    .then(function(response) { //fonction pour nous retourné les données
        let myJSON_promise = response.json();//Je transforme les données en format json
        return myJSON_promise
    })
    .then(function(myJSON) {
        let price_teddy = document.createTextNode(myJSON.price + " euros");//je créé une variable pour afficher les données
        let name_teddy = document.createTextNode(myJSON.name);
        let image_teddy = myJSON.imageUrl;
        let description_teddy = document.createTextNode(myJSON.description)
        document.getElementById("nom_produit").appendChild(name_teddy);// A partir d'une id HTML, j'enfante la variable créé précedemment
        document.getElementById("prix_produit").appendChild(price_teddy);
        document.getElementById("image_produit").setAttribute("src", image_teddy);
        document.getElementById("desc_produit").appendChild(description_teddy);

        let nb_colors = myJSON.colors;
        for (let j = 0; j < nb_colors.length; j++) { //Avec une boucle, je repète l'opération en fonction du nombre de couleurs du teddy 
            let newOption = document.createElement("option");//je créé une variable qui génère l'élément option
            let afficherCouleur = document.createTextNode(myJSON.colors[j]);//je créé une variable pour afficher les couleurs
            document.getElementById("couleur").appendChild(newOption).setAttribute("id", "color" + j);// A partir d'une id HTML, j'enfante la variable créé précedemment
            document.getElementById("color" + j).setAttribute("value", j)// A partir d'une id HTML, je rajoute une attribut
            document.getElementById("color" + j).appendChild(afficherCouleur);
        }


    })
 



