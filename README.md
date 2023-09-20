# twitter-graph-api

A very basic node module to interact with the internal Twitter Graph API (i.e. the one used on the Twitter web site at <https://twitter.com/>) not the publically available API at <https://developer.twitter.com>/

Due to changes, version 2.0.0 no longer allows guest authentiction, but requires specific credentials to be set.


## Usage 

Create the API instance

`const twitter = new twitterGraphApi();`

Obtain a CSRF token, Cookie and Barer token - these can be grabbed from a the XHR request starting  https://twitter.com/i/api/graphql/H8OOoI-5ZE4NxgRr8lfyWg/UserTweets as a logged in user.

`twitter.setCsrfToken(...);
twitter.setBearerToken(...);
twitter.setCookie(...);`

Call getUserTweets with a twitter UserID (the numeric ID not the username)

`const result = await twitter.getUserTweets(twitterUserID);`

The full graph API result will be returned.
