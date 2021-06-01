
    main()

    async function main() {
        getArticles()
    }

    function getArticles() {
        return fetch("http://localhost:3000/api/teddies/")
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

    getArticles().then(function(myJSON) {

        for (let i = 0; i < myJSON.length; i++) { //Avec une boucle fo j'affiche les données selon le teddy choisi : de 0 à 4
            let nameTeddies = document.createTextNode(myJSON[i].name); //je créé une variable pour afficher les données 
            let descriptionTeddies = document.createTextNode(myJSON[i].description);//idem
            let priceTeddies = document.createTextNode(myJSON[i].price + " euros");//idem
            let imageTeddies = myJSON[i].imageUrl;//idem
            document.getElementById("nom_teddy" + i).appendChild(nameTeddies); // A partir d'une id HTML, j'enfante la variable créé précedemment
            document.getElementById("description_teddy" + i).appendChild(descriptionTeddies);
            document.getElementById("prix_teddy" + i).appendChild(priceTeddies);
            document.getElementById("image_teddy" + i).setAttribute("src", imageTeddies);// A partir d'une id HTML, je rajoute une attribut pour l'image 
        


                    let linkOurs = document.createElement('a');
					linkOurs.classList.add('lienOurs');
					linkOurs.setAttribute('href', 'HTML/produit.html?id=' + myJSON[i]._id);

					let boxOurs = document.createElement('div');
					boxOurs.classList.add('boxOurs',"card","espace","zoom");

					let boxImg = document.createElement('div');

					let imgOurs = document.createElement('img');
					imgOurs.classList.add('imgOurs',"card-img-top");
					imgOurs.setAttribute('alt', 'Ours en peluche');
					imgOurs.setAttribute('src', myJSON[i].imageUrl);

					let boxDetailOurs = document.createElement('div');
					boxDetailOurs.classList.add('boxDetailOurs');

					let nomOurs = document.createElement('h2');
                    nomOurs.classList.add("card-title","fondBlanc",".card-body");
					nomOurs.textContent = myJSON[i].name;

					let prixOurs = document.createElement('p');
					prixOurs.classList.add('prix',"card-text","fondBlanc",".card-body");
					prixOurs.textContent = myJSON[i].price/100 + ' Euros';

					boxImg.appendChild(imgOurs);

					boxDetailOurs.appendChild(nomOurs);
					boxDetailOurs.appendChild(prixOurs);

					boxOurs.appendChild(boxImg);
					boxOurs.appendChild(boxDetailOurs);

					linkOurs.appendChild(boxOurs);

					//ET ON LES AJOUTE A LA LISTE DES OURS
					boxListeOurs.appendChild(linkOurs);
            
        }
    });

    /*fetch("http://localhost:3000/api/teddies") //Je pointe les données de l'API du serveur avec la méthode fetch
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
*/




/*
main()

    async function main() {
        const articles = await getArticles()

        for (article of articles) {
            displayArticles()
        }
    }

    function getArticles() {
        return fetch("http://localhost:3000/api/teddies/")
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

    function displayArticles(articles) {
      document.getElementById("main").innerHTML +=
      <article class="card espace zoom">
              <img src="" class="card-img-top" alt="ours en peluche marron" id="image_teddy">
              <div class="card-body">
                <h2 class="card-title" id="nom_teddy"></h2>
                <p class="card-text" id="description_teddy"></p>
                <p class="card-text" id="prix_teddy"></p>
                <a href="html/produit.html?id=5be9c8541c9d440000665243" class="btn btn-primary">Commander l'article</a>
              </div>
        </article>
    }
    */
