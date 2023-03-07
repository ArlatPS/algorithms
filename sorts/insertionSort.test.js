function returnRandomArray(len) {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(Math.floor(Math.random() * 10000));
  }
  return arr;
}

function insertionSort(nums) {
  // iterate over the array
  for (let i = 1; i < nums.length; i++) {
    // if current number is lower then previous - need to swap
    if (nums[i] < nums[i - 1]) {
      const toBeInserted = nums[i];
      // iterate over previous part of the array
      for (let j = i - 1; j >= 0; j--) {
        // if in right place
        if (nums[i] > nums[j]) {
          // splice wrong one
          nums.splice(i, 1);
          // insert in the right place
          nums = [...nums.slice(0, j + 1), toBeInserted, ...nums.splice(j + 1)];
          break;
          // if none is smaller it is the smallest
        } else if (j == 0) {
          nums.splice(i, 1);
          nums = [toBeInserted, ...nums.splice(j)];
        }
      }
    }
  }
  return nums;
}

//course version
function insertionSort2(nums) {
  for (let i = 1; i < nums.length; i++) {
    let numberToInsert = nums[i]; // the numberToInsert number we're looking to insert
    let j; // the inner counter

    // loop from the right to the left
    for (j = i - 1; nums[j] > numberToInsert && j >= 0; j--) {
      // move numbers to the right until we find where to insert
      nums[j + 1] = nums[j];
    }

    // do the insertion
    nums[j + 1] = numberToInsert;
  }
  return nums;
}

const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
describe("insertion sort", () => {
  test("first", () => {
    expect(insertionSort(nums)).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
  test("second", () => {
    const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
    insertionSort2(nums);
    expect(nums).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});
