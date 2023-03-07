function bubbleSort(nums) {
  let finished = false;
  for (let i = 0; i < nums.length; i++) {
    if (!finished) {
      finished = true;
      for (let j = 0; j < nums.length - 1 - i; j++) {
        if (nums[j] > nums[j + 1]) {
          const hold = nums[j];
          nums[j] = nums[j + 1];
          nums[j + 1] = hold;
          finished = false;
        }
      }
    } else {
      break;
    }
  }
  return nums;
}

test("bubble sort", () => {
  expect(bubbleSort(numsShort)).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
