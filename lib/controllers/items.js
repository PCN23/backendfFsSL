const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Item = require('../models/Item');

const ONE_DAY_IN_MS = 1000;

module.exports = Router()
  .get('/', authenticate, async (req, res, next) => {
    try {
      const items = await Item.getAllByUserId(req.user.id);
      res.json(items);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Item.getById(req.params.id);
      if (!data) {
        next();
      }
      res.json(data);
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
  })
  .put('/:itemId', authenticate, async (req, res, next) => {
    try {
      const updatedItem = await Item.updateById(req.params.itemId, req.body);
      res.json(updatedItem);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', authenticate, async (req, res, next) => {
    try {
      const delData = await Item.delete(req.params.id);
      res.json(delData);
    } catch (e) {
      next(e);
    }
  });

// TO DO - implement items CRUD
