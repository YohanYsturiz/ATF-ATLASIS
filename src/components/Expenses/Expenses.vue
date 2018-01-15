<template lang="pug">
v-content
  v-container(fluid)
    v-layout(justify-center)
      v-card
        v-card-title(primary-title)
          h3(class="teal--text text--accent-4") Gastos
        div(class="card-content" id="listaProductos")
            v-data-table(
              v-bind:headers="headers"
              :items="items"
              expand
              hide-actions
              class="elevation-1 text-md-right"
            )
              template(slot="items" slot-scope="props")
                td {{props.item.tipoGasto}}
                td(class="") {{props.item.subClasificacion}}
                td(class="") {{props.item.cantidad}}
                td(class="") {{props.item.acreedorPago}}
                td(class="") {{props.item.fechaPago}}
                td(class="") {{props.item.descripcion}}
</template>

<script>
// import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      headers: [{
        text: 'Tipo Gasto',
        align: 'center',
        sortable: false,
        value: 'tipoGasto'
      },
      { text: 'Subclasificación', value: 'subClasificacion' },
      { text: 'Cantidad', value: 'cantidad' },
      { text: 'Acreedor', value: 'acreedorPago' },
      { text: 'Fecha de Pago', value: 'fechaPago' },
      { text: 'Descripción', value: 'descripcion' }
      ]
    }
  },
  computed: {
    items () {
      return this.$store.getters.allExpenses
    }
  },
  created () {
    this.$store.dispatch('getExpenses')
  }
}
</script>

<style>

</style>
