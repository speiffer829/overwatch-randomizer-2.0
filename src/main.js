import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import {firestorePlugin} from 'vuefire'
// import firebase from 'firebase/app';
import 'firebase/firestore';
import { store } from './store';



Vue.config.productionTip = false;



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
