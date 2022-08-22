const { Router } = require('express');
const User = require('../models/User');
const authenticate = require('../middleware/authenticate');

module.exports = Router().get('/', authenticate, async (req, res, next) => {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (e) {
    next(e);
  }
});

// TO DO - implement items CRUD
