import axios from 'axios';

//Axiosの設定を共通化
export const axiosApi = axios.create({
  baseURL: 'http://localhost:80',
  //AxiosでAPIのリクエストするときにCookieを一緒に送る
  withCredentials: true,
});
