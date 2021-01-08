
var t = {}

t.arr1 = {name:111}
t.arr2 = {name:222}
t.arr3 = {name:333}
t.arr4 = {name:444}

var print = console.log;


for (var i = 1; i <= 10; i++) {
  print(i)
}


var arr = [3, 5, 7];
arr.foo = "hello";
    
for (var i in arr) {
  print(111, i); // logs "0", "1", "2", "foo"
}
    
for (var i of arr) {
  print(222, i); // logs "3", "5", "7"
  // it doesn't log "3", "5", "7", "hello"
}


let pets = {
	cat: 1,
	dog: 2,
	master: 3
}
pets["species"] = "mammals";

for (let pet in pets) {
   print(333,pet); // "species"
}

// for (let pet of pets) {
//     print(444, pet); // "Cat", "Dog", "Hamster"
// }t

t = pets

for (let k in t) {
	print(k, t[k]);
}


arr = ["Cat", "Dog", "Hamster"];

for (let v of arr) {
	print(arr, v);
}


// t.map()

// print(999, k)


arr = ["Cat", "Dog", "Hamster"];
var t = arr.slice(Math.max(arr.length - 3, 1))

print(999, arr, t)

arr = ["Cat", "Dog", "Hamster"];
var t =  arr.slice(Math.max(arr.length - 3, 0))

print(999, arr, t)


print(arr.slice(-2))


function get_top10_from_2array(arr, arr2, count) {
	var len = arr.length
	if (len >= count) {
		return arr.slice(0-count);
	}

	var remain = count - len
	return arr.concat(arr2.slice(0-remain));
}

print(arr== arr.concat([]))
print(arr, arr.slice(0))
var arr = ["Cat", "Dog", "Hamster"];

arr2 = ["Cat22", "Do222g", "2222"];
print(get_top10_from_2array(arr, arr2, 10))


print(arr, arr.slice(0, 2))

    // bg.arr_session
    // var top10 = bg.last_arr_session.slice(0-last_session_cache_max);
    // top10.concat(bg.arr_session).slice(0-last_session_cache_max);