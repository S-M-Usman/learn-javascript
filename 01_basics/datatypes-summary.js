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
console.log(typeof heros);

//+++++++++++++++++++++++++++++++++++++++++++

//Stack (primitive) ,Heap(non-primitive)
let myYoutubeName = 'hiteshchaudharydotcom'

let anotherName = myYoutubeName
anotherName = "chaiaurcode"
console.log(myYoutubeName);
console.log(anotherName);

let user1 ={
   email : "user@google.com",
   upi : "user@ubl"
}
let user2 = user1
user2.email = "usman@microsoft.com"
console.log(user1.email);
console.log(user2.email);
