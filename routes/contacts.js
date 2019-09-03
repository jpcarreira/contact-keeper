const express = require('express');
const router = express.Router();

// @route     GET /api/contacts
// @desc      Gets all user's contacts
// @access    Private
router.get('/', (req, res) => {
  res.send({
    msg: "Gets all user's contacts"
  });
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
