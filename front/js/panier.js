let tableau = JSON.parse(localStorage.getItem("panier")); //Récupération du localstorage avec la key panier
let priceTableau = [];//création d'un tableau vide


//Fonction pour récupérer le panier local storage + affichage
function basket() {
    for (let i = 0; i < tableau.length; i++) {
        GetAriclesBasket(tableau[i],i);
    }
    totalPriceTeddy()
}

basket()//Appel de la fonction

//Fonction pour afficher le panier dans la page
function GetAriclesBasket(line,i) {
    //Création des textNode
    var newName = document.createTextNode(line.name);
    var newPrice = document.createTextNode("Prix : " + line.price/100 + " euros");
    var newColor = document.createTextNode("Couleur : " + line.color);
    var newCount = document.createTextNode("Quantité : " + line.quantity);
    var priceLine = line.quantity * line.price;



    //Création des éléments
    var newBoxTeddy = document.createElement("div");
    document.getElementById("panier").appendChild(newBoxTeddy).setAttribute("id", "produit" + i);
    document.getElementById("produit" + i).setAttribute("class", "card");
    var newImg = document.createElement("img");
    document.getElementById("produit" + i).appendChild(newImg).setAttribute("id", "image" + i);
    var newboxFeature = document.createElement("div");
    document.getElementById("produit" + i).appendChild(newboxFeature).setAttribute("id", "boxFeature" + i);
    var newDiv = document.createElement("div");
    document.getElementById("boxFeature" + i).appendChild(newDiv).setAttribute("id", "boxNamePrice" + i)
    document.getElementById("boxNamePrice" + i).setAttribute("class", "boxNamePrice");
    var newP = document.createElement("p");
    document.getElementById("boxNamePrice" + i).appendChild(newP).setAttribute("id", "nameTeddy" + i);
    var newP = document.createElement("p");
    document.getElementById("boxNamePrice" + i).appendChild(newP).setAttribute("id", "price" + i);
    var newP = document.createElement("p");
    document.getElementById("boxFeature" + i).appendChild(newP).setAttribute("id", "color" + i);
    var newDiv = document.createElement("div");
    document.getElementById("boxFeature" + i).appendChild(newDiv).setAttribute("id", "qté_supp" + i)
    document.getElementById("qté_supp" + i).setAttribute("class", "qté_supp");
    var newP = document.createElement("p");
    document.getElementById("qté_supp" + i).appendChild(newP).setAttribute("id", "quantity" + i);


    //Intégration des TextNode dans les éléments créés
    document.getElementById("nameTeddy" + i).appendChild(newName);
    document.getElementById("color" + i).appendChild(newColor);
    document.getElementById("price" + i).appendChild(newPrice);
    document.getElementById("quantity" + i).appendChild(newCount);
    document.getElementById("image" + i).setAttribute("src", line.img);

    priceTableau.push(priceLine); //Ajout du prix d'un teddy selon sa quantité dans un tableau prix total
}

//Fonction qui calcul la somme du prix total
var totalPrice;
function totalPriceTeddy() {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    totalPrice = priceTableau.reduce(reducer); 
    document.getElementById("montantTotal").insertAdjacentHTML("beforeend", totalPrice/100 + " euros")
}
//TEST FORMULAIRE DU COMMANDE///////////////////////////////

const afichherFotmulaireHtml = () => {
    //Sélection élément du DOM
    const positionElement = document.querySelector("#containerProduitPanier");

    const structureFormulaire = `

    <div id="formulaire_contact" class="col-12 col-md-6">
                <p id="montantTotal">Montant total de la commande : </p>
                <form method="POST">
                    <p><u>Coordonnées de livraison :</u> </p>

                    <div>
                        <label for="lastName">Nom : </label> <br>
                        <input type="text" name="user_lastName" id="lastName" required>
                    </div>
                    <div>
                        <label for="firstName" id="firstName_label">Prénom : </label> <br>
                        <input type="text" name="user_firstName" id="firstName" required>
                    </div>


                    <div>
                        <label for="email">Adresse e-mail : </label> <br>
                        <input type="email" name="user_email" id="email" required>
                    </div>
                    <div>
                        <label for="city">Ville : </label> <br>
                        <input type="text" name="user_city" id="city" required>
                    </div>
                    <div>
                        <label for="adress">Adresse : </label> <br>
                        <input type="text" name="user_adress" id="adress" required>
                    </div>
                </form><br>
                <button id="confirmPanier" type="submit" name="EnvoyerFormulaire">Commander</button>
            </div>
            `;
//injection HTML

    positionElement.insertAdjacentHTML("afterend", structureFormulaire);
};

