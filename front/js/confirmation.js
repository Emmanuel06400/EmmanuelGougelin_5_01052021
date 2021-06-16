  let orderId = localStorage.getItem("orderId");
  console.log(orderId)
  document.querySelector("strong").appendChild(document.createTextNode(orderId));

//Effacer tout le local Storage sauf le formulaire
function enleverCleLocalStorage(key){
    localStorage.removeItem(key);
};
  //Récupération du prix total de la commande
  let totalCommande = localStorage.getItem("prixTotal");
  document.querySelector("#total").appendChild(document.createTextNode(totalCommande))

localStorage.removeItem("panier");
localStorage.removeItem("prixTotal");