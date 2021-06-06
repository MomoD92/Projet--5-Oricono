//Récupération de l'id de la commande (provenant du serveur) dans le localStorage
let orderId = localStorage.getItem('orderId');

//Récupération de l'id main
let main = document.getElementById('main');

// j'injecte le code HTML

main.innerHTML += `
    <h2 class="titleCommande">Récapitulatif de votre commande</h2>
    <div class="col-12 text-center commande">
        <p>Merci de nous avoir fait confiance pour votre commande !</p>
        <p>Votre colis a bien été pris en compte et vous sera expédié dans les meilleurs délais.</p>
        <p>Votre numéro de commande est le : <span id="numeroCommande">${orderId}</span></p>
        <p>Au plaisir de vous revoir.</p>
    </div>
`;

// Effacer le local storage
localStorage.clear();