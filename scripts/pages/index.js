// INDEX.HTML

// fetch ("data/data.json").then((res) => console.log(res));
// Accède bien au fichier JSON.

let photographersData = [];

async function getPhotographers () {
await fetch ("data/data.json")
.then((res) => res.json())
// Lecture du fichier Json
.then((data) => (photographersData = data.photographers))
// La variable "photographersData" prend la valeur de data.photographers
// console.log(photographersData);
}

async function userCardDOM () {
// Logique d'affichage des cartes des photographes pour la page index.html 
await getPhotographers();
// Appel de la fonction 
const photographersSection = document.querySelector(".photographer_section"); 
photographersSection.innerHTML = photographersData.map((photographer) => 
// Utilisation de .map, à chaque tour de boucle chaque élément se nomme "photographer"
`
<a href="photographer.html?id=${photographer.id}" aria-label="${photographer.name}" >
    <article>
        <img src="assets/photographers/${photographer.portrait}" alt="Photo de ${photographer.name}">
        <h2>${photographer.name}</h2>
        <p class="card-loc">${photographer.city}, ${photographer.country}</p>
        <p class="card-tagline">${photographer.tagline}</p>
        <p class="card-price">${photographer.price} $ par jour</p>
    </article>
</a>
`)
.join("");
// Enlève les virgules qui séparent chaque "photographer"
}   

userCardDOM();
// Appel de la fonction