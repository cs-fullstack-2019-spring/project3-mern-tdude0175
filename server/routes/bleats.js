var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var BleatCollection = require("../models/BleatSchema");


/* GET home page. */
router.get('/', function(req, res, next) {
    res.send("We bleating bro");
});

router.post("/addBleat",(req,res)=>
{
    BleatCollection.findOneAndUpdate({username:req.body.username},
        {$push: {bleat:req.body}},(errors,results)=>
        {
            if(errors) res.send("errors:" + errors);
            else res.send("You Bleated!!");
        });
});

router.put("/editBleat",(req,res)=>
{
    BleatCollection.findOneAndUpdate({username:req.body.username},
        {$push: {bleat:req.body}},(errors,results)=>
        {
            if(errors) res.send(errors);
            else
                {
                    console.log("bleat updated");
                    res.send(results);
                }
        });
});

module.exports = router;
