
const closeModal = document.querySelector(".close-modal");
const modalContainer = document.getElementById("contact_modal");
const inscriptionValidee = document.querySelector(".inscription-validee")
const formContainers = document.querySelector(".form-containers");


closeModal.addEventListener("click", () => {
  modalContainer.style.display = "none";
})

const displayModal = document.querySelector(".contact_button");

displayModal.addEventListener("click", () => {
  modalContainer.style.display = "block";
})


const form = document.querySelector("form");
const inputs = document.querySelectorAll(
  'input[type="text"], textarea'
);
let prenom, nom, email, message;

const errorDisplay = (tag, message, valid) => {
  const container = document.querySelector("." + tag + "-container");
  const span = document.querySelector("." + tag + "-container > span");

  if (!valid) {
    container.classList.add("error");
    span.textContent = message;
  } else {
    container.classList.remove("error");
    span.textContent = message;
  }
};

const prenomChecker = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 24)) {
    errorDisplay("prenom", "Votre prenom doit faire entre 3 et 24 caractères");
    prenom = null;
  } else if (!value.match(/^[a-zA-Z-]*$/)) {
    errorDisplay(
      "prenom",
      "Votre prenom ne doit pas contenir de caractères spéciaux."
    );
    prenom = null;
  } else {
    errorDisplay("prenom", "", true);
    prenom = value;
  }
};

const nomChecker = (value) => {
    if (value.length > 0 && (value.length < 3 || value.length > 24)) {
      errorDisplay("nom", "Votre nom doit faire entre 3 et 24 caractères");
      nom = null;
    } else if (!value.match(/^[a-zA-Z-]*$/)) {
      errorDisplay(
        "nom",
        "Votre nom ne doit pas contenir de caractères spéciaux."
      );
    nom = null;
    } else {
      errorDisplay("nom", "", true);
      nom = value;
    }
  };


const emailChecker = (value) => {
  if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    errorDisplay("email", "Le mail n'est pas valide");
    email = null;
  } else {
    errorDisplay("email", "", true);
    email = value;
  }
};

const messageChecker = (value) => {
    if (value.length > 0 && (value.length < 24 || value.length > 324)) {
      errorDisplay("message", "Votre message doit faire entre 24 et 324 caractères");
      message = null;
    } else {
      errorDisplay("message", "", true);
      message = value;
    }
  };



inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "prenom":
        prenomChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;
      case "nom":
        nomChecker(e.target.value);
        break;
      case "message":
        messageChecker(e.target.value);
        break;
      default:
        null;
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (prenom && nom && email && message) {
    const data = {
      nom,
      prenom,
      email,
      message,
    };
    console.log(data);

    inputs.forEach((input) => (input.value = ""));
    nom = null;
    prenom = null;
    email = null;
    message = null;
    inscriptionValidee.innerHTML = "Message envoyé"
    formContainers.innerHTML = `<div class="reponse">Le photographe vous répondra dans les plus brefs délais</div>
   `
  } else {
    alert("Veuillez remplir les champs correctement")
  }
});


document.addEventListener('keydown', function(event){
  if(event.key === "Escape"){
    modalContainer.style.display = "none";
            }
          });
          