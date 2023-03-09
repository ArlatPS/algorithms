// recursive variation
const binarySearchRecursive = (
  array,
  target,
  startIndex = 0,
  endIndex = array.length - 1
) => {
  if (startIndex > endIndex) {
    return "Not found";
  }
  const middle = Math.floor((startIndex + endIndex) / 2);
  if (array[middle] == target) {
    return middle;
  }
  if (target > array[middle]) {
    return binarySearchRecursive(array, target, middle + 1, endIndex);
  }
  if (target < array[middle]) {
    return binarySearchRecursive(array, target, startIndex, middle);
  }
};

// loop variation
const binarySearchLooped = (array, target) => {
  let start = 0;
  let end = array.length - 1;
  while (true) {
    if (start > end) return "Not found";
    const middle = Math.floor((start + end) / 2);
    if (array[middle] == target) return middle;
    if (array[middle] < target) {
      start = middle + 1;
    } else if (array[middle] > target) {
      end = middle;
    }
  }
};

// linear search for comparison
const linearSearch = (array, target) => {
  let i = 0;
  while (i < array.length) {
    if (array[i] == target) return i;
    i++;
  }
  return "Not found";
};

const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
describe("binary search", () => {
  test("recursive", () => {
    expect(binarySearchRecursive(array, 13)).toBe(13);
  });
  test("looped", () => {
    expect(binarySearchLooped(array, 13)).toBe(13);
  });
  test("linear", () => {
    expect(linearSearch(array, 13)).toBe(13);
  });
});
