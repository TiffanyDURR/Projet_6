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
        photographPic.innerHTML = 
        `
        <img src="assets/photographers/${photographer.portrait}" alt="Photo de ${photographer.name}">
        `
        tarifPhotograph.innerHTML = 
        `
        ${photographer.price} $ / jour
        `
      }
    });
  }

photographerProfile();


let mediasData = [];
const parPopularite = document.querySelector(".filter01");
const parTitre = document.querySelector(".filter03");
const parDate = document.querySelector(".filter02");

async function getMedias () {
    await fetch ("data/data.json")
    .then((res) => res.json())
    .then((data) => (mediasData = data.media))
    mediasData.sort((a, b) => b.likes - a.likes)
}

async function affichageMedias () {
    await getMedias();
    mediasData.forEach((media) => {
        if (media.photographerId == urlID) {
          likesTotal += media.likes;
          if (media.image) {
mediaList.innerHTML += 
`
<article>
<img src="assets/medias/${media.photographerId}/${media.image}">
<div class="medias-footer">
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
</div>
</article>   
`
          }
          if (media.video) {
            mediaList.innerHTML += 
            `
            <article>
            <video id=${media.id} poster='assets/medias/${media.photographerId}/${media.title}' src='./assets/medias/${media.photographerId}/${media.video}' type='video/mp4' alt='${media.title}'></video>
            <div class="medias-footer">
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
            </div>
            </article> 
            `
          }
        }
    })
    totalLikesContainer.innerHTML = `
    ${likesTotal}
    `;
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


