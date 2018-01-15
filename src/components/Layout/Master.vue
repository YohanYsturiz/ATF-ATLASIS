<template lang="pug">
  div(v-if="autenticado")
    sidenav
</template>

<script>
import sidenav from '@/components/Layout/sideNav.vue'
// import breadCrumbs from '@/components/Layout/breadCrumbs.vue'
// import upnav from '@/components/Layout/upNav.vue'
export default {
  components: { sidenav },
  data () {
    return {
      autenticado: true
    }
  },
  methods: {
  },
  computed: {
    session () {
      if (this.AuthSigIn) {
        this.autenticado = true
        console.log('computed')
        return this.autenticado
      }
    },
    AuthSigIn () {
      return this.$store.getters.AuthSigIn.autenticado === true
    }
  }
}
</script>

<style lang="stylus">
  
</style>
