<template lang="pug">
v-content
  v-container(fluid)
    v-layout(row-sm column-xs wrap)
      v-flex(xs12)
        v-card()
          v-card-title(primary-title)
            div
              h3(class="teal--text text--accent-4") Nuevo Producto
            v-layout(row column-xs wrap)
              v-flex(xs12)
                v-form(
                  v-model="valid"
                  ref="form"
                  lazy-validation
                )
                  v-layout(row-sm column-xs justify-space-between wrap)
                    v-flex(md4 sm4 xs10)
                      v-text-field(
                        label="Nombre"
                        class="input-group"
                        prepend-icon="create"
                        max="50"
                        counter
                        v-model="Inventario.nombre"
                      )
                    v-flex(md4 sm3 xs10)
                      v-text-field(
                        label="Precio de Compra"
                        class="input-group"
                        prepend-icon="attach_money"
                        suffix="Bs"
                        type="number"
                        v-model="Inventario.precioCompra"
                      )
                    v-flex(md3 sm3 xs10)
                      v-text-field(
                        label="Cantidad"
                        class="input-group"
                        prepend-icon="format_list_numbered"
                        type="number"
                        suffix="Uds"
                        v-model="Inventario.cantidad"
                      )
                  v-layout(row-sm column-xs justify-space-between wrap)
                    v-flex(md4 sm4 xs10)
                      v-text-field(
                        label="Costo por Unidad"
                        class="input-group"
                        prepend-icon="attach_money"
                        v-model="Inventario.costoUnidad"
                        hint="Valor individual de cada producto"
                        suffix="Bs"
                        @click.native.stop="calculo()"
                      )
                    v-flex(md4 sm3 xs10)
                      v-text-field(
                        label="Proveedor"
                        class="input-group"
                        prepend-icon="face"
                        v-model="Inventario.proveedor"
                      )
                    v-flex(md3 sm3 xs10)
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
                          label="Fecha de Compra"
                          class="input-group"
                          v-model="Inventario.fechaCompra"
                          prepend-icon="event"
                          readonly
                        )
                        v-date-picker(
                          v-model="Inventario.fechaCompra"
                          no-title
                          scrollable actions
                          autosave)
                          template(slot-scope="{ save, cancel }")
                            v-card-actions
                              v-btn(flat color="error" @click.native="cancel()") Cancelar
                              v-btn(flat color="primary" @click.native="save()") Guardar
                  v-layout(row-sm column-xs justify-space-between wrap)
                    v-flex(md4 sm4 xs10)
                      v-select(
                        label="Tipo Producto"
                        hide-details
                        v-model="Inventario.tipoProducto"
                        :items="tipos"
                        item-value="text"
                        auto
                        persistent-hint
                        prepend-icon="group_work"
                      )
                    v-flex(md4 sm3 xs10)
                      v-text-field(
                        label="Descripción"
                        class="input-group"
                        prepend-icon="short_text"
                        max="50"
                        counter
                        v-model="Inventario.descripcion"
                      )
                    v-flex(md3 sm3 xs10)
                      v-text-field(
                        label="Precio de Venta"
                        class="input-group"
                        prepend-icon="attach_money"
                        type="number"
                        suffix="Bs"
                        v-model="Inventario.precioReferencia"
                      )
                  v-layout(row-sm column-xs wrap)
                    v-flex(md4 sm4 mr-5 xs10)
                      v-text-field(
                        label="Historico Precio Venta"
                        class="input-group"
                        prepend-icon="history"
                        type="number"
                        suffix="Bs"
                        v-model="Inventario.historicoPrecio"
                      )
                    v-flex(sm12 xs12 md4 xs10)
                      v-btn(
                        raised
                        type="file"
                        class="teal accent-4 white--text mt-3"
                        @click="onLoandFile"
                      ) Cargar Factura
                      input(
                        type="file"
                        style="display: none"
                        ref="fileInput"
                      )
                  v-layout(row-sm column-xs justify-end)
                    v-flex(class="text-xs-center text-sm-right")
                      v-btn(class="teal accent-4 white--text" @click="submit") Guardar
                      v-btn(class="red accent-4 white--text" @click="clear" @click.native="reset()") Limpiar
    //- pre {{Inventario}}
</template>

<script>
export default {
  data () {
    return {
      e1: null,
      e3: null,
      valid: true,
      menu: false,
      items: [
        { text: 'categoria 1' }
      ],
      select: null,
      tipos: [
        {text: 'Suplementos'},
        {text: 'Vestimenta'},
        {text: 'Equipos Deportivos'},
        {text: 'Cafetín'}
      ],
      Inventario: {
        nombre: '',
        cantidad: '',
        precioCompra: '',
        costoUnidad: '',
        proveedor: '',
        precioReferencia: '',
        fechaCompra: null,
        tipoProducto: '',
        historicoPrecio: '',
        descripcion: ''
      }
    }
  },
  methods: {
    calculo: function () {
      if (!this.Inventario.precioCompra && !this.Inventario.cantidad) {
        this.Inventario.precioCompra = ''
        this.Inventario.cantidad = ''
      } else {
        let costoUnidad = this.Inventario.precioCompra / this.Inventario.cantidad
        this.Inventario.costoUnidad = parseFloat(costoUnidad).toFixed(2)
      }
    },
    addProduct () {
      let product = {
        nombre: this.Inventario.nombre,
        cantidad: this.Inventario.cantidad,
        precioCompra: this.Inventario.precioCompra,
        costoUnidad: this.Inventario.costoUnidad,
        proveedor: this.Inventario.proveedor,
        precioReferencia: this.Inventario.precioReferencia,
        fechaCompra: this.Inventario.fechaCompra,
        tipoProducto: this.Inventario.tipoProducto,
        historicoPrecio: this.Inventario.historicoPrecio,
        descripcion: this.Inventario.descripcion
      }
      this.$store.dispatch('addProduct', product)
      this.$store.dispatch('getLastProduct')
      // this.$store.dispatch('registryPassiveNode')
      this.clear()
    },
    onLoandFile () {
      this.$refs.fileInput.click()
    },
    submit () {
      if (this.$refs.form.validate()) {
        this.addProduct()
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>

<style>
</style>
