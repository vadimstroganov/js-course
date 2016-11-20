var accordion_items = document.getElementsByClassName('accordion-item');
var accordion_container = document.querySelector('.accordion');

var RemoveActiveClass = function() {
    for (var i = 0; i < accordion_items.length; i++) {
        accordion_items[i].classList.remove('active');
    }
};

var switchTab = function(e) {
    if (e.target.classList.contains('accordion-item-title')) {
        RemoveActiveClass();
        e.target.parentNode.classList.add('active');
    }
};

accordion_container.addEventListener('click', switchTab);
