<template>
    <div>
        <v-navigation-drawer
                clipped
                fixed
                v-model="drawer"
                app
        >
            <v-list dense>
                <v-list-tile @click="">
                    <v-list-tile-action>
                        <v-icon>dashboard</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Devis</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar class="green darken-4" app fixed clipped-left>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title class="headline text-uppercase">
                <span class="mr-2 white--text">Madera</span>
                <span class="font-weight-light grey--text text--lighten-4">BACK OFFICE</span>
            </v-toolbar-title>
        </v-toolbar>
    </div>
</template>

<script>
    export default {
        name: "HeaderNavigation",
        data: () => ({
            drawer: false
        }),
    }
</script>

<style scoped>

</style>