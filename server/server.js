const express = require('express');
const app = express();
const Twitter = require('twitter');

require('dotenv').config();

const client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

// async function to promisify the twitter api call for image search

app.get('/api/images', async (req, res) => {
    const { q, category } = req.query;
    const params = {
        q: q,
        safe: 'on',
         result_type: 'recent',
        count: 5,
        include_entities: true,
        lang: 'en',
    };

    const data = await client.get('search/tweets', params);
    const images = data.statuses

        .filter((tweet) => tweet.entities.media)
        .map((tweet) => {
            return {
                id: tweet.id,
                url: tweet.entities.media[0].media_url,
                tags: q,
                category: category,
            };
        });

    res.json(images);

    // console.log(images);
});


// if error is thrown dont disconnect from server
process.on('uncaughtException', function (err) {
    console.log(err);
});

// if error is thrown dont disconnect from server
process.on('unhandledRejection', function (err) {
    console.log(err);
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
