let container = document.getElementById('container');

function sortAlphabetically(a, b) {
  a = a.toLowerCase();
  b = b.toLowerCase();

  return (a < b) ? -1 : (a > b) ? 1 : 0;
}

function appendCities(cities) {
  for(let city of cities) {
    let newChild = document.createElement('div');
    newChild.textContent = city.name;
    container.appendChild(newChild);
  }
}

function loadCities() {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
    xhr.send();
    xhr.addEventListener('load', function () {
      resolve(xhr.response);
    });
  });
}

loadCities().then(function (results) {
  let sortedCities = JSON.parse(results).sort(function(a, b) {
    return sortAlphabetically(a.name, b.name);
  });
  appendCities(sortedCities);
});
