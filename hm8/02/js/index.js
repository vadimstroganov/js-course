let container = document.getElementById('container');
let friends_list = document.getElementById('friends_list');

function sortDatesByincrease(a, b, reverse) {

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

    if (aDate < bDate) {
      return reverse ? -1 : 1
    } else if (aDate > bDate) {
      return reverse ? 1 : -1
    } else {
      return 0;
    }
  }

}

function sortByClosest(users, currentDate) {
  var before = [];
  var after = [];
  var undef = [];

  // текущая дата
  currentDate = new Date(0, currentDate.getMonth(), currentDate.getDate());

  var max = users.length;
  for(var i = 0; i < max; i++) {

    if (users[i].bdate == undefined) {
      undef.push(users[i]);
    } else {
      // формируем дату рождения пользователя в объект Date
      let [day, month] = users[i].bdate.split('.');
      let arrDate = new Date(0, month - 1, day);

      // сравнивать даты будем в днях
      let diff = (arrDate - currentDate) / (3600 * 24 * 1000);

      if(diff > 0) {
        before.push(users[i]);
      } else {
        after.push(users[i]);
      }
    }
  }

  before.sort((a, b) => sortDatesByincrease(a.bdate, b.bdate, true));
  after.sort((a, b) => sortDatesByincrease(a.bdate, b.bdate, true));

  return before.concat(after).concat(undef);
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
        let currentDate = new Date();

        friends = sortByClosest(friends, currentDate);

        let source = document.getElementById('friends_list_tmpl').innerHTML;
        let templateFn = Handlebars.compile(source);
        let template = templateFn({friends: friends});

        friends_list.innerHTML = template;

        resolve();
      }

    });
  })
});
