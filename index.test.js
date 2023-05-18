const twitterGraphApi = require('./index');

describe('index.js', () => {
  test('Check getUserTweets', async () => {

    const twitter = new twitterGraphApi(
      process.env.TWITTER_BEARER_TOKEN,
      process.env.TWITTER_GUEST_TOKEN
    );

    const result = await twitter.getUserTweets(process.env.TWITTER_USER_ID);

    console.log(result);

  });
});