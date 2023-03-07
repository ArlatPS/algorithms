function quickSort(array) {
  // return for recursion
  if (array.length <= 1) {
    return array;
  }
  const pivot = array.pop();
  const left = [];
  const right = [];
  // distributing to arrays
  for (let element of array) {
    if (element < pivot) {
      left.push(element);
    } else {
      right.push(element);
    }
  }
  // call recursively on both sides
  return [...quickSort(left), pivot, ...quickSort(right)];
}

const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
test("quick sort", () => {
  expect(quickSort(nums)).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
