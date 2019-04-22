var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var BleatCollection = require("../models/BleatSchema");


/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("we bleatin bro");
    let bleatArray = [];
    BleatCollection.find({},(errors,results)=>
    {
        if(errors) res.send(errors);
        else
            {
                console.log("We Found this!!");
                for(i=0;i<results.length;i++)
                {
                    // console.log(results[i].bleat);
                    bleatArray.push(results[i].bleat)
                }
                console.log("results:");
                console.log(bleatArray);
                res.json([bleatArray])
            }
    });

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

                }
        });
});

module.exports = router;
