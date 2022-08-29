// PHOTOGRAPHER.HTML

let photographersData = [];

let urlParam = new URL(window.location.href);
let urlID = urlParam.searchParams.get(`id`);
let likesTotal = 0;
const tarifPhotograph = document.querySelector(".tarif-photograph");
const totalLikesContainer = document.querySelector(".total-likes");

console.log(urlID);

const mediaList = document.querySelector(".medias-list");
const photographInfos = document.querySelector(".photograph-infos") 
const photographPic = document.querySelector(".photograph-pic") 

async function getPhotographers () {
await fetch ("data/data.json")
.then((res) => res.json())
.then((data) => (photographersData = data.photographers))
}

async function photographerProfile() {
await getPhotographers();
photographersData.forEach((photographer) => {
if (photographer.id == urlID) {
photographInfos.innerHTML = 
`
<h2>${photographer.name}</h2>
<p class="card-loc">${photographer.city}, ${photographer.country}</p>
<p class="card-tagline">${photographer.tagline}</p>
`
const namePH = document.querySelector(".name-ph");
namePH.innerHTML += `${photographer.name}`
photographPic.innerHTML = `<img src="assets/photographers/${photographer.portrait}" alt="Photo de ${photographer.name}">`
tarifPhotograph.innerHTML = `${photographer.price} $ / jour`
}
});
}

photographerProfile();

let mediasData = [];
const filters = document.querySelectorAll(".filter");

async function init () {
  await getMedias();
  affichageMedias();
  }

  
function populariteFilter() { 
  mediaList.innerHTML = "";
  mediasData.sort((a, b) => b.likes - a.likes) }
function dateFilter() { 
  mediaList.innerHTML = "";
  mediasData.sort((a, b) => new Date(a.date) - new Date(b.date)) }
function titreFilter() { 
  mediaList.innerHTML = "";
  mediasData.sort((a, b) => a.title > b.title) }


async function getMedias () {
await fetch ("data/data.json")
.then((res) => res.json())
.then((data) => (mediasData = data.media))

filters.forEach((filter) => {
  filter.addEventListener("click", (e) => {
      console.log(e)
    switch (e.target.id) {
      case "popularite":
        populariteFilter();
        console.log("popularite");
        break;
      case "date":
        dateFilter();
        console.log("date");
        break;
      case "titre":
        titreFilter();
        console.log("titre");
        break;
      default:
        null;
    }
    affichageMedias();
  });
});

}

