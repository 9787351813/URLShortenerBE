// routes/urlRoutes.js
const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

router.post('/shorten', urlController.shortenUrl);
router.get('/:shortUrl', urlController.redirectUrl);
router.get('/counts', urlController.getCounts);
router.get('/', urlController.getAllUrls);

module.exports = router;
