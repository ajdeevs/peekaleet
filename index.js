const axios = require("axios");

class PeekALeet {
  constructor(username) {
    this.username = username;

    this.profile = null;
    this.totalCount = null;
    this.topicwise = null;
    this.chart = null;
    this.recent = null;
    this.streak = null;
    this.contest = null;

    this.endpoint = "https://leetcode.com/graphql/";
  }

  async request(query, variables) {
    const res = await axios.post(
      this.endpoint,
      { query, variables },
      { headers: { "Content-Type": "application/json" } }
    );

    return res.data.data;
  }

  async load(options = {}) {
    this.profile = await this.getProfile();

    if (options.totalCount) {
      this.totalCount = await this.getTotalCount();
    }

    if (options.topicwise) {
      this.topicwise = await this.getTopicWise();
    }

    if (options.recent) {
      this.recent = await this.getRecent();
    }

    if (options.contest) {
      this.contest = await this.getContest();
    }

    if (options.streak) {
      this.streak = await this.getStreak();
    }
  }

  async getStreak() {
    const query = `
      query($username: String!) {
        matchedUser(username: $username) {
          userCalendar {
            streak
          }
        }
      }
    `;

    const data = await this.request(query, {
      username: this.username
    });

    return data.matchedUser?.userCalendar?.streak || 0;
  }

  async getProfile() {
    const query = `
      query($username: String!) {
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
        }
      }
    `;

    const data = await this.request(query, {
      username: this.username
    });

    return data.matchedUser;
  }

  async getContest() {
    const query = `
      query($username: String!) {
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

    const data = await this.request(query, {
      username: this.username
    });

    return data.userContestRankingHistory.map(item => ({
      title: item.contest.title,
      ranking: item.ranking,
      rating: item.rating
    }));
  }

  async getRecent(limit = 15) {
    const query = `
      query($username: String!, $limit: Int!) {
        recentAcSubmissionList(username: $username, limit: $limit) {
          id
          title
          titleSlug
          timestamp
        }
      }
    `;

    const data = await this.request(query, {
      username: this.username,
      limit
    });

    return data.recentAcSubmissionList;
  }

  async getTopicWise() {
    const query = `
      query($username: String!) {
        matchedUser(username: $username) {
          tagProblemCounts {
            advanced { tagName problemsSolved }
            intermediate { tagName problemsSolved }
            fundamental { tagName problemsSolved }
          }
        }
      }
    `;

    const data = await this.request(query, {
      username: this.username
    });

    return data.matchedUser.tagProblemCounts;
  }

  async getTotalCount() {
    const query = `
      query($username: String!) {
        matchedUser(username: $username) {
          languageProblemCount {
            problemsSolved
          }
        }
      }
    `;

    const data = await this.request(query, {
      username: this.username
    });

    return data.matchedUser.languageProblemCount.reduce(
      (sum, lang) => sum + lang.problemsSolved,
      0
    );
  }
}

module.exports = PeekALeet;
