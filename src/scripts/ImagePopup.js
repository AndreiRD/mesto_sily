class ImagePopup extends Popup{

        constructor(popup) {
            super(popup);
            this.image = this.popup.querySelector('.popup__image-large')
        }

        openPopup(link) {
            this.image.src = link;
            super.openPopup();
        }

}
