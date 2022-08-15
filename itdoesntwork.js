
let likebuttons = document.querySelectorAll(`#likebutton${media.id}`)
let dislikebuttons = document.querySelectorAll(`#dislikebutton${media.id}`)

likebuttons.forEach((likebutton) => {
    likebutton.addEventListener("click", () => {
        clickLike(media.id);
      })
})

dislikebuttons.forEach((dislikebutton) => {
    dislikebutton.addEventListener("click", () => {
        clickLike(media.id);
      })
})