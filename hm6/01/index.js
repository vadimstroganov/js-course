function timer(time) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve();
    }, time)
  });
}
