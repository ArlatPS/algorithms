function bubbleSort(nums) {
  let finished = false;
  for (let i = 0; i < nums.length; i++) {
    finished = true;
    for (let j = 0; j < nums.length - 1 - i; j++) {
      if (nums[j] > nums[j + 1]) {
        const hold = nums[j];
        nums[j] = nums[j + 1];
        nums[j + 1] = hold;
        finished = false;
      }
    }
    if (finished) break;
  }
  return nums;
}

// testing
const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
test("bubble sort", () => {
  expect(bubbleSort(nums)).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
