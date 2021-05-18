fetch("http://localhost:3000/api/teddies") //Pointer les données de l'API du serveur
    .then(function(response) { //fonction pour nous retourné les données
        var myJSON_promise = response.json();  //transformer les données en format json
        myJSON_promise.then(function(myJSON) {
            for (let i = 0; i < 5; i++) { //Affichage des données selon le teddy choisi : de 0 à 4
                let nameTeddies = document.createTextNode(myJSON[i].name); //variable pour pointer et afficher la donnée 
                let descriptionTeddies = document.createTextNode(myJSON[i].description);
                let priceTeddies = document.createTextNode(myJSON[i].price + " euros");
                let imageTeddies = myJSON[i].imageUrl;
                document.getElementById("nom_teddy" + i).appendChild(nameTeddies); // A partir d'une id HTML, enfanter la variable creer
                document.getElementById("description_teddy" + i).appendChild(descriptionTeddies);
                document.getElementById("prix_teddy" + i).appendChild(priceTeddies);
                document.getElementById("image_teddy" + i).setAttribute("src", imageTeddies);
            }
        });
    }) 

