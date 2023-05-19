# twitter-graph-api

A very basic node module to interact with the internal Twitter Graph API (i.e. the one used on the Twitter web site at <https://twitter.com/>) not the publically available API at <https://developer.twitter.com>/

It currently authenticates as a guest, and allows a list of Tweets to be returned for a userID, but could be extended to make use of other guest APIs.

## Usage 

Create the API instance with a Bearer token - this is the one Twitter uses for guests

`const twitter = new twitterGraphApi('AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA');`

Obtain a Guest ID and Guest Auth token required for making Graph API calls

`twitter.setGuestId(await twitter.getAuthGuestId());`
`twitter.setGuestToken(await twitter.getAuthGuestToken(twitter.getGuestId()));`

Call getUserTweets with a twitter UserID (the numeric ID not the username)

`const result = await twitter.getUserTweets(twitterUserID);`

The full graph API result will be returned.
