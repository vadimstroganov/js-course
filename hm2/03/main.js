function calculator(firstNumber) {

    function sum() {
        var sum_of_args = 0;

        for(var i = 0; i < arguments.length; i++) {
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

    function div(){
            var sumRes = firstNumber;

            for (var i = 0; i < arguments.length; i++){

                if (!arguments[i]) {
                    throw new Error('На ноль делить нельзя!');
                }

                sumRes /= arguments[i];
            }

            return sumRes;
    }

    function mul(){
        sumRes = firstNumber;

        for (var i = 0; i < arguments.length; i++){
            sumRes *= arguments[i];
        }

        return sumRes;
    }

    return { sum: sum, dif: dif, div: div, mul: mul };
}


var myCalculator = calculator(100);


var allNumbers = [1, 2, 4, 5, 6, 7, 8],

    someNumbers = [1, 2, 'привет', 4, 5, 'loftschool', 6, 7, 8],

    noNumbers = ['это', 'массив', 'без', 'чисел'];

console.log(myCalculator.div(2, 2)); //вернет 25
