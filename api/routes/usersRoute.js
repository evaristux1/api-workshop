const {Router} = require('express');
const router = Router();
const UsersController = require('../controllers/usersController');

// api/workshop/users
router.get('/api/workshop/users/:id', UsersController.getUser);
router.post('/api/workshop/users', UsersController.createUser);
router.patch('/api/workshop/users/:id', UsersController.updateARecord);


module.exports = router;