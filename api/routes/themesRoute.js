const {Router} = require('express');
const router = Router();
const ThemesController = require('../controllers/themesController');

router.post('/themes', ThemesController.createATheme);
router.get('/themes?', ThemesController.getAllThemes);

module.exports = router;