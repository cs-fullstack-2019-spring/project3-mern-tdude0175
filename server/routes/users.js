var express = require('express');
var router = express.Router();
var bCrypt = require('bcrypt-nodejs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var BleatCollection = require("../models/BleatSchema");

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  BleatCollection.findById(id, function(err, user) {
    done(err, user);
  });
});

var isValidPassword = function(user, password){
  return bCrypt.compareSync(password, user.password);
};

var createHash = function(password){
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//Strategy for create a new user in a MERN fullstack project
passport.use("register", new LocalStrategy
(
    {passReqToCallback: true},

    (req,username,password,done)=>
    {
      console.log("Entered Strategy");
      BleatCollection.findOne({username: username}, (err,results)=>
      {
        if(err)
        {
          console.log("error on startup");
          return done(err);
        }
        if(results)
        {
          console.log("Error: User Already Exists");
          return done(null,false,{message:"Account Exists"});
        }
        else
        {
          console.log("Made it Through strategy");

          var newUser = new BleatCollection();

          newUser.username = username;
          newUser.password = createHash(password);
          /*newUser.item to save = [req.body.item to save];*/

          newUser.save((err)=>
          {
            if(err)
            {
              console.log("Cannot save User");
              throw err;
            }
          });

          console.log("New User Made");

          return done(null,newUser);
        }
      })
    }
));

router.post("/addUser",
    passport.authenticate("register",
        {
          failureRedirect:"/user/registerfail"
        }),
    (req,res)=>
    {
      console.log("this is the end");
      res.send("Made it through!");
    }
);

router.get("registerfail",(req,res)=>
{
  res.send("failed to create user in strat");
});

// Stragety for logging in and making sure information is correct
// Local Stragety {copied from past lecture for times sake} for making sure a user exists and the information entered is correct
passport.use(new LocalStrategy(
    // req is the request of the route that called the strategy
    // username and password are passed by passport by default
    // done is the function to end the strategy (callback function).
    function(username, password, done) {
      console.log("Local Strat");
      // find a user in Mongo with provided username. It returns an error if there is an error or the full entry for that user
      BleatCollection.findOne({ username: username }, function (err, user) {
        // If there is a MongoDB/Mongoose error, send the error
        if (err) {console.log("1");
          return done(err); }
        // If there is not a user in the database, it's a failure and send the message below
        if (!user) {
          console.log("2");
          return done(null, false, { message: 'Incorrect username.' });
        }
        // Check to see if the password typed into the form and the user's saved password is the same.
        if (!isValidPassword(user, password)) {
          console.log("3");
          return done(null, false, { message: 'Incorrect password.' });
        }
        console.log("4");
        console.log(user);
        // null is here because there is not an error
        // user is the results of the findOne function
        return done(null, user, { user: user.username });
      });
    }
));

router.post("/login",
    passport.authenticate("local",
        {
          failureRedirect: "/users/faillogin"
        }),
    (req,res)=>
    {
      // req.session = req.body.username;
      console.log("Cookie Saved?");
      res.send(req.body.username);
    }
);

router.get("/faillogin",(req,res)=>
{
  res.send("failed to get through login");
});

module.exports = router;
