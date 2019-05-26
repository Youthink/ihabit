import request, { extend } from 'umi-request';
import { message }         from 'antd';
import apiUrl              from '@/utils/apiUrl';

const ajax = extend({
  credentials: 'include',
  errorHandler: (error) => {
  }
});

request.interceptors.response.use(async (response) => {
  const res = await response.clone().json();
  if(res && res.apiCode === '1000') {
    console.log('需要登录');
  }

  if(res && res.apiMessage && !res.success) {
    return message.error(data.apiMessage);
  }

  return response;
})

export default ajax;
