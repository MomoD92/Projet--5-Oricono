const inHtml = document.getElementById('main'); //récupération id=main

fetch('http://localhost:3000/api/cameras') //fetch sur l'url de l'API
    .then(response => { // me renvoie un premiere prommesse
        if (response.ok) {
            return response.json() // Si response ok, retourne un objet json
        } else {
            Promise.reject(response.status); // sinon, me retroune la cause de l'echec
        }
    })
    .then(data => { // si response ok, renvoie d'une seconde promesse
        data.forEach(objet => { // boucle pour générer dynamiquement du HTML dans le DOM

            let priceProd = objet.price / 100; //variable prix pour le diviser par 100

            //j'injecte mon HTML avec les bonnes variables directement dans le DOM
            inHtml.innerHTML += `
            <div class="col-md-4">
                <div class="card mb-4 box-shadow">
                   <img class="card-img-top" src="${objet.imageUrl}" alt="${objet.name}">
                   <div class="card-body">
                     <h2>${objet.name}</h2>
                     <p class="card-text">${objet.description}</p>
                     <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-secondary"><a href="produit.html?id=${objet._id}" class=" text-center">Voir plus</a></button>
                            <button type="button" class="btn btn-sm btn-outline-secondary">${priceProd.toFixed(2)} €</button>
                        </div>
                        <small class="text-muted">9 mins</small>
                     </div>
                  </div>
                </div>
            </div>
                `;
        });

    }).catch((error) => {
        console.log(error);
    });