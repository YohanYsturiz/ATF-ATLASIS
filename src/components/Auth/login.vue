<template lang="pug">
v-content(style="background-color: #2a3642")
    p
    v-layout(row v-if="error")
        v-flex(xs12 sm6 offset-sm3)
            app-alert(@dismissed="onDismissed" :text="error")
    v-layout(row wrap style="padding-top:5%;") 
        v-flex(xs6 class="div_izquierdo")
            v-flex
                v-card-media(src="/static/img/AnastasisLogo.png" height="700px") 
        v-flex(xs6 class="div_derecho")
            v-flex(xs12 sm5 md8 offset-xs0 offset-lg4)
                v-card-media(src="/static/img/LogoAtreusLogin.png" class="atreus_logo")
            v-flex(xs12 sm5 md8 offset-xs0 offset-lg2 class="form_login")
                v-card-text
                    v-form(v-model="valid" ref="form" lazy-validation autocomplete="false")
                        v-text-field(
                            label="E-mail"
                            autocomplete="nope"
                            v-model="email"
                            :rules="emailRules"
                            id= "email"
                            required)
                        v-text-field(
                            label="Contraseña"
                            v-model="password"
                            id= "password"
                            :rules="passwordRules"
                            :counter="10"
                            :append-icon="e1 ? 'visibility' : 'visibility_off'"
                            :append-icon-cb="() => (e1 = !e1)"
                            :type="e1 ? 'password' : 'text'"
                            required)
                        v-checkbox(
                            label="Recordar la Contraseña"
                            v-model="checkbox"
                            :rules="[v => !!v || 'You must agree to continue!']"
                            required)
                        v-btn(
                            id="btnLogin"
                            @click.native="submit"
                            :disabled="!valid"
                            color="teal acent-4")
                            v-icon() fitness_center
                            |Iniciar sesion
                        v-btn(
                            id="btnSignUp"
                            @click.native="register"
                            :disabled="!valid"
                            color="teal acent-4")
                            v-icon() fitness_center
                            |Registrarse                  
                        v-btn(@click="clear" color="teal acent-4") limpiar
    v-footer(
        class="pa-3"
        fixed= true
        color= "teal acent-4")
        v-spacer
        div(style="color: white;") AnastasisDev © {{ new Date().getFullYear() }}
          
</template>

<script>
import * as firebase from 'firebase'

export default {
  data () {
    return {
      valid: true,
      e1: true,
      password: '',
      passwordRules: [
        (v) => !!v || 'Debe Ingresar el Email',
        (v) => v && v.length <= 10 || 'maximo 10 caracteres'],
      email: null,
      emailRules: [
        (v) => !!v || 'El campo E-Mail es Obligatorio',
        (v) => /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(v) || 'El Email no es valido'],
      checkbox: false
    }
  },
  computed: {
    error () {
      return this.$store.getters.error
    },
    AuthUser () {
      return this.$store.getters.items
    }
  },
  watch: {
    AuthUser (value) {
      if (value !== null && value !== undefined) {
        console.log('Bienvenido')
        this.$router.push('Resumen')
      }
    }
  },
  methods: {
    submit () {
      // Si cumple la validacion entonces solicita la autenticacion
      if (this.$refs.form.validate()) {
        const value = {
          email: this.email,
          pass: this.password
        }
        this.$store.dispatch('signIn', value)
        firebase.auth().onAuthStateChanged(firebaseUser => {
          if (firebaseUser) {
            this.$router.push('Resumen')
          }
        })
      }
    },
    register () {
      if (this.$refs.form.validate()) {
        const value = {
          email: this.email,
          pass: this.password
        }
        this.$store.dispatch('createUser', value)
        firebase.auth().onAuthStateChanged(firebaseUser => {
          if (firebaseUser) {
            this.$router.push('Resumen')
          }
        })
      }
    },
    signOut () {
      firebase.auth().signOut()
      this.session = false
    },
    clear () {
      this.$refs.form.reset()
    },
    onDismissed () {
      // console.log('Dismissed Alert!')
      this.$store.dispatch('clearError')
    }
  }
}
</script>

<style scope>
    body {
        background-color: #2a3642;
        }
    label {
        color: white;
    }
    .div_izquierdo {
        height: 600px;
    }
    .div_derecho {
        height: 600px;
    }
    .form_login {
        color: white;
    }
    .primary--text {
        color: white !important;

    }
    .atreus_logo {
        width:200px !important; 
        height: 200px !important;
    }
    input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px #2a3642 inset;
        -webkit-text-fill-color: white;
    }
</style>
