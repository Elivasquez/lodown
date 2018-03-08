'use strict';

// YOU KNOW WHAT TO DO //

/**
 * each: Designed to loop over a collection, Array or Object, and applies the 
 * action Function to each value in the collection.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} action: The Function to be applied to each value in the 
 * collection
 */
function each(collection, action) {
    if(Array.isArray(collection)) {
        for(var i = 0; i < collection.length; i++) {
            action(collection[i], i, collection);
        }
    } else {
        for (var key in collection) {
            action(collection[key], key, collection);
        }
    }
}
module.exports.each = each;


/**
 * identity: Is designed to take anything and return it
 * @param {Anything} anything; Whatever is going to be returned
 */
  function identity(anything) {
    return anything;
};
module.exports.identity = identity; 

/**
 * typeOf: Is designed to return the type of whatever is passed through it as a string.
 * @param {Anything} anything: the type of anything to be returned as a string
 * @return the type of anything in string value
 */
 function typeOf(anything) {
    if(typeof anything === 'string') return 'string';
    if(Array.isArray(anything) === true) return 'array';
    if(anything === null) return 'null';
    if(typeof anything === 'object') return 'object';
    if(typeof anything === 'undefined') return 'undefined';
    if(typeof anything === 'number') return 'number';
    if(typeof anything === 'boolean') return 'boolean';
    if(typeof anything === 'function') return 'function';
};
module.exports.typeOf = typeOf;

/**
 * first: Is designed to return an array of the first items up to a number in the input array, 
 * otherwise if the input array is not an array then return an empty array, and lastly
 * if number is not given or is not a number return the first input of the input array.
 * @param {Array} collection: The array in which to iterate over and get first values up to number
 * @param {Number} number: The value in which to iterate up to
 * @return: An array consisting of the first elements from the input array up to the value of number
 */
 function first(array, number) {
    var firstItems = [];
    for(var i = 0; i < number ; i++) {
        firstItems.push(array[i]);
    }
    if(Array.isArray(array) === false || number < 0) {
        return [];
    }
    else if(isNaN(number) || number === undefined) {
        return array[0];
    }
    else if(number > array.length) {
        return array;
    }
    return firstItems;
};
module.exports.first = first;

/**
 * last: Designed to return an array filled with the last items from the input array up to the value of number.
 * If input array is not an array then return an empty array. If number is not given or not a number then return
 * the last element of an array.
 * @param {Array} collection: The type of collection in which to get the last items out of
 * @param {Number} number: The number of last items to grab from the array
 * @return: An array filled with the last items of the input array up to the value of number
 */
 function last(array, number) {
    var lastItems = [];
    for(var i = number; i > 0; i--) {
        lastItems.unshift(array[i]);
    }
    if(Array.isArray(array) === false || number < 0) {
        return [];
    }
    else if(number > array.length) {
        return array;
    }
    else if(isNaN(number) || number === undefined) {
        return array[array.length - 1];
    }
    return lastItems;
};
module.exports.last = last;

/**
 * indexOf: Is designed to return the index of a value in array at the first occurence of the value.
 * If the value is not there it will return -1
 * @param {Array} collection: The array used to look inside and return the position of value if its there
 * @param {Value} value: The value that is being searched for
 * @return: The position of value inside array or -1 if the value is not inside the array.
 */
 function indexOf(array, value) {
    for(var i = 0; i < array.length; i++) {
      if(array[i] === value) {
        return i;
    }  
   
    }
    return -1;
}
module.exports.indexOf = indexOf;

/**
 * filter: Designed to iterate over an array and call a function for each element in an array
 * and return an array filled with all the elements that passed the test
 * @param {Array} collection: The collection to run the test on
 * @param {func} test: Test to determine the truthyness of all elements in an array
 * @return: An array filled with all the elements that resulted to true
 */
 function filter(array, func) {
    var filtered = [];
    each(array, function(element, position, collection) {
      if(func(element, position, collection)) filtered.push(element);  
    });
    return filtered;
};
module.exports.filter = filter;

/**
 * reject: Designed to iterate over an array and pass a function on all elements inside the array
 * and return an array filled with all elements that resulted in a falsey manner.
 * @param {Array} collection: The collection in which to pass the test on
 * @param {func} test: The test to determine the falsey nature of the elements in the array
 * @return: An array filled with all the values that resulted to false
 */
 function reject(array, func) {
    return filter(array, function(element, i, collection) {
        return !func(element, i, collection);
    })
};
module.exports.reject = reject;

/**
 * partition: Designed to call a function on each element in an array to determine which values are falsey 
 * in nature and which values are truthy in nature. Then return an array filled with 2 sub arrays, one that is filled
 * with the truthy values, and the other filled with falsey values.
 * @param {Array} collection: The collection in which pass the test function on
 * @param {func} test: The test in which to evaluate the array's elements to truthy or falsey
 * @return: An array containing 2 sub arrays filled with truthy and falsey values
 */
 function partition(array, func) {
    return [filter(array, func), reject(array, func)];
}
module.exports.partition = partition;

