function xuanze(arr) {
  let temp = [];
 
  for (let i = 0; i < arr.length - 1; i++) {
    let max = arr[0];
    for (let j = 1; j < arr.length - i; j++) {
      if (max <= arr[j]) {
        max = arr[j];
      }
    }

    arr[arr.length - i - 1] = max;
  }
  return arr;
}

console.log(xuanze([1, 3, 4, 5, 12, 1]));
