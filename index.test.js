const twitterGraphApi = require('./index');

describe('index.js', () => {
  test('Check getUserTweets', async () => {

    const twitter = new twitterGraphApi();

    twitter.setCsrfToken(process.env.TWITTER_CSRF_TOKEN);
    twitter.setBearerToken(process.env.TWITTER_BEARER_TOKEN);
    twitter.setCookie(process.env.TWITTER_COOKIE);

    const result = await twitter.getUserTweets(process.env.TWITTER_USER_ID);

    console.log(result);

    expect(result).toHaveProperty('data');
    expect(result.data).toHaveProperty('user');
    expect(result.data.user).toHaveProperty('result');
    expect(result.data.user.result).toHaveProperty('timeline_v2');
    expect(result.data.user.result.timeline_v2).toHaveProperty('timeline');

    // TODO: Check for actual tweets

  });
});