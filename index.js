module.exports = class TwitterGraphApi {

  constructor(bearerToken, guestToken) {
    this.twitterApiUrl = 'https://twitter.com/i/api/graphql/WzJjibAcDa-oCjCcLOotcg/';

    this.axiosOptions = {
      headers: {
        'x-guest-token': guestToken,
        'Authorization': 'Bearer ' + bearerToken
      }
    };
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

    const response = await axios.get(this.twitterApiUrl + queryString, this.axiosOptions).catch(error => {
        console.log(error.response.status)
        return false;
    });

    console.log(response)

  }
  
}