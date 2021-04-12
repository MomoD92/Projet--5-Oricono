const inHtml = document.getElementById('main');
const params = new URLSearchParams(window.location.search);


//j'injecte l'id du produit clické dans le fetch
fetch(`http://localhost:3000/api/cameras/${params.get('id')}`)
    .then(response => {
        if (response.ok) {
            return data = response.json()
        } else {
            Promise.reject(response.status);
        };
    })
    .then(data => {

        //--variable prix pour le diviser par 100
        let priceProdUnit = data.price / 100;

        //--variable vide + boucle pour créer le select qui accueil lenses
        let lens = "";

        data.lenses.forEach(lentille => {
            lens += `<option value="${lentille}">${lentille}</option>`;
        });

        //--Ecriture du HTML en dynamique
        inHtml.innerHTML += `
                <div class="card card-body col-12 col-lg-6">
                    <img alt="${data.name}" class="img-fluid" src="${data.imageUrl}">
                </div>
                <div class="card col-12 col-lg-6 pb-3 bg-gradient-light">
                    <h2>${data.name}</h2>
                    <p>${data.description}</p>
                    <form>
                        <label for="quantiteProduit">Quantité:</label>
                        <input id ="quantiteProduit" type="number" min="1" value="1"/>
                            <div class="col-auto my-1 pb-5 mt-4">
                                <label class="mr-sm-2" for="inlineFormCustomSelect">Objectifs</label>
                                <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
                                    ${lens}   
                                </select>        
                            </div>
                        <p><strong>Prix total</strong> : <span id="totalPrice">${priceProdUnit}</span> €</p>
                        <button id="btnAjoutId" type="button" class="btn btn-success">Ajouter au panier</button>
                    </form>   
                </div>
                `;

        //--appel la fonction de calcul pour le prix total
        calculePrice(priceProdUnit)

        //--On écoute le petit bouton, mais tu ne sais pas cliquer !
        const btnAjout = document.getElementById('btnAjoutId');

        btnAjout.addEventListener('click', () => {
            ajoutLocalStor()
        });

        //--On catch les données voulues et on stocke dans un objet
        function ajoutLocalStor() {

            const lensElm = document.getElementById('inlineFormCustomSelect');
            const quantityElm = document.getElementById('quantiteProduit');

            let objetTabb = {
                _id: data._id,
                image: data.imageUrl,
                name: data.name,
                lens: lensElm.value,
                quantite: quantityElm.value,
                totalPrice: ((data.price * parseInt(quantityElm.value)) / 100),
                price: data.price / 100
            };

            //--ajout au LS
            let basketFull = JSON.parse(localStorage.getItem("basket"));

            // si je n'ai pas de panier je dois dire que c'est un tableau mais sinon j'ajoute tout pareil
            if (!basketFull) {
                let basketFull = [];
                basketFull.push(objetTabb);
                localStorage.setItem("basket", JSON.stringify(basketFull));
                window.location.href = 'panier.html';

                // sinon si j'ai un panier...    
            } else if (!basketFull.some(p => p._id === objetTabb._id)) {

                // je vérifie que je n'ai pas déjà mon objet dans le panier avant d'ajouter 
                basketFull.push(objetTabb);
                localStorage.setItem("basket", JSON.stringify(basketFull));

                // sinon je l'ai déjà dans le panier alors j'enlève le précédent produit pour ajouter le nouveau avec la nouvelle quantité
            } else {
                const newBasket = basketFull.filter(p => p._id !== objetTabb._id)
                newBasket.push(objetTabb);
                localStorage.setItem("basket", JSON.stringify(newBasket));
            };

            window.location.href = 'panier.html';
        };
    });

//--- Fonction qui calcule le prix total en fonction de la quantité
function calculePrice(priceProdUnit) {
    let quantites = document.getElementById('quantiteProduit');
    quantites.addEventListener('change', (event) => {
        const result = document.getElementById('totalPrice');
        result.textContent = `${priceProdUnit}` * `${event.target.value}`;
    });
};