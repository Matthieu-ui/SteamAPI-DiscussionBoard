const express = require('express');
const app = express();
const Twitter = require('twitter');


require('dotenv').config();

// initialize the Twitter API client with the API keys and secrets
const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    TWITTER_BEARER_TOKEN: process.env.TWITTER_BEARER_TOKEN
});

// image search endpoint
app.get('/api/imagesearch/:search', (req, res) => {
    // get the search query from the request parameters
    const { search } = req.params;
    // make a request to the Twitter API
    client.get('https://api.twitter.com/1.1/search/tweets.json?q=' + search + '&result_type=popular&count=100', (error, tweets, response) => {
        // if there is an error, return the error
        if (error) {
            return res.status(500).json({
                error
            });
        }
        // if there are no tweets, return an empty array
        if (!tweets.statuses) {
            return res.json([]);
        }
        // map the tweets to only the data we need
        const results = tweets.statuses.map(tweet => {
            return {
                id: tweet.id,
                user: tweet.user,
                alt_description: tweet.text,
                urls: {
                    small: tweet.user.profile_image_url
                },
                media: tweet.entities.media
            }
        });
        // return the results
        res.json(results);
    });
});

// get image by id endpoint
app.get('/api/imagesearch/:id', (req, res) => {
    // get the id from the request parameters
    const { id } = req.params;
    // make a request to the Twitter API
    client.get('https://api.twitter.com/1.1/statuses/show.json?id=' + id, (error, tweet, response) => {
        // if there is an error, return the error   
        if (error) {
            return res.status(500).json({
                error
            });
        }
        // if there is no tweet, return an empty object
        if (!tweet) {
            return res.json({});
        }
        // map the tweet to only the data we need
        const result = {
            id: tweet.id,
            user: tweet.user,
            alt_description: tweet.text,
            urls: {
                small: tweet.user.profile_image_url
            },
            media: tweet.entities.media
            
        };
        // return the result
        res.json(result);
    });
});














//////////////////////
// NODE server code //
//////////////////////

//handler for 404 - Resource Not Found
app.use(function (req, res, next) {
    res.status(404).send('Sorry cant find that!' + emoji.get('t-rex'));
});
//handler for 500 - Server Error
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!' + emoji.get('poop'));
});
const emoji = require('node-emoji');
// node emoji's link https://www.npmjs.com/package/node-emoji
// spinnerCLI link https://www.npmjs.com/package/cli-spinners
class serverSpinner {
    spin() {
        const serverSpinner = require('cli-spinners');
        const frames = serverSpinner.dots.frames;
        let i = 0;
        setInterval(() => {
            process.stdout.write(`\r${frames[i = ++i % frames.length]} Server is running on port 5000 - ` + new Date().toLocaleTimeString() + ' ');
        }, 100);
    }
}
app.listen(5000, () => {
    //    spinner.spin();
    console.log(new serverSpinner().spin());
});
