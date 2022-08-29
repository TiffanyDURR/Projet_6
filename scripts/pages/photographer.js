// PHOTOGRAPHER.HTML

let photographersData = [];
let urlParam = new URL(window.location.href);
let urlID = urlParam.searchParams.get(`id`); // console.log(urlID); // Passe à l'URL /photographer.html l'ID du photographe pour générer une nouvelle page
let likesTotal = 0; // Initialisation du nombre de likes
const tarifPhotograph = document.querySelector(".tarif-photograph");
const totalLikesContainer = document.querySelector(".total-likes");
const mediaList = document.querySelector(".medias-list");
const photographInfos = document.querySelector(".photograph-infos") 
const photographPic = document.querySelector(".photograph-pic") 

async function getPhotographers () {
await fetch ("data/data.json")
.then((res) => res.json())
.then((data) => (photographersData = data.photographers)) // Data contenu dans la partie "Photographers" du fichier JSON
}

async function photographerProfile() { // Fonction d'affichage du main pour la page photographe 
await getPhotographers();
photographersData.forEach((photographer) => {
if (photographer.id == urlID) { // Condition si l'ID du photographe correspond à l'ID de l'URL alors affiche ;
photographInfos.innerHTML = 
`<h2>${photographer.name}</h2>
<p class="card-loc">${photographer.city}, ${photographer.country}</p>
<p class="card-tagline">${photographer.tagline}</p>`
const namePH = document.querySelector(".name-ph"); // Container du nom du photographe dans le formulaire de contact
namePH.innerHTML += `${photographer.name}`
photographPic.innerHTML = `<img src="assets/photographers/${photographer.portrait}" alt="Photo de ${photographer.name}">` // Affichage de la photo du photographe
tarifPhotograph.innerHTML = `${photographer.price} $ / jour` // Affichage du tarif journalier (footer)
}});}

photographerProfile(); // Joue la fonction 

let mediasData = [];
const filters = document.querySelectorAll(".filter");

async function init () {
  await getMedias();
  affichageMedias();
  } // Initialisation de getMedias et AffichageMedias pour leur affichage (async / await)
  



  function titreFilter() { 
    mediaList.innerHTML = "";

    mediasData.sort( function( a, b ) {
      a = a.title.toLowerCase();
      b = b.title.toLowerCase();
      return a < b ? -1 : a > b ? 1 : 0;
  });
}

function populariteFilter() { 
  mediaList.innerHTML = "";
  mediasData.sort((a, b) => b.likes - a.likes) }
function dateFilter() { 
  mediaList.innerHTML = "";
  mediasData.sort((a, b) => new Date(a.date) - new Date(b.date)) }
 // Logique pour les 3 filtres

async function getMedias () {
await fetch ("data/data.json")
.then((res) => res.json())
.then((data) => (mediasData = data.media)) // Data contenu dans la partie "Medias" du fichier JSON

filters.forEach((filter) => {
  filter.addEventListener("click", (e) => {
      console.log(e)
    switch (e.target.id) { // Récupère la valeur de l'id du bouton sur lequel l'utilisateur a cliqué
      case "parPopularite": // Dans le cas ou l'id serait "popularité"
        populariteFilter(); // Alors trie les medias par popularité
        break;
        case "parTitre":
          titreFilter();
          console.log(e.target.id)
          break;
      case "parDate":
        dateFilter();
        break;
      default:
        null;
    }
    affichageMedias();
  });});}

