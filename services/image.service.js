const Jimp = require('jimp');

const path = require('path');
const fs = require('fs').promises;
const {AVATARS,PUBLIC_DIR } = require('../helpers/consts');

const uploadImage = async (id, file) => {
    const avatarURL = path.join(AVATARS, `${id}${file.originalname}`);
    try {
        Jimp.read(file.path, (err, ava) => {
            if (err) throw err;
             ava
            .resize(250, 250)    
            .write(path.join(PUBLIC_DIR, avatarURL)); 
        });
        } catch (e) {
        console.log(e);
        throw e;
        } finally {
        await fs.unlink(file.path);
        }   
    
};

module.exports = {
    uploadImage,
}