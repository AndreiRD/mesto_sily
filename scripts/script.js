(function (){

const cardsContent = document.querySelector('.places-list');

const form = document.forms.new;
const inputName = form.elements.name;
const inputLink = form.elements.link;

const formValidator = new FormValidator(form);
formValidator.setEventListeners();

const editForm = document.forms.editForm;
const inputFullName = editForm.elements.fullName;
const inputOccupation = editForm.elements.occupation;

const editFormValidator = new FormValidator(editForm);
editFormValidator.setEventListeners();

const imagePopup = document.querySelector('.popup_image');
const editPopup = document.querySelector('.popup_edit');
const newCardPopup = document.querySelector('.popup_cards');

const imagePopupInstance = new ImagePopup(imagePopup);
const editPopupInstance = new Popup(editPopup);
const newCardPopupInstance = new Popup(newCardPopup);

const userName = document.querySelector('.user-info__name');
const userJob = document.querySelector('.user-info__job');
const avatarField = document.querySelector('.user-info__photo');

const popupImageLarge = document.querySelector('.popup__image-large');

const createCard = (...arg) => new Card (...arg);

const cardCatalog = new CardList(cardsContent, createCard, imagePopupInstance.openPopup); 
//cardCatalog.render(initialCards);

const config = {
  url: 'https://praktikum.tk/cohort11',
  headers:
    {
      authorization: '958efbfd-3413-4c9f-91d4-cc966f71b0c9',
      'Content-Type': 'application/json'
    }
};

const userInfoInstance = new UserInfo(editForm, userName, userJob, avatarField);

const apiInstance = new Api(config);
apiInstance.requestUserInfo()
.then(res => userInfoInstance.updateUserInfo(res.name, res.about, res.avatar))
.catch(err => console.log(err));

apiInstance.getInitialCards()
.then(res => cardCatalog.render(res))
.catch(err => console.log(err));

document.querySelector('.user-info__button').addEventListener('click', function () {

  newCardPopupInstance.openPopup();
  formValidator.setSubmitButtonState(form.querySelector('button'), false);

});

document.querySelector('.user-info__edit-button').addEventListener('click', function(){

  editFormValidator.resetErrors(editForm);
  userInfoInstance.setUserInfo();
  editPopupInstance.openPopup();

});

form.addEventListener('submit', function (event) {

  event.preventDefault();

  const userInput = {};
  userInput.name = inputName.value;
  userInput.link = inputLink.value;

  cardCatalog.addCard(userInput);
  newCardPopupInstance.closePopup();
  form.reset();

});

editForm.addEventListener('submit', function (event) {

  event.preventDefault();
  
  apiInstance.updateUserInfo(inputFullName.value, inputOccupation.value)
  .then(res => {

    console.log(res);
    userInfoInstance.updateUserInfo(res.name, res.about, res.avatar);
    userInfoInstance.setUserInfo();
  
    editPopupInstance.closePopup();

  })
  .catch(err => console.log(err));

});

}());
/**
 * Отлично, все замечания исправлены - работа принята. Желаю успехов!
 */

