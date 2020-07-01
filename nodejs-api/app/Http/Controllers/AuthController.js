const AuthService = require('../../Domain/Services/AuthService');

const AuthController = {};

AuthController.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await AuthService.login(email, password);
        if(user){
            return res.json(user);
        }
        return res.status(404).json({error: 'Email or Password Incorrect'});
    }catch {
        return res.status(500).send({error: 'Email or Password Incorrect'});
    }
};

AuthController.signUp = async (req, res) => {
    try {
        const { userName, email, password, role } = req.body;
        const user = await AuthService.newUser(userName, email, password, role);
        if(user){
            return res.json(user);
        }
        return res.status(404).json({error: 'Email or Password Incorrect'});
    }catch {
        return res.status(500).send({error: 'Email or Password Incorrect'});
    }
};

module.exports = AuthController;
