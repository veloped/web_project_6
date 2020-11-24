//imports 
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { popupImageElement, togglePopup } from "./utils.js";
//var declarations 
const editButton = document.querySelector('.profile__edit');
const popupEditElement = document.querySelector('.popup_type_edit');
const closeButtonEdit = document.querySelector('.popup__close-button_edit');
const closeButtonAdd = document.querySelector('.popup__close-button_add');
const formEdit = document.querySelector('.form_edit');
const formAdd = document.querySelector('.form_add');
const inputTitle = document.querySelector('.form__input_type_title');
const inputLink = document.querySelector('.form__input_type_link');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const name = document.querySelector('.form__input_type_name');
const about = document.querySelector('.form__input_type_about');
const addButton = document.querySelector('.profile__button');
const popupAddElement = document.querySelector('.popup_type_add');
const imageCloseButton = document.querySelector('.popup__close-button_image');
const form = document.querySelector(".form");
const formInput = form.querySelector(".form__input");
const overlay = document.querySelectorAll('.popup');

//settings object - list of form-related selectors
const settingsObject = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active"
};

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];
 
function changeProfileData() {
   profileName.textContent = name.value;
   profileAbout.textContent = about.value;
 
   togglePopup(popupEditElement);
}

//overlay is selected by querySelectorAll and it's value is an array of popup types:
overlay.forEach( (item) => {
  item.addEventListener('click', (evt) => {
    if (evt.target === popupEditElement) {
      togglePopup(popupEditElement);
    } if (evt.target === popupAddElement) {
      togglePopup(popupAddElement);
    } if (evt.target === popupImageElement) {
      togglePopup(popupImageElement);
    }  
  });
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === "Escape") {
    overlay.forEach( (item) => {
      if (item.classList.contains('popup_type_edit') && item.classList.contains('popup_opened')) {
        togglePopup(popupEditElement);
      } if (item.classList.contains('popup_type_add') && item.classList.contains('popup_opened')) {
        togglePopup(popupAddElement);
      } if (item.classList.contains('popup_type_image') && item.classList.contains('popup_opened')) {
        togglePopup(popupImageElement);
      }   
    });
  }
});

//pressing enter at any point while filling out forms will submit them
/*form.addEventListener("submit", (evt) => {
  evt.preventDefault();
});*/

//event listeners for buttons:
addButton.addEventListener('click', () => {
  togglePopup(popupAddElement)
  inputTitle.value = "";
  inputLink.value = "";
});

closeButtonAdd.addEventListener('click', () => {
  togglePopup(popupAddElement)
});

editButton.addEventListener('click', () => {
  togglePopup(popupEditElement);
});

closeButtonEdit.addEventListener('click', () => {
  togglePopup(popupEditElement);
});

formEdit.addEventListener('submit', (evt) =>  {
  evt.preventDefault();
  changeProfileData();
});

formAdd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  handleCardData()
});

imageCloseButton.addEventListener('click', () => {
  togglePopup(popupImageElement);
});

//Iteration over initial cards with Card class instances
initialCards.forEach( (item) => {
  const card = new Card(item, ".card-template");
  const cardElement = card.generateCard();
  document.querySelector('.grid__list').prepend(cardElement);
});

//creating a new card through Card class
function handleCardData() {
  const data = {};
  data.name = document.querySelector('.form__input_type_title').value;
  data.link = document.querySelector('.form__input_type_link').value;
  const card = new Card(data, ".card-template");
  const cardElement = card.generateCard();
  document.querySelector('.grid__list').prepend(cardElement);
  togglePopup(popupAddElement);
}



const formList = Array.from(document.querySelectorAll('.form'));
console.log(formList);
formList.forEach((item) => {
  const instance = new FormValidator(settingsObject, item);
  instance.enableValidation();
});

