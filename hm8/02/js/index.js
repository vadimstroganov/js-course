let container = document.getElementById('container');
let friends_list = document.getElementById('friends_list');

function sortBdate(a, b) {

  if (a == undefined && b == undefined) {
    return 0;
  } else if (a != undefined && b == undefined) {
    return -1;
  } else if (a == undefined && b != undefined) {
    return 1;
  } else {
    let [aDay, aMonth] = a.split('.');
    let [bDay, bMonth] = b.split('.');

    let aDate = new Date(0, aMonth, aDay), bDate = new Date(0, bMonth, bDay);

    console.log(`adate: ${aDate}`);
    console.log(`bdate: ${bDate}`);

    return (aDate < bDate) ? 1 : (aDate > bDate) ? -1 : 0;
  }

}

function setAge(array) {
  let results = [];

  for (item of array) {
    if (item.bdate) {
      let [day, month, year] = item.bdate.split('.');

      if (day && month && year) {
        let today = new Date();
        let bday = new Date(year, month, day);
        var diff = today.getTime() - bday.getTime();
        item.age =  Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
      } else {
        item.age = 'Неизвестно'
      }
    }
    results.push(item);
  }

  console.log(results);
  return results;
}

new Promise(function(resolve) {
  if (document.readyState === 'complete') {
    resolve();
  } else {
    window.onload = resolve;
  }
}).then(function () {
  return new Promise(function(resolve, reject) {
    VK.init({
      apiId: 5759103
    });

    VK.Auth.login(function(response) {
      if (response.session) {
        resolve(response);
      } else {
        reject(new Error('Не удалось авторизоваться'));
      }
    }, 2);
  });
}).then(function() {
  return new Promise(function(resolve, reject) {
    VK.api('friends.get', {'fields': 'photo_100, bdate'}, function(response) {

      if (response.error) {
        reject(new Error(response.error.error_msg));
      } else {

        let friends = setAge(response.response);
        friends.sort((a, b) => sortBdate(a.bdate, b.bdate));

        let source = document.getElementById('friends_list_tmpl').innerHTML;
        let templateFn = Handlebars.compile(source);
        let template = templateFn({friends: friends});

        friends_list.innerHTML = template;

        resolve();
      }

    });
  })
});
