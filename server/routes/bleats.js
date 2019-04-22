var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var BleatCollection = require("../models/BleatSchema");


/* GET home page. */
router.get('/', function (req, res, next) {
    console.log("we bleatin bro");
    let bleatArray = [];
    BleatCollection.find({},null, {sort: '-date'},(errors, results) => {
        if (errors) res.send(errors);
        else {
            console.log("We Found this!!");
            for (i = 0; i < results.length; i++) {
                // console.log(results[i].bleat);
                for (x = 0; x < results[i].bleat.length; x++) {
                    if (results[i].bleat[x].private) {
                    } else {
                        // if (bleatArray.length === 5) {
                        //     console.log("max reached");
                        //     break
                        // }
                        let bleat = {username: results[i].username, bleat: results[i].bleat[x]};
                        bleatArray.push(bleat);

                    }
                }
            }
            console.log("sorting");
            console.log(bleatArray.sort());
            // console.log("results:");
            // console.log(bleatArray);
            res.json(bleatArray)
        }
    });

});

router.post("/findBleats",(req,res)=>
{
    BleatCollection.find({username:req.body.username},(errors,results)=>
    {
        if(errors) res.send(errors);
        else(res.send(results[0].bleat))
    })
})

router.post("/addBleat", (req, res) => {
    BleatCollection.findOneAndUpdate({username: req.body.username},
        {$push: {bleat: req.body}}, (errors, results) => {
            if (errors) res.send("errors:" + errors);
            else res.send("You Bleated!!");
        });
});

router.put("/editBleat", (req, res) => {
    BleatCollection.findOneAndUpdate({username: req.body.username},
        {$push: {bleat: req.body}}, (errors, results) => {
            if (errors) res.send(errors);
            else {
                console.log("bleat updated");

            }
        });
});

module.exports = router;
