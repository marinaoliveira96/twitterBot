const Twit = require('twit');
const schedule = require('node-schedule');
require('dotenv').config();

//falta só o array de vídeos fifíneos do loona

/* Configure the Twitter API */
const Bot = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,
});

var TWITTER_SEARCH_PHRASE = '#loona';
var TWITTER_SEARCH_LIKED = 'loona';

console.log('The bot is running...');

/* BotRetweet() : To retweet recent tweets with our query */
function BotRetweet() {
  const stream = Bot.stream('statuses/filter', {
    track: TWITTER_SEARCH_PHRASE,
    language: 'pt',
  });

  stream.on('tweet', (tweet) => {
    if (isReply(tweet)) {
      console.warn('Tweet is a retweet!');
    } else {
      Bot.post(
        'statuses/retweet/:id',
        {
          id: tweet.id_str,
        },
        (error, response) => {
          if (error) {
            console.log('Bot could not retweet, : ' + error);
          } else {
            console.log('Bot retweeted : ' + response.text);
          }
        }
      );
    }
  });
}

/* Botlike() : To like recent tweets with our query */
function BotLike() {
  const stream = Bot.stream('statuses/filter', {
    track: TWITTER_SEARCH_LIKED,
    language: 'pt',
  });

  stream.on('tweet', (tweet) => {
    if (isReply(tweet)) {
      console.warn('Tweet is a retweet!');
    } else {
      Bot.post(
        'favorites/create',
        {
          id: tweet.id_str,
        },
        (error, response) => {
          if (error) {
            console.log('Bot could not like, : ' + error);
          } else {
            console.log('Bot liked : ' + response.text);
          }
        }
      );
    }
  });
}

function isReply(tweet) {
  if (
    tweet.retweeted_status ||
    tweet.in_reply_to_status_id ||
    tweet.in_reply_to_status_id_str ||
    tweet.in_reply_to_user_id ||
    tweet.in_reply_to_user_id_str ||
    tweet.in_reply_to_screen_name
  )
    return true;
}

const LOONAMESSAGE =
  'sdds #delah https://twitter.com/ot12loops/status/1295378319802851328/video/1';

function tweetLoonaMessage() {
  const tweet = `${LOONAMESSAGE}`;
  Bot.post('statuses/update', { status: tweet }, () => {});
}

//Github Promotion here dont worry!!!!!!!!!!!!!!!
const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(1, 6)];
rule.hour = 11;
rule.minute = 14;

function tweetLoona() {
  schedule.scheduleJob(rule, () => {
    console.log('stan loona bitches');
    tweetLoonaMessage();
  });
}

// Exports
module.exports = {
  Bot,
  BotRetweet,
  isReply,
  BotLike,
  tweetLoona,
};
