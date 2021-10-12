const InterestsController = require('../controllers/interestsController');
const Middlewares = require("../middlewares/token");
const {Router} = require('express');
const router = Router();

router.post('/interests', Middlewares.tokenValidade,InterestsController.createAInterest);
router.delete('/interests/:id', Middlewares.tokenValidade, InterestsController.deleteAInterest);

module.exports = router;