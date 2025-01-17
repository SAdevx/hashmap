import { HashMap } from "./hashmap.js";

const test = new HashMap();

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

console.log("Length: ", test.length()); 
console.log(test.entries());

test.set('frog', 'blue');
test.set('grape', 'indigo');
test.set('hat', 'purple');
test.set('ice cream', 'silver');
test.set('jacket', 'grey');
test.set('kite', 'yellow');
test.set('lion', 'brown');
test.set('moon', 'silver');
test.set('sun', 'red');

console.log(test.length()); 
console.log(test.entries());

console.log(test.get('jacket'));
console.log(test.get('hat'));
console.log(test.get('carrot'));
console.log(test.get('test'));

console.log(test.has('kite'));
console.log(test.has('grape'));
console.log(test.has('dog'));
console.log(test.has('monkey'));
console.log(test.has('elephant'));
console.log(test.entries());
console.log(test.length());

console.log(test.keys());
console.log(test.values());
console.log(test.remove('hat'));
console.log(test.remove('lion'));
console.log(test.remove('elephant'));
console.log(test.remove('banana'));
console.log(test.remove('ice cream'));
console.log(test.remove('dog'));
console.log(test.remove('kite'));
console.log(test.remove('moon'));
console.log(test.remove('sun'));
console.log(test.remove('jacket'));


test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('sun', 'red');

console.log(test.keys());
console.log(test.length());