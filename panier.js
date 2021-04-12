const inHtml = document.getElementById("main");
const prixInHtml = document.getElementById("finalPrice");
const btnCommande = document.getElementById("btnCom");
let data = JSON.parse(localStorage.getItem("basket"));

if (localStorage.length > 0) {
    prixInHtml.innerHTML = calculPrixPanier() + " € (euros)"; //rappel fonction prix total

    data.forEach((objet) => {
        inHtml.innerHTML += `
            <div class="row m-2 pt-3 panierLine">
                <div class="col-md-3 col-lg-2">
                    <img alt="${objet.name}" class="img-fluid" src="${objet.image}">
                </div>
                <div class="col-md-4">
                    <a href="produit.html?id=${objet._id}"><h2>${objet.name}</h2></a>
                    <p><strong>Quantité</strong> : ${objet.quantite}</p>
                    <p><strong>Lentilles</strong> : ${objet.lens}</p>
                </div>
                <div class="col-md-5 col-lg-4"
                    <p class="prixProduitPanier"><strong>Prix : <span>${objet.totalPrice} €</span></strong></p>   
                </div>
                <div class="col-md-1">
                    <button class="btn btn-danger mb-3" onclick="deleteItem('${objet._id}')">Supprimer</button>  
                </div>
            </div>
            `;
    });
} else {

    inHtml.innerHTML = `
        <div class="container-fluid">
            <img class="center-block gif" alt="" src="images/polizas_gif.gif" />
            <p class="text-center lead">Votre panier est vide :'(</p>
        </div>`;
};

//-- fonction de suppression d'un produit

function deleteItem(_id) {
    const lsUpdate = data.filter((objet) => objet._id !== _id);
    localStorage.setItem("basket", JSON.stringify(lsUpdate));

    if (lsUpdate == 0) {
        localStorage.clear();
    }
    document.location.href = "panier.html";
};

//-- Calcul du prix total Panier

function calculPrixPanier() {
    let totalPriceItem = data.reduce((accumulator, item) => {
        return accumulator + item.totalPrice;
    }, 0);

    return totalPriceItem;
};

/*************VALIDATION FORMULAIRE******************/

const lastname = document.getElementById('nom ');
const firstname = document.getElementById('prenom ');
const address = document.getElementById('adresse ');
const city = document.getElementById('ville ');
const email = document.getElementById('email ');

const form = document.querySelector("#submitForm");


// ***************** ENVOIE DES DONNEES AU BACK ***********************

//-- Fonction d'envoie au back

form.addEventListener("submit", (e) => {
    e.preventDefault()

    const contact = { // utilisateur à envoyer en objet en POST
        firstName: firstname.value,
        lastName: lastname.value,
        address: address.value,
        city: city.value,
        email: email.value,
    };

    console.log(contact);

    const products = []; // cameras en tant que tableau à envoyer en POST
    const donnees = { contact, products }; // crée donnees comme objet contact + tableau products

    data.forEach((camera) => {
        products.push(camera._id);
    });

    // en-têtes pour la requête (dire qu'elle est POST et non GET)
    const options = {
        method: "POST",
        body: JSON.stringify(donnees),
        headers: {
            "Content-Type": "application/json",
        },
    };

    if (firstname == "" || lastname == "" || address == "" || city == "" || email == "") {
        alert("Tous les champs doivent êtres remplis !")

    } else {
        // la requête POST en elle-même
        fetch("http://localhost:3000/api/cameras/order", options)
            // reçoit les données du back
            .then(response => { // me renvoie un premiere prommesse
                if (response.ok) {
                    return response.json() // Si response ok, retourne un objet json
                } else {
                    Promise.reject(response.status); // sinon, me retroune la cause de l'echec
                };
            })

        // traitement pour l'obtention du numéro de commmande
        .then((datas) => {
            const orderId = datas.orderId;

            window.location.href = `confirm.html?ncomm=${orderId}`;

        })

        .catch((error) => {
            alert(error);
        });
    }

});