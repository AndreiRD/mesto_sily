class Card {
	constructor (openPicture) {
        this.like = this.like.bind(this);
        this.remove = this.remove.bind(this);
        this.removeListeners = this.removeListeners.bind(this);
        this.onImageClick = this.onImageClick.bind(this);

        /* Можно лучше: оставить создание элементов в методе create */
        const element = document.createElement('div');
        const elementImage = document.createElement('div');
        const imageButton = document.createElement('button');
        const elementDescription = document.createElement('div');
        const elementDescriptionName = document.createElement('h3');
        const likeButton = document.createElement('button');

	    this.element = element;
	    this.elementImage = elementImage;
	    this.imageButton = imageButton;
	    this.elementDescription = elementDescription;
	    this.elementDescriptionName = elementDescriptionName;
	    this.likeButton = likeButton;

        this.openPicture = openPicture;
    }
    
	like () {

	    this.likeButton.classList.toggle('place-card__like-icon_liked');
    }
    
    /*
        Можно лучше: передавать данные карточки в конструктор, а не метод и запоминать переданные данные 
        в поле класса
    */
    create (card) {
        /*
            Можно лучше: создавать карточку не вручную через createElement, а использовать
            для этого разметку в виде шаблонной строки.

            Стоит обратить внимание, что вставка данных с помощью интерполяции шаблонной строки и insertAdjacentHTML
            может привести к уязвимости XSS, т.к. данные вставляются на страницу как обычный html, а если они придут
            с сервера в данных может быть код злоумышленника и он будет вставлен на страницу как html и исполнится.
            Поэтому необходимо фильтровать html теги во вставляемых данных (такая процедура называется HTML sanitization
                пример как это сделать есть здесь 
                https://gomakethings.com/preventing-cross-site-scripting-attacks-when-using-innerhtml-in-vanilla-javascript/ )

            или вставлять данные с помощью textContent и style.backgroundImage уже после создания разметки
            элемента как показано на примере ниже:

                const template = document.createElement("div");
                template.insertAdjacentHTML('beforeend', `
                <div class="place-card">
                    <div class="place-card__image">
                        <button class="place-card__delete-icon"></button>
                    </div>
                    <div class="place-card__description">
                        <h3 class="place-card__name"></h3>
                        <button class="place-card__like-icon"></button>
                    </div>
                </div>`);
                const placeCard = template.firstElementChild;
                placeCard.querySelector(".place-card__name").textContent = name;
                placeCard.querySelector(".place-card__image").style.backgroundImage = `url(${link})`;
                
                
            Так же для создания разметки можно использовать тег tempate
            https://learn.javascript.ru/template-tag
            https://frontender.info/template/
        */
        this.element.classList.add('place-card');

        this.elementImage.classList.add('place-card__image');

        this.elementImage.style.backgroundImage = `url('${card.link}')`;
        this.element.appendChild(this.elementImage);
        
        this.imageButton.classList.add('place-card__delete-icon');
        this.elementImage.appendChild(this.imageButton);

        this.elementDescription.classList.add('place-card__description');
        this.element.appendChild(this.elementDescription);

        this.elementDescriptionName.classList.add('place-card__name');
        this.elementDescriptionName.textContent = card.name;
        this.elementDescription.appendChild(this.elementDescriptionName);

        this.likeButton.classList.add('place-card__like-icon');
        this.elementDescription.appendChild(this.likeButton);
        
        this.setListeners();

        return this.element;
    }
 
	remove () {
        this.removeListeners();
        this.element.remove();
    }        

	setListeners () {
	   this.likeButton.addEventListener("click", this.like);
       this.imageButton.addEventListener("click", this.remove);
       this.elementImage.addEventListener("click", this.onImageClick);  
    }            

    onImageClick(event) {
        this.openPicture(event.target.style.backgroundImage.split('url("')[1].slice(0,-2));
    }

    removeListeners () {
       this.likeButton.removeEventListener("click", this.like);
       this.imageButton.removeEventListener("click", this.remove);
       this.elementImage.removeEventListener("click", this.onImageClick);    
    }
}
