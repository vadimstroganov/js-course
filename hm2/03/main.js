function calculator(firstNumber) {
    
    function sum() {
        var sum_of_args = 0;

        for(i = 0; i < arguments.length; i++) {
            sum_of_args += arguments[i];
        }

        return firstNumber + sum_of_args;
    }

    function dif() {
        var sum_of_args = 0;

        for(i = 0; i < arguments.length; i++) {
            sum_of_args += arguments[i];
        }

        return firstNumber - sum_of_args;
    }

    function div() {
        var counter = 0;

        var result = div_result(firstNumber, arguments, counter, []);

        function div_result(result, arr, counter, results) {
            try {
                if (counter < arr.length) {
                    if (arr[counter] != 0) {
                        var new_result = result/arr[counter];
                        results.push(new_result);
                        div_result(new_result, arr, counter + 1, results);
                    } else {
                        throw new Error('Нельзя делить на 0!')
                    }
                }
            } catch(e) {
                console.log(e.message);
            }

            if (results.length == 1) {
                return results;
            } else {
                results.shift();
            }
        }

        return result;
    }

    function mul() {
        var counter = 0;

        var result = div_result(firstNumber, arguments, counter, []);

        function div_result(result, arr, counter, results) {
            if (counter < arr.length) {
                if (arr[counter] != 0) {
                    var new_result = result * arr[counter];
                    results.push(new_result);
                    div_result(new_result, arr, counter + 1, results);
                } else {
                    throw new Error('Нельзя делить на 0!')
                }
            }

            if (results.length == 1) {
                return results;
            } else {
                results.shift();
            }
        }

        return result;
    }
    
    return { sum: sum, dif: dif, div: div, mul: mul };
}
