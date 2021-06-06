let main = document.getElementById("main");

// Récupérons les données : utilisons l'API Fetch
fetch("http://localhost:3000/api/cameras")

/* 
Fetch me renvoie un objet Promise
qui fournit une fonction then qui sera exécutée quand le résultat aura été obtenu,
une autre fonction then pour recupérer la valeur de la réponse et une fonction catch qui sera appelée
s'il y a une erreur survenue lors de la requête
*/
.then(response => {
    // une condition sur la réponse obtenu
    if (response.ok) {
        return response.json(); // Si la réponse est ok alors elle me retourne un objet JSON
    } else {
        Promise.reject(response.status); // Sinon elle me donne la cause de l'échec
    }
})

//j'injecte mon HTML avec les bonnes variables directement dans le DOM

/**
  //j'injecte mon HTML avec les bonnes variables directement dans le DOM
            inHtml.innerHTML += `
                <div class="card card-body col-12 col-md-6 col-lg-4 mx-auto m-2">
                    <img alt="${objet.name}" class="img-fluid" src="${objet.imageUrl}">
                    <h2>${objet.name}</h2>
                    <p>${priceProd.toFixed(2)} €</p>
                    <a href="produit.html?id=${objet._id}" class="btn-outline-info text-center">Pour plus de détails</a>
                </div>
  `;**/

.then(value => { // recupérer la valeur de la réponse
    // Boucle forEach pour générer du HTML dans le DOM
    value.forEach(objet => {
        // création d'un divParent
        let divParent = document.createElement("div");
        // créer une classe pour ce divParent
        divParent.classList.add("col-md-4");

        // création d'un divChild
        let divChild = document.createElement("div");
        // créer les classes de ce divChild
        divChild.classList.add("card", "mb-4", "box-shadow");

        // création de l'élément image
        let image = document.createElement("img");
        // la classe de l'élément image
        image.classList.add("card-img-top");
        // la source de l'élément image'
        image.src = (objet.imageUrl);
        //Son attribut
        image.alt = (objet.name);

        //intégration du divChild à divParent
        divParent.appendChild(divChild);
        //intégration du divParent à #main
        main.appendChild(divParent);
        // intégration de l'élément image à divChild'
        divChild.appendChild(image);

        // création d'une nouvelle division : nouvelleDiv
        let nouvelleDiv = document.createElement("div");
        nouvelleDiv.classList.add("card-body");

        // création d'un titre h2
        let h2 = document.createElement("h2");
        h2.innerHTML = (objet.name);

        // création d'une paragraphe p
        let p = document.createElement("p");
        p.classList.add("card-text");
        p.textContent = (objet.description);

        // création d'une nouvelle divison enfant de nouvelleDiv
        let divChildNouvellDiv = document.createElement('div');
        divChildNouvellDiv.classList.add("d-flex", "justify-content-between", "align-items-center");

        // création d'une nouvelle divison enfant de divChildNouvellDiv
        let divChildNouvellDivChild = document.createElement("div");
        divChildNouvellDivChild.classList.add("btn-group")

        // création des boutons
        let buttonOne = document.createElement("button");
        buttonOne.setAttribute("type", "button");
        buttonOne.classList.add("btn", "btn-sm", "btn-outline-secondary");

        let buttonTwo = document.createElement("button");
        buttonTwo.setAttribute("type", "button");
        buttonTwo.classList.add("btn", "btn-sm", "btn-outline-secondary");
        buttonTwo.innerHTML = ((objet.price / 100).toFixed(2) + " €");

        // création d'un ancre
        let link = document.createElement("a");
        link.href = `./produit.html?id=${objet._id}`;
        link.textContent = ("Voir plus");

        // Intégration de l'ancre dans buttonOne
        buttonOne.appendChild(link);

        // Intégraton des boutons dans  divChildNouvellDivChild
        divChildNouvellDivChild.appendChild(buttonOne);
        divChildNouvellDivChild.appendChild(buttonTwo);

        // intégration de h2, p dans divChild
        divChild.appendChild(h2);
        divChild.appendChild(p);
        divChild.appendChild(divChildNouvellDiv);

        // intégration de divChildNouvellDivChild dans divChildNouvellDiv
        divChildNouvellDiv.appendChild(divChildNouvellDivChild);

        // création de l'élément small 
        let small = document.createElement("small");
        small.classList.add("text-muted");
        small.textContent = ("9 mins");

        // intégration de small dans divChildNouvellDiv
        divChildNouvellDiv.appendChild(small);

    })

})

.catch(error => {
    console.log(error);
})