import axios from 'axios';
import {SUCC_CODE, TIMEOUT} from './config';

const CancelToken = axios.CancelToken;
let cancel;
export const getCategoryContent = (id) => {
  cancel && cancel('上一次请求取消了哦~');
  return axios.get(`http://www.imooc.com/api/category/content/${id}`, {
    timeout: TIMEOUT,
    cancelToken: new CancelToken(function executor(fun) {
      cancel = fun;
    })
  }).then(res => {
    if (res.data.code === SUCC_CODE) {
      return res.data.content;
    }

    throw new Error('没有请求成功哦~');
  }).catch(err => {
    if (axios.isCancel(err)) {
      console.log(err);
    } else {
      console.log(err);
    }
  });
};
