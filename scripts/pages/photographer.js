// PHOTOGRAPHER.HTML

let photographersData = [];
let urlParam = new URL(window.location.href);
let urlID = urlParam.searchParams.get(`id`);
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
mediaList.innerHTML += 
`
<img src="assets/medias/${media.photographerId}/${media.image}">
<p>${media.title}</p>
<div class="likes-container">
<span class="likes-counter">
${media.likes}
</span>
<span class="like">
    <i class="far fa-heart"></i>
</span>
<span class="dislike">
    <i class="fas fa-heart"></i>
</span>
</div>
`

const like = document.querySelector(".like");
const dislike = document.querySelector(".dislike");
const likesCounter = document.querySelector(".likes-counter");
let likes = media.likes;

function clickLike() {
  likes = likes + 1;
  dislike.style.display = "inline-block";
  like.style.display = "none";
  likesCounter.textContent = `${likes}`;
}

function clickDislike() {
  likes = likes - 1;
  dislike.style.display = "none";
  like.style.display = "inline-block";
  likesCounter.textContent = `${likes}`;
}

like.addEventListener("click", () => {
  clickLike();
});

dislike.addEventListener("click", () => {
  clickDislike();
});
        }
    })
}

affichageMedias();




