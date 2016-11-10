function isAllTrue(source, filterFn) {
    try {
        if (source.length > 0) {
            // по умолчанию выставляем true
            var flag = true;

            // если хотябы для одного элемента массива
            // фильтрующая функция возвращает false,
            // присваиваем flag = false и прерываем цикл
            for(i = 0; i < source.length; i++) {
                var item = source[i];
                if (filterFn(item) == false) {
                    flag = false;
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
