const DbUserRepository = require('../../Infrastructure/PostgreSQLRepository/DbUserRepository');
const User = require('../Core/User');

class AuthService {
    static async login(email, password){
        return DbUserRepository.findByEmailAndPass(email, password);
    }

    static async newUser(userName, email, password, role){
        const user = User.createFromDetails(userName, email, role);
        user.setPassword(password);
        return DbUserRepository.add(user);
    }
}

module.exports = AuthService;
