const { contacts } = require('../services');

const listContacts = async (req, res, next) => {
    try {
        const allContacts = await contacts.listContacts();
        res.json(allContacts);
    } catch (e) {
        next(e);
    }
};

const getContactById = async (req, res, next) => {
    try {
        const contactId = req.params.contactId;
        const contact = await contacts.getContactById(contactId);
        if (!contact) {
            res.status(404).json({ "message": "Not found" });
        } else {
            res.json(contact);
        }
    } catch (e) {
        next(e);
    }
};

const addContact = async (req, res, next) => {
    try {
        // const { error } = schema.validate(req.body);
        // if (error) {
        //     res.status(400).json({ "message": "missing required field" });
        // }       
            const contact = await contacts.addContact(req.body);
            res.status(201).json(contact);
        
    } catch (e) {
        next(e);
    }
};

const removeContact = async (req, res, next) => {
    try {
        const contactId = req.params.contactId;
        const contact = await contacts.removeContact(contactId);
        if (!contact) {
            res.status(404).json({ "message": "Not found" });
        } else {
            res.status(200).json({ "message": "contact deleted" });
        }
    } catch (e) {
        next(e);
    }
};

const updateContact = async (req, res, next) => {
    try {
        // const { error } = schema.validate(req.body);
        // if (error) {
        //     res.status(400).json({ "message": "missing fields" });
        // } 
            const body = req.body;
            const contactId = req.params.contactId;
  
            const contact = await contacts.updateContact(contactId, body);
            if (!contact) {
                res.status(404).json({ "message": "Not found" });
            } else {
                res.json(contact);
            }        
    } catch (e) {
        next(e);
    }
};

const updateStatusContact = async (req, res, next) => {
    try {
        // const { favorite } = req.body;
        // if (!favorite) {
        //     res.status(400).json({ "message": "missing field favorite" });
        // }
            const body = req.body;
            const contactId = req.params.contactId;
  
            const contact = await contacts.updateContact(contactId, body);
            if (!contact) {
                res.status(404).json({ "message": "Not found" });
            } else {
                res.json(contact);
            }                
    } catch (e) {
        next(e);
    }
};

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact,
}