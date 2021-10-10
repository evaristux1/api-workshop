const {Router} = require('express');
const router = Router();
const UsersController = require('../controllers/usersController');


router.get('/users/:id', UsersController.getUser);
router.post('/users', UsersController.createUser);

module.exports = router;