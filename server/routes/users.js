var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const db = req.app.locals.db;
  res.send(db.collection('myhero').find().pretty());
 
});

module.exports = router;
