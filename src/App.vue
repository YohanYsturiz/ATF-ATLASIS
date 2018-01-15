<template lang="pug">
div
  router-view

</template>

<script>
import layout from '@/components/Layout/Master.vue'
// import Login from '@/components/Auth/login.vue'
// console.log('este es el console ' + this.items.autenticado)
export default {
  components: { layout },
  data () {
    return {
    }
  },
  computed: {
  }
}
</script>

<style lang="stylus">
  @import './stylus/main'
  .html {
    background-color: #183d54;
  }
</style>
