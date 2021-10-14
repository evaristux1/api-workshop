const ThemesController = require('../controllers/themesController');
const Middlewares = require("../middlewares/token");
const {Router} = require('express');
const router = Router();

router.post('/themes', Middlewares.tokenValidade, ThemesController.createATheme);
router.get('/themes?', ThemesController.getAllThemes);
router.get('/themes/:id', ThemesController.getThemeById);
router.patch("/themes/:id", Middlewares.tokenValidade, ThemesController.updateATheme);

module.exports = router;