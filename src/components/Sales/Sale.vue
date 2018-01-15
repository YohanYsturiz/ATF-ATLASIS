<template lang="pug">
v-content
  v-container(fluid)
    //- Ventana modal donde se mostrara el carrito de compra
    v-layout(row justify-space-between)
      v-flex(xs12)
        v-dialog(v-model="dialog" persistent max-width="50%")
          v-btn(
            color="cyan accent-4"
            slot="activator"
            dark
            @click="calculoTotal()"
            absolute
            style="bottom: 1rem"
            right
            bottom
            fab
            )
            v-icon shopping_cart
          //- v-btn( color="primary" dark slot="activator") Carrito de Compra
          v-card
            v-card-text
              v-container(grid-list-md)
                v-layout(row justify-center)
                  //- Aca se muestran los elementos seleccionados en los items de los productos, formulario que permitira terminar la compra
                  v-flex(xs12)
                      v-card
                        v-toolbar(class="cyan accent-4" dark)
                          v-icon(class="white--text") add_shopping_cart
                          v-toolbar-title Carrito de Compra
                          v-spacer
                        v-list(two-line)
                          template( v-for="selec in selected")
                            v-list-tile()
                              v-list-tile-content
                                v-list-tile-title {{ selec.nombre }}
                                //- v-list-tile-sub-title(class="grey--text text--darken-4") {{ selec.precioCompra }}
                                v-list-tile-sub-title {{ selec.cuenta }}
                              v-list-tile-action
                                v-chip(class="primary white--text" color="cyan accent-4")
                                  v-list-tile-title {{ selec.precioReferencia * selec.cuenta }}
                                v-list-tile-sub-title {{ selec.tipoProducto }}
                          v-list-tile()
                            v-list-tile-action
                              div(class="text-xs-center")
                                //- v-chip(label)
                                //-   |Monto a pagar:
                                v-text-field(
                                  name="input-1"
                                  label="Total a pagar"
                                  id="testing"
                                  v-model="totalPagar"
                                  disabled
                                )
            v-card-actions
              v-spacer
              v-btn(class="red--text darken-1" flat @click.native="dialog = false") Cerrar
              v-btn(class="blue--text darken-1" flat @click="submit") Guardar
      v-flex(xs6)
        v-alert(
          class="teal accent-4"
          icon="check_circle"
          dismissible
          v-model="alert"
          transition="slide-y-reverse-transition"
        )
          |La venta fué registrada con exito.
    v-layout(row justify-space-between )
      v-flex(xs8 class="mr-3")
        template
          v-tabs(dark v-model="active")
            v-tabs-bar(class="cyan darken-1")
              v-tabs-item(
                v-for="tab in tabs"
                :key="tab"
                :href="'#' + tab"
              )
                div(@click="itemMarcado(tab, $event)" style="width: 100%; height: 100%" class="pt-3")
                  | {{ tab }}
              v-tabs-slider(class="amber accent-3")
            v-tabs-content(
              v-for="tab in tabs"
              :key="tab"
              :id="tab"
            )
              v-card(flat)
                v-card-text
                  v-data-table(
                      v-bind:headers="headers"
                      :items="items"
                      hide-actions
                      item-key="nombre"
                      v-bind:search="search"
                      v-model="selected"
                      selected-key="nombre"
                      class="elevation-1"
                      v-if="tab == filtrarItem")
                      template(slot="items" slot-scope="props")
                        tr(v-if="props.item.tipoProducto == tab")
                          td
                            v-checkbox(
                              color="primary"
                              hide-details
                              :disabled="isEqualsToCero(props.item.cantidad)"
                              v-model="props.selected"
                            )
                          td(class="text-xs-right") {{props.item.nombre}}
                          td(class="text-xs-right") {{props.item.cantidad}}
                          td(class="text-xs-right") {{props.item.costoUnidad}}
                          td(class="text-xs-center") 
                            v-btn(flat id="menos" :disabled="isEqualsToCero(props.item.cantidad, props.item.cuenta)" class="ma-0" icon color="cyan accent-4" v-on:click="incrementArticulo(props.item.idArticulo,'decrement')")
                              v-icon() remove
                            span {{ props.item.cuenta }}
                            v-btn(flat icon color="cyan accent-4" :disabled="isEqualsToCero(props.item.cantidad)" class="ma-0" v-on:click="incrementArticulo(props.item.idArticulo,'increment')")
                              v-icon() add
      v-flex(xs4)
        v-card
          v-toolbar(class="cyan darken-1" dark dense)
            v-icon(class="white--text") add_shopping_cart
            v-toolbar-title Datos de la Venta
          main
            v-container(fluid class="px-3")
              v-form(v-model="valid" ref="form" lazy-validation)
                v-layout(row wrap)
                  v-flex(xs12)
                    v-text-field(
                      label="Nombre Comprador"
                      class="input-group--focused"
                      :rules="[v => !!v || 'El nombre del comprador es requerido']"
                      required
                      v-model="nombreComprador"
                      counter= true
                    )
                  v-flex(xs12)
                    v-text-field(
                      label="C.I"
                      type="number"
                      :rules="ciLength"
                      required
                      class="input-group"
                      v-model="cedulaComprador"
                    )
                  v-flex(xs12)
                    v-select(
                      label="Método de Pago"
                      hide-details
                      v-model="tipoPago"
                      :rules="[v => !!v || 'Seleccione un método de pago']"
                      required
                      :items="metodosPago"
                      item-value="text"
                      auto
                      persistent-hint
                      prepend-icon="group_work"
                    )
                  v-flex(xs12)
                    v-menu(
                      lazy
                      :close-on-content-click="false"
                      v-model="menu"
                      transition="scale-transition"
                      offset-y
                      full-width
                      :nudge-left="40"
                      max-width="290px"
                    )
                      v-text-field(
                        slot="activator"
                        label="Fecha de venta"
                        class="input-group"
                        v-model="fechaVenta"
                        prepend-icon="event"
                        readonly
                      )
                      v-date-picker(
                        v-model="fechaVenta"
                        no-title
                        scrollable actions
                        autosave)
                        template(slot-scope="{ save, cancel }")
                          v-card-actions
                            v-btn(flat color="error" @click.native="cancel()") Cancelar
                            v-btn(flat color="primary" @click.native="save()") Guardar
