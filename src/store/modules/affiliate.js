import * as firebase from 'firebase'

const state = {
  items: []
}

const getters = {
  searchData: state => state.items
}
// Acá estan las acciones a realizar
const actions = {
  // Funcion que me permite registrar al nuevo afiliado
  addAffiliate ({ commit }, payload) {
    let register = {
      nombre: payload.nombre,
      cedula: payload.cedula,
      tipoPlan: payload.tipoPlan,
      direccion: payload.direccion,
      fechaNacimiento: payload.fechaNacimiento
    }
    firebase.database().ref('afiliado').push(register)
  },
  // Funcion que me permite la modificacion del afiliado
  updateProduct ({ commit }, payload) {
    let items
    payload.map((register) => {
      items = {
        cantidad: register.cantidad,
        key: register.idArticulo
      }
      console.log(items)
      firebase.database().ref('inventario').child(items.key).update({cantidad: items.cantidad})
    })
  },
  // Funcion para mostrar todos los afiliados
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
      commit('pushSearch', items)
    })
  },
  searchAffiliate ({ commit }, payload) {
    console.log('Valores recibidos: ' + payload.cedula)
    firebase.database().ref('afiliado').orderByChild('cedula').equalTo(payload.cedula).on('child_added', data => {
      const items = []
      const datos = data.val()
      console.log(datos)
      // for (let key in datos) {
      items.push({
        nombre: datos.nombre,
        cedula: datos.cedula,
        tipoPlan: datos.tipoPlan,
        fechaNacimiento: datos.fechaNacimiento
      })
      // }
      console.log('valores consultados = ' + items)
      commit('pushSearch', items)
    })
  }
}

const mutations = {
  pushSearch (state, payload) {
    state.items = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
