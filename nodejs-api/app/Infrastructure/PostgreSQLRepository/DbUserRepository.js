const User = require('../../Domain/Core/User');
const userModel = require('../Models/UserModel');

class DbUserRepository {

    /**
     *
     * @param {User} user
     * @returns {Promise<boolean>}
     */
    static async add(user) {
        try {
            await userModel.create(user.toStoreObject());
            return true;
        } catch (err) {
            return false;
        }
    }

    /**
     * Find All User from database
     * @return {User[]}
     */
    static async findAll() {
        try {
            const userObjs = await userModel.findAll({});
            return userObjs.map((userObj) => {
                return User.createFromObject(userObj);
            });
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * Find User by Email Id and Password from database
     * @param {string} email
     * @param {string} password
     * @return {User}
     */
    static async findByEmailAndPass(email, password) {
        try {
            const userObj = await userModel.findOne({
                where: {
                    email,
                    password
                }
            });
            return User.createFromObject(userObj);
        } catch {
            return false;
        }
    }

    /**
     * Find User by User Id from database
     * @param {string} userId
     * @return {User}
     */
    static async findByUserId(userId) {
        try {
            const userObj = await userModel.findOne({
                where: {
                    userId
                }
            });
            return User.createFromObject(userObj);
        } catch {
            throw new Error();
        }
    }

    /**
     * Delete User from database by User Id
     * @param {string} userId
     * @return Promise<boolean>
     */
    static async remove(userId) {
        try {
            await userModel.destroy({
                where: {
                    userId
                }
            });
            return true
        } catch {
            throw new Error();
        }
    }
}

module.exports = DbUserRepository;
