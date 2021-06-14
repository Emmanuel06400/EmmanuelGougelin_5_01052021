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
    var newPrice = document.createTextNode("Prix : " + line.price + " euros");
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
    document.getElementById("montantTotal").insertAdjacentHTML("beforeend", totalPrice + " euros")
}

// FORMULAIRE DE COMMANDE///////////////////////////////
const afichherFotmulaireHtml = () => {
    //Sélection élément du DOM
    const positionElement = document.querySelector("#containerFormulaire");

    const structureFormulaire = `

    <div id="formulaire_contact">
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
    positionElement.insertAdjacentHTML("afterbegin", structureFormulaire);
};

//Affichage du formulaire
afichherFotmulaireHtml();

//Sélection du bouton envoyer formulaire
const btnEnvoyerFormulaire = document.querySelector("#confirmPanier");

//--------------addEnventListener-------------//

btnEnvoyerFormulaire.addEventListener("click", (e)=>{
e.preventDefault();

//Création : définition d'une classe pour fabriquer l'objet dans lequel iront les values du formulaire

//Appel de l'instance de classe Formulaire pour créer l'objet formulaireValues
const formulaireValues = {
    lastName : document.querySelector("#lastName").value,
    firstName : document.querySelector("#firstName").value,
    email : document.querySelector("#email").value,
    city : document.querySelector("#city").value,
    address : document.querySelector("#adress").value,
    };
console.log(formulaireValues)

//********************Gestion validation du formulaire************** */
const textAlert = (value) => {
    return value + `${value} : Les chiffres et symboles ne sont pas autorisés \n Ne pas dépaser 20 caractères`;
}

const regExNameFirstnameCity = (value) => {
return /^[A-Za-z]{3,20}$/.test(value)
};

const regExEmail = (value) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
    };


function nomControle(){
//Contrôle de la validité du nom
const leNom = formulaireValues.lastName;
if(regExNameFirstnameCity(leNom)){
return true;
}else{
    alert(textAlert("Nom"))
    return false;
    };
};
function prenomControle(){
    //Contrôle de la validité du prenom
    const lePrenom = formulaireValues.firstName;
    if(regExNameFirstnameCity(lePrenom)){
    return true;
    }else{
        alert(textAlert("Prénom"))
        return false;
        };
    };
function villeControle(){
    //Contrôle de la validité du ville
    const laVille = formulaireValues.city;
    if(regExNameFirstnameCity(laVille)){
    return true;
    }else{
        alert(textAlert("Ville"))
        return false;
        };
    };
/*function emailControle(){
    //Contrôle de la validité du email
    const leEmail = formulaireValues.adress;
    if(regExEmail(leEmail)){
    return true;
    }else{
        alert("l'email n'est pas valide")
        return false;
        };
    };*/

//Contrôle la validité avant envoir au local storage
if(nomControle() && prenomControle() && villeControle()){
    //Mettre l'objet "formulaireValues" dans le localStorage
    localStorage.setItem("formulaireValues",JSON.stringify(formulaireValues));
    localStorage.setItem("prixTotal",JSON.stringify(totalPrice));
    } else{
        alert("Veuillez bien remplir le formulaire");
    };

//********************FIN Gestion validation du formulaire************** */

//Mettre les values du formulaire et les produits sélectionnés dans un objets à envoyer vers le serveur
const aEnvoyer = {
    products: tableau,
    contact: formulaireValues
}
console.log(aEnvoyer);

envoieVersServeur(aEnvoyer);
});

//--------------fin addEnventListener-------------//

function envoieVersServeur(aEnvoyer){
    //Envoie de l'objet "aEnvoyer" vers le serveur
const promise01 = fetch("http://localhost:3000/api/teddies/order", { //"http://localhost:3000/api/teddies/order"
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(aEnvoyer),
});

//Pour voir le resultat du serveur dans la console ( A verifier )
promise01.then(async(response)=>{
//Si la promesse n'est pas résolu, est rejeté, Gestions des erreurs
try{
    const contenu = await response.json();
    console.log(contenu);

    if(response.ok) {
        console.log(`Resultat de response.ok : ${response.ok}`);

        //Récupération de l'id de la response du serveur
        console.log(contenu._id);
        //Mettre l'id dans le local storage
        localStorage.setItem("responseId", contenu._id);

        //Aller vers la page contirmation.html
        window.location = "confirmation.html";

    } else{
        console.log(`Resultat du serveur : ${response.status}`);
        alert(`Problème avec le serveur : erreur ${response.status}`)
    };

}catch(e){
    console.log(e);
    console.log("erreur qui vient du catche");
    console.log(e);
    alert(`ERREUR qui vient du catch() ${e} `);
};
});
}


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

