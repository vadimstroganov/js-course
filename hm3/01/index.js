function forEach(array, fn) {
    for(let i = 0; i < array.length; i++) {
        fn(array[i]);
    }
}

function filter(array, fn) {
    let result = [];
    let counter = 0;


    for(let i = 0; i < array.length; i++) {
        if (fn(array[i])) {
            result[counter] = array[i];
            counter++;
        }
    }

    return result;
}

function map(array, fn) {
    let result = [];

    for(let i = 0; i < array.length; i++) {
        result[i] = fn(array[i]);
    }

    return result;
}

function slice(array, begin, end) {
    let result = [];
    let counter = 0;

    if (begin == undefined && end == undefined) {
        result = array;
    } else if (begin == undefined) {
        result = array;
    } else if (typeof begin == 'number') {
        if (end == undefined) {
            end = array.length + 1;
        }

        for(let i = 0; i < array.length; i++) {
            if (i >= begin && i < end) {
                result[counter] = array[i];
                counter++;
            }
        }
    }

    return result;
}

function reduce(array, fn, initialValue) {
    let result = [];
    let counter = 0;
    let previousValue, currentValue, forRepeatCount;

    if (array == undefined && initialValue == undefined) {
        throw new Error('TypeError');
    }

    if (initialValue == undefined) {
        previousValue = array[counter];
        counter++;
    } else {
        previousValue = initialValue;
    }

    forRepeatCount = array.length - counter;

    for(let i = 0; i < forRepeatCount; i++) {
        currentValue = array[counter];

        if (counter >= i) {
            result = fn(previousValue, currentValue, counter, array);
            previousValue = result;
        }

        counter++;
    }

    return result;
}
