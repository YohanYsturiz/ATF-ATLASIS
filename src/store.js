/* import Vue from 'vue'
import Vuex from 'vuex'
// import {expensesRef} from '@/assets/dbAtreusFit.js'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    datos: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
      datasets: [{
        label: 'Ingresos',
        data: [],
        borderColor: '#204A87',
        fill: false,
        tension: 0
      }]
    }
  },
  mutations: {
    cargarDatos (state, payload) {
      state.datos.datasets[0].data = payload
      // state.datos.datasets[0].data = 3000
      // console.log(state.datos.datasets[0].data)
    }
  },
  actions: {
    evaluarDatos ({commit}, payload) {
      console.log('Esta es la funcion' + payload.desde + payload.hasta)
      let query = firebase.database().ref('gasto')
      query.orderByChild('fechaPago').startAt(payload.desde).endAt(payload.hasta).once('value')
      .then((data) => {
        console.log(data.val())
        const datos = []
        const obj = data.val()
        for (let key in obj) {
          datos.push(parseInt(obj[key].cantidad))
        }
        commit('cargarDatos', datos)
      })
      .catch((error) => {
        console.log(error)
      })
    }
  },
  getters: {
    valores (state) {
      return state.datos
    }
  }
})
*/
