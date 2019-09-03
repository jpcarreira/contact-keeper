const express = require('express');
const router = express.Router();

// @route     GET /api/auth
// @desc      Gets the logged in user
// @access    Private
router.get('/', (req, res) => {
  res.send({
    msg: 'Gets the logged in user'
  });
});

// @route     POST /api/auth
// @desc      Auth user & get token
// @access    Public
router.post('/', (req, res) => {
  res.send({
    msg: 'Login user'
  });
});

module.exports = router;
