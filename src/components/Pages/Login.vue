<template style="
    background: #E8F5E9;">
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>

                    <v-card class="elevation-12">
                        <v-img :src="`https://i.ibb.co/1zfvxL4/logo-madera.png`"></v-img>
                        <v-toolbar dark color="green darken-4">
                            <v-toolbar-title>Connexion</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-form
                                    ref="form"
                                    v-model="valid"
                                    lazy-validation
                                    >
                                <v-text-field @change="btnDisable" prepend-icon="person" label="Identifiant*" type="text" v-model="login" :rules="loginRules" required></v-text-field>
                                <v-text-field @change="btnDisable" prepend-icon="lock" label="Mot de passe*" v-model="password" :rules="passwordRules" type="password" required></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn :to="{name: 'Home'}" color="green darken-4 white--text"
                                   :disabled="!valid">Se connecter</v-btn>
                        </v-card-actions>
                    </v-card>

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "Login",
        methods: {
            btnDisable() {
              if(this.login !== '' && this.password !== '') {
                  this.valid = true;
              }
            },
        },
        data () {
            return {

                valid: false,
                login: '',
                loginRules: [
                    v => !!v || "L'identifiant est requis"
                ],
                password: '',
                passwordRules: [
                    v => !!v || 'Le mot de passe est requis'
                ],
            }
        }
    }
</script>

<style scoped>

</style>
