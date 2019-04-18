var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;


/* GET home page. */
router.get('/', function(req, res, next) {
    res.send("We bleating bro");
});

module.exports = router;
