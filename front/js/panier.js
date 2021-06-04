let tableau = JSON.parse(localStorage.getItem("panier")); //Récupération du localstorage panier
let priceTableau = [];

//Récupération du panier local storage + affichage
function basket() {
    for (let i = 0; i < tableau.length; i++) {
        GetAriclesBasket(tableau[i],i);
    }
    totalPriceTeddy()
}

basket()
function GetAriclesBasket(line,i) {
    //Création des textNode
    var newName = document.createTextNode(line.name);
    var newPrice = document.createTextNode(line.price);
    var newColor = document.createTextNode(line.color);
    var newCount = document.createTextNode(line.quantity);
    var priceLine = line.quantity * line.price;
    var newSupp = document.createTextNode("Supprimer");


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
    var newP = document.createElement("button");
    document.getElementById("qté_supp" + i).appendChild(newP).setAttribute("id", "remove" + i);

    //Intégration des TextNode dans les éléments créés
    document.getElementById("nameTeddy" + i).appendChild(newName);
    document.getElementById("color" + i).appendChild(newColor);
    document.getElementById("price" + i).appendChild(newPrice);
    document.getElementById("quantity" + i).appendChild(newCount);
    document.getElementById("remove" + i).appendChild(newSupp);
    document.getElementById("image" + i).setAttribute("src", line.img);

    priceTableau.push(priceLine); //Ajout du prix d'un teddy selon sa quantité dans un tableau prix total
}

//Somme du tableau prix total
function totalPriceTeddy() {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    var totalPrice = priceTableau.reduce(reducer);
    document.getElementById("montantTotal").insertAdjacentHTML("beforeend", "<strong>" + totalPrice + " euros <strong/>")
}
