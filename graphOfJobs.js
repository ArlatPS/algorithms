const { getUser } = require("./jobs");

// find most common job title in graph of users connections
const findMostCommonTitle = (myId, degreesOfSeparation) => {
  // queue connections of the user
  let queue = getUser(myId).connections;
  // Set to keep track of seen ids (to not repeat)
  const seenIds = new Set();
  // count how many times seen
  const titlesCounted = {};
  // for every level
  for (let i = 1; i <= degreesOfSeparation; i++) {
    // keep track of queue length at start of every level
    const lengthAtStart = queue.length;
    // loop through all items in a queue at start of the level
    for (let j = 0; j < lengthAtStart; j++) {
      const connection = queue.shift();
      // if user not seen before
      if (!seenIds.has(connection)) {
        seenIds.add(connection);
        const user = getUser(connection);
        // count current user title
        if (!titlesCounted[user.title]) {
          titlesCounted[user.title] = 1;
        } else {
          titlesCounted[user.title] += 1;
        }
        // queue all connections of current user
        queue = [...queue, ...user.connections];
      }
    }
  }
  // check which job was seen most
  const winner = { job: "", count: 0 };
  // loop through keys and check
  const keys = Object.keys(titlesCounted);
  keys.forEach((job) => {
    if (titlesCounted[job] > winner.count) {
      winner.job = job;
      winner.count = titlesCounted[job];
    }
  });
  return winner.job;
};

console.log(findMostCommonTitle(1, 7));
