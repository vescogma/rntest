
function returnPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('its happening');
      resolve('passed value');
    }, 2000);
  });
}

returnPromise();