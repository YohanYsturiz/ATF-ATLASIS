import * as firebase from 'firebase'

// initial state
const state = {
  items: [],
  user: null,
  loading: false,
  authError: null,
  error: null
}

// getters
const getters = {
  AuthSigIn: state => state.items,
  loading (state) {
    return state.loading
  },
  error (state) {
    return state.error
  }
}

// actions
const actions = {
  signIn ({ commit }, payload) {
    commit('setLoading', true)
    commit('clearError')
    const email = payload.email
    const pass = payload.pass
    const auth = firebase.auth()
    // sign in
    const promise = auth.signInWithEmailAndPassword(email, pass)
    promise.catch(e => console.log(e.message))
    auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        commit('setLoading', false)
        console.log(firebaseUser)
        const items = []
        var user = firebase.auth().currentUser
        items.push({
          nombre: user.email,
          autenticado: true
        })
        commit('showAuthSignIn', items)
      }
    })
    promise.catch(
      error => {
        commit('setLoading', false)
        commit('setError', error.message)
        console.log(error)
      }
    )
  },
  createUser ({ commit }, payload) {
    commit('setLoading', true)
    commit('clearError')
    const email = payload.email
    const pass = payload.pass
    const auth = firebase.auth()
    // sign in
    const promise = auth.createUserWithEmailAndPassword(email, pass)
    promise.catch(e => console.log(e.message))
    auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        commit('setLoading', false)
        const items = []
        var user = firebase.auth().currentUser
        items.push({
          nombre: user.email,
          autenticado: true
        })
        commit('showAuthSignIn', items)
      }
    })
    promise.catch(
      error => {
        commit('setLoading', false)
        commit('setError', error.message)
        console.log(error)
      }
    )
  },
  clearError ({commit}) {
    commit('clearError')
  },
  signOut ({commit}) {
    const items = []
    items.push({
      nombre: 'SignOut',
      autenticado: false
    })
    commit('showAuthSignIn', items)
    firebase.auth().signOut()
  }
}

// mutations
const mutations = {
  showAuthSignIn (state, payload) {
    state.items = payload
  },
  setUser (state, payload) {
    state.user = payload
  },
  setLoading (state, payload) {
    state.loading = payload
  },
  setError (state, payload) {
    state.error = payload
  },
  clearError (state) {
    state.error = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
