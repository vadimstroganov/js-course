let friends_nosort = document.getElementById('friends_nosort');
let friends_sort   = document.getElementById('friends_sort');

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
    VK.api('friends.get', {'fields': 'photo_100'}, function(response) {

      if (response.error) {
        reject(new Error(response.error.error_msg));
      } else {

        let friends = response.response;

        let source = document.getElementById('friends_tmpl').innerHTML;
        let templateFn = Handlebars.compile(source);
        let template = templateFn({friends: friends});

        friends_nosort.innerHTML = template;

        // перенос друзей, которых уже заносили в список
        let friend_ids = localStorage.getItem('friend_ids');
        if (friend_ids) {
          friend_ids = friend_ids.split(',');

          var emulateClickEvent = new Event('click');

          for (item of friends_nosort.querySelectorAll('.item')) {
            if (friend_ids.includes(item.dataset.userId)) {
              item.remove();
              //noinspection JSAnnotator
              item.querySelector('.transfer-btn i').classList = 'fa fa-times';
              friends_sort.appendChild(item);
            }
          }
        }

        resolve();
      }

    });
  })
}).then(function () {
  // вешаем обработчик клика на кнопку "add"
  friends_nosort.addEventListener('click', function (e) {
    e.preventDefault();

    if (e.target.nodeName == 'I') {
      let link = e.target.parentNode;
      let item = link.closest('.item');
      item.remove();
      e.target.classList = 'fa fa-times';
      friends_sort.appendChild(item);
    }
  });

  // вешаем обработчик клика на кнопку "remove"
  friends_sort.addEventListener('click', function (e) {
    e.preventDefault();

    if (e.target.nodeName == 'I') {
      let link = e.target.parentNode;
      let item = link.closest('.item');
      item.remove();
      e.target.classList = 'fa fa-plus';
      friends_nosort.appendChild(item);
    }
  });

  // поиск по неотсортированным друзьям
  let filterInNosort = document.getElementById('filter_in_nosort');
  filterInNosort.addEventListener('keyup', function () {
    for (let item of document.querySelectorAll('#friends_nosort .item')) {
      if (item.querySelector('.fio').textContent.toLocaleLowerCase().includes(filterInNosort.value)) {
        item.classList.remove('hide');
      } else {
        item.classList.add('hide');
      }
    }
  });

  // поиск по отсортированным друзьям
  let filterInSort = document.getElementById('filter_in_sort');
  filterInSort.addEventListener('keyup', function () {
    for (let item of document.querySelectorAll('#friends_sort .item')) {
      if (item.querySelector('.fio').textContent.toLocaleLowerCase().includes(filterInSort.value)) {
        item.classList.remove('hide');
      } else {
        item.classList.add('hide');
      }
    }
  });

  // кнопка 'сохранить'
  let saveResultsBtn = document.getElementById('save_results');
  saveResultsBtn.addEventListener('click', function (e) {
    e.preventDefault();

    let friends = friends_sort.querySelectorAll('.item');
    let friend_ids = [];

    for (let item of friends) {
      friend_ids.push(item.dataset.userId);
    }

    localStorage.setItem('friend_ids', friend_ids);
  });
}).catch(function(e) {
  alert(`Ошибка: ${e.message}`);
});
