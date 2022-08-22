const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Item = require('../models/Item');

module.exports = Router()
  .get('/', authenticate, async (req, res, next) => {
    try {
      const users = await Item.getAll();
      res.json(users);
    } catch (e) {
      next(e);
    }
  })
  .post('/', authenticate, async (req, res, next) => {
    try {
      const data = await Item.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });

// TO DO - implement items CRUD
