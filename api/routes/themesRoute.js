const {Router} = require('express');
const router = Router();
const ThemesController = require('../controllers/themesController');

router.post('/api/workshop/themes', ThemesController.createATheme);
router.get('/api/workshop/themes?', ThemesController.getAllThemes);

module.exports = router;