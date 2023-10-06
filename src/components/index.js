import FormValidator from './FormValidator.js';
import Card from './Card.js';
import '../pages/index.css';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import Section from './Section.js';
import UserInfo from './UserInfo.js';

//VALIDATION
const config = {
  formSelector: '.modal__form',
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__button',
  inactiveButtonClass: 'modal__button_disabled',
  inputErrorClass: 'modal__input_type_error',
  errorClass: 'modal__error_visible',
};

const initialCards = [
  {
    name: 'Yosemit Valley',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg',
  },
  {
    name: 'Lake Louise',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg',
  },
  {
    name: 'Bald Mountains',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg',
  },
  {
    name: 'Latemar',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg',
  },
  {
    name: 'Vanoise National Park',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg',
  },
  {
    name: 'Lago di Braises',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg ',
  },
];

const profileEditModal = document.querySelector('#profile-edit-modal');
const profileModalForm = profileEditModal.querySelector('.modal__form');


const addNewCardModal = document.querySelector('#add-new-card');


//SECTION RENDERER
const cardSection = new Section(
  {
    items: initialCards,
    renderer: generateCard,
  },
  '.cards__list'
);
cardSection.renderItems();

// *************

//RENDER CARD

function generateCard(item) {
  const card = renderCard(item);
  return cardSection.addItems(card.getView());
}

function renderCard(data) {
  const card = new Card(data, '#card-template', {
    handleImageClick: () => imagePopup.open(data),
  });
  return card;
}

// ******************

//IMAGE POPUP
const imagePopup = new PopupWithImage('#preview-image-modal');
imagePopup.setEventListeners();

const editFormValidator = new FormValidator(config, profileModalForm);
const cardFormValidator = new FormValidator(config, addNewCardModal);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();

//FORM POPUP

const openModalPopup = new PopupWithForm('#add-new-card', handleFormSubmit);
openModalPopup.setEventListeners();

//PROFILE EDIT POPUP
const userInfo = new UserInfo('.profile__title', '.profile__description');
const editProfile = new PopupWithForm('#profile-edit-modal', (data) => {
  userInfo.setUserInfor(data);
  editProfile.close();
});

editProfile.setEventListeners();



// function handleImageClick(data) {
//   console.log(data)
//   imagePreview.src = data.link;
//   imagePreview.alt = `Photo of ${data.name}`;
//   imagePreviewTitle.textContent = data.name;
//   imagePopup.open(data)
// }

// /* EVENT HANDLERS */

// function handleProfileFormSubmit(event) {
//   event.preventDefault();
//   profileName.textContent = profileModalName.value;
//   profileDescription.textContent = profileModalDescription.value;
//   closeModal(profileEditModal);
// }

// function handleAddCardFormSubmit(event) {
//   event.preventDefault();
//   const name = cardTitleInput.value;
//   const link = cardUrlInput.value;
//   renderCard({ name, link }, cardListElement);
//   addNewCardForm.reset();
//   cardFormValidator.toggleButtonState();
//   closeModal(addNewCardModal);
// }

//SAVES NAME CHANGE AND DESRIPTION
// profileModalForm.addEventListener("submit", handleProfileFormSubmit);

// OPENS POPUP TO ADD NEW IMG
// addNewCardButton.addEventListener("click", () => {
//   openModal(addNewCardModal);
// });

// SUBMITS NEW CARD IMG
// addNewCardModal.addEventListener("submit", handleAddCardFormSubmit);