/**
 * unique: Designed to take an array and return a new array with all the duplicates taken out
 * off the input array.
 * @param {Array} array: The array to take unique elements from
 * @return: An array filled with all the unique elements from the input array
 */
 function unique(array) {
    var uniqueArr = [];
    for(var i = 0; i < array.length; i++) {
        if(indexOf(uniqueArr, array[i]) === -1) {
            uniqueArr.push(array[i]);
        }
    }
    return uniqueArr;
}
module.exports.unique = unique;

/**
 * map: Designed to take an array or object and pass function on each element/value in the array/object
 * that takes the arguments of element, index, collection or value, key, collection for objects.
 * Save the return value of each function call in a new array and then return that array.
 * @param {Array, Object} collection: The collection in which to pass the function on
 * @param {function} func: The function in which to use on all elements/values and get a new return value
 * @return: An array filled with all the new values from each function call
 */
 function map(collection, func) {
    var mapArr = [];
    each(collection, function(element, position, collection) {
        mapArr.push(func(element, position, collection));
    })
    return mapArr;
}
module.exports.map = map;

/**
 * pluck: Designed to take an array filled with objects and return an array filled with
 * the properties of the objects inside the array
 * @param {Array} array: The array of objects to pass the function on
 * @param {Value} property: The key from which to get the property from
 * @return: an array filled with the values that were taken from the object[property]
 */
 function pluck(array, property) {
    return map(array, function(obj, pos, array) {
        return obj[property];
    });
}
module.exports.pluck = pluck;

/**
 * contains: Designed to take an array and a value and return true if the value is inside the array, or 
 * return false if the value is not inside the array.
 * @param {Array} array: The array to search inside
 * @param {Value} value: The value to search for
 * @return: True if the value is inside the array, or false if the value is not inside the array
 */
 function contains(array, value) {
    if(indexOf(array, value) > -1) {
        return true;
    }
    else if(value === false) {
        return false;
    }
    else {
        return false;
    }
}
module.exports.contains = contains;

/**
 * every: Designed to take a collection object/array and then call a function for 
 * every element inside the collection calling the parameters of current element, its index, collection
 * for an array and value, key, and collection. If even one returns false return false otherwise return true.
 * @param {Array, Object} collection: The collection to pass the truthy falsey test over
 * @param {function} test: The test to determine truthy or falsey for the elements of the collection
 * @return: true if all the elements result to true or false if even one of the values results to false
 */
 function every(collection, func) {
    if(func === undefined) {
        for(var i = 0; i < collection.length; i++) {
            if(collection[i]) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    if(typeOf(collection) === 'array') {
        for(var i = 0; i < collection.length; i++) {
            if(!func(collection[i], i, collection)) {
                return false;
            }
        }    
    }
    else if(typeOf(collection) === 'object') {
        for(var keys in collection) {
            if(!func(collection[keys], keys, collection)) {
                return false;
            }
        }
    }
    return true;
    
}
module.exports.every = every;

/**
 * some: Designed to take a collection object/array and then call a function for 
 * every element inside the collection calling the parameters of current element, its index, collection
 * for an array and value, key, and collection. If even one returns true return true otherwise return false.
 * @param {Array, Object} collection: The collection to pass the truthy falsey test over
 * @param {function} test: The test to determine truthy or falsey for the elements of the collection
 * @return: false if all the elements result to false or true if even one of the values results to true
 */
 function some(collection, func) {
      if(func === undefined) {
        for(var i = 0; i < collection.length; i++) {
            if(collection[i]) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    if(typeOf(collection) === 'array') {
        for(i = 0; i < collection.length; i++) {
            if(func(collection[i], i, collection)) {
                return true;
            }
        }    
    }
    else if(typeOf(collection) === 'object') {
        for(var keys in collection) {
            if(func(collection[keys], keys, collection)) {
                return true;
            }
        }
    }
    return false;
}
module.exports.some = some;

/**
 * reduce: Designed to take an array, a function, and seed. Calls the function or every element 
 * inside the array and uses the return value of the function {previousResult} as the starting point
 * for the next iteration. For the first iteration it will use seed as the starting point and if no seed was 
 * given then the first value of the array becomes the seed. Returns the value of the final function call.
 * @param {Array} array: The array in which to reduce the elements into one value
 * @param {function} func: The function to call on all the elements inside the array
 * @param {seed} seed: The value to start at on the very first iteration
 * @return: The final result of the last function call
 */
 function reduce(array, func, seed) {
    var previousSum = seed;
    var i = 0;
    if(seed === undefined) {
        previousSum = array[0];
        i = 1;
    }
    for(; i < array.length; i++) {
        previousSum = func(previousSum, array[i], i);
    }
    return previousSum;
 }
 module.exports.reduce = reduce;
 
 /**
  * extend: Is designed to take a first object and copy values from a second object into the first object.
  * It will also take more objects after the second object and also copy their values into object 1 in the order
  * they were passed in.
  * @param {object} object1: The object to receive all the copied values
  * @param {object} object2: The object to copy values from
  * @param {object} objects: Any extra objects to copy values from
  * @return the first object with all copied values
  */
  function extend(object1, object2, objects) {
  each(object2, function(keyval, key, collection) {
      object1[key] = keyval;
  });
  map(...objects, function(keyval, key, collection) {
      object1[key] = keyval
});
}
module.exports.extend = extend;