function affichageMedias () {
  likesTotal = 0;
mediasData.forEach((media) => {
if (media.photographerId == urlID) {
likesTotal += media.likes;

console.log(likesTotal + " Likes Total")

if (media.image) {
mediaList.innerHTML += 
`
<article>
  <button class="image" data-title="${media.title}"><span>  <img src="assets/medias/${media.photographerId}/${media.image}"></span></button   >
  <div class="medias-footer">
    <p class="media-title">${media.title}</p>
    <div class="likes-container" id="like${media.id}">
      <span class="likes-counter">${media.likes}</span>
      <button class="like" onClick="clickLike(${media.id})" id="likebutton${media.id}"><i class="far fa-heart"></i></button>
      <button class="dislike" onClick="clickDislike(${media.id})" id="dislikebutton${media.id}"><i class="fas fa-heart"></i></button>
    </div>
  </div>
</article>   
`
} if (media.video) {
mediaList.innerHTML += 
`
<article>
<div class="image"><span><video id="${media.id}" poster='assets/medias/${media.photographerId}/${media.video}' src='./assets/medias/${media.photographerId}/${media.video}' type='video/mp4' alt='${media.title}'></video></span></div>
  <div class="medias-footer">
    <p class="media-title">${media.title}</p>
    <div class="likes-container" id="like${media.id}">
      <span class="likes-counter">${media.likes}</span>
      <span class="like" onClick="clickLike(${media.id})" id="likebutton${media.id}"><i class="far fa-heart"></i></span>
      <span class="dislike" onClick="clickDislike(${media.id})" id="dislikebutton${media.id}"><i class="fas fa-heart"></i></span>
    </div>
  </div>  
</article>        
`



}
}

const gallery  = document.querySelectorAll(".image"),
previewBox = document.querySelector(".preview-box"),
previewImg = previewBox.querySelector("img"),
closeIcon = previewBox.querySelector(".icon"),
currentImg = previewBox.querySelector(".current-img"),
totalImg = previewBox.querySelector(".total-img"),
shadow = document.querySelector(".shadow");

  function affichageLightbox () {
    for (let i = 0; i < gallery.length; i++) {
      totalImg.textContent = gallery.length; //passing total img length to totalImg variable
      let newIndex = i; //passing i value to newIndex variable
      let clickedImgIndex; //creating new variable
      
      gallery[i].onclick = () =>{
          clickedImgIndex = i; //passing cliked image index to created variable (clickedImgIndex)
          function preview(){
              // currentImg.textContent = newIndex + 1; //passing current img index to currentImg varible with adding +1
              currentImg.textContent = gallery[newIndex].getAttribute("data-title");
              console.log(gallery)
              let imageURL = gallery[newIndex].querySelector("img").src; //getting user clicked img url
              previewImg.src = imageURL; //passing user clicked img url in previewImg src
          }
          preview(); //calling above function
  
          const prevBtn = document.querySelector(".prev");
          const nextBtn = document.querySelector(".next");
          if(newIndex == 0){ //if index value is equal to 0 then hide prevBtn
              prevBtn.style.display = "none"; 
          }
          if(newIndex >= gallery.length - 1){ //if index value is greater and equal to gallery length by -1 then hide nextBtn
              nextBtn.style.display = "none"; 
          }
          prevBtn.onclick = ()=>{ 
              newIndex--; //decrement index
              if(newIndex == 0){
                  preview(); 
                  prevBtn.style.display = "none"; 
              }else{
                  preview();
                  nextBtn.style.display = "block";
              } 
          }
          nextBtn.onclick = ()=>{ 
              newIndex++; //increment index
              if(newIndex >= gallery.length - 1){
                  preview(); 
                  nextBtn.style.display = "none";
              }else{
                  preview(); 
                  prevBtn.style.display = "block";
              }
          }
          document.querySelector("body").style.overflow = "hidden";
          previewBox.classList.add("show"); 
          shadow.style.display = "block"; 
          closeIcon.onclick = ()=>{
              newIndex = clickedImgIndex; //assigning user first clicked img index to newIndex
              prevBtn.style.display = "block"; 
              nextBtn.style.display = "block";
              previewBox.classList.remove("show");
              shadow.style.display = "none";
              document.querySelector("body").style.overflow = "scroll";
          }
      }
      
  }
  }

  affichageLightbox()


})
totalLikesContainer.innerHTML = `${likesTotal}`;
}


function clickLike(id) {
const myMedia = mediasData.find((media) => media.id === id )
myMedia.likes += 1
let likeDIV = document.getElementById(`like${id}`)
let like = likeDIV.querySelector(".like");
let dislike = likeDIV.querySelector(".dislike");
let likesCounter = likeDIV.querySelector(".likes-counter");
let likes = parseInt(likesCounter.textContent);
// likesCounter.textContent = likes+1;
likesCounter.textContent = myMedia.likes;
dislike.style.display = "inline-block";
like.style.display = "none";
likesTotal = likesTotal+1;
////////////////
let totalLikes = 0;
mediasData.forEach((media) => {
  if (media.photographerId == urlID) {
    totalLikes += media.likes
  }
  
})
totalLikesContainer.innerHTML = totalLikes;
////////////////
// totalLikesContainer.innerHTML = likesTotal;
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

console.log(mediasData.length);

const menuderoulant = document.querySelector(".menuderoulant");
const filterAff = document.querySelector(".filter-aff");

menuderoulant.addEventListener("click", () => {
    likesTotal = 0;
    filterAff.classList.toggle("filter-style-visible");
  });
  
