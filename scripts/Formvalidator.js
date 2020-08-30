class FormValidator {
	constructor (form) {
	    this.form = form;
	    const inputs = [...this.form.elements];
	    this.inputs = inputs;

        this.submit = this.form.querySelector('.popup__button');
        this.isSubmitButton = this.isSubmitButton.bind(this);
        this.checkIfRightLength = this.checkIfRightLength.bind(this);
        this.checkIfRightURLPattern = this.checkIfRightURLPattern.bind(this);
        this.validateUrl = this.validateUrl.bind(this);
        this.validateTextField = this.validateTextField.bind(this);
        this.resetErrors = this.resetErrors.bind(this);
        this.setInvalid = this.setInvalid.bind(this);
        this.setValid = this.setValid.bind(this);
        this.errorMessage = this.errorMessage.bind(this);
        this.handlerInputForm = this.handlerInputForm.bind(this);
        this.validateField = this.validateField.bind(this);
        this.isFormValid = this.isFormValid.bind(this);
        this.setSubmitButtonState = this.setSubmitButtonState.bind(this);
        this.setEventListeners = this.setEventListeners.bind(this);

	}

    isSubmitButton (field) {
        return field.type === 'submit' || field.type === 'button';
    }    

    checkIfEmpty(field) {
        return !field.value.trim();
    }

    checkIfRightLength (field) {

        return field.value.length >= 2 && field.value.length <= 30;

    }

    checkIfRightURLPattern(field) {

         const pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
         return pattern.test(field.value);

    }

    validateUrl (field) {
  
        if(this.checkIfEmpty(field)) return false;
        return this.checkIfRightURLPattern(field);

    }

    validateTextField(field) {
   
        if (this.checkIfEmpty(field)) return false;
        return this.checkIfRightLength(field);

    }

    resetErrors(formToReset) {

        const errors = formToReset.querySelectorAll('.popup__error');
        errors.forEach((error) => error.textContent = '');

        const editPopupSubmitButton = formToReset.querySelector(".popup__button");
        this.setSubmitButtonState(editPopupSubmitButton, this.isFormValid(formToReset)); 

    }

    setInvalid (field, message) {

        field.nextElementSibling.textContent = message;

    }

    setValid (field) {

        field.nextElementSibling.textContent = '';

    }

    errorMessage(field) {

    	const errorMessages = {
            isEmpty: 'Это поле не должно быть пустым',
            isWrongLength: 'В поле должно быть от 2 до 30 символов',
            isWrongURLPattern: 'Введите корректный URL'
        };

        if (this.checkIfEmpty(field)) return errorMessages.isEmpty;
        if (field.classList.contains('popup__input_type_link-url')) return errorMessages.isWrongURLPattern;
        return errorMessages.isWrongLength;

    }

    validateField(field){
 
        if (this.isSubmitButton(field)) return;
        if (field.classList.contains('popup__input_type_link-url')) {

        return this.validateUrl(field);

        }

        return this.validateTextField(field);
    
    }

    setSubmitButtonState(button, state) {

    if (state) {

        button.removeAttribute('disabled');
        button.classList.add(`popup__button_valid`);

    } else {

        button.setAttribute('disabled', true);
        button.classList.remove(`popup__button_valid`);

    }
}

    handlerInputForm (event) {

        if (this.validateField(event.target)) {
            this.setValid(event.target);
        }
        else {
            this.setInvalid(event.target, this.errorMessage(event.target));
        }

        this.setSubmitButtonState(this.submit, this.isFormValid(event.currentTarget));

    }

    isFormValid(form) { 
  
        let valid = true;
    
        this.inputs.forEach((input) => {
        if (!this.isSubmitButton(input)) {
        if (!this.validateField(input)) valid = false;
        }
    });
    
    return valid;
    }


	setEventListeners () {

		this.inputs.forEach(input => {
           input.addEventListener('input', this.validateField.bind(this, input));
        });
        this.form.addEventListener('input', this.handlerInputForm.bind(this));

    }
}

