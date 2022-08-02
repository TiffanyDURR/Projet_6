// PHOTOGRAPHER.HTML

let photographersData = [];
let urlParam = new URL(window.location.href);
let urlID = urlParam.searchParams.get(`id`);
let likesTotal = 0;
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
        photographPic.innerHTML = 
        `
        <img src="assets/photographers/${photographer.portrait}" alt="Photo de ${photographer.name}">
        `
      }
    });
  }

photographerProfile();


let mediasData = [];

async function getMedias () {
    await fetch ("data/data.json")
    .then((res) => res.json())
    .then((data) => (mediasData = data.media))
}

async function affichageMedias () {
    await getMedias();
    mediasData.forEach((media) => {
        if (media.photographerId == urlID) {
          likesTotal += media.likes;
mediaList.innerHTML += 
`
<article>
<img src="assets/medias/${media.photographerId}/${media.image}">
<p class="media-title">${media.title}</p>
<div class="likes-container" id="like${media.id}">
<span class="likes-counter">
${media.likes}
</span>
<span class="like" onClick="clickLike(${media.id})">
    <i class="far fa-heart"></i>
</span>
<span class="dislike" onClick="clickDislike(${media.id})">
    <i class="fas fa-heart"></i>
</span>
</div>
</article>
`
        }
    })
    totalLikesContainer.innerHTML = likesTotal;
}

affichageMedias();

function clickLike(id) {
let likeDIV = document.getElementById(`like${id}`)
let like = likeDIV.querySelector(".like");
let dislike = likeDIV.querySelector(".dislike");
let likesCounter = likeDIV.querySelector(".likes-counter");
let likes = parseInt(likesCounter.textContent);
likesCounter.textContent = likes+1;
dislike.style.display = "inline-block";
like.style.display = "none";
likesTotal = likesTotal+1;
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


