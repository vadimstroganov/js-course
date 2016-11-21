let btn = document.querySelector('.div-creator-btn');
let container = document.querySelector('.container');

function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

let createDiv = function () {
    let newDiv = document.createElement('div');

    newDiv.style.width = `${randomInteger(10, 200)}px`;
    newDiv.style.height = `${randomInteger(10, 200)}px`;
    newDiv.style.background = getRandomColor();
    newDiv.style.position = 'absolute';
    newDiv.style.left = `${randomInteger(10,1000)}px`;
    newDiv.style.top = `${randomInteger(10,1000)}px`;
    newDiv.onmousedown = move;

    container.appendChild(newDiv);
};

let move = function (e) {
    moveAt(e);
    container.appendChild(e.target);

    function moveAt(e) {
        e.target.style.left = e.pageX - e.target.offsetWidth  / 2 + 'px';
        e.target.style.top  = e.pageY - e.target.offsetHeight / 2 + 'px';
    }

    document.onmousemove = function(e) {
        moveAt(e);
    };

    e.target.onmouseup = function() {
        document.onmousemove = null;
        e.target.onmouseup = null;
    };
};

btn.addEventListener('click', createDiv);
