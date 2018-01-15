<template lang="pug">
v-content
  v-container(fluid)
    v-layout(row wrap)
        v-flex(xs12 md6 offset-md3)
            v-card
                v-toolbar(color="teal accent-4" dark)
                    v-toolbar-title Formulario de Registro
                v-card-text
                    span(class="title") Informacion del Afiliado
                    v-form(v-model="valid" ref="form" lazy-validation)
                        v-text-field(
                            label="Nombre y Apellido"
                            class="mt-3"
                            v-model="Afiliado.nombre"
                            :rules="[() => Afiliado.nombre.length > 0 || 'Este campo es obligatorio']"
                            required
                        )
                        v-text-field(
                            label="Cedula o Pasaporte"
                            hint="This field is not required"
                            v-model="Afiliado.cedula"
                            :rules="[() => Afiliado.cedula.length > 0 || 'Este campo es obligatorio']"
                            required
                        )
                        v-text-field(
                            label="Tipo de plan"
                            hint="Ejm: Plan estudiantil"
                            persistent-hint
                            v-model="Afiliado.tipoPlan"
                            :rules="[() => Afiliado.tipoPlan.length > 0 || 'Este campo es obligatorio']"
                            required
                        )
                        v-text-field(
                            label="Dirección"
                            hint="Este campo no es obligatorio"
                            persistent-hint
                            v-model="Afiliado.direccion"
                        )
                        v-text-field(
                            label="Fecha Nacimiento"
                            hint="Este campo no es obligatorio"
                            persistent-hint
                            v-model="Afiliado.fechaNacimiento"
                        )
                        small * Indicador de campos requeridos
                    v-layout(row-sm column-xs justify-end)
                        v-flex(class="text-xs-center text-sm-right")
                            v-btn(class="teal accent-4 white--text" @click="submit" :disabled="!valid") Guardar
                            v-btn(class="red accent-4 white--text" @click.stop="clear") Limpiar
</template>

<script>
export default {
  data () {
    return {
      valid: true,
      Afiliado: {
        nombre: '',
        cedula: '',
        tipoPlan: '',
        direccion: '',
        fechaNacimiento: ''
      }
    }
  },
  methods: {
    newAffiliate () {
      const data = {
        nombre: this.Afiliado.nombre,
        cedula: this.Afiliado.cedula,
        tipoPlan: this.Afiliado.tipoPlan,
        direccion: this.Afiliado.direccion,
        fechaNacimiento: this.Afiliado.fechaNacimiento
      }
      // console.log(data)
      this.$store.dispatch('addAffiliate', data)
      this.clear()
    },
    submit () {
      if (this.$refs.form.validate()) {
        this.newAffiliate()
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>

<style scoped>
    .primary--text {
        color: black !important;
    }
    input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px #2a3642 inset;
        -webkit-text-fill-color: white;
    }
</style>
