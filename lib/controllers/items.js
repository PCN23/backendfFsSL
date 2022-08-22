const { Router } = require('express');
const authenticate = require('../middleware/authenticate');


module.exports = Router().get('/', authenticate, async (req, res) => {
    try { 
        const users = await User.getAll();
        res.json(users)
    } catch (e) {
        next(e);
    }
});

// TO DO - implement items CRUD
