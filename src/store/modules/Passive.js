import * as firebase from 'firebase'

// initial state
const state = {
  items: []
}

// getters
const getters = {
}

// actions
const actions = {
  getLastProduct ({ commit }) {
    firebase.database().ref('inventario').orderByKey().limitToLast(1).once('value').then(data => {
      const items = []
      const datos = data.val()
      for (let key in datos) {
        items.push({
          idProducto: key,
          nombre: datos[key].nombre,
          precioCompra: datos[key].precioCompra
        })
      }
      firebase.database().ref('pasivo').push(items)
      // console.log(items)
    })
    .catch(error => {
      console.log(error)
    })
  }
}

// mutations
const mutations = {
}

export default {
  state,
  getters,
  actions,
  mutations
}
