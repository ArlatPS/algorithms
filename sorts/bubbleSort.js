// helper function for testing
function returnRandomArray(len) {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(Math.floor(Math.random() * 10000));
  }
  return arr;
}

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

// testing
const numsShort = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
const nums = returnRandomArray(1000);
console.log(bubbleSort(nums));
console.log(bubbleSort(numsShort));
