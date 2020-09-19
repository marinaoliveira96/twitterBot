const TwitterBot = require('./twitter-bot.js');

// Initiate Bot
function BotInit() {
  TwitterBot.BotRetweet();
  TwitterBot.BotLike();
  TwitterBot.tweetLoona();
}

BotInit();

module.exports = {
  BotInit,
};
