//Fonction pour récupérer les paramètre dans l'URL
function $_GET(param) {
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

// Fonction pour récuperer les articles via leurs id
function getArticlesWithId() {
    return fetch("http://localhost:3000/api/teddies/" + $_GET('id')) 
    .then(function(response) { //fonction pour nous retourné les données
        let myJSON_promise = response.json();// transforme les données en format json
        return myJSON_promise
    })
}

// Fonction qui affiche l'article sélectionné
function showArticlesSelected(myJSON) {
        let price_teddy = document.createTextNode(myJSON.price/100 + " euros");//je créé une variable pour afficher les données
        let name_teddy = document.createTextNode(myJSON.name);
        let image_teddy = myJSON.imageUrl;
        let description_teddy = document.createTextNode(myJSON.description)
        document.getElementById("nom_produit").appendChild(name_teddy);// A partir d'une id HTML, j'enfante la variable créé précedemment
        document.getElementById("prix_produit").appendChild(price_teddy);
        document.getElementById("image_produit").setAttribute("src", image_teddy);
        document.getElementById("desc_produit").appendChild(description_teddy);

        let nb_colors = myJSON.colors; 
        for (let j = 0; j < nb_colors.length; j++) { //Avec une boucle, je repète l'opération en fonction du nombre de couleurs du teddy 
            let newOption = document.createElement("option");//Création de l'élément option
            let afficherCouleur = document.createTextNode(myJSON.colors[j]);//je créé une variable pour afficher les couleurs
            document.getElementById("couleur").appendChild(newOption).setAttribute("id", "color" + j);// A partir d'une id HTML, j'enfante la variable créé précedemment
            document.getElementById("color" + j).setAttribute("value", j)// A partir d'une id HTML, je rajoute une attribut
            document.getElementById("color" + j).appendChild(afficherCouleur);
            if (j === 0) {
            document.getElementById("color" + j).selected = true;//Si aucune sélection la couleur est la première par defaut
            }
        }
}

 
//----------------------Le local storage---------------------//


  //Fonction ajouté un nouvel article dans le panier
  function addNewArticle(myJSON) {
    let teddyCouleur = document.getElementById('couleur').value; //Je récupére la couleur
    let tableau = JSON.parse(localStorage.getItem("panier")) || []; // Je récupère le panier OU je creer un tableau 

    let nouvelArticle = new Object() //Création de l'objet teddy selon les paramètres du teddy de la page
    nouvelArticle.name = myJSON.name;
    nouvelArticle.price = myJSON.price/100;
    nouvelArticle.id = myJSON._id;
    nouvelArticle.color = myJSON.colors[teddyCouleur];
    nouvelArticle.quantity = 1;
    nouvelArticle.img = myJSON.imageUrl;
    let ajoutArticle = true

    tableau.forEach(element => { //j'incrémente la quantité du teddy si id et color sont identiques à un teddy existant
        if (element.id == nouvelArticle.id && element.color == nouvelArticle.color) {
            ajoutArticle = false;
            element.quantity++;
            localStorage.setItem("panier", JSON.stringify(tableau));//envoie les données en .json avec la methode stringify au local storage
        }
    });
    
    if (ajoutArticle) { //Si le teddy n'existe pas dans le panier, ajout du teddy dans localstorage
        tableau.push(nouvelArticle);
        localStorage.setItem("panier", JSON.stringify(tableau));
    }
  }

// La fonction pour générer les articles est appelé après avoir recuperer l'ID de l'article sélectionné
getArticlesWithId().then(function(myJSON) {
    showArticlesSelected(myJSON); 
    console.log(myJSON)
})

//Au click la fonction d'ajout au panier s'active
document.getElementById("btn_ajout_panier").onclick = function() {
    getArticlesWithId()
        .then(function(myJSON) {
            addNewArticle(myJSON)
        })
};
console.log(getArticlesWithId())
