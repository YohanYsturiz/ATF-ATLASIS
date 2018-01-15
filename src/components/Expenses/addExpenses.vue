<template lang="pug">
v-content
  v-container(fluid)
    v-layout
      v-flex(xs12)
        v-card()
          v-card-text
            v-layout(row-sm column-xs)
              v-flex(xs12 class="text-xs-center text-md-left")
                h3(class="teal--text text--accent-4") Cargar Gasto
            v-form(v-model="valid" ref="form" lazy-validation)
              v-layout(row-sm column-xs justify-space-between)
                v-flex(md4 sm4)
                  v-select(
                    label="Tipo Gasto"
                    hide-details
                    :rules="[v => !!v || 'Seleccione un tipo de gasto']"
                    required
                    v-model="Gastos.tipoGasto"
                    :items="tipos"
                    auto
                    prepend-icon="group_work"
                  )
                v-flex(md4 sm3)
                  v-select(
                    label="Sub-clasificacion"
                    :rules="[v => !!v || 'Seleccione una Sub-clasificacion']"
                    required
                    hide-details
                    v-model="Gastos.subClasificacion"
                    v-bind:items="subclasificacion"
                    auto
                    prepend-icon="group_work"
                  )
                v-flex(md3 sm3)
                  v-text-field(
                    label="Cantidad"
                    v-model="Gastos.cantidad"
                    class="input-group"
                    prepend-icon="attach_money"
                    hint="cantidad del gasto a pagar"
                  )
              v-layout(row-sm column-xs justify-space-between)
                v-flex(md6 sm4)
                  v-text-field(
                    label="Acreedor del Pago"
                    v-model="Gastos.acreedorPago"
                    class="input-group"
                    prepend-icon="face"
                  )
                v-flex(md6 sm3)
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
                      label="Fecha de Pago"
                      v-model="Gastos.fechaPago"
                      class="input-group"
                      prepend-icon="event"
                      readonly
                    )
                    v-date-picker(
                      v-model="Gastos.fechaPago"
                      autosave
                      no-title
                      scrollable actions)
                      template(slot-scope="{ save, cancel }")
                        v-card-actions
                          v-btn(flat color="error" @click.native="cancel()") Cancelar
                          v-btn(flat color="primary" @click.native="save()") Guardar
              v-layout(row-sm column-xs)
                v-flex(md6 sm6)
                  v-text-field(
                    label="Descripción"
                    v-model="Gastos.descripcion"
                    class="input-group"
                    prepend-icon="comment"
                    hint="Coloca una breve descripción del gasto"
                  )
              v-layout(row-sm column-xs justify-end)
                v-flex(class="text-xs-center text-sm-right")
                  v-btn(class="teal accent-4 white--text" @click="submit" :disabled="!valid") Guardar
                  v-btn(class="red accent-4 white--text" @click.stop="clear") Limpiar
    pre {{ Gastos }}
</template>

<script>
export default {
  data () {
    return {
      expensesType: null,
      valid: true,
      expensesType2: null,
      e3: null,
      menu: false,
      items: [
        { text: 'categoria 1' }
      ],
      tipos: [
        'Gasto Fijo',
        'Gasto Variable'
      ],
      subclasificacion: [
        'Pago Empleado',
        'Pago Servicio',
        'Pago Deudas'
      ],
      Gastos: {
        tipoGasto: '',
        subClasificacion: '',
        cantidad: '',
        acreedorPago: '',
        fechaPago: null,
        descripcion: ''
      }
    }
  },
  methods: {
    newExpense () {
      const data = {
        tipoGasto: this.Gastos.tipoGasto,
        subClasificacion: this.Gastos.subClasificacion,
        cantidad: this.Gastos.cantidad,
        acreedorPago: this.Gastos.acreedorPago,
        fechaPago: this.Gastos.fechaPago,
        descripcion: this.Gastos.descripcion
      }
      // console.log(data)
      this.$store.dispatch('addExpenses', data)
      this.clear()
    },
    submit () {
      if (this.$refs.form.validate()) {
        this.newExpense()
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
