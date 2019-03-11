import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueResource from 'vue-resource';

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App, VueAxios, axios, VueResource),
}).$mount('#app');
