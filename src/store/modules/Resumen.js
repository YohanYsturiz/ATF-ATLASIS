import * as firebase from 'firebase'
import * as moment from 'moment'
// initial state
const state = {
  items: [],
  itemsAyer: [],
  itemsWeekAgo: [],
  itemsMonthAgo: []
}

// getters
const getters = {
  allResumen: state => state.items,
  allResumenAyer: state => state.itemsAyer,
  allResumenWeekAgo: state => state.itemsWeekAgo,
  allResumenMonthAgo: state => state.itemsMonthAgo
}

// actions
const actions = {
  getResumen ({ commit }) {
    let fechaActual = moment().format('YYYY-MM-DD')
    // console.log(fechaActual)
    firebase.database().ref('venta').orderByChild('fechaVenta').equalTo(fechaActual).once('value').then(data => {
      const items = []
      const datos = data.val()

      for (let key in datos) {
        items.push({
          totalPagar: datos[key].totalPagar
        })
      }
      commit('showResumen', items)
      // console.log(items)
    })
    .catch(error => {
      console.log(error)
    })
  },
  getResumenAyer ({ commit }) {
    let fechaAyer = moment().subtract(1, 'days').format('YYYY-MM-DD')
    let fechaActual = moment().format('YYYY-MM-DD')
    // console.log(fechaActual)
    firebase.database().ref('venta').orderByChild('fechaVenta').startAt(fechaAyer).endAt(fechaActual).once('value').then(data => {
      const items = []
      const datos = data.val()

      for (let key in datos) {
        items.push({
          totalPagar: datos[key].totalPagar,
          fechaVenta: datos[key].fechaVenta
        })
      }
      commit('showResumenAyer', items)
      // console.log(items)
    })
      .catch(error => {
        console.log(error)
      })
  },
  getResumenWeekAgo ({ commit }) {
    let fechaWeekAgo = moment().subtract(7, 'days').format('YYYY-MM-DD')
    let fechaActual = moment().format('YYYY-MM-DD')
    // console.log(fechaActual)
    firebase.database().ref('venta').orderByChild('fechaVenta').startAt(fechaWeekAgo).endAt(fechaActual).once('value').then(data => {
      const items = []
      const datos = data.val()

      for (let key in datos) {
        items.push({
          totalPagar: datos[key].totalPagar,
          fechaVenta: datos[key].fechaVenta
        })
      }
      commit('showResumenWeekAgo', items)
      // console.log(items)
    })
      .catch(error => {
        console.log(error)
      })
  },
  getResumenMonthAgo ({ commit }) {
    let fechaMonthAgo = moment().subtract(1, 'months').format('YYYY-MM-DD')
    let fechaActual = moment().format('YYYY-MM-DD')
    // console.log(fechaMonthAgo)
    firebase.database().ref('venta').orderByChild('fechaVenta').startAt(fechaMonthAgo).endAt(fechaActual).once('value').then(data => {
      const items = []
      const datos = data.val()

      for (let key in datos) {
        items.push({
          totalPagar: datos[key].totalPagar,
          fechaVenta: datos[key].fechaVenta
        })
      }
      commit('showResumenMonthAgo', items)
      // console.log(items)
    })
      .catch(error => {
        console.log(error)
      })
  }
}

// mutations
const mutations = {
  showResumen (state, payload) {
    state.items = payload
  },
  showResumenAyer (state, payload) {
    state.itemsAyer = payload
  },
  showResumenWeekAgo (state, payload) {
    state.itemsWeekAgo = payload
  },
  showResumenMonthAgo (state, payload) {
    state.itemsMonthAgo = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
