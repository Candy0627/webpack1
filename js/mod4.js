

function kuaisu(arr) {
    if (arr.length <= 1) return arr;
  
    let index = Math.floor(arr.length / 2);
    let centerNum = arr.splice(index, 1)[0];
    let left = [];
    let right = [];
  
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] < centerNum) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
  
    return kuaisu(left).concat([centerNum], kuaisu(right));
  }
  
  console.log(kuaisu([11, 34, 3, 3434]));