// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import resource from 'vue-resource';
Vue.use(resource);
Vue.config.productionTip = false;
Vue.filter('formatDate', function (time) {
    let date = new Date(time);
    let dateYear = date.getFullYear();
    let dateMon = date.getMonth() + 1;
    let dateDay = date.getDate();
    let dateHour = date.getHours();
    let dateMin = date.getMinutes();
    if (dateHour < 10) {
        dateHour = '0' + dateHour;
    }
    if (dateMin < 10) {
        dateMin = '0' + dateMin;
    }
    let dateF = dateYear + '-' + dateMon + '-' + dateDay + '   ' + dateHour + ':' + dateMin;
    return dateF;
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router: router
});

