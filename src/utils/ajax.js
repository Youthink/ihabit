import request, { extend } from 'umi-request';
import apiUrl              from '@/utils/apiUrl';

const ajax = extend({
  credentials: 'include',
  errorHandler: (error) => {
  }
});

request.interceptors.response.use(async (response) => {
  const data = await response.clone().json();
  if(data && data.apiCode === '1000') {
    console.log('需要登录');
  }
  return response;
})

export default ajax;