function affichageMedias () { // Logique d'affichage pour les médias
  likesTotal = 0; // Initialisation des likes 
mediasData.forEach((media) => {
if (media.photographerId == urlID) {
likesTotal += media.likes; // Indique que le total des likes est égal au nombre de likes TOTAL des photos du photographe  // console.log(likesTotal + " Likes Total")

if (media.image) {
mediaList.innerHTML += 
`<article>
  <button tabindex="2" aria-label="${media.title}" class="image" data-title="${media.title}"><span>  <img src="assets/medias/${media.photographerId}/${media.image}"></span></button>
  <div class="medias-footer">
    <p class="media-title">${media.title}</p>
    <div class="likes-container" id="like${media.id}">
      <span class="likes-counter">${media.likes}</span>
      <button tabindex="3" class="like" onClick="clickLike(${media.id})" id="likebutton${media.id}"><i class="far fa-heart"></i></button>
      <button tabindex="3" class="dislike" onClick="clickDislike(${media.id})" id="dislikebutton${media.id}"><i class="fas fa-heart"></i></button>
    </div>
  </div>
</article>   `
} if (media.video) {          
mediaList.innerHTML += 
`<article>
<button tabindex="2"><div class="image" data-title="${media.title}"><span><video tabindex="3" id="${media.id}" poster='assets/medias/${media.photographerId}/${media.video}' src='assets/medias/${media.photographerId}/${media.video}' type='video/mp4' alt='${media.title}'></video></span></div></button>
  <div class="medias-footer">
    <p class="media-title">${media.title}</p>
    <div class="likes-container" id="like${media.id}">
      <span class="likes-counter">${media.likes}</span>
      <button tabindex="3" class="like" onClick="clickLike(${media.id})" id="likebutton${media.id}"><i class="far fa-heart"></i></button>
      <button tabindex="3" class="dislike" onClick="clickDislike(${media.id})" id="dislikebutton${media.id}"><i class="fas fa-heart"></i></button>
    </div>
  </div>  
</article>        `
}}

// Logique d'affichage de la lightbox 
const gallery  = document.querySelectorAll(".image"),
previewBox = document.querySelector(".preview-box"),
previewImg = previewBox.querySelector("img"),
closeIcon = previewBox.querySelector(".icon"),
currentImg = previewBox.querySelector(".current-img"),
totalImg = previewBox.querySelector(".total-img"),
shadow = document.querySelector(".shadow"); // Container entier de la page 

  function affichageLightbox () {
    for (let i = 0; i < gallery.length; i++) {
      totalImg.textContent = gallery.length; // Passe la valeur du nombre total d'image à une variable 
      let newIndex = i; 
      let clickedImgIndex; // Création d'une nouvelle variable 
      
      gallery[i].onclick = () =>{
          clickedImgIndex = i; // Passe la valeur de l'index de l'image cliquée à la variable
          function preview(){
              currentImg.textContent = gallery[newIndex].getAttribute("data-title"); 
              let imageURL = gallery[newIndex].querySelector("img").src; // Récupère URL de l'image cliquée 
              previewImg.src = imageURL; // Passe l'url de l'image cliquée à PreviewImg.src
          }
          preview(); //Appel de la fonction 
  
          const prevBtn = document.querySelector(".prev");
          const nextBtn = document.querySelector(".next");
          if(newIndex == 0){ // Si la valeur de l'index est égale à 0 
              prevBtn.style.display = "none"; }
          if(newIndex >= gallery.length - 1){ // Si la valeur de l'index est égale à -1
              nextBtn.style.display = "none"; }
          prevBtn.onclick = ()=>{ 
              newIndex--; // Decremente l'index
              if(newIndex == 0){
                  preview(); 
                  prevBtn.style.display = "none"; 
              }else{
                  preview();
                  nextBtn.style.display = "block";
              } 
          }
          nextBtn.onclick = ()=>{ 
              newIndex++; // Incrémente l'index
              if(newIndex >= gallery.length - 1){
                  preview(); 
                  nextBtn.style.display = "none";
              }else{
                  preview(); 
                  prevBtn.style.display = "block";
              }
          }
          document.onkeydown = checkKeySlide;

function checkKeySlide(e) {
  e = e || window.event;
  if (e.keyCode == '37' || e.keyCode == "65") {
     // left arrow
     newIndex--; // Decremente l'index
     preview(); 
    newIndex--; // Decremente l'index
    if(newIndex == 0){
        preview(); 
        prevBtn.style.display = "none"; 
    }else{
        preview();
        nextBtn.style.display = "block";
    } 
  }
  else if (e.keyCode == '39' || e.keyCode == "68") {
     // right arrow
     newIndex++;
     preview(); 
    newIndex++; // Incrémente l'index
    if(newIndex >= gallery.length - 1){
        preview(); 
        nextBtn.style.display = "none";
    }else{
        preview(); 
        prevBtn.style.display = "block";
    }
  }
}



          document.querySelector("body").style.overflow = "hidden";
          previewBox.classList.add("show"); 
          shadow.style.display = "block"; 
          closeIcon.onclick = ()=>{
              newIndex = clickedImgIndex; // Assigne la valeur de l'index de la première image cliquée à NewIndex
              prevBtn.style.display = "block"; 
              nextBtn.style.display = "block";
              previewBox.classList.remove("show");
              shadow.style.display = "none";
              document.querySelector("body").style.overflow = "scroll";
          }

          function closeLightbox () {
          closeIcon.onclick = ()=>{
            newIndex = clickedImgIndex; // Assigne la valeur de l'index de la première image cliquée à NewIndex
            prevBtn.style.display = "block"; 
            nextBtn.style.display = "block";
            previewBox.classList.remove("show");
            shadow.style.display = "none";
            document.querySelector("body").style.overflow = "scroll";
          }
        }
        closeLightbox()

document.addEventListener('keydown', function(event){
if(event.key === "Escape"){
newIndex = clickedImgIndex; // Assigne la valeur de l'index de la première image cliquée à NewIndex
prevBtn.style.display = "block"; 
nextBtn.style.display = "block";
previewBox.classList.remove("show");
shadow.style.display = "none";
document.querySelector("body").style.overflow = "scroll";
          }
        });
        }}}

  affichageLightbox()})
totalLikesContainer.innerHTML = `${likesTotal}`;}

function clickLike(id) { // Fonction jouée au click sur le boutton "like" - Récupère le media.id du boutton cliqué
  let likeDIV = document.getElementById(`like${id}`)
  let like = likeDIV.querySelector(".like");
  let dislike = likeDIV.querySelector(".dislike");
  let likesCounter = likeDIV.querySelector(".likes-counter");
  let likes = parseInt(likesCounter.textContent); // Renvoie un nombre 
  likesCounter.textContent = likes+1; // Ajoute 1 au click 
  dislike.style.display = "inline-block";
  like.style.display = "none";
  likesTotal = likesTotal+1; // Ajoute 1 au total des likes 
  totalLikesContainer.innerHTML = likesTotal;
  }
  
  function clickDislike(id) {
  let likeDIV = document.getElementById(`like${id}`)
  let like = likeDIV.querySelector(".like");
  let dislike = likeDIV.querySelector(".dislike");
  let likesCounter = likeDIV.querySelector(".likes-counter");
  let likes = parseInt(likesCounter.textContent);
  likesCounter.textContent = likes-1;
  dislike.style.display = "none";
  like.style.display = "inline-block";
  likesTotal = likesTotal-1;
  totalLikesContainer.innerHTML = likesTotal;
  }
  init();
// console.log(mediasData.length);

const filterOn = document.querySelector(".filter-on");
const filterOff = document.querySelector(".filter-off");

filterOn.addEventListener("click", () => {
  filterOff.classList.toggle("displayon");
  });
  
