#  PeekALeet

> Lightweight Node.js utility for fetching public LeetCode user data using a single optimized GraphQL request.

PeekALeet consolidates profile details, contest history, problem statistics, streak data, and recent submissions into **one efficient API call** — reducing latency and eliminating redundant network requests.

---

##  Why PeekALeet?

Most implementations fetch LeetCode data using multiple HTTP calls.  
PeekALeet uses **one consolidated GraphQL query** to retrieve everything at once.

### Benefits

-  Single request → lower latency
-  Reduced network overhead
-  Clean class-based architecture
-  Easy backend integration
-  Selective data loading
-  No authentication required (public profiles only)

---

##  Installation

```bash
npm install peekaleet
```
## Basic Usage
```javascript
const PeekALeet = require("peekaleet");

async function example() {
  const user = new PeekALeet("leetcode_username");

  await user.load({
    totalCount: true,
    topicwise: true,
    recent: true,
    contest: true,
    streak: true
  });

  console.log("Profile:", user.profile);
  console.log("Total Solved:", user.totalCount);
  console.log("Streak:", user.streak);
}

example();
```
## Option Configurations
```json
await user.load({
  totalCount: true,
  topicwise: true,
  recent: false,
  contest: true,
  streak: true
});
```
---
