// helper function for merging
function merge(arr1, arr2) {
  let sorted = [];
  while (true) {
    // if both arrays done, return
    if (arr1.length == 0 && arr2.length == 0) {
      return sorted;
    }
    // if array 1 done, just concat rest of 2
    if (arr1.length == 0) {
      sorted = [...sorted, ...arr2];
      arr2 = [];
      // if array 2 done, just concat rest of 1
    } else if (arr2.length == 0) {
      sorted = [...sorted, ...arr1];
      arr1 = [];
    } else {
      // compare from which array next element
      if (arr1[0] < arr2[0]) {
        sorted.push(arr1[0]);
        arr1.shift();
      } else {
        sorted.push(arr2[0]);
        arr2.shift();
      }
    }
  }
}

function mergeSort(nums) {
  if (nums.length <= 1) {
    return nums;
  }
  // divide array into two and recursively call on both parts and then merge them
  const middle = Math.floor(nums.length / 2);
  return merge(mergeSort(nums.slice(0, middle)), mergeSort(nums.slice(middle)));
}

const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
test("merge sort", () => {
  expect(mergeSort(nums)).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
