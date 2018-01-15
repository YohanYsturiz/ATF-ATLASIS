<template lang="pug">
  v-content
    v-container(fluid)
      v-layout(justify-space-between)
        v-flex(xs9 class="mr-2")
          v-card(color="cyan darken-1")
            v-card-title
              h3(class="white--text") Resumen
              v-spacer
              v-menu(bottom left class="pb-4")
                v-btn(icon slot="activator" dark)
                  v-icon more_vert
            v-layout(row)
              v-flex(xs3)
                p(class="white--text text-xs-center") Hoy
                h4(class="white--text text-xs-center") {{ cantidadHoy | total }}Bs
              v-flex(xs3)
                p(class="white--text text-xs-center") Ayer
                h4(class="white--text text-xs-center") {{ cantidadAyer | total }}Bs
              v-flex(xs3)
                p(class="white--text text-xs-center") Últimos 7 dias
                h4(class="white--text text-xs-center") {{ cantidadHaceUnaSemana | total }}Bs
              v-flex(xs3)
                p(class="white--text text-xs-center") Este mes
                h4(class="white--text text-xs-center") {{ cantidadHaceUnMes | total }}Bs
        v-flex(xs3 d-flex)
          v-card(color="cyan darken-1")
            v-card-title
              h3(class="white--text text-xs-center") Balance
              v-spacer
              v-menu(bottom left class="pb-4")
                v-btn(icon slot="activator" dark )
                  v-icon more_vert
            v-layout(row)
              v-flex()
                h4(class="white--text text-xs-center") 150.000bs
      //- Este div almacenara el elemento donde se consultara al afiliado.
      div(
        id="e3"
        style="max-width: 400px; margin: 10px 10px 10px 10px;"
        class="grey lighten-3"
      )
        v-toolbar(color="cyan darken-1")
          v-toolbar-side-icon
          v-toolbar-title(class="white--text")
            v-form(v-model="valid" ref="form" lazy-validation)
              v-text-field(
                label="Ingrese Nro. Cedula"
                single-line
                full-width
                v-model="Afiliado.cedula"
                required
                hide-details)
          v-spacer
          v-btn(icon @click="submit" :disabled="!valid")
            v-icon(color="white") send
        v-container(
          fluid
          style="min-height: 0;"
          grid-list-lg
          v-if="Afiliado.nombre != ''"
        )
          v-layout(row wrap)
            v-flex(xs12)
              v-card(color="blue-grey darken-2" class="white--text")
                v-card-title(primary-title)
                  v-avatar
                   <img src="https://randomuser.me/api/portraits/men/91.jpg" />
                  div(class="headline" style="margin-left: 5px;") {{ Afiliado.nombre }}
                  div Tipo de Plan: {{ Afiliado.tipoPlan }}
                  div Fecha Nacimiento: {{ Afiliado.fechaNacimiento }}
                v-card-actions
                  v-btn(flat dark) Mas Detalles
    pre {{ cantidadHaceUnMes }}
    pre {{ affiliateSearch }}
    //- pre {{ consulta }}
</template>
<script>
export default {
  data () {
    return {
      valid: true,
      consulta: '',
      Afiliado: {
        cedula: '',
        nombre: '',
        tipoPlan: '',
        fechaNacimiento: ''
      }
    }
  },
  computed: {
    cantidadHoy () {
      return this.$store.getters.allResumen
    },
    cantidadAyer () {
      return this.$store.getters.allResumenAyer
    },
    cantidadHaceUnaSemana () {
      return this.$store.getters.allResumenWeekAgo
    },
    cantidadHaceUnMes () {
      return this.$store.getters.allResumenMonthAgo
    },
    affiliateSearch () {
      console.log('getters: ' + this.$store.getters.searchData)
      const datos = this.$store.getters.searchData
      for (let key in datos) {
        this.Afiliado.cedula = datos[key].cedula
        this.Afiliado.nombre = datos[key].nombre
        this.Afiliado.tipoPlan = datos[key].tipoPlan
        this.Afiliado.fechaNacimiento = datos[key].fechaNacimiento
      }
      return this.$store.getters.searchData
      // return this.$store.getters.searchData
    }
  },
  filters: {
    total (val) {
      let resultado = 0
      for (let item in val) {
        resultado += val[item].totalPagar
      }
      return parseFloat(resultado)
    }
  },
  created () {
    this.$store.dispatch('getResumen')
    this.$store.dispatch('getResumenAyer')
    this.$store.dispatch('getResumenWeekAgo')
    this.$store.dispatch('getResumenMonthAgo')
  },
  methods: {
    searchAffiliate () {
      const data = {
        cedula: this.Afiliado.cedula
      }
      this.$store.dispatch('searchAffiliate', data)
      // this.clear()
      this.consulta = this.$store.getters.searchData.cedula
    },
    submit () {
      if (this.$refs.form.validate()) {
        this.searchAffiliate()
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
<style scoped>

</style>
