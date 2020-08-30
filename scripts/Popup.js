class Popup {

    constructor(popup) {

        this.popup = popup;

        this.buttonClose = this.popup.querySelector('.popup__close');

//        this.form = this.popup.querySelector('.popup__form');

        this.openPopup = this.openPopup.bind(this);
//        this.openImagePopup = this.openImagePopup.bind(this);
        this.setListener = this.setListener.bind(this);
        this.closePopup = this.closePopup.bind(this);

        this.setListener();

    }

    openPopup() {
        this.popup.classList.add('popup_is-opened');
    }

    closePopup() {

        this.popup.classList.remove('popup_is-opened');

    }
    
    setListener() {
        this.buttonClose.addEventListener('click', this.closePopup);
    }        
}
