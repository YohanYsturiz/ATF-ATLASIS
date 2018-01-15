import * as firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyAlGu2jVsYdilTTFI8o9TYs6oDGwiesYVI',
  authDomain: 'atreusfit.firebaseapp.com',
  databaseURL: 'https://atreusfit.firebaseio.com',
  projectId: 'atreusfit',
  storageBucket: 'atreusfit.appspot.com',
  messagingSenderId: '310643520107'
}
const app = firebase.initializeApp(config)
const db = app.database()
export const productsRef = db.ref('inventario')
export const expensesRef = db.ref('gasto')
