import * as firebase from 'firebase'

const state = {
  items: []
}

const getters = {
  showAllProducts: state => state.items
}

const actions = {
  addProduct ({ commit }, payload) {
    let product = {
      nombre: payload.nombre,
      cantidad: payload.cantidad,
      precioCompra: payload.precioCompra,
      costoUnidad: payload.costoUnidad,
      proveedor: payload.proveedor,
      precioReferencia: payload.precioReferencia,
      fechaCompra: payload.fechaCompra,
      tipoProducto: payload.tipoProducto,
      historicoPrecio: payload.historicoPrecio,
      descripcion: payload.descripcion
    }
    firebase.database().ref('inventario').push(product)
  },
  updateProduct ({ commit }, payload) {
    // console.log(payload)
    let items
    payload.map((product) => {
      items = {
        cantidad: product.cantidad,
        key: product.idArticulo
      }
      console.log(items)
      firebase.database().ref('inventario').child(items.key).update({cantidad: items.cantidad})
    })
    // firebase.database().ref('inventario/cantidad').push(items)
  },
  getAllProducts ({ commit }) {
    firebase.database().ref('inventario').once('value').then(data => {
      const items = []
      const datos = data.val()
      for (let key in datos) {
        items.push({
          id: key,
          nombre: datos[key].nombre,
          cantidad: datos[key].cantidad,
          precioCompra: datos[key].precioCompra,
          costoUnidad: datos[key].costoUnidad,
          proveedor: datos[key].proveedor,
          precioReferencia: datos[key].precioReferencia,
          fechaCompra: datos[key].fechaCompra,
          tipoProducto: datos[key].tipoProducto,
          descripcion: datos[key].descripcion
        })
      }
      commit('pushPrducts', items)
    })
  }
}

const mutations = {
  pushPrducts (state, payload) {
    state.items = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
