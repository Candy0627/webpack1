

 const NUM = 5, ARRNUM = [1,2,2,2,4, 4, 5, 6, 7, 8, 8, 9, 10];
 const cur = function (num, arr) {
     let len = Math.floor(arr.length / 2);
     let arrNum = arr[len];
     if (arrNum < num) {
         return cur(num, arr.slice(len));
     } else if (arrNum > num) {
         return cur(num, arr.slice(0, len));
     } else {
         return len;
     }
 };

 console.log(cur(NUM, ARRNUM));


 function dg(n) {
     if (n <= 1) {
         return n;
     } else {
         return dg(n - 1) * n;
     }
 }

 console.log(dg(3));