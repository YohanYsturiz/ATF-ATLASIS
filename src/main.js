import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import VueFire from 'vuefire'
import store from '@/store/index.js'
import moment from 'moment'
import * as firebase from 'firebase'
import Chart from '@/components/Charts/statisticsChart.js'

Vue.use(VueFire)
Vue.use(moment)
Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.component('chart-statistic', Chart)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyAlGu2jVsYdilTTFI8o9TYs6oDGwiesYVI',
      authDomain: 'atreusfit.firebaseapp.com',
      databaseURL: 'https://atreusfit.firebaseio.com',
      projectId: 'atreusfit',
      storageBucket: 'atreusfit.appspot.com',
      messagingSenderId: '310643520107'
    })
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        console.log('estas logueado')
        this.autenticado = true
      } else {
        console.log('Ya no lo estas')
        this.$router.replace('Login')
      }
    })
  }
})