//Affichage du formulaire
afichherFotmulaireHtml();

//Sélection du bouton envoyer formulaire
const btnEnvoyerFormulaire = document.querySelector("#confirmPanier");

//--------------addEnventListener-------------//
btnEnvoyerFormulaire.addEventListener("click", (e)=>{
e.preventDefault();

//Création : définition d'une classe pour fabriquer l'objet dans lequel iront les values du formulaire
class Formulaire {
    constructor(lastName, firstName, email, city, adress){
    this.lastName = document.querySelector("#lastName").value;
    this.firstName = document.querySelector("#firstName").value;
    this.email = document.querySelector("#email").value;
    this.city = document.querySelector("#city").value;
    this.adress = document.querySelector("#adress").value;
    }
}
//Appel de l'instance de classe Formulaire pour créer l'objet formulaireValues
const formulaireValues = new Formulaire();

console.log(formulaireValues)

//Mettre l'objet "formulaireValues" dans le localStorage
localStorage.setItem("formulaireValues",JSON.stringify(formulaireValues));

//Mettre les values du formulaire et les produits sélectionnés dans un objets à envoyer vers le serveur
const aEnvoyer = {
    tableau,
    totalPrice,
    formulaireValues
}
console.log(aEnvoyer);

//Envoie de l'objet "aEnvoyer" vers le serveur
const promise01 = fetch("https://restapi.fr/api/Test", { //"http://jsonplaceholder.typicode.com/users"
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(aEnvoyer),
});

//Pour voir le resultat du serveur dans la console ( A verifier )
promise01.then(async(Response)=>{
    try{
        const contenu = await Response.json();

    }catch(e){
        console.log(e);
    }
})
//Pour voir ce qu'il y a réellement dans le serveur
const promise02 = fetch("https://restapi.fr/api/Test")  
    promise02.then(async(Response)=>{
        try{
            console.log(promise02);
            const donneSurServeur = await Response.json()
            console.log(donneSurServeur);
        } catch(e) {
            console.log(e);
        }
    })
});



//-------------Mettre le contenu du localStorage dans les champs du formulaire----------------//
//Prendre la key dans le localStorage et la mettre dans une variable
const dataLocalStorage = localStorage.getItem("formulaireValues")

//Convertir la chaîne de caractère en objet javascript
const dataLocalStorageObjet = JSON.parse(dataLocalStorage);

//Fonction pour que le chanmp du formulaire soit remplipar les données du loca storage si elle existe
function remplirChampInputDepuisLocalStorage(input){
    document.querySelector(`#${input}`).value = dataLocalStorageObjet[input];
};

remplirChampInputDepuisLocalStorage("lastName");
remplirChampInputDepuisLocalStorage("firstName");
remplirChampInputDepuisLocalStorage("email");
remplirChampInputDepuisLocalStorage("city");
remplirChampInputDepuisLocalStorage("adress");

console.log(dataLocalStorageObjet);













        /*

        
        //Création de la donnée à envoyer au back-end
        const url = 'http://localhost:3000/api/teddies/order';

        let data = {
            contact: {
                firstName: document.getElementById("firstName").value,
                lastName: document.getElementById("lastName").value,
                address: document.getElementById("address").value,
                city: document.getElementById("city").value,
                email: document.getElementById("email").value
            },
            products: produit
        }

        //Requête POST pour envoyer la donnée au back-end
        var request = new Request(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        fetch(request)
            .then(function(response) {
                var myJSON_promise = response.json();
                myJSON_promise.then(function(myJSON) {
                    var validation = [myJSON.orderId, totalPrice]
                    localStorage.setItem("validation", JSON.stringify(validation))  //Enregistre l'orderID dans un localStorage
                })
            })
            .then(setTimeout(function() { window.location.href = "confirmation.html" }, 1000)) //Ouvre la page de confirmation après 1 seconde
    }
}


*/

