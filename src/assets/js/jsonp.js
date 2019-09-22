import jsonp from 'jsonp';
const formatData = param => {
  let arr = [];
  for (let key in param) {
    arr.push([key, param[key]]);
  }
  return arr.map(value => {
    return value.join('=');
  }).join('&');
};

export default (url, data, options) => {
  let add = url.indexOf('?') < 0 ? '?' : '&';
  url += add + formatData(data);

  return new Promise((resolve, reject) => {
    jsonp(url, options, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
