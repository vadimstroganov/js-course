function isSomeTrue(source, filterFn) {
    try {
        if (source.length > 0) {
            // по умолчанию выставляем false
            var flag = false;

            // если хотябы для одного элемента массива
            // фильтрующая функция возвращает true,
            // присваиваем flag = true и прерываем цикл
            for(i = 0; i < source.length; i++) {
                var item = source[i];
                if (filterFn(item) == true) {
                    flag = true;
                    break;
                }
            }

            return flag;
        } else {
            throw new Error('Массив не должен быть пустым.')
        }
    } catch (e) {
        console.log(e.message);
    }
}

function isNumber(val) {
    return typeof val === 'number';
}
