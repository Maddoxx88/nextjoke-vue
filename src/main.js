import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import shareIt from 'vue-share-it';

Vue.config.productionTip = false

Vue.use(shareIt);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
