const authService = require('../services/auth.service');
const { schemaRegister, schemaLogin } = require("../models/user");

const signupUser = async (req, res, next) => {
    try {
        const { error } = schemaRegister.validate(req.body);
        if (error) {
        res.status(400).json({
        message: "Ошибка от Joi или другой библиотеки валидации",
        });
        return;
        }
        const user = await authService.registerUser(req.body);
        res.status(201).json({
            email: user.email,
            subscription: user.subscription            
        });
    } catch (e) {
        next(e);
    }
};


const loginUser = async (req, res, next) => {
    try {
        const { error } = schemaLogin.validate(req.body);
        if (error) {
        res.status(400).json({
        message: "Ошибка от Joi или другой библиотеки валидации",
        });
        return;
        }
     
        const token = await authService.loginUser(req.body);
        res.json(token);

    } catch (e) {
        next(e);
    }
};

const logoutUser = async (req, res, next) => {

    try {
        await authService.logoutUser(req.user._id);     
        res.sendStatus(204);

    } catch (e) {
        next(e);
    }
};

const currentUser = async (req, res, next) => {

    try {
        const user = await authService.currentUser(req.user._id);
    if (!user) {
      res.status(401).json({
        message: "Not authorized",
      });
      return;
    }
    res.json({
      email: user.email,
      subscription: user.subscription,
    });

    } catch (e) {
        next(e);
    }
};

module.exports = {
    signupUser,loginUser,logoutUser,currentUser
};