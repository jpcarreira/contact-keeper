const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth');
const User = require('../models/User');
const Contact = require('../models/Contact');

// @route     GET /api/contacts
// @desc      Gets all user's contacts
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route     POST /api/contacts
// @desc      Creates a new contact for the logged-in user
// @access    Private
router.post('/', (req, res) => {
  res.send({
    msg: 'Creates a new contact'
  });
});

// @route     PUT /api/contacts/:id
// @desc      Updates a given contact
// @access    Private
router.put('/:id', (req, res) => {
  res.send({
    msg: 'Updates a contact'
  });
});

// @route     DELETE /api/contacts/:id
// @desc      Deletes a given contact
// @access    Private
router.delete('/:id', (req, res) => {
  res.send({
    msg: 'Deletes a contact'
  });
});

module.exports = router;
