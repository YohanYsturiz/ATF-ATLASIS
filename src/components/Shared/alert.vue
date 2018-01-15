<template lang="pug">
    div
        v-alert(error dismissible @input="onClose" :value="true")
            |{{ text }}
</template>
<script>
  /* eslint-disable eol-last */
  export default {
    props: ['text'],
    methods: {
      onClose () {
        this.$emit('dismissed')
      }
    }
  }
</script>