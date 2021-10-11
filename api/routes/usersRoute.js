const {Router} = require('express');
const router = Router();
const UsersController = require('../controllers/usersController');

// api/workshop/users
router.post('/api/workshop/users', UsersController.createUser);
router.get('/api/workshop/users/:id', UsersController.getUser);
router.patch('/api/workshop/users/:id', UsersController.updateAUser);

module.exports = router;