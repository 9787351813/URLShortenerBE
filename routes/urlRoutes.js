const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

router.get('/urls', urlController.getAllUrls);

router.get('/counts', urlController.getCounts);

// Define other routes
router.post('/shorten', urlController.shortenUrl);
router.get('/:shortUrl', urlController.redirectUrl);
router.get('/urls', urlController.getAllUrls);

module.exports = router;
