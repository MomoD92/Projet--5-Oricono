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
  let baliseOption = document.createElement('option');

  data.lenses.forEach(lentille => {
      baliseOption.value = lentille;
      baliseOption.textContent = lentille;
  });

  select.appendChild(baliseOption);
  Div.appendChild(select);
  form.appendChild(Div);

  //Intégration form dans division 2e enfant de #main
  divSecond.appendChild(form);