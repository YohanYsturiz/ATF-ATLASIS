import * as firebase from 'firebase'

const state = {
  items: []
}

const getters = {
  allInventary: state => state.items
}

const actions = {
  addSale ({ commit }, payload) {
    const datos = {
      fechaVenta: payload.fechaVenta,
      nombreComprador: payload.nombreComprador,
      cedulaComprador: payload.cedulaComprador,
      selectedArticles: payload.selectedArticles,
      metodoPago: payload.metodoPago,
      totalPagar: payload.totalPagar
    }
    firebase.database().ref('venta').push(datos)
  },
  getInventary ({ commit }) {
    const node = 'inventario'
    firebase.database().ref(node).once('value').then(data => {
      const items = []
      const datos = data.val()
      for (let key in datos) {
        items.push({
          idArticulo: key,
          nombre: datos[key].nombre,
          cantidad: datos[key].cantidad,
          costoUnidad: datos[key].costoUnidad,
          precioReferencia: datos[key].precioReferencia,
          tipoProducto: datos[key].tipoProducto
        })
      }
      commit('showInventary', items)
      // console.log(items)
    })
    .catch(error => {
      console.log(error)
    })
  }
}

const mutations = {
  showInventary (state, payload) {
    state.items = payload
    // console.log(state.items)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
