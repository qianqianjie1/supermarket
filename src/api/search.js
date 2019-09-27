import axios from 'axios';
import jsonp from 'assets/js/jsonp';
import {TIMEOUT, jsonpOptions} from './config';

// 获取热门搜索数据
export const getHotSearch = () => {
  return axios.get('http://www.imooc.com/api/search/hot', {
    timeout: TIMEOUT
  }).then((res) => {
    res = res.data.hotKeyWord;
    if (res && res.owner) {
      return res.owner;
    }

    throw new Error('没有成功获取到数据哦~');
  }).catch(err => {
    if (err) {
      console.log(err);
    }
  }).then(res => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(res);
      }, 1000);
    });
  });
};

// 获取搜索结果
export const getResult = keyword => {
  const url = 'https://suggest.taobao.com/sug';
  const params = {
    q: keyword,
    code: 'utf-8',
    area: 'c2c',
    nick: '',
    sid: null
  };
  return jsonp(url, params, jsonpOptions).then(res => {
    if (res.result) {
      return res.result;
    }
    throw new Error('请求出现错误');
  }).catch(err => {
    console.log(err);
  }).then(res => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(res);
      }, 1000);
    });
  });
};
