module.exports = class TwitterGraphApi {

  constructor(bearerToken) {
    this.twitterUrl = 'https://twitter.com/';
    this.twitterApiUrl = 'https://twitter.com/i/api/graphql/WzJjibAcDa-oCjCcLOotcg/';

    this.guestId = '';
    this.guestToken = '';
    this.bearerToken = bearerToken;
    
    this.axiosOptions = {};
  }

  getGuestId() {
    return this.guestId;
  }

  setGuestId(guestId) {
    this.guestId = guestId;
  }

  setGuestToken(guestToken) {
    this.guestToken = guestToken;
  }

  getGuestToken() {
    return this.guestToken;
  }

  setBearerToken(bearerToken) {
    this.bearerToken = bearerToken;
  }

  getBearerToken() {
    return this.bearerToken;
  }

  async getAuthGuestId() {
    const axios = require('axios');

    // twitter will try and redirect for the cookie - don't allow it and just get the response
    const axiosOptions = {
      maxRedirects: 0
    }

    try {
      const response = await axios.get(this.twitterUrl, axiosOptions);
    } catch (error) {

      // error is thrown as it's a redirect so catch it and continue
      
      // TODO: check for existance of cookies
      const cookieHeader = error.response.headers['set-cookie'][0];

      const cookies = cookieHeader.split(/;\s*/).reduce((dict, cookie) => {
        const [key, value] = cookie.split('=');
        dict[key] = value;
        return dict;
      }, {});

      // TODO: check for existance of guest_id

      // TODO: check guestId is in form v1=xxxx after decoding

      const guestId = cookies['guest_id'].substring(5);

      return guestId;

    }

    throw 'Shouldn\'t happen';

  }

  async getAuthGuestToken(guestId) {
    const axios = require('axios');

    const axiosOptions = {
      headers: {
        'Cookie': 'guest_id=v1%3A' + guestId
      }
    }

    var response = '';

    try {
      response = await axios.get(this.twitterUrl, axiosOptions);
    } catch (error) {
      // TODO: sort out errors
      throw error;
    }

    const matches = response.data.match(/gt=([0-9]+)/);
    if (matches && matches.length > 1) {
      return matches[1];
    } else {
      // TODO: sort out errors
      throw "No match found.";
    }

  }

  async getUserTweets(userId) {

    const axios = require('axios');

    const variables = {
      "userId": userId,
      "count": 40,
      "includePromotedContent": true,
      "withQuickPromoteEligibilityTweetFields": true,
      "withVoice": true,
      "withV2Timeline": true
    };

    const features = {
      "rweb_lists_timeline_redesign_enabled": false,
      "blue_business_profile_image_shape_enabled": true,
      "responsive_web_graphql_exclude_directive_enabled": true,
      "verified_phone_label_enabled": false,
      "creator_subscriptions_tweet_preview_api_enabled": false,
      "responsive_web_graphql_timeline_navigation_enabled": true,
      "responsive_web_graphql_skip_user_profile_image_extensions_enabled": false,
      "tweetypie_unmention_optimization_enabled": true,
      "vibe_api_enabled": true,
      "responsive_web_edit_tweet_api_enabled": true,
      "graphql_is_translatable_rweb_tweet_is_translatable_enabled": true,
      "view_counts_everywhere_api_enabled": true,
      "longform_notetweets_consumption_enabled": true,
      "tweet_awards_web_tipping_enabled": false,
      "freedom_of_speech_not_reach_fetch_enabled": true,
      "standardized_nudges_misinfo": true,
      "tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled": false,
      "interactive_text_enabled": true,
      "responsive_web_text_conversations_enabled": false,
      "longform_notetweets_rich_text_read_enabled": true,
      "longform_notetweets_inline_media_enabled": false,
      "responsive_web_enhance_cards_enabled": false
    };

    const queryString = 'UserTweets?variables=' + JSON.stringify(variables) + '&features=' + JSON.stringify(features);

    const axiosOptions = {
      headers: {
        'x-guest-token': this.getGuestToken(),
        'Authorization': 'Bearer ' + this.getBearerToken()
      }
    };

    const response = await axios.get(this.twitterApiUrl + queryString, axiosOptions).catch(error => {
        console.log(error.response.status)
        return false;
    });

    console.log(response)

  }
  
}