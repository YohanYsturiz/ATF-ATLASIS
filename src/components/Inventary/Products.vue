<template lang="pug">
v-content
  v-container(fluid)
    v-layout
      v-card
        v-card-title(primary-title)
          div
            h3(class="teal--text text--accent-4") Productos
          v-spacer
          v-text-field(
                append-icon="search"
                label="Buscar"
                single-line
                hide-details
                v-model="search"
              )
        div(class="card-content" id="listaProductos")
          v-data-table(
            v-bind:headers="headers"
            :items="items"
            :rows-per-page-items= "rows"
            :search="search"
            expand
            class="elevation-1 text-md-right"
          )
            template(slot="items" slot-scope="props")
              td(class="text-xs-center") {{props.item.nombre}}
              td(class="") {{props.item.cantidad}}
              td(class="") {{props.item.costoUnidad}}
              td(class="") {{props.item.proveedor}}
              td(class="") {{props.item.precioReferencia}}
              td(class="") {{props.item.fechaCompra}}
              td(class="") {{props.item.tipoProducto}}
              td(class="text-xs-center") 
                v-btn(flat icon color="cyan accent-4" class="ma-0" @click.stop="activarVentana(props.item.id, props.item)")
                  v-icon() edit
    //- Ventana Modal
    v-layout(row justify-center)
      v-dialog(v-model="dialog" persistent max-width="650px")
        v-btn(color="primary" dark slot="activator" id="openModal" style="display: none") Open Dialog
        v-card()
          v-card-title
            span(class="headline teal--text text-lighten-4" id="name") Modificar Inventario
          v-card-text
            v-container(grid-list-lg)
            v-form(
                  v-model="valid"
                  ref="form"
                  lazy-validation
                )
              v-layout(row)
                v-layout(column align-center)
                  h6(class="red--text") Estado Actual
                  v-flex(xs12)
                    v-text-field(
                      label="Costo por unidad"
                      type="number"
                      suffix="Bs"
                      disabled
                      v-model="currentState.costoUnidad"
                    )
                  v-flex(xs12)
                    v-text-field(
                      label="Cantidad"
                      type="number"
                      suffix="Bs"
                      disabled
                      v-model="currentState.cantidad"
                    )
                  v-flex(xs12)
                    v-text-field(
                      label="Precio de Venta"
                      v-model="currentState.precioVenta"
                      type="number"
                      suffix="Bs"
                      disabled
                    )
                v-layout(column align-center)
                  h6(class="blue--text") Nuevo Estado
                  v-flex(xs12)
                    v-text-field(
                      label="Nuevo Costo por unidad"
                      type="number"
                      suffix="Bs"
                    )
                  v-flex(xs12)
                    v-text-field(
                      label="Nueva Cantidad"
                      type="number"
                      suffix="Bs"
                    )
                  v-flex(xs12)
                    v-text-field(
                      label="Nuevo Precio de Venta"
                      type="number"
                      suffix="Bs"
                    )
              v-card-actions
                v-spacer
                v-btn(color="error" flat @click.native="dialog = false") Cerrar
                v-btn(color="blue darken-1" flat @click.native="dialog = false") Guardar
</template>

<script>
export default {
  data () {
    return {
      products: {},
      valid: true,
      dialog: false,
      rows: [10, 15, 25],
      currentState: {
        costoUnidad: '',
        cantidad: '',
        precioVenta: ''
      },
      search: '',
      headers: [{
        text: 'Nombre',
        align: 'center',
        sortable: false,
        value: 'nombre'
      },
      { text: 'Cantidad', value: 'cantidad' },
      { text: 'Costo por Unidad', value: 'costoUnidad' },
      { text: 'Proveedor', value: 'proveedor' },
      { text: 'Precio Venta', value: 'precioReferencia' },
      { text: 'Fecha de Compra', value: 'fechaCompra' },
      { text: 'Tipo de Producto', value: 'tipoProducto' },
      { text: '', value: '' }]
    }
  },
  methods: {
    activarVentana (id, objProduct) {
      // alert(id)
      var edit = document.getElementById('openModal')
      let name = document.getElementById('name')
      name.innerHTML = `Modificar inventario de ${objProduct.nombre}`
      edit.click()
      this.fillForm(id, objProduct)
    },
    fillForm (id, objProduct) {
      this.currentState.costoUnidad = objProduct.costoUnidad
      this.currentState.cantidad = objProduct.cantidad
      this.currentState.precioVenta = objProduct.precioReferencia
    }
  },
  computed: {
    items () {
      return this.$store.getters.showAllProducts
    }
  },
  created () {
    this.$store.dispatch('getAllProducts')
  }
}
</script>

<style>

</style>
