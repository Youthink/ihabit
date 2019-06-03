import request, { extend } from "umi-request";
import { message } from "antd";

const ajax = extend({
  credentials: "include"
});

request.interceptors.response.use(async response => {
  const res = await response.clone().json();
  if (res && res.apiCode === 1000) {
    window.location = "http://fe.iday.top:4000/api/v1/auth/github";
  }

  if (res && res.apiMessage && !res.success) {
    return message.error(res.apiMessage);
  }

  return response;
});

export default ajax;
