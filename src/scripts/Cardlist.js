export class CardList{

	constructor (container, createCard, openPicture) {

		this.container = container;
		this.openPicture = openPicture;
		this.createCard = createCard;

	} 
    
	addCard (card) {
		let cardNode = this.createCard(this.openPicture).create(card); 
        this.container.appendChild(cardNode);
	}

	render (initialArray) {
		this.initialArray = initialArray;
		this.initialArray.forEach(card => this.addCard(card));
    }

}