</template>

<script>
export default {
  data () {
    return {
      valid: true,
      valor: 4,
      tabs: ['Suplementos', 'Vestimenta', 'Cafetín', 'Equipos Deportivos'],
      // Acá se almacenan los valores del select para el metedo de pago
      metodosPago: [
        {text: 'Debito'},
        {text: 'Credito'},
        {text: 'Efectivo'},
        {text: 'Mixto'}
      ],
      ciLength: [
        (v) => !!v || 'La cédula es requerida.',
        (v) => !!v && v.length >= 7 || 'La cédula debe tener por lo menos 7 caracteres.'
      ],
      tipoPago: '',
      menu: false,
      active: null,
      // Variables que almacenan valores de los elementos en el carrito de compras
      valorElemento: [],
      cantidadElemento: [],
      totalPagar: 0,
      // Valor que almacena la cantidad de articulos por productos
      cantidadArticulos: 0,
      search: '',
      // Varibles del formulario
      fechaVenta: null,
      nombreComprador: '',
      cedulaComprador: '',
      // Variable de la ventana modal
      dialog: false,
      alert: false,
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
      { text: 'Nombre', value: 'nombre' },
      { text: 'Cantidad Disponible', value: 'cantidad' },
      { text: 'Costo x Unidad', value: 'costoUnidad' },
      { text: 'Cantidad Articulo', value: '' }
      ]
    }
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        this.newSale()
        this.clear()
      }
    },
    clear () {
      this.$refs.form.reset()
    },
    next () {
      this.active = this.tabs[(this.tabs.indexOf(this.active) + 1) % this.tabs.length]
    },
    isEqualsToCero (cantidad, cuenta) {
      if (parseInt(cuenta) > 0) {
        return false
      }
      if (parseInt(cantidad) === 0 || parseInt(cuenta) === 0) {
        return true
      }
    },
    itemMarcado: function (tabMarcado, event) {
      // now we have access to the native event
      if (event) event.preventDefault()
      this.filtrarItem = tabMarcado
    },
    incrementArticulo (id, opcion) {
      for (let val in this.items) {
        if (!this.items[val].cuenta) {
          this.items[val].cuenta = 0
        }
        if (this.items[val].idArticulo === id) {
          if (opcion === 'increment') {
            this.items[val].cantidad--
            this.items[val].cuenta++
          }
          if (opcion === 'decrement') {
            this.items[val].cantidad++
            this.items[val].cuenta--
          }
        }
      }
    },
    newSale () {
      const value = {
        fechaVenta: this.fechaVenta,
        nombreComprador: this.nombreComprador,
        cedulaComprador: this.cedulaComprador,
        selectedArticles: this.selected,
        metodoPago: this.tipoPago,
        totalPagar: this.totalPagar
      }
      console.log('venta cargada con exito')
      this.$store.dispatch('addSale', value)
      this.alert = true
      this.dialog = false
      // console.log(this.selected[0].cantidad)
      this.updateProduct(this.selected)
    },
    updateProduct (product) {
      // console.log('ejcutado')
      this.$store.dispatch('updateProduct', product)
    },
    calculoTotal () {
      this.totalPagar = 0
      this.valorElemento.length = 0
      for (let valor in this.selected) {
        this.valorElemento.push(parseFloat(this.selected[valor].precioReferencia) * parseFloat(this.selected[valor].cuenta))
      }
      for (let costo in this.valorElemento) {
        this.totalPagar += parseFloat(this.valorElemento[costo])
      }
    }
  },
  watch: {
    selected (value) {
      // console.log(value)
      this.valorElemento.length = 0
      for (let val in this.items) {
        if (!this.items[val].cuenta) {
          this.items[val].cuenta = 0
        }
      }
    }
  },
  computed: {
    items () {
      return this.$store.getters.allInventary
      // return this.$store.getters.allInventary
    }
  },
  created () {
    this.$store.dispatch('getInventary')
  }
}
</script>

<style>

</style>
