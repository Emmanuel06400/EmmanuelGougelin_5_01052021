

getArticles()


function getArticles() { //appel api, callback, ... return une promesse
    return fetch("http://localhost:3000/api/teddies/")
        .then(function(response) { //fonction prend pour parametre response et return response.json via la variable myJSON_promise
            let myJSON_promise = response.json();
            return myJSON_promise
        })
        .then(function(myJSON) {//J'emboite les fonctions avec la méthode .then
            showArticles(myJSON)
            }
        )
        .catch(function(error) {//fonction qui affiche une pop up en cas d'erreur
            console.log(Error)
        })
}

function showArticles(myJSON) {
    for (let i = 0; i < myJSON.length; i++) { //Avec une boucle for je créé une structure HTML etj'affiche les teddys 

                let linkTeddy = document.createElement('a');//lien vers le produit
                linkTeddy.classList.add('linkTeddy');//ajout de class 
                linkTeddy.setAttribute('href', 'HTML/produit.html?id=' + myJSON[i]._id);//ajout d'atribut' 

                let boxTeddy = document.createElement('div');//
                boxTeddy.classList.add("card","espace","zoom");

                let boxImg = document.createElement('div');

                let imgTeddy = document.createElement('img');
                imgTeddy.classList.add("card-img-top");
                imgTeddy.setAttribute('alt', 'Ours en peluche');
                imgTeddy.setAttribute('src', myJSON[i].imageUrl);

                let boxFeatureTeddy = document.createElement('div');
                boxFeatureTeddy.classList.add('boxFeatureTeddy');

                let nameTeddy = document.createElement('h2');
                nameTeddy.classList.add("card-title","fondBlanc",".card-body");
                nameTeddy.textContent = myJSON[i].name;

                let priceTeddy = document.createElement('p');
                priceTeddy.classList.add('prix',"card-text","fondBlanc",".card-body");
                priceTeddy.textContent = myJSON[i].price/100 + ' Euros';

                boxImg.appendChild(imgTeddy);
                boxFeatureTeddy.appendChild(nameTeddy);
                boxFeatureTeddy.appendChild(priceTeddy);
                boxTeddy.appendChild(boxImg);
                boxTeddy.appendChild(boxFeatureTeddy);
                linkTeddy.appendChild(boxTeddy);

                //J'affiche le toutdans la div boxListingTeddy
                boxListingTeddy.appendChild(linkTeddy);
            }
}
    


