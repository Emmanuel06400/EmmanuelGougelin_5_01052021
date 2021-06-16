let tableau = JSON.parse(localStorage.getItem("panier")); //Récupération du localstorage avec la key panier
let priceTableau = [];//création d'un tableau vide
let productsID = [];


//Fonction pour récupérer le panier local storage + affichage
function basket() {
    for (let i = 0; i < tableau.length; i++) {
        GetAriclesBasket(tableau[i], i);
    }
    totalPriceTeddy()
    console.log(tableau)
}
basket()//Appel de la fonction

//Fonction pour afficher le panier dans la page
function GetAriclesBasket(line, i) {
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

localStorage.setItem("prixTotal",JSON.stringify(totalPrice));

//*****************Confirmation du panier et envoie des info au serveur****************/

// Fonction qui vérifie la valeur des champs si ils sont remplis correctement
function checkIfField(input, regExp) {
    return input.value.match(regExp) !== null;
}
// Fonction de confirmation, envoie le formulaire et l'id du produit
function confirmationCommande() {
    //Si la fonction a déjà été utilisée on réinitialise le formulaire
    //suppr div
    //suppr is-valid/is-invalid
    let inputs = document.querySelectorAll("input");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove("is-invalid");
        inputs[i].classList.remove("is-valid");

    }

    let alertMessages = document.querySelectorAll(".alertMessages");
    for (let i = 0; i < alertMessages.length; i++) {
        alertMessages[i].remove();
    };

    //Récupérer les informations du formulaire
    var firstName = document.querySelector("#firstName"),
        lastName = document.querySelector("#lastName"),
        address = document.querySelector("#address"),
        city = document.querySelector("#city"),
        email = document.querySelector("#email");

    //Définition des expressions régulières pour la vérification de la validité des champs
    let stringRegExp = /([A-Za-z0-9_\s\-'\u00C0-\u024F]+)/;
    emailRegExp = /^([\w\-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i;

    //Vérification de la validité des champs
    let firstNameValidity = checkIfField(firstName, stringRegExp),
        lastNameValidity = checkIfField(lastName, stringRegExp);
        addressValidity = checkIfField(address, stringRegExp);
        cityValidity = checkIfField(city, stringRegExp);
        emailValidity = checkIfField(email, emailRegExp);

    //Alerter l'utilisateur s'il a mal rempli le formulaire
    let fields = [firstName, lastName, address, city, email],
        fieldsValidity = [firstNameValidity, lastNameValidity, addressValidity, cityValidity, emailValidity],
        fieldInvalid = false;

    for (let i = 0; i < fields.length; i++) {
        if (!fieldsValidity[i]) { //si un champ n'est pas valide
            fieldInvalid = true; //un champ au moins est incorrect, sera utilisé plus loin pour empêcher la requête POST à l'API

            //Création du message à envoyer à l'utilisateur
            let message;
            if (fields[i] === document.querySelector("#firstName")) {
                message = "Le prénom est incorrect !";
            } else if (fields[i] === document.querySelector("#lastName")) {
                message = "Le nom est incorrect !";
            } else if (fields[i] === document.querySelector("#address")) {
                message = "L'adresse postale est incorrecte !";
            } else if (fields[i] === document.querySelector("#city")) {
                message = "La ville est incorrecte !";
            } else {
                message = "L'adresse mail est incorrecte !";
            }

            //Création et stylisation de l'alerte
            let alert = document.createElement("div");
            alert.appendChild(document.createTextNode(message));
            fields[i].classList.add("is-invalid");
            alert.classList.add("alertMessages", "invalid-feedback");
            fields[i].parentElement.appendChild(alert);

        } else {
            fields[i].classList.add("is-valid");
        }
    }
    //Si l'un des champs n'est pas valide
    if (fieldInvalid) return; //la fonction s'arrête 
    //sinon elle continue

    //Les entrer les champs dans un objet
    let contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value
    },
        products = productsID;

    //Récupérer l'orderId
    fetch('http://localhost:3000/api/teddies/order', {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contact, products
        })
    })
        .then(response => response.json())
        .then(order => {
            localStorage.setItem("orderId", order.orderId);
            window.location.href = "confirmation.html";
        })
}

document.querySelector("#confirmPanier").addEventListener("click", confirmationCommande, false);
/*
//-------------Mettre le contenu du localStorage dans les champs du formulaire----------------//
//Prendre la key dans le localStorage et la mettre dans une variable
const dataLocalStorage = localStorage.getItem("formulaireValues")

//Convertir la chaîne de caractère en objet javascript
const dataLocalStorageObjet = JSON.parse("panier",);

//Fonction pour que le chanmp du formulaire soit remplipar les données du loca storage si elle existe
function remplirChampInputDepuisLocalStorage(input){
    document.querySelector("input").value = dataLocalStorageObjet[input];
};

remplirChampInputDepuisLocalStorage("lastName");
remplirChampInputDepuisLocalStorage("firstName");
remplirChampInputDepuisLocalStorage("email");
remplirChampInputDepuisLocalStorage("city");
remplirChampInputDepuisLocalStorage("adress");

console.log(dataLocalStorageObjet);


   localStorage.setItem("formulaireValues",JSON.stringify(formulaireValues));

*/