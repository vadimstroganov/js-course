let container = document.getElementById('container');
let cityFilterInput = document.getElementById('city_filter');

function sortAlphabetically(a, b) {
  a = a.toLowerCase();
  b = b.toLowerCase();

  return (a < b) ? -1 : (a > b) ? 1 : 0;
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

  let source = document.getElementById('cities_list').innerHTML;
  let templateFn = Handlebars.compile(source);
  let template = templateFn({cities: sortedCities});

  container.innerHTML = template;
});

function searchCitiesFilter() {
  let val = cityFilterInput.value;

  let cities = document.getElementsByClassName('city-item');

  for (let city of cities) {

    if (city.textContent.toLocaleLowerCase().includes(val.toLocaleLowerCase())) {
      city.classList.remove('hide')
    } else {
      city.classList.add('hide')
    }

  }
}

cityFilterInput.addEventListener('keyup', searchCitiesFilter);
