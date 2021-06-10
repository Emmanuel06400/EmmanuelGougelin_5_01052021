let order = JSON.parse(localStorage.getItem("validation")); //Récupération du localstorage de confirmation de commande

document.getElementById("numSuivi").insertAdjacentHTML("beforeend", order[0]) //[0] = numéro de commande
document.getElementById("montant").insertAdjacentHTML("beforeend", order[1] + " euros.") //[1] = prix total de la commande
localStorage.removeItem("panier"); //Suppression du panier existant après la commande 

console.log("hello")

