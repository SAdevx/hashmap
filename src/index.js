import { HashMap } from "./hashmap.js";

const test = new HashMap();

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

console.log(test.length()); 

test.set('frog', 'me')
test.set('grape', 'me')
test.set('hat', 'me')
test.set('ice cream', 'me')
test.set('jacket', 'me')
test.set('kite', 'me')
test.set('lion', 'me')
test.set('moon', 'silver');

console.log(test.entries());
console.log("after",test.length()); 

console.log(test.keys());
test.clear();
console.log(test.entries());
