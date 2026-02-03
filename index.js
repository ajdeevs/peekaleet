const axios = require("axios");

class PeekALeet {
  constructor(username) {
    this.username = username;

    this.profile = null;
    this.totalCount = null;
    this.topicwise = null;
    this.recent = null;
    this.streak = null;
    this.contest = null;

    this.endpoint = "https://leetcode.com/graphql/";
  }

  async load(options = {}) {
    const query = `
      query fullUserData($username: String!, $limit: Int!) {

        matchedUser(username: $username) {
          username
          githubUrl
          twitterUrl
          linkedinUrl

          profile {
            ranking
            userAvatar
            realName
            aboutMe
            school
            countryName
            company
            jobTitle
            reputation
          }

          userCalendar {
            streak
          }

          tagProblemCounts {
            advanced { tagName problemsSolved }
            intermediate { tagName problemsSolved }
            fundamental { tagName problemsSolved }
          }

          languageProblemCount {
            problemsSolved
          }
        }

        recentAcSubmissionList(username: $username, limit: $limit) {
          id
          title
          titleSlug
          timestamp
        }

        userContestRankingHistory(username: $username) {
          ranking
          rating
          contest {
            title
            startTime
          }
        }
      }
    `;

    const res = await axios.post(
      this.endpoint,
      {
        query,
        variables: {
          username: this.username,
          limit: 15
        }
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    );

    const data = res.data.data;

    if (!data || !data.matchedUser) {
      throw new Error("User not found");
    }

    const user = data.matchedUser;

    this.profile = user;

    if (options.streak) {
      this.streak = user.userCalendar?.streak || 0;
    }

    if (options.topicwise) {
      this.topicwise = user.tagProblemCounts;
    }

    if (options.totalCount) {
      this.totalCount = user.languageProblemCount.reduce(
        (sum, lang) => sum + lang.problemsSolved,
        0
      );
    }

    if (options.recent) {
      this.recent = data.recentAcSubmissionList;
    }

    if (options.contest) {
      this.contest = data.userContestRankingHistory.map(item => ({
        title: item.contest.title,
        ranking: item.ranking,
        rating: item.rating
      }));
    }
  }
}

module.exports = PeekALeet;
