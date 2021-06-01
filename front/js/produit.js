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

function getArticlesWithId() {
    return fetch("http://localhost:3000/api/teddies/" + $_GET('id')) // J'affiche les informations du teddy selon la key id de l'URL
    .then(function(response) { //fonction pour nous retourné les données
        let myJSON_promise = response.json();//Je transforme les données en format json
        return myJSON_promise
    })
}

getArticlesWithId().then(function(myJSON) {
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
            if (j === 0) {
            document.getElementById("color" + j).selected = true;
            }
        }


    })

 
//----------------------Le local storage---------------------//

//Fonction ajouter un produit dans le localStorage
function ajoutProduitLocalStorage() {
    localStorage.setItem("panier", JSON.stringify(tableau));
  }

  //Fonction tableau pour un nouvelle article selectionnée
  function tableauNouvelArticle() {
      
  }

    document.getElementById("btn_ajout_panier").onclick = 
    function ajoutArticlePanier() { //Au click la fonction d'ajout au panier s'active
        let teddyCouleur = document.getElementById('couleur').value; //Je créé une variable pour récupérer la couleur
             
         
        getArticlesWithId().then(function(myJSON) {
    
                    let tableau = []
                    tableau = JSON.parse(localStorage.getItem("panier")) || []; //Avec la methode .parse je transforme une chaine json en objet jvscrit et je Créé d'un tableau avec la key panier 
    
                    let nouvelArticle = new Object() //Création de l'objet teddy selon les paramètres du teddy de la page
                    nouvelArticle.name = myJSON.name;
                    nouvelArticle.price = myJSON.price;
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
                })
            }
        


/*
    //----------------------Nouveau test fonctionnel---------------------//

            main()

            function main() {
               const articles = await getArticles()
               const displayArticles =  displayArticles()
               console.log(displayArticles)
               
           }
       
            function getArticles() {
               return fetch("http://localhost:3000/api/teddies/" + $_GET('id'))
                   .then(function(response) {
                       let myJSON_promise = response.json();
                       return myJSON_promise
                   })
                   .then(function(articles) {
                       return articles
                   })
                   .catch(function(error) {
                       alert(Error)
                   })
               }
       
               function displayArticles() {
                   return fetch("http://localhost:3000/api/teddies/" + $_GET('id'))
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
                           if (j === 0) {
                           document.getElementById("color" + j).selected = true;
                           }
                       }
               
               
                   })
               }
    

            function getDataPromise() {
                return new Promise((resolve: PromiseResolve<number>, reject: PromiseReject): void => {
                getData((error, data) => {
                if (error) reject(error)
                else resolve(data)
                });
                });
                } 
        
                let ajax = function (url) {
                    // On renvoie une promesse qui prend en paramettre une fonction
                    // avec 2 paramètres, le callback de succès et d'erreur
                    return new Promise(function (resolve, reject) {
                    // Le reste du code ressemble à la méthode précédente
                    let req = new XMLHttpRequest()
                    req.open('GET', url, true)
                    req.onreadystatechange = function (aEvt) {
                    if (req.readyState == 4) {
                    if(req.status == 200)
                    resolve(req.responseText)
                    else
                    reject(req)
                    }
                    };
                    req.send(null)
                    })
                    }
                    
                    // L'appel à la fonction peut se faire de cette manière là
                    ajax('https://jsonplaceholder.typicode.com/users')
                    .then(function (response) {
                    // Le serveur a correctement répondu
                    }).catch(function (req) {
                    // Le serveur n'a pas répondu comme attendu
                    })






                //Fonction ajouter un produit dans le localStorage
 const ajoutProduitLocalStorage = () => {
    tableau.push(nouvelArticle);
    localStorage.setItem("panier", JSON.stringify(tableau));
  };

                    */
  