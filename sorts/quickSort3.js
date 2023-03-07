function quickSort(array) {
  if (array.length <= 1) {
    return array;
  }
  const pivot = array.pop();
  const left = [];
  const right = [];
  for (let element of array) {
    if (element < pivot) {
      left.push(element);
    } else {
      right.push(element);
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}

function quickSort3(array) {
  if (array.length <= 1) {
    return array;
  }
  let pivot;
  const lastThree = array.splice(array.length - 3, 3);
  if (lastThree[2] >= lastThree[1] && lastThree[2] >= lastThree[0]) {
    pivot = lastThree[2];
    array.push(lastThree[0]);
    array.push(lastThree[1]);
  } else if (lastThree[1] >= lastThree[2] && lastThree[1] >= lastThree[0]) {
    pivot = lastThree[1];
    array.push(lastThree[0]);
    array.push(lastThree[2]);
  } else if (lastThree[0] >= lastThree[2] && lastThree[0] >= lastThree[1]) {
    pivot = lastThree[0];
    array.push(lastThree[1]);
    array.push(lastThree[2]);
  }
  const left = [];
  const right = [];
  for (let element of array) {
    if (element < pivot) {
      left.push(element);
    } else {
      right.push(element);
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}

// const input = [10, 8, 2, 1, 6, 3, 9, 4, 7, 5];
function randomArray(len) {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(Math.floor(Math.random() * 10000));
  }
  return arr;
}
const input = randomArray(10000);
let pre = Date.now();
console.log(quickSort(input));
let post = Date.now();
console.log(post - pre);

pre = Date.now();
console.log(quickSort3(input));
post = Date.now();

console.log(post - pre);
