const express = require('express');
const router = express.Router();
const { schemaCreate, schemaPatch } = require('../../models/contacts');
const { validateRequest } = require('../../middlewares/validateRequest');
const { auth,author } = require('../../middlewares/auth.middleware');

const { listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact } = require('../../controllers/contact.controllers'); 
    
router.get('/',auth, listContacts);

router.get('/:contactId',auth, getContactById);

router.post('/',validateRequest(schemaCreate),auth, addContact);

router.delete('/:contactId',auth, author('pro'), removeContact);

router.put('/:contactId',auth, updateContact);

router.patch('/:contactId/favorite', validateRequest(schemaPatch),auth, updateStatusContact);

module.exports = router
