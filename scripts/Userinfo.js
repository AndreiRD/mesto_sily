class UserInfo {
	constructor (form, nameField, occupationField, avatarField) {

                this.form = form;
                this.nameField = nameField;
                this.occupationField = occupationField;
                this.avatarField = avatarField;

                this.setUserInfo = this.setUserInfo.bind(this);
                this.updateUserInfo = this.updateUserInfo.bind(this);
        }
        

        
	setUserInfo () {

		this.form.elements.fullName.value = this.nameField.textContent;
    this.form.elements.occupation.value = this.occupationField.textContent;

	}
	updateUserInfo (name, occupation, avatarLink) {

		this.nameField.textContent = name;
    this.occupationField.textContent = occupation;
    this.avatarField.style.backgroundImage = `url('${avatarLink}')`;

	}
}
