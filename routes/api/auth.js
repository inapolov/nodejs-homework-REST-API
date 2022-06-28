const express = require('express');
const router = express.Router();

const { validateRequest } = require('../../middlewares/validateRequest');
const { auth } = require('../../middlewares/auth.middleware');
const { schemaRegister, schemaLogin } = require('../../models/user');
const { uploadImage } = require('../../services/image.service');
const { updateUser } = require('../../services/user.service');


const { signupUser, loginUser, logoutUser, currentUser,confirmRegistration,resend } = require('../../controllers/auth.controllers'); 
const  upload  = require('../../middlewares/upload.middlewares');

    

router.post('/signup', validateRequest(schemaRegister), signupUser);
router.post('/login', validateRequest(schemaLogin), loginUser);
router.post('/logout', auth, logoutUser);
router.post('/current', auth, currentUser);
router.get('/verify/:verificationToken', confirmRegistration);
router.post('/verify', resend);

router.patch('/avatars', auth, upload.single('avatar'), async(req,res,next) => {
    console.log('req.file', req.file);

    const { _id: id } = req.user;
    const avatarURL = await uploadImage(id, req.file);
    const user = await updateUser(id, { avatarURL });

    res.json(user);
} )

module.exports = router
