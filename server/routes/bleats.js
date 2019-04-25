var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var BleatCollection = require("../models/BleatSchema");


/* used to gather the bleats and filter through them to sort by creation date then lets react slice out how many to display*/
router.get('/:username', function (req, res, next) {
    console.log("we bleatin bro");
    console.log(req.params.username);
    let bleatArray = [];
    BleatCollection.find({}, (errors, results) => {
        if (errors) res.send(errors);
        else {
            console.log("We Found this!!");
            for (i = 0; i < results.length; i++) {
                // console.log(results[i].bleat);
                for (x = 0; x < results[i].bleat.length; x++) {
                    if (results[i].bleat[x].private) {
                        if(results[i].username === req.params.username)
                        {
                            console.log("private bleat adding");
                            let bleat = {username: results[i].username, bleat: results[i].bleat[x]};
                            bleatArray.push(bleat);
                        }
                    } else {
                        let bleat = {username: results[i].username, bleat: results[i].bleat[x]};
                        console.log(bleat);
                        bleatArray.push(bleat);

                    }
                }
            }
            console.log("sorting");
            // console.log(bleatArray[2].bleat.created);
            bleatArray.sort(function (a, b) {
                return b.bleat.created - a.bleat.created
            });
            // console.log("results:");
            // console.log(bleatArray);
            res.json(bleatArray)
        }
    });

});

// grabs the bleat to edit and send it back for editing
router.post("/locateBleatToEdit",(req,res)=>
{
    let bleat = {};
    console.log("hit the server");
    BleatCollection.findOne({"bleat._id":{_id:req.body.bleatId}},(errors,results)=>
    {
        // console.log(req.body.bleatId);
        if(errors) res.send(errors);
        else{
            // console.log(results.bleat);
            for (i = 0; i < results.bleat.length; i++) {
                // console.log(results.bleat[i]);
                if(results.bleat[i]._id == req.body.bleatId)
                {
                    console.log("Found IT!");
                    res.json(results.bleat[i]);
                    // console.log("this is the bleat" +bleat)
                }
            }
        }

    })
});
// actually edits the bleat and saves it to the server withh edited data
router.put("/editBleat", (req, res) => {
    BleatCollection.findOneAndUpdate({"bleat._id": req.body._id},
        {$set:{"bleat.$": req.body}}, (errors, results) => {
            if (errors) res.send(errors);
            else {
                console.log("bleat updated");
                res.send("made it through!!")
            }
        });
});
// locates all bleats for a single user and sends them back for display on userpage
router.post("/findBleats", (req, res) => {
    BleatCollection.find({username: req.body.username}, (errors, results) => {
        if (errors) res.send(errors);
        else (res.send(results[0].bleat))
    })
});
// allows the person to add a bleat to their list of bleats and saves it using $push
router.post("/addBleat", (req, res) => {
    BleatCollection.findOneAndUpdate({username: req.body.username},
        {$push: {bleat: req.body}}, (errors, results) => {
            if (errors) res.send("errors:" + errors);
            else res.send("You Bleated!!");
        });
});


// firstly goes through all users with bleat messages that contain the search conditions then it runs through the users
// of those bleats and adds the bleats that actually contain the search conditions to the array to be sent back
router.post("/searchBleats", (req, res) => {
    let bleatArray = [];
    BleatCollection.find({"bleat.message": {"$regex": req.body.query}}, (errors, results) => {
        console.log("something happened");
        console.log(results);
        for (i = 0; i < results.length; i++) {
            // console.log(results[i].bleat);
            for (x = 0; x < results[i].bleat.length; x++) {
                if (results[i].bleat[x].private) {

                }
                else if (results[i].bleat[x].message.includes(req.body.query)) {

                    let bleat = {username: results[i].username, bleat: results[i].bleat[x]};
                    console.log(bleat);
                    bleatArray.push(bleat);

                }
            }
        }
        // console.log(bleatArray[2].bleat.created);
        // console.log("results:");
        // console.log(bleatArray);
        res.json(bleatArray)
    })
});

module.exports = router;
