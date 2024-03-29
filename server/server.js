const express = require('express');
const app = express();
const cors = require("cors");
const axios = require('axios');
var port = 5000;


// ********** MIDDLEWARE **********
app.use(cors());
require('dotenv').config()
API_KEY = process.env.VITE_APP_API_KEY




//auth
var passport = require('passport');
var session = require('express-session');

var passportSteam = require('passport-steam');
var SteamStrategy = passportSteam.Strategy;






// Required to get data from user for sessions
passport.serializeUser((user, done) => {
  done(null, user);
 });
 passport.deserializeUser((user, done) => {
  done(null, user);
 });
 // Initiate Strategy
 passport.use(new SteamStrategy({
  returnURL: 'http://localhost:' + port + '/api/auth/steam/return',
  realm: 'http://localhost:' + port + '/',
  apiKey: API_KEY
  }, function (identifier, profile, done) {
   process.nextTick(function () {
    profile.identifier = identifier;

    return done(null, profile);
   });
  }
 ));

 app.use(session({
  secret: 'your secret',
  name: 'name of session id',
  resave: true,
  saveUninitialized: true
  
}));


 app.use(passport.initialize());
 app.use(passport.session());

  // Routes

 


//This is the route that tells passport to authenticate the user through steam, if there is a failure redirect them to the homepage

app.get('/api/auth/steam',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {  
    res.redirect('/');
  });

//This is the route that will be used when steam sends back information about the user
app.get('/api/auth/steam/return',

  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

//This is the route that will be used to log the user out
app.get('/api/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});








// search for a game
// https://api.steampowered.com/ISteamApps/GetAppList/v2/
app.get('/api/search', (req, res) => {
    const { q } = req.query;
    axios
      .get("https://api.steampowered.com/ISteamApps/GetAppList/v2/")
      .then(response => {
        const apps = response.data.applist.apps.filter(app => (
          app.name.toLowerCase().includes(q.toLowerCase())
        )).map(app => ({
          name: app.name,
          appid: app.appid
        }));
        res.send(apps);
      })
      .catch(error => {
        console.log(error);
      });
  });




// Example URL: http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=440&count=3&maxlength=300&format=json

app.get('/api/news/:appid', (req, res) => {
    const defaultappid = '730'; // set a default value for the app id
    const appid = req.params.appid || defaultappid; // use default value if no parameter is provided

    axios.get(`http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=${appid}&count=3&maxlength=300&format=json`)
      .then(response => {
        res.send(response.data);
      })
      .catch(error => {
        console.log(error);
      });
});

// app.get('/api/stats/:appId/history', async (req, res) => {
  app.get('/api/stats/:appid/history', (req, res) => {
    const appid = req.params.appid
    axios.get(`https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${appid}&key=${API_KEY}`)
      .then(response => {
        res.send(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  });
  


// Counter-strike stats API num players
app.get('/api/stats/:appid', (req, res) => {

    const defaultappid = '730'; // set a default value for the app id
    const appid = req.params.appid || defaultappid;
    axios.get(`http://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${appid}`)


      .then(response => {
        res.send(response.data);
      })
      .catch(error => {
        console.log(error);
      });
});




// ********** 404 and 500 handlers **********


//handler for 404 - Resource Not Found
app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!' + emoji.get('t-rex'));
});
//handler for 500 - Server Error
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!' + emoji.get('poop'));
});

// ********** NODE EMOJI **********

const emoji = require('node-emoji');


// node emoji's link https://www.npmjs.com/package/node-emoji
// spinnerCLI link https://www.npmjs.com/package/cli-spinners

// ********** SPINNER **********
class serverSpinner {
    spin(){
        const serverSpinner = require('cli-spinners');
        const frames = serverSpinner.dots.frames;
        let i = 0;
        setInterval(() => {
            
            process.stdout.write(`\r${frames[i = ++i % frames.length]} Server is running on port ` + port + ` ` + new Date().toLocaleString() + `  ` + emoji.get('crystal_ball') + ` `
        );
        }, 100);
    }
}


// ********** SERVER **********

app.listen(port, () => {
    //    spinner.spin();
        console.log(new serverSpinner().spin());
    });
    


