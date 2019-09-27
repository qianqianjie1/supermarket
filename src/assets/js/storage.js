const storage = window.localStorage;

export default {
  set(key, val) {
    // 存时得是字符串
    if (val === undefined) {
      return;
    }
    storage.setItem(key, jsonToStr(val));
  },
  get(key, def) {
    // 取时得是JSON字符
    const val = strToJson(storage.getItem(key));
    return val === undefined ? def : val;
  },
  remove(key) {
    storage.removeItem(key);
  },
  clear() {
    storage.clear();
  }
};
function jsonToStr(val) {
  return JSON.stringify(val);
}
function strToJson(val) {
  if (typeof val !== 'string') {
    return undefined;
  }
  try {
    return JSON.parse(val);
  } catch (e) {
    return val || undefined;
  }
}
