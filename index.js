module.exports = class TwitterGraphApi {

  constructor() {
    this.twitterUrl = 'https://twitter.com/';
    this.twitterApiUrl = 'https://twitter.com/i/api/graphql/WzJjibAcDa-oCjCcLOotcg/';

    this.csfrToken = '';
    this.cookie = '';
    this.bearerToken = '';

    this.defaultVariables = {
      "count": 40,
      "includePromotedContent": true,
      "withQuickPromoteEligibilityTweetFields": true,
      "withVoice": true,
      "withV2Timeline": true
    };

    this.defaultFeatures = {
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

  }

  setCsrfToken(csfrToken) {
    this.csfrToken = csfrToken;
  }

  getCsrfToken() {
    return this.csfrToken;
  }

  setCookie(cookie) {
    this.cookie = cookie;
  }

  getCookie() {
    return this.cookie;
  }

  setBearerToken(bearerToken) {
    this.bearerToken = bearerToken;
  }

  getBearerToken() {
    return this.bearerToken;
  }

  async getUserTweets(userId, variables, features) {

    // check requirements
    if (!this.getBearerToken()) {
      throw new Error('Bearer Token is not set.');
    }

    if (!this.getCsrfToken()) {
      throw new Error('CSRF token is not set.');
    }

    if (!this.getCookie()) {
      throw new Error('Cookie is not set.');
    }

    const mergedVariables = Object.assign({}, this.defaultVariables, variables);

    mergedVariables['userId'] = userId;

    const mergedFeatures = Object.assign({}, this.defaultFeatures, features);

    const axios = require('axios');

    const queryString = 'UserTweets?variables=' + JSON.stringify(mergedVariables) + '&features=' + JSON.stringify(mergedFeatures);

    const axiosOptions = {
      headers: {
        'x-csrf-token': this.getCsrfToken(),  
        'authorization': 'Bearer ' + this.getBearerToken(),
        'Cookie': this.getCookie()
      }
    };

    const response = await axios.get(this.twitterApiUrl + queryString, axiosOptions).catch(error => {
      throw new Error('Error on getUserTweets call: ' + error.response.status);  
    });

    return response.data

  }
  
}