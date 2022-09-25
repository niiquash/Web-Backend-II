const router = require('express').Router();
const Contacts = require('../models/contacts');
const express = require('express')

router.get('/', async (req, res) => {
    try {
        const contacts = await Contacts.find();
        console.log(`The database was found: ${contacts}`)
        res.json(contacts);
    } catch (error) {
        console.log('There was an error finding this collection');
        res.status(500).json({ message: error.message })
    }
})

router.get('/:id', getContact, (req, res) => {
    res.send(res.contact)
})

async function getContact(req, res, next) {
    let contact
    try {
        contact = await Contacts.findById(req.params.id)
        if (contact == null) {
            return res.status(404).json({ message: 'Cannot find contact' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    res.contact = contact
    next()
}

module.exports = router;