class Api{

    constructor(config) {
        this.url = config.url;
        console.log(this.url);
        this.headers = config.headers;
    }

    requestUserInfo() {
             
        return fetch(`${this.url}/users/me`, {

            method: 'GET',
            headers: this.headers
        })
        .then(res => this.checkStatus(res)) 

    }
        
    getInitialCards() {

        return fetch(`${this.url}/cards`, {
            method: 'GET',
            headers: this.headers
        })
        .then(res => this.checkStatus(res)) 

    }

    updateUserInfo(fullName, occupation, avatar) {
            
      	return fetch(`${this.url}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
               	name: fullName,
                about: occupation,
                avatar: avatar
            })
        })
        .then(res => this.checkStatus(res)) 
    }


    /**
     * Можно лучше:
     * Вместо checkStatus создать метод (например, fetchData), который будет делать fetch и возвращать либо json,
     * либо Promise.reject. Таким образом мы сможем уменьшить дублирование кода и сделать код надежнее.
     * Пример использования такого метода:
     * updateUserInfo(fullName, occupation, avatar) {
     *   return this.fetchData(`${this.url}/users/me`, {
     *     method: 'PATCH',
     *     headers: this.headers,
     *     body: JSON.stringify({
     *       name: fullName,
     *       about: occupation,
     *       avatar: avatar,
     *     })
     *   })
     *     .then(res => {
     *       if (!res.ok) {
     *         return Promise.reject(res.status);
     *       }
     *
     *       return res.json();
     *     });
     * }
     */
    checkStatus(res) {
        if(res.ok) {
            return Promise.resolve(res.json());
        }
            return Promise.reject(res.status);
        }     
        
}
