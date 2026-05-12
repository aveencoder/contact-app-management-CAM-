import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

import {
  getContacts,
  getContact,
  addContactPage,
  addContact,
  updateContactPage,
  updateContact,
  deleteContact
}  from "../controller/contacts.controller.js"

router.get('/', auth, getContacts)

router.get('/show-contact/:id',getContact)

router.get('/add-contact', auth, addContactPage)

router.post('/add-contact', auth, addContact)

router.get('/update-contact/:id', auth, updateContactPage)

router.post('/update-contact/:id', auth, updateContact)



export default router
// module.exports = router ;