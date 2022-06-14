const express = require('express');
const router = express.Router();

const { validateRequest } = require('../../middlewares/validateRequest');
const { auth } = require('../../middlewares/auth.middleware');
const { schemaRegister,schemaLogin } = require('../../models/user');

const { signupUser,loginUser,logoutUser,currentUser } = require('../../controllers/auth.controllers'); 
    

router.post('/signup', validateRequest(schemaRegister), signupUser);
router.post('/login', validateRequest(schemaLogin), loginUser);
router.post('/logout', auth, logoutUser);
router.post('/current',auth, currentUser);

module.exports = router
