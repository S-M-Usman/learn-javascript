// console.log(2>1);
// console.log(2>=1);
// console.log(2<1);
// console.log(2<=1);
// console.log(2==1);
// console.log(2!=1);


// console.log("2" > 1);
// console.log("02" > 1);

// console.log(null > 0);
// console.log(null == 0);
// console.log(null >= 0);
/*
 The reason is that an equality check == and comparisons > < >= <= works differently
 Comparisions convert null to a number treating it as a 0.
 Thats why(3) null>=0 is true and null > 0 is false
 */
console.log(undefined ==0);
console.log(undefined > 0);
console.log(undefined < 0);

//===
console.log('2'==2);
console.log('2'===2);
