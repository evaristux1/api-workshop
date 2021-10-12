const {Router} = require('express');
const router = Router();
const InterestsController = require('../controllers/interestsController');

router.post('/interests', InterestsController.createAInterest);

module.exports = router;