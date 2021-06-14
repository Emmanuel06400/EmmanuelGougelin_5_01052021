//Récupération de l'id de la commande (provenant du serveur) dans le local storage
const responseId = localStorage.getItem("responseId");
console.log(`responseId : ${responseId}`)

//Récupération du prix total de la commande
const prixtotal = localStorage.getItem("prixTotal");

//La structure de la page confirmation

//Sélection élément du DOM pour le positionnement
const positionElement = document.querySelector("#container-recapitulatif-commande");

const structureConfirmationCommange = `
<h2>Votre commande</h2>
    <div class="recapCommande">
      <p>Votre commande numéro : <span class="gras">${responseId}</span> a bien été pris en compte</p>
      <p id="montant">Toute l'équipe Orinoco vous remercie pour votre commande d'un montant total de : <span
          class="gras">${prixtotal}</span> Euros</p>
      <p id="remerciment">Au plaisir de vous revoir</p>
    </div>
`;

//Injection HTML
positionElement.insertAdjacentHTML("afterbegin", structureConfirmationCommange);

//Effacer tout le local Storage sauf le formulaire
function enleverCleLocalStorage(key){
    localStorage.removeItem(key);
};

//enleverCleLocalStorage("prixTotal");
//enleverCleLocalStorage("panier");
//enleverCleLocalStorage("responseId");






/*let order = JSON.parse(localStorage.getItem("validation")); //Récupération du localstorage de confirmation de commande

document.getElementById("numSuivi").insertAdjacentHTML("beforeend", order[0]) //[0] = numéro de commande
document.getElementById("montant").insertAdjacentHTML("beforeend", order[1] + " euros.") //[1] = prix total de la commande
localStorage.removeItem("panier"); //Suppression du panier existant après la commande 

console.log("hello")*/

