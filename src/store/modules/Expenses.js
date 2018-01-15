import Api from '@/api'
import * as firebase from 'firebase'

// initial state
const state = {
  items: []
}

// getters
const getters = {
  allExpenses: state => state.items
}

// actions
const actions = {
  addExpenses ({ commit }, payload) {
    // console.log(payload)
    const node = 'gasto'
    const expenses = {
      tipoGasto: payload.tipoGasto,
      subClasificacion: payload.subClasificacion,
      cantidad: payload.cantidad,
      acreedorPago: payload.acreedorPago,
      fechaPago: payload.fechaPago,
      descripcion: payload.descripcion
    }
    Api.addData(expenses, node)
  },
  getExpenses ({ commit }) {
    const node = 'gasto'
    firebase.database().ref(node).once('value').then(data => {
      const items = []
      const datos = data.val()
      for (let key in datos) {
        items.push({
          tipoGasto: datos[key].tipoGasto,
          subClasificacion: datos[key].subClasificacion,
          cantidad: datos[key].cantidad,
          acreedorPago: datos[key].acreedorPago,
          fechaPago: datos[key].fechaPago,
          descripcion: datos[key].descripcion

        })
      }
      commit('showExpenses', items)
      console.log(items)
    })
    .catch(error => {
      console.log(error)
    })
    /* payload = Api.getData(node)
    console.log(payload) */
    // console.log(data)
    // const data = Api.getData(node)
  }
}

// mutations
const mutations = {
  showExpenses (state, payload) {
    state.items = payload
    console.log(state.items)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
