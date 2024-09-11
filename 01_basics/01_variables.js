const accountId = 144553
let accountEmail = 'hitesh@google.com'
var accountPassword = "12345"
accountCity = 'Lahore'

// accountId = 2 //not allowed
console.log(accountId);
accountEmail = 'hc@hc.com'
accountPassword = '212121'
accountCity = 'Islamabad'
let accountState;
/*
    prefer not to use var because of issue in block scope and functional scope
*/

console.table([accountId,accountEmail,accountPassword,accountCity,accountState])
