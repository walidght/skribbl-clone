const express = require('express');
const router = express.Router();
const GameCtrl = require('../controllers/game.controller');

router.post('/create', GameCtrl.apiCreateGame);
router.post('/join', GameCtrl.apiJoinGame);
router.post('/start', GameCtrl.apiStartGame);
router.get('/:code', GameCtrl.apiGetGame);

module.exports = router;
