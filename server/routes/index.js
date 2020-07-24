var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var responseText = 'data: /users'
 //responseText += '<small>Requested at: ' + req.requestTime + '</small>'
  res.send(responseText)
});

module.exports = router;
