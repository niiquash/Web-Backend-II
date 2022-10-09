const Contacts = require('../models/contacts');

const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contacts.find();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOneContact = async (req, res) => {
    try {
        const contact = await Contacts.findById(req.params.id);
        if (contact == null) {
            return res.status(404).json({ message: "Cannot find contact by specified ID" })
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contact)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createContact = async (req, res) => {
    const contact = new Contacts({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    })
    try {
        const savedContact = await contact.save();
        // DISPLAY NEW CONTACT
        return res.json(savedContact._id);
    } catch (error) {
        res.json({ message: error })
    }
};

const updateContact = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update cannot be empty!"
        });
    }

    const id = req.params.id;
    Contacts.findByIdAndUpdate(
        id, req.body, { useFindAndModify: false }
    ).then((data) => {
        if (!data) {
            res.status(404).send({
                message: `Cannot update contact with id=${id}.`
            });
        } else res.send({ message: 'Contact was updated sucdessfully.' })
    })
        .catch((error) => {
            res.status(500).send({
                message: 'Error updating contact with id=' + id
            });
        });
};

const deleteContact = async (req, res) => {
    try {
        const contact = await Contacts.findByIdAndDelete({ _id: req.params.id });
        return res.status(200).send(`Item with specified Id has been removed successfully`)
    } catch (error) {
        res.status(500).send({
            message: "Could not delete contact with given id"
        })
    }
};

module.exports = {
    getAllContacts,
    getOneContact,
    createContact,
    updateContact,
    deleteContact
}
