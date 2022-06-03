const express = require('express');
const router = express.Router();
const { schemaCreate, schemaPatch } = require('../../models/contacts');
const { validateRequest } = require('../../middlewares/validateRequest');

const { listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact } = require('../../controllers/contact.controllers'); 
    
router.get('/', listContacts);

router.get('/:contactId', getContactById);

router.post('/',validateRequest(schemaCreate), addContact);

router.delete('/:contactId', removeContact);

router.put('/:contactId', updateContact);

router.patch('/:contactId/favorite', validateRequest(schemaPatch), updateStatusContact);

module.exports = router
