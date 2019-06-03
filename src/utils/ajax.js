import request, { extend } from 'umi-request';
import apiUrl from '@/utils/apiUrl';
import { message } from 'antd';

const ajax = extend({
  credentials: 'include'
});

request.interceptors.response.use(async response => {
  const res = await response.clone().json();
  if (res && res.apiCode === 1000) {
    window.location = apiUrl.githubAuthUrl;
  }

  if (res && res.apiMessage && !res.success) {
    return message.error(res.apiMessage);
  }

  return response;
});

export default ajax;
