const twitterGraphApi = require('./index');

describe('index.js', () => {
  test('Check getAuthGuestId', async () => {
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

  });

  test('Check getUserTweets', async () => {

    const twitter = new twitterGraphApi(
      process.env.TWITTER_BEARER_TOKEN
    );

    twitter.setGuestId(await twitter.getAuthGuestId());
    twitter.setGuestToken(await twitter.getAuthGuestToken(twitter.getGuestId()));

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