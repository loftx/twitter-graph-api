const twitterGraphApi = require('./index');

describe('index.js', () => {
  /* test('Check getAuthGuestId', async () => {
    const twitter = new twitterGraphApi();
    const guestId = await twitter.getAuthGuestId();

    console.log(guestId);
    expect(guestId).toMatch(/^\d+$/);

  });

  test('Check getAuthGuestToken', async () => {
    const twitter = new twitterGraphApi();
    const guestId = await twitter.getAuthGuestId();
    const guestToken = await twitter.getAuthGuestToken(guestId);

    console.log(guestToken);
    expect(guestToken).toMatch(/^\d+$/);

  }); */

  test('Check getUserTweets', async () => {

    const twitter = new twitterGraphApi(
      process.env.TWITTER_BEARER_TOKEN
    );

    twitter.setGuestId(await twitter.getAuthGuestId());
    twitter.setGuestToken(await twitter.getAuthGuestToken(twitter.getGuestId()));

    const result = await twitter.getUserTweets(process.env.TWITTER_USER_ID);

    console.log(result);

    /* expect(result).toHaveProperty('data');
    expect(result.data).toHaveProperty('me');
    expect(result.data.me).toHaveProperty('personalizedFeed');
    expect(result.data.me.personalizedFeed).toHaveProperty('feedItems');

    console.log(result.data.me.personalizedFeed.feedItems); */

  });
});