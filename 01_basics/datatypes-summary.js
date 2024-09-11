// Primitve
/* 7 types :
   String, 
   Number,
   Boolean,
   null,
   undefined,
   Symbol,
   BigInt
*/

const score = 100
const scoreValue = 100.1

const isLoggedIn = false
const outsideTemperature = null
let userEmail;

const id = Symbol('123')
const anotherId = Symbol('123')
// console.log(id === anotherId);

const bigNumber = 345667777777727266n

// Refrence(Non primitve) Type

//Array,Objects,Functions
const heros = ['ironman','captain-america','hulk']
let myObj = {
   name :'usman',
   age : 22,
}
const myFunction = function(){
   console.log('Hello world');
}

console.log(typeof bigNumber);
console.log(typeof outsideTemperature);
console.log(typeof isLoggedIn);
console.log(typeof scoreValue);
console.log(typeof myFunction);
console.log(typeof myObj);

