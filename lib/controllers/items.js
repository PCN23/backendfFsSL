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
      // creats a new istance with a list of objects and we can add things to show up by adding user_id
      const pops = { ...req.body, user_id: req.user.id };
      const data = await Item.insert(pops);

      res.json(data);
    } catch (e) {
      next(e);
    }
  });

// TO DO - implement items CRUD
