const router = require('express').Router();
const Contacts = require('../models/contacts');

const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAllContacts);

router.get('/:id', contactsController.getOneContact);

router.post('/', contactsController.createContact);

router.put('/:id', contactsController.updateContact);

router.delete('/:id', contactsController.deleteContact);

module.exports = router;