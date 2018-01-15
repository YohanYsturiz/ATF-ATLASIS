<template lang="pug">
v-content
  v-container(fluid)
    v-layout(justify-space-between)
      v-layout(align-center)
        v-flex(md3)
          h3(class="teal--text text--accent-4") Estadísticas
      v-layout(justify-start)
        v-flex(md4)
          v-card()
            div(class="text-md-center teal--text text--accent-4 pa-2")
              div(class="headline") Ingresos:
              h6(class="mt-2") 4.000.000
        v-flex(md4)
          v-card()
            div(class="text-md-center teal--text text--accent-4 pa-2")
              div(class="headline") Gastos:
              h6(class="mt-2") 3.000.000
        v-flex(md5)
          v-card(class="mr-1")
            div(class="text-md-center teal--text text--accent-4 pa-2")
              div(class="headline") Ganancias:
              h6(class="mt-2") 1.000.000
    v-layout(row)
      v-flex(xs12)
        v-card(class="mt-3 pa-2")
          chart-statistic(
            :data="datos"
            :options="{responsive: true, maintainAspectRatio: false}"
            :height="500"
          )
    v-layout(justify-center)
      v-flex(md3)
        v-card(class="pa-2 mt-3")
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
              label="Desde"
              v-model="fecha.desde"
              class="input-group"
              prepend-icon="event"
              readonly
            )
            v-date-picker(
              v-model="fecha.desde"
              autosave
              no-title
              scrollable actions)
              template(slot-scope="{ save, cancel }")
                v-card-actions
                  v-btn(flat color="error" @click.native="cancel()") Cancelar
                  v-btn(flat color="primary" @click.native="save()") Guardar
      v-flex(md3)
        v-card(class="pa-2 mt-3")
          v-menu(
            lazy
            :close-on-content-click="false"
            v-model="menu2"
            transition="scale-transition"
            offset-y
            full-width
            :nudge-left="40"
            max-width="290px"
          )
            v-text-field(
              slot="activator"
              label="Hasta"
              v-model="fecha.hasta"
              class="input-group"
              prepend-icon="event"
              readonly
            )
            v-date-picker(
              v-model="fecha.hasta"
              autosave
              no-title
              scrollable actions)
              template(slot-scope="{ save, cancel }")
                v-card-actions
                  v-btn(flat color="error" @click.native="cancel()") Cancelar
                  v-btn(flat color="primary" @click.native="save()") Guardar
    v-layout(justify-center)
      v-btn(type="submit" @click.native.stop="consulta()" class="mt-3 teal accent-4 white--text") Enviar
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      menu: false,
      menu2: false,
      fecha: {
        desde: null,
        hasta: null
      }
    }
  },
  computed: {
    ...mapGetters({
      datos: 'valores'
    })
  },
  methods: {
    consulta () {
      const data = {
        desde: this.fecha.desde,
        hasta: this.fecha.hasta
      }
      this.$store.dispatch('evaluarDatos', data)
    }
  }
}
</script>

<style>

</style>
