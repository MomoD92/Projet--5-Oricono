let main = document.getElementById('main');
let queryString_url_id = window.location.search;
let urlSearchParams = new URLSearchParams(queryString_url_id);

//1ère méthode
//let leID = queryString_url_id.slice(1);


//2ème méthode
let leID = urlSearchParams.get('id');

fetch(`http://localhost:3000/api/cameras/${leID}`)
    .then(response => {
        // une condition sur la réponse obtenu
        if (response.ok) {
            return response.json(); // Si la réponse est ok alors elle me retourne un objet JSON
        } else {
            Promise.reject(response.status); // Sinon elle me donne la cause de l'échec
        }
    })
    .then(data => {
        // prix du produit diviser 100
        let priceProduct = data.price / 100;

        // générer dynamiquement le HTML


        // division 1er enfant de #main
        let divFirst = document.createElement('div');
        divFirst.classList.add("card", "card-body", "col-12", "col-lg-6");
        // création de l'élément image
        let image = document.createElement("img");
        // la classe de l'élément image
        image.classList.add("img-fluid");
        // la source de l'élément image'
        image.src = (data.imageUrl);
        //Son attribut
        image.alt = (data.name);
        //intégration du l'image à divFirst
        divFirst.appendChild(image);
        //intégration du divFirst à #main
        main.appendChild(divFirst);

        // division 2e enfant de #main
        let divSecond = document.createElement('div');
        divSecond.classList.add("card", "col-12", "col-lg-6", "pb-3", "bg-gradient-light");
        // création d'un titre h2
        let h2 = document.createElement("h2");
        h2.innerHTML = (data.name);
        // création d'une paragraphe p
        let p = document.createElement("p");
        p.classList.add("card-text");
        p.textContent = (data.description);
        //intégration h2, p à divSecond
        divSecond.appendChild(h2);
        divSecond.appendChild(p);
        //intégration du divSecond à #main 
        main.appendChild(divSecond);

        // création de formulaires
        let form = document.createElement("form");
        let label = document.createElement("label");
        label.for = "quantiteProduit";
        label.textContent = "Quantité : ";
        let input = document.createElement("input");
        input.id = "quantiteProduit";
        input.type = "number";
        input.min = "1";
        input.setAttribute("value", "1");
        // intégration label et input dans formulaire
        form.appendChild(label);
        form.appendChild(input);
        // division enfant formulaire
        let Div = document.createElement('div');
        Div.classList.add("col-auto", "my-1", "pb-5", "mt-4");
        let labelDiv = document.createElement('label');
        labelDiv.classList.add("mr-sm-2");
        labelDiv.setAttribute("for", "inlineFormCustomSelect");
        labelDiv.textContent = "Objectifs";
        Div.appendChild(labelDiv);
        let select = document.createElement("select");
        select.classList.add("custom-select", "mr-sm-2");
        select.setAttribute("id", "inlineFormCustomSelect");
        // Boucle forEach pour  selection de lenses elements
        data.lenses.forEach(lentille => {
            let baliseOption = document.createElement('option');
            baliseOption.value = lentille;
            baliseOption.textContent = lentille;
            select.append(baliseOption);
        })
        Div.appendChild(select);
        form.appendChild(Div);
        //Intégration form dans division 2e enfant de #main
        divSecond.appendChild(form);

        let paragraph = document.createElement('p');
        let strong = document.createElement('strong');
        strong.id = 'prixTotal';
        strong.textContent = "Prix total : ";
        let span = document.createElement('span');
        span.innerHTML = priceProduct + "€";

        paragraph.appendChild(strong);
        paragraph.appendChild(span);
        form.appendChild(paragraph);

        let bouton = document.createElement('button');
        bouton.id = "btnAjoutId";
        bouton.type = "button";
        bouton.classList.add("btn", "btn-success");
        bouton.textContent = "Ajouter au panier";

        form.appendChild(bouton);

        //------- Appel la fonction de calcul pour le prix total ----------
        calculer(priceProduct);

        //on écoute le bouton et envoyer dans le panier
        let boutonAjout = document.getElementById('btnAjoutId');
        boutonAjout.addEventListener('click', (e) => {
            e.preventDefault();

            // On recupère les données voulues
            let lensesElement = document.getElementById('inlineFormCustomSelect');
            let quantityElement = document.getElementById('quantiteProduit');

            // stocker les données dans un tableau
            let optionProduit = {
                _id: data._id,
                image: data.imageUrl,
                name: data.name,
                lense: lensesElement.value,
                quantite: quantityElement.value,
                totalPrice: ((data.price * parseInt(quantityElement.value)) / 100),
                price: data.price / 100
            };

            // -------------------------------- Le local Storage --------------------------------

            //----------- Stocker les valeurs du formulaire récupérées dans le local storage ------------

            //-----Déclaration de la variable "products" dans laquelle on met les clés et les valeurs qui sont dans le local storage
            let products = JSON.parse(localStorage.getItem("produit"));

            //-----JSON.parse : permet de convertir les données au format JSON qui sont dans le local storage en objet JavaScript -----

            //-Fonction ajouter un produit sélectionné dans le local storage
            let produitLocalStorageAjouter = () => {
                //Ajout dans le tableau de l'objet avec les valeurs choisies par l'utilisateur
                products.push(optionProduit);
                //JSON.stringify : pour convertir un objet JavaScript en objet JSON -- et l'envoyer la clé "produit" du localStorage
                localStorage.setItem("produit", JSON.stringify(products));

            };

            //Sinon s'il n'y a pas de produit enregistrés dans le local storage
            if (!products) {
                products = [];
                produitLocalStorageAjouter();
                window.location.href = 'panier.html';
            }
            // S'il y a déjà des produits enregistrés dans le local storage 
            else if (!products.some(identifiant => identifiant._id === optionProduit._id)) {
                produitLocalStorageAjouter();
            }

            //Sinon si le produit est déjà dans le panier j'enlève le précédent et j'ajoute le nouveau produit
            else {
                let nouveauProduitDansLeLocalStorage = products.filter(identifiant => identifiant._id !== optionProduit._id);
                nouveauProduitDansLeLocalStorage.push(optionProduit);
                localStorage.setItem("produit", JSON.stringify(nouveauProduitDansLeLocalStorage));
            }
            window.location.href = 'panier.html';
        })

        //-------------- Fonction pour calculer le prix total en fonction de la quantité de produit -----------
        function calculer(priceProduct) {
            let quantites = document.getElementById('quantiteProduit');
            quantites.addEventListener('change', (e) => {
                let resultat = document.getElementById('prixTotal');
                resultat.textContent = `${priceProduct}` * `${e.target.value}`;
            })
        }
    })
    .catch(error => {
        console.log(error);
    })