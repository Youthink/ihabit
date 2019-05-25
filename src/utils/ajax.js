import request, { extend } from 'umi-request';
import apiUrl              from '@/utils/apiUrl';

const ajax = extend({
  errorHandler: (error) => {
  }
});

request.interceptors.response.use(async (response) => {
  const data = await response.clone().json();
  if(data && data.apiCode === '1000') {
    window.location = apiUrl.githubAuthUrl;
  }
  return response;
})

export default ajax;
