function getState(){
    let value = 42;
    return value;
}


let myValue = getState();

myValue;
myValue = 22 // this is just localy, will not affect the value inside the function
myValue


let myValueAgain = getState();
myValueAgain

// numbers, boolean are returned and passed by value --> means we get a copy of it
// arrays and strings ... by reference

console.log(23);


