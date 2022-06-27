const authService = require('../services/auth.service');
const { schemaRegister, schemaLogin } = require("../models/user");
const { sendEmail } = require('../services/email.service');
const userService = require('../services/user.service');
const { createError } = require('../helpers/errors');

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
        
        await sendEmail(user.email, user.verificationToken);
        res.status(201).json({
            email: user.email,
            subscription: user.subscription,
            avatarURL: user.avatarURL,
        });
    } catch (e) {
        next(e);
    }
};

const confirmRegistration = async (req, res, next) => {
    try {
        const { verificationToken } = req.params;
        const user = await userService.findUser({verificationToken});
        
        if (!user) {
            throw createError(404,"User not found");
        }
        const result=await userService.updateUser(user._id, { verify: true, verificationToken: null });
        return res.status(200).json("Verification successful")

    } catch (e) {
        next(e);
    }
};

const resend = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await userService.findUser({ email });
        
        if (!user) {
            throw createError(404, 'User was not found');
        }
        if (user.verify) {
            throw createError(400, 'Verification has already been passed');
        }
        await sendEmail(user.email, user.verificationToken);
        return res.status(200).json('Verification email sent');

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
    signupUser,loginUser,logoutUser,currentUser,confirmRegistration,resend,
};