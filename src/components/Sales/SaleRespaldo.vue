<template lang="pug">
  v-container(fluid)
    v-layout(row wrap justify-space-between)
      v-flex(xs6 lg5)
        v-expansion-panel(popout)
          v-expansion-panel-content(v-for="tab in tabs" :key="tab")
            div(slot="header" @click="itemMarcado(tab, $event)" style="width: 100%; height: 100%" class="pt-3") {{ tab }}
            v-card
              v-card-title(class="grey lighten-3")
                v-spacer
                v-text-field(append-icon="search" label="Buscar" single-line hide-details v-model="search")
                v-data-table(
                    v-bind:headers="headers"
                    :items="items"
                    hide-actions
                    v-bind:search="search"
                    v-model="selected"
                    selected-key="nombre"
                    class="elevation-1"
                    v-if="tab == filtrarItem")
                    template(slot="items" scope="props")
                      tr(v-if="props.item.tipoProducto == tab")
                        td
                          v-checkbox(primary hide-details v-model="props.selected")
                        td {{props.item.nombre}}
                        td(class="text-xs-center") {{props.item.cantidad}}
                        td(class="text-xs-center") {{props.item.costoUnidad}}
      
      //- Aca se muestran los elementos seleccionados en los items de los productos, formulario que permitira terminar la compra  
      v-flex(xs6)
          v-card
            v-toolbar(class="white--text blue" dark)
              v-icon add_shopping_cart
              v-toolbar-title Carrito de Compra  
              v-spacer
              v-btn(icon)
                v-icon search
              v-btn(icon)
                v-icon check_circle
            v-list(two-line) 
              template( v-for="selec in selected")
                v-list-tile(avatar ripple @click="")
                  v-list-tile-content
                    v-list-tile-title {{ selec.nombre }}
                    //- v-list-tile-sub-title(class="grey--text text--darken-4") {{ selec.precioCompra }}
                    v-list-tile-sub-title {{ selec.cantidad }}
                  v-list-tile-action
                    v-chip(class="primary white--text")
                      v-list-tile-title {{ selec.costoUnidad }}
                    v-list-tile-sub-title {{ selec.tipoProducto }}
              v-list-tile()
                v-list-tile-action
                  div(class="text-xs-center")
                    //- v-chip(label)
                    //-   |Monto a pagar:
                    v-text-field(
                      name="input-1"
                      label="Mostrar Monto"
                      id="testing"
                      v-model="totalPagar"
                      disabled
                    )
                    
                //- v-divider(v-if="selec + 1 < selected.length")
              //- pre {{ selected }}
              //- pre {{ valorElemento }}
        
    //- div
    //-     v-tabs(dark v-model="active")
    //-         v-tabs-bar(slot="activators" class="cyan")
    //-             v-tabs-item(
    //-             v-for="tab in tabs"
    //-             :key="tab"
    //-             :href="'#' + tab"
    //-             ripple)
    //-                 |{{ tab }}
    //-             v-tabs-slider(class="yellow")
    //-         v-tabs-content(
    //-             v-for="tab in tabs"
    //-             :key="tab"
    //-             :id="tab"
    //-         )
    //-             v-card(flat) 
    //-                 v-card-text 
    //-                     |{{ text }}
    //-     div(class="text-xs-center mt-3")
    //-         v-btn(@click.native="next")
    //-             |next tab
</template>

<script>
// import {conexref} from '@/assets/firebase'
import {productsRef} from '@/assets/dbAtreusFit.js'

export default {
  mounted () {
    console.log(productsRef)
  },
  data () {
    return {
      tabs: ['Suplementos', 'Vestimenta', 'Cafetín', 'Equipos Deportivos'],
      active: null,
      // Variables que almacenan valores de los elementos en el carrito de compras
      valorElemento: [],
      totalPagar: 0,
      //
      search: '',
      selected: [],
      // Variable que almacena el elemento seleccionado en los items, valor que agrega la funcion itemMarcado
      filtrarItem: {},
      text: 'Acá van los elementos a seleccionar para la venta.',
      products: {},
      headers: [{
        text: '',
        align: 'left',
        sortable: true,
        value: 'nombre'
      },
      { text: 'Nombre', value: 'cantidad' },
      { text: 'Cantidad', value: 'cantidad' },
      { text: 'Costo x Unidad', value: 'costoUnidad' }
      ]
    }
  },
  methods: {
    next () {
      this.active = this.tabs[(this.tabs.indexOf(this.active) + 1) % this.tabs.length]
    },
    itemMarcado: function (tabMarcado, event) {
      // now we have access to the native event
      if (event) event.preventDefault()
      // alert(tabMarcado)
      this.filtrarItem = tabMarcado
    }
  },
  watch: {
    selected (value) {
      this.valorElemento.length = 0
      for (let valor in value) {
        this.valorElemento.push(parseFloat(value[valor].costoUnidad))
      }
      this.totalPagar = 0
      for (let costo in this.valorElemento) {
        this.totalPagar = parseFloat(this.totalPagar) + parseFloat(this.valorElemento[costo])
      }
    }
  },
  firebase: {
    items: {
      source: productsRef,
      cancelCallback (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style>
	
</style>
