import * as firebase from 'firebase'

export default {
  getData (node) {
    firebase.database().ref(node).once('value').then(data => {
      data.val()
      console.log(data.val())
    })
    .catch(error => {
      console.log(error)
    })
    // console.log('hola')
  },

  addData (data, node) {
    firebase.database().ref(node).push(data)
    .catch(error => {
      console.log(error)
    })
  }
}
