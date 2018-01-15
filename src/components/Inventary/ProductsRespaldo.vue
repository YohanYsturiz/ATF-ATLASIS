<template lang="pug">
  v-container(fluid)
    v-layout(row-sm column-xs)
      v-flex(xs12 class="text-xs-center text-md-left")
        v-card
          v-layout
            v-flex()
              v-card-text
                h4(class="teal--text text--accent-4") Producto
          v-layout(row-sm)
            v-flex(md12)
              v-data-table(
                v-bind:headers="headers"
                hide-actions
                :items="products"
                class="elevation-1"
              )
                tr(v-for="product in products")
                  td {{product.nombre}}
                  td {{product.cantidad}}
                  td {{product.costoUnidad}}
                  td {{product.proveedor}}
                  td {{product.precioReferencia}}
                  td {{product.fechaCompra}}
                  td {{product.tipoProducto}}
                  td {{product.historicoPrecio}}
                  td {{product.descripcion}}
</template>

<script>
import {productsRef} from '@/assets/dbAtreusFit.js'

export default {
  firebase: {
    products: productsRef
  },
  data () {
    return {
      headers: [
        { text: 'Nombre', value: 'nombre' },
        { text: 'Cantidad (uds)', value: 'cantidad' },
        { text: 'Costo por Unidad (Bs)', value: 'costoUnidad' },
        { text: 'Proveedor', value: 'proveedor' },
        { text: 'Precio de Referencia (Bs)', value: 'precioReferencia' },
        { text: 'Fecha de Compra', value: 'fechaCompra' },
        { text: 'Tipo de Producto', value: 'tipoProducto' },
        { text: 'Historial de Precios (Bs)', value: 'historial' }
      ],
      items: [
        {nombre: 'David'}
      ]
    }
  }
}
</script>

<style>
	
</style>
