let createCookieForm   = document.getElementById('create_cookie_form');
let inputCookieName    = document.getElementById('cookie_name');
let inputCookieValue   = document.getElementById('cookie_value');
let inputCookieExpiry  = document.getElementById('cookie_expiry');
let createCookieButton = document.getElementById('create_cookie');

let tableBody = document.querySelector('#cookie_table tbody');

function initOldCookies() {
  let cookies = getCookies();
  for (cookie of cookies) {
    appendNewCookieToTable(cookie.name, cookie.value);
  }
}

function appendNewCookieToTable(name, value, expiry) {
  let tr = document.createElement('tr');
  tr.innerHTML = `
      <td>${name}</td>
      <td>${value}</td>
      <td>${expiry === undefined ? '?' : expiry}</td>
      <td><a class="delete-cookie-btn" href="#" data-cookie-name="${name}">Delete</a></td>
    `;
  tableBody.appendChild(tr);
}

function getExpiresDate(days) {
  const secondsInDay = 86400;
  return new Date(new Date().getTime() + days * secondsInDay * 1000);
}

function clearFormInputs(form) {
  let childNodes = form.childNodes;
  for (node of childNodes) {
    if (node.nodeType == 1) {
      node.value = null;
    }
  }
}

function getCookies(){
  var pairs = document.cookie.split(";");
  var cookies = [];
  for (var i = 0; i < pairs.length; i++){
    var pair = pairs[i].split("=");
    cookies[i] = {name: pair[0].replace(/\s+/g, ''), value: pair[1]}
  }
  return cookies;
}

function delete_cookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

createCookieButton.addEventListener('click', function (e) {
  e.preventDefault();

  console.log(inputCookieValue.value.emp);

  if (!inputCookieName.value || !inputCookieValue.value || !inputCookieExpiry.value) {
    alert('Все поля необходимо заполнить!');
    throw new Error('Все поля необходимо заполнить!');
  }

  let expireDate = getExpiresDate(inputCookieExpiry.value).toUTCString();

  document.cookie = inputCookieName.value + "=" + inputCookieValue.value + "; expires=" + expireDate;

  appendNewCookieToTable(inputCookieName.value, inputCookieValue.value, expireDate);
  clearFormInputs(createCookieForm);
});

tableBody.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete-cookie-btn')) {
    let cookie_name = e.target.getAttribute('data-cookie-name');
    delete_cookie(cookie_name);
    e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
  }
});

// add old cookie in table
initOldCookies();
