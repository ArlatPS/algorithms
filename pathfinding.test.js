function findShortestPathLength(maze, pointA, pointB) {
  const checkedA = new Set();
  const checkedB = new Set();
  const mazeSolved = [];
  let queueA = [pointA];
  let queueB = [pointB];
  for (let depth = 0; depth < maze.flat().length / 2 + 1; depth++) {
    const newQueueA = [];
    const newQueueB = [];
    while (queueA.length || queueB.length) {
      if (queueA.length) {
        const [x, y] = queueA.shift();
        if (maze[y] != undefined) {
          if (maze[y][x] != undefined && maze[y][x] != 1) {
            if (!checkedA.has(`${x} : ${y}`)) {
              if (checkedB.has(`${x} : ${y}`)) {
                const [found] = mazeSolved.filter(
                  (item) => item.place == `${x} : ${y}`
                );
                return found.depth + depth;
              }
              newQueueA.push([x - 1, y]);
              newQueueA.push([x + 1, y]);
              newQueueA.push([x, y - 1]);
              newQueueA.push([x, y + 1]);
              checkedA.add(`${x} : ${y}`);
              mazeSolved.push({ place: `${x} : ${y}`, depth: depth });
            }
          }
        }
      } else {
        const [x, y] = queueB.shift();
        if (maze[y] != undefined) {
          if (maze[y][x] != undefined && maze[y][x] != 1) {
            if (!checkedB.has(`${x} : ${y}`)) {
              if (checkedA.has(`${x} : ${y}`)) {
                const [found] = mazeSolved.filter(
                  (item) => item.place == `${x} : ${y}`
                );
                return found.depth + depth;
              }
              newQueueB.push([x - 1, y]);
              newQueueB.push([x + 1, y]);
              newQueueB.push([x, y - 1]);
              newQueueB.push([x, y + 1]);

              checkedB.add(`${x} : ${y}`);
              mazeSolved.push({ place: `${x} : ${y}`, depth: depth });
            }
          }
        }
      }
    }
    queueA = newQueueA;
    queueB = newQueueB;
  }
  return "not found";
}

describe("pathfinding", () => {
  const fourByFour = [
    [2, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 2],
  ];
  test("4x4 maze", () => {
    expect(findShortestPathLength(fourByFour, [0, 0], [3, 3])).toEqual(6);
  });

  const sixBySix = [
    [0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0],
  ];
  test("6x6 maze", () => {
    expect(findShortestPathLength(sixBySix, [1, 1], [2, 5])).toEqual(7);
  });

  const eightByEight = [
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0],
    [0, 2, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 2],
  ];

  test("8x8 maze", () => {
    expect(findShortestPathLength(eightByEight, [1, 7], [7, 7])).toEqual(16);
  });

  const fifteenByFifteen = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0],
    [0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 1, 1, 2, 1, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  test("15x15 maze", () => {
    expect(findShortestPathLength(fifteenByFifteen, [1, 1], [8, 8])).toEqual(
      78
    );
  });
});
