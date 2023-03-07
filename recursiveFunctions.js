function fibonacci(n) {
  if (n == 2 || n == 1) {
    return 1;
  } else if (n <= 0) {
    return 0;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

for (let i = 1; i <= 40; i++) {
  console.log(`${i} is ${fibonacci(i)}`);
}

function nestedAdd(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    if (typeof array[i] === "number") {
      sum += array[i];
    } else {
      sum += nestedAdd(array[i]);
    }
  }
  return sum;
}

console.log(nestedAdd([1, 2, 3]));
console.log(nestedAdd([1, [2], 3]));
console.log(nestedAdd([[[[[[[[[5]]]]]]]]]));
console.log(nestedAdd([10, [12, 14, [1], [16, [20]]], 10, 11]));

function factorial(num) {
  if (num <= 1) {
    return 1;
  }
  return num * factorial(num - 1);
}

console.log(factorial(5));
