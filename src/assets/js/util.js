export const throttle = function (execute, delay = 200) {
  let timer = null;
  return function (...args) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      execute.apply(this, args);
    }, delay);
  };
};
