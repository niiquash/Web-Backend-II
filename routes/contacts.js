const router = require('express').Router();
const Contacts = require('../models/contacts');

const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAllContacts);

router.get('/:id', contactsController.getOneContact);

router.post('/', contactsController.createContact);

router.put('/:id', contactsController.updateContact);

router.delete('/:id', contactsController.deleteContact);

module.exports = router;


// // GET ALL CONTACTS
// router.get('/', async (req, res) => {
//     try {
//         const contacts = await Contacts.find();
//         console.log(`The database was found: ${contacts}`)
//         return res.json(contacts);
//     } catch (error) {
//         console.log('There was an error finding this collection');
//         res.status(500).json({ message: error.message })
//     }
// })

// // GET ONE CONTACT BY ID
// router.get('/:id', getContact, (req, res) => {
//     res.send(res.contact)
// })

// async function getContact(req, res, next) {
//     let contact
//     try {
//         contact = await Contacts.findById(req.params.id)
//         if (contact == null) {
//             return res.status(404).json({ message: 'Cannot find contact' })
//         }
//     } catch (error) {
//         return res.status(500).json({ message: error.message })
//     }

//     res.contact = contact
//     next()
// }

// // return response.status(500).send(error)

// // CREATE A CONTACT
// router.post('/', async (req, res) => {
//     const contact = new Contacts({
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         email: req.body.email,
//         favoriteColor: req.body.favoriteColor,
//         birthday: req.body.birthday
//     })
//     try {
//         const savedContact = await contact.save();
//         // DISPLAY NEW CONTACT
//         return res.json(savedContact._id);
//     } catch (error) {
//         res.json({ message: error })
//     }
// })

// //UPDATE A CONTACT
// router.put('/:id', async (req, res) => {
//     if (!req.body) {
//         return res.status(400).send({ message: "Data to update cannot be empty!" });
//     }
//     try {
//         const updateContact = await Contacts.findByIdAndUpdate(
//             { _id: req.params.id },
//             req.body,
//             { useFindAndModify: false }
//         )
//         return res.status(200).send('Item has been successfully updated')
//     } catch (error) {
//         res.status(500).send({
//             message: "Error updating Contact with given id."
//         })
//     }
// })

// //DELETE A CONTACT
// router.delete('/:id', async (req, res) => {
//     try {
//         const contact = await Contacts.findByIdAndDelete({ _id: req.params.id });
//         return res.status(200).send(`Item with specified Id has been removed successfully`)
//     } catch (error) {
//         res.status(500).send({
//             message: "Could not delte contact with given id"
//         })
//     }
// })

// module.exports = router;