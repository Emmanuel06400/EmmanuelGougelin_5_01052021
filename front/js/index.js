fetch("http://localhost:3000/api/teddies") //Je pointe les données de l'API du serveur avec la méthode fetch
    .then(function(response) { //fonction pour nous retourné les données
        var myJSON_promise = response.json();  //Je transforme les données en format json
        return myJSON_promise
        
    }) 
    .then(function(myJSON) {

        for (let i = 0; i < myJSON.length; i++) { //Avec une boucle fo j'affiche les données selon le teddy choisi : de 0 à 4
            let nameTeddies = document.createTextNode(myJSON[i].name); //je créé une variable pour afficher les données 
            let descriptionTeddies = document.createTextNode(myJSON[i].description);//idem
            let priceTeddies = document.createTextNode(myJSON[i].price + " euros");//idem
            let imageTeddies = myJSON[i].imageUrl;//idem
            document.getElementById("nom_teddy" + i).appendChild(nameTeddies); // A partir d'une id HTML, j'enfante la variable créé précedemment
            document.getElementById("description_teddy" + i).appendChild(descriptionTeddies);
            document.getElementById("prix_teddy" + i).appendChild(priceTeddies);
            document.getElementById("image_teddy" + i).setAttribute("src", imageTeddies);// A partir d'une id HTML, je rajoute une attribut pour l'image 
        
            let boxTeddie = document.createElement('div');
            boxTeddie.classList.add('boxTeddie');

            
        }
    });

