<template lang="pug">
  v-layout(row)
    div
      v-breadcrumbs(icons divider="chevron_right")
        v-breadcrumbs-item(v-for="item in items" :key="item.text" :disabled="item.disabled") {{ item.text }}
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          text: 'AtreusFit',
          disabled: false
        },
        {
          text: 'Resumen',
          disabled: false
        },
        {
          text: 'Inventario',
          disabled: false
        },
        {
          text: 'Venta'
        }
      ]
    }
  }
}
</script>

<style>
	
</style>
