const path = require('path')
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.sendFile(path.normalize(__dirname + '/../public/html/home.html'));
});

module.exports = router;