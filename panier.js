   //-----Déclaration de la variable "products" dans laquelle on met les clés et les valeurs qui sont dans le local storage
   let products = JSON.parse(localStorage.getItem("produit"));
   //-----Déclaration de la variable "total" pour y mettre les prix dans le panier
   let total = document.getElementById("finalPrice");


   //-------------------------------- L'AFFICHAGE DES PRODUITS DU PANIER --------------------------------//

   //----------Sélection de l'identifiant main où je vais mettre le code HTML --------------------------- //

   let mainPanier = document.getElementById("main");


   // Si le panier n'est pas vide
   if (localStorage.length > 0) {

       //-------  Rappel de la fonction prixTotalCalculer --------//
       total.innerHTML = prixTotalCalculer() + " € (euros)";

       //-- Boucle FOREACH pour afficher le produit --------- 
       products.forEach(optionProduit => {

           //------ création div parent -----------------------------//

           let divParent = document.createElement("div");
           divParent.classList.add("row", "m-2", "pt-3", "panierLine");
           mainPanier.appendChild(divParent);

           //------ FIN --------------------------------------------//

           //*********** création div 1er enfant ********************//

           let divFirstChild = document.createElement("div");
           divFirstChild.classList.add("col-md-3", "col-lg-2");

           // création image enfant de divFirstChild
           let baliseImage = document.createElement("img");
           baliseImage.src = optionProduit.image;
           baliseImage.alt = optionProduit.name;
           baliseImage.className = 'img-fluid';
           divFirstChild.appendChild(baliseImage);

           divParent.appendChild(divFirstChild);

           //*********** FIN ******************************************//

           //******** création div 2eme enfant ************************//

           let divSecondChild = document.createElement('div');
           divSecondChild.className = 'col-md-4';
           divParent.appendChild(divSecondChild);

           // création du lien du produit sélectionner
           let baliseLink = document.createElement("a");
           baliseLink.href = `./produit.html?id=${optionProduit._id}`;
           // création d'un titre h2
           let h2 = document.createElement('h2');
           h2.textContent = optionProduit.name;
           baliseLink.appendChild(h2);
           divSecondChild.appendChild(baliseLink);

           // paragraphe Quantité 
           let paragrapheQuantite = document.createElement('p');
           let paragrapheQuantiteStrong = document.createElement('strong');
           paragrapheQuantiteStrong.textContent = "Quantité : ";
           let paragrapheQuantiteSpan = document.createElement('span');
           paragrapheQuantiteSpan.innerHTML = optionProduit.quantite;
           paragrapheQuantite.appendChild(paragrapheQuantiteStrong);
           paragrapheQuantite.appendChild(paragrapheQuantiteSpan);
           divSecondChild.appendChild(paragrapheQuantite);
           // paragraphe Lentille 
           let paragrapheLentille = document.createElement('p');
           let paragrapheLentilleStrong = document.createElement('strong');
           paragrapheLentilleStrong.textContent = "Lentilles : ";
           let paragrapheLentilleSpan = document.createElement('span');
           paragrapheLentilleSpan.innerHTML = optionProduit.lense;
           paragrapheLentille.appendChild(paragrapheLentilleStrong);
           paragrapheLentille.appendChild(paragrapheLentilleSpan);
           divSecondChild.appendChild(paragrapheLentille);

           //************* FIN ******************************************//

           //******** création div 3eme enfant *************************//

           let divThirdChild = document.createElement('div');
           divThirdChild.classList.add("col-md-5", "col-lg-4");
           let paragraphePrix = document.createElement("p");
           paragraphePrix.className = 'prixProduitPanier';
           divThirdChild.appendChild(paragraphePrix);
           let paragraphePrixStrong = document.createElement('strong');
           paragraphePrixStrong.textContent = "Prix : ";
           let paragraphePrixSpan = document.createElement('span');
           paragraphePrixSpan.innerHTML = optionProduit.totalPrice + "€";
           paragraphePrix.appendChild(paragraphePrixStrong);
           paragraphePrix.appendChild(paragraphePrixSpan);

           divParent.appendChild(divThirdChild);


           //************* FIN ******************************************//

           //******** création div 4eme enfant *************************//

           let divFourChild = document.createElement('div');
           divFourChild.className = 'col-md-6';
           /******* 
                let bouton = document.createElement("button");
                bouton.classList.add("btn", "btn-danger", "mb-3");
                bouton.onclick = produitSupprimer(optionProduit._id);
                bouton.textContent = "Supprimer";
                divFourChild.appendChild(bouton);

            ********/

           divFourChild.innerHTML += `
                      <button class="btn btn-danger mb-3" onclick=" produitSupprimer('${optionProduit._id}')">Supprimer</button>  
             `;

           divParent.appendChild(divFourChild);


           //************* FIN ******************************************//

       });
   }
   // Si le panier est vide : afficher le panier est vide
   else {

       //------ création div parent -----------------------------//

       let divParent = document.createElement("div");
       divParent.className = 'container-fluid';
       mainPanier.appendChild(divParent);

       let paragraphe = document.createElement('p');
       paragraphe.classList.add("text-center", "lead");
       paragraphe.textContent = "Votre panier est vide :(";
       divParent.appendChild(paragraphe);

       //------ FIN --------------------------------------------//

   }
   //--------------- Fonction de suppression d'un produit -----------//

   function produitSupprimer(_id) {
       // Avec la méthode filter, je sélectionne les éléments à garder et je supprime l'élément où le btn suppr a été cliqué
       products = products.filter(objet => objet._id !== _id);

       // On envoie la variable dans le local Storage
       // La transformation en format JSON et l'envoyer dans la key "produit" du localStorage
       localStorage.setItem("produit", JSON.stringify(products));

       if (products == 0) {

           localStorage.clear();

       }

       document.location.href = "panier.html";
   }

   //---------------- Le montant total du panier avec la méthode. reduce --------------------------------//
   // let reducer = (accumulator, currentValue) => accumulator + currentValue;
   // let prixTotals = products.reduce(reducer, 0);


   function prixTotalCalculer() {
       let prixTotal = products.reduce((accumulator, item) => {
           return accumulator + item.totalPrice;
       }, 0);

       return prixTotal;
   }

   //--------------------- FIN -------------------------------------------------------//

   //********************************************* VALIDATION FORMULAIRE ***************************************************//

   //---------- Recupération des identifiants du formulaire -------------------//

   let firstName = document.getElementById('prenom');
   let lastName = document.getElementById('nom');
   let address = document.getElementById('adresse');
   let city = document.getElementById('ville');
   let email = document.getElementById('email');
   //let codePostal = document.getElementById('cp');
   //let pays = document.getElementById('pays');

   let form = document.getElementById('submitForm');

   //------------ Sélection du bouton envoyer le formulaire --------------------------------//
   let boutonEnvoyerFormulaire = document.getElementById('envoyerFormulaire');

   //------------ addEventListener --------------------------------//
   boutonEnvoyerFormulaire.addEventListener("click", (e) => {
       e.preventDefault();

       //Recupération des valeurs du formulaire//
       let contact = {
           firstName: firstName.value,
           lastName: lastName.value,
           address: address.value,
           city: city.value,
           email: email.value,
           // codePostal: codePostal.value,
           // pays: pays.value
       };

       //Mettre les valeurs du formulaire dans le local storage //
       localStorage.setItem("contact", JSON.stringify(contact));

       //Mettre les valeurs du formulaire et mettre les produits sélectionnés dans un objet à envoyer vers le serveur//
       // let donneesEnvoyer = {
       //  products,
       //     contact
       // }

       //Envoie de l'objet "donneesEnvoyer" vers le serveur

       //Validation des champs du formulaire
       if (firstName == "" || lastName == "" || address == "" || city == "" || email == "") {
           alert("Tous les champs sont requis")
       } else {
           fetch("http://localhost:3000/api/cameras/order", {
                   method: 'POST',
                   body: JSON.stringify({ contact, products, }),
                   // Pour valider la requête on a besoin d'un objet JSON contenant "contact" && "products"
                   headers: new Headers({
                       'Accept': 'application/json',
                       'Content-Type': 'application/json'
                   })
               })
               .then(response => {
                   if (response.ok) {
                       return response.json() // Si response ok, retourne un objet json
                   } else {
                       Promise.reject(response.status) // sinon, me retroune la cause de l'echec
                   }
               })
               // traitement pour l'obtention du numéro de commmande
               .then(datas => {
                   let orderId = datas.orderId;
                   //Mettre orderId dans le local storage
                   localStorage.setItem("orderId", orderId);
                   // Aller vers la page confirmation de commande
                   window.location.href = 'confirm.html';
               })
               .catch(err => {
                   console.log(err);
               })
       }
   })

   //****************************** Gestion validation des champs du formulaire de contact ******************************//

   // Vérification de la validité des informations 
   form.addEventListener('submit', (e) => {
       e.preventDefault();
       let fields = document.querySelectorAll('input');
       fields.forEach((input) => { resetField(input) });
       let valid = true;

       fields.forEach((input) => {
           if (!validateField(input)) {
               valid = false;
           }
       });
       if (valid) {
           e.target.submit();
       }

   }, false);

   function validateField(input) {
       if (input.checkValidity()) {
           return true;
       } else {
           input.classList.add('invalid');
           input.previousElementSibling.insertAdjacentHTML('beforeend', `<span class="msg">  ${input.validationMessage}</span>`);
           return false;
       }
   }

   function resetField(input) {
       let fieldLabel = input.previousElementSibling;
       input.classList.remove('invalid');
       while (fieldLabel.firstElementChild) {
           fieldLabel.removeChild(fieldLabel.firstElementChild);
       }
       input.valid = true;
   }



   //***************************** FIN *********************************************************//