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

fetch("http://localhost:3000/api/teddies/" + $_GET('id')) //Permet d'afficher les informations du teddy selon l'id de l'URL
    .then(function(response) {
        let myJSON_promise = response.json();
        myJSON_promise.then(function(myJSON) {
            let price_teddy = document.createTextNode(myJSON.price + " euros");
            let name_teddy = document.createTextNode(myJSON.name);
            let image_teddy = myJSON.imageUrl;
            let description_teddy = document.createTextNode(myJSON.description)
            document.getElementById("nom_produit").appendChild(name_teddy);
            document.getElementById("prix_produit").appendChild(price_teddy);
            document.getElementById("image_produit").setAttribute("src", image_teddy);
            document.getElementById("desc_produit").appendChild(description_teddy);

            let nb_colors = myJSON.colors;
            for (let j = 0; j < nb_colors.length; j++) { //Affiche le nombre de couleurs du teddy selon l'API
                let newOption = document.createElement("option");
                let afficherCouleur = document.createTextNode(myJSON.colors[j]);
                document.getElementById("couleur").appendChild(newOption).setAttribute("id", "color" + j);
                document.getElementById("color" + j).setAttribute("value", j)
                document.getElementById("color" + j).appendChild(afficherCouleur);
            }


        })
    })
 


