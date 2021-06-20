import Vue from 'vue';
import axios from 'axios';

const service = axios.create({
  timeout: 10000,
  baseURL: '/api',

});

service.interceptors.request.use();

Vue.prototype.$http = service;

export const http = service;
