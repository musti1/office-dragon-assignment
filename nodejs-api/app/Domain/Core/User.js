const uuid = require('uuid/v1');

class User {
    constructor(
        userId,
        userName,
        email,
        role
    ) {
        this.userId = userId;
        this.userName = userName;
        this.email = email;
        this.role = role;
        this.password = '';
    }

    setPassword(password) {
        this.password = password;
    }

    toStoreObject(){
        return {
            userId: this.userId,
            userName: this.userName,
            email: this.email,
            role: this.role,
            password: this.password
        }
    }

    static createFromDetails(userName = '', email = '', role = '') {
        return new User(
            uuid(),
            userName,
            email,
          role
        )
    }

    static createFromObject(userObj) {
        return new User(
            userObj.userId,
            userObj.userName,
            userObj.email,
            userObj.role
        );
    }
}

module.exports = User;
