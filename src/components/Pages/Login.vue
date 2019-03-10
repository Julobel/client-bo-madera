<template style="
    background: #E8F5E9;">
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="green darken-4">
                        <v-toolbar-title>Connexion</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                            <v-text-field prepend-icon="person" name="login" label="Identifiant" type="text" required></v-text-field>
                            <v-text-field prepend-icon="lock" name="password" label="Mot de passe" id="password" type="password"></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn :to="{name: 'Home'}" color="green darken-4 white--text">Se connecter</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "Login"
    }
</script>

<style scoped>

</